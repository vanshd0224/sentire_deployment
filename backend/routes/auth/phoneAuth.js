const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const logger = require('../../utils/logger');

// MSG91 Credentials
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || "562962AgqwUH0qSWc6a883d11P1";
const MSG91_WIDGET_ID = process.env.MSG91_WIDGET_ID || "3668756c6855323939333039";
const MSG91_TOKEN_AUTH = process.env.MSG91_TOKEN_AUTH || "562962T3pkOoGcL6a884028P1";

/*
 * Phone login with MSG91's OTP widget. MSG91 sends the SMS and checks the
 * code; we only say "verified" when MSG91 does. (There used to be a test
 * code and a fall-through "success", so any phone could be logged into.)
 *
 * send-otp hands the browser MSG91's request id plus a signed ticket tying
 * it to that phone, so verify-otp works on any server instance and can't be
 * replayed for another number. A verified phone gets a session token
 * (signed, 30 days) that other routes can trust.
 */
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  crypto
    .createHmac('sha256', process.env.SHIPROCKET_CHECKOUT_API_SECRET || process.env.MSG91_AUTH_KEY || MSG91_AUTH_KEY)
    .update('sentire-session-v1')
    .digest('hex');
const TICKET_TTL = 10 * 60 * 1000;

const normalizePhone = (raw) => {
  const digits = String(raw || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null; // Indian mobile, 10 digits
};
const ticketFor = (phone, reqId, exp) =>
  crypto.createHmac('sha256', SESSION_SECRET).update(`${phone}|${reqId}|${exp}`).digest('hex');
const sameHex = (a, b) => {
  const x = Buffer.from(String(a || ''), 'hex');
  const y = Buffer.from(String(b || ''), 'hex');
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
};

// SMS cost guard: per visitor (Cloud Run sets X-Forwarded-For) and per phone
const visitorKey = (req) => String(req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
const limiterOpts = {
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, trustProxy: false },
  handler: (req, res) => res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' }),
};
const sendLimiter = rateLimit({ ...limiterOpts, windowMs: 10 * 60 * 1000, max: 6, keyGenerator: visitorKey });
const verifyLimiter = rateLimit({ ...limiterOpts, windowMs: 10 * 60 * 1000, max: 15, keyGenerator: visitorKey });
const sentTo = new Map(); // phone -> [timestamps]
const phoneAllowed = (phone) => {
  const now = Date.now();
  const recent = (sentTo.get(phone) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 3) return false;
  recent.push(now);
  sentTo.set(phone, recent);
  return true;
};

async function msg91(path, payload) {
  const res = await fetch(`https://control.msg91.com/api/v5/widget/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ widgetId: MSG91_WIDGET_ID, tokenAuth: MSG91_TOKEN_AUTH, ...payload }),
  });
  return res.json().catch(() => null);
}

/**
 * POST /auth/send-otp  { phoneNumber }
 * -> { success, reqId, ticket, exp }
 */
router.post('/send-otp', sendLimiter, async (req, res) => {
  const phone = normalizePhone(req.body?.phoneNumber);
  if (!phone) return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
  if (!phoneAllowed(phone)) {
    return res.status(429).json({ error: 'Too many codes sent to this number. Please wait a few minutes.' });
  }
  try {
    const data = await msg91('sendOtp', { identifier: `91${phone}` });
    const reqId = data?.type === 'success' ? String(data.message || '') : '';
    if (!reqId) {
      logger.warn('MSG91 sendOtp failed', { type: data?.type, message: data?.message });
      return res.status(502).json({ error: "We couldn't send the OTP right now. Please try again." });
    }
    const exp = Date.now() + TICKET_TTL;
    return res.json({ success: true, reqId, exp, ticket: ticketFor(phone, reqId, exp) });
  } catch (err) {
    logger.error('Send OTP Error', { message: err.message });
    return res.status(502).json({ error: "We couldn't send the OTP right now. Please try again." });
  }
});

/**
 * POST /auth/verify-otp  { phoneNumber, code, reqId, ticket, exp }
 * -> { success, user, token }  only when MSG91 confirms the code
 */
router.post('/verify-otp', verifyLimiter, async (req, res) => {
  const phone = normalizePhone(req.body?.phoneNumber);
  const code = String(req.body?.code || '').trim();
  const { reqId, ticket } = req.body || {};
  const exp = Number(req.body?.exp);
  if (!phone || !/^\d{4,6}$/.test(code) || !reqId || !ticket || !exp) {
    return res.status(400).json({ error: 'Please request a new OTP and try again.' });
  }
  if (Date.now() > exp || !sameHex(ticket, ticketFor(phone, String(reqId), exp))) {
    return res.status(400).json({ error: 'This OTP has expired. Please request a new one.' });
  }
  try {
    const data = await msg91('verifyOtp', { reqId: String(reqId), otp: code });
    if (data?.type !== 'success') {
      return res.status(400).json({ error: 'Invalid OTP code entered. Please check and try again.' });
    }
    const token = jwt.sign({ sub: `+91${phone}`, typ: 'customer' }, SESSION_SECRET, { expiresIn: '30d' });
    return res.json({ success: true, user: { phone: `+91${phone}`, displayName: 'Sentire Patron' }, token });
  } catch (err) {
    logger.error('Verify OTP Error', { message: err.message });
    return res.status(502).json({ error: "We couldn't check the OTP right now. Please try again." });
  }
});

/** The phone a session token was issued to (or null). For routes that need a logged-in customer. */
function phoneFromSession(req) {
  const h = String(req.headers.authorization || '');
  if (!h.startsWith('Bearer ')) return null;
  try {
    const d = jwt.verify(h.slice(7), SESSION_SECRET);
    return d?.typ === 'customer' ? d.sub : null;
  } catch {
    return null;
  }
}

module.exports = router;
module.exports.phoneFromSession = phoneFromSession;
