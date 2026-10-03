const express = require('express');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const Partner = require('../models/Partner');
const PartnerOrder = require('../models/PartnerOrder');
const partners = require('../services/partners');
const { phoneFromSession } = require('./auth/phoneAuth');
const logger = require('../utils/logger');

/**
 * /api/partners — influencer partners.
 *   public:  code lookup (for the bag), link clicks
 *   partner: their own dashboard / application  (phone OTP session)
 *   admin:   everything                         (Google sign-in, ADMIN_EMAILS)
 */
const router = express.Router();

const { requireAdmin } = require('../middleware/requireAdmin');

const visitorKey = (req) => String(req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
const limiter = (max) =>
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, trustProxy: false },
    keyGenerator: visitorKey,
    handler: (req, res) => res.status(429).json({ ok: false, error: 'Too many requests. Please try again shortly.' }),
  });

const needDb = (req, res, next) =>
  partners.dbReady() ? next() : res.status(503).json({ ok: false, error: 'Partner programme is unavailable right now.' });

const publicPartner = (p) => ({
  id: String(p._id),
  code: p.code,
  name: p.name,
  phone: p.phone,
  instagram: p.instagram,
  upiId: p.upiId,
  status: p.status,
  commissionRate: p.commissionRate,
  discountOff: p.discountOff,
  minOrder: p.minOrder,
  clicks: p.clicks,
  createdAt: p.createdAt,
});

const orderRow = (o) => ({
  orderId: o.orderId,
  orderNumber: o.orderNumber || o.orderId.slice(-8).toUpperCase(),
  code: o.code,
  placedAt: o.placedAt,
  orderValue: o.orderValue,
  commission: o.commission,
  commissionRate: o.commissionRate,
  paymentType: o.paymentType,
  status: o.status,
  shipmentStatus: o.shipmentStatus,
  deliveredAt: o.deliveredAt,
  paidAt: o.paidAt,
  payoutRef: o.payoutRef,
});

// ── public ────────────────────────────────────────────────────────────

// GET /api/partners/code/:code — is this a live partner coupon? (the bag asks)
router.get('/code/:code', limiter(120), async (req, res) => {
  const rule = await partners.partnerRule(req.params.code);
  if (!rule) return res.status(404).json({ ok: false });
  return res.json({ ok: true, code: partners.normalizeCode(req.params.code), off: rule.off, min: rule.min });
});

// POST /api/partners/click { code } — someone opened a partner link
router.post('/click', limiter(30), async (req, res) => {
  try {
    const p = await partners.approvedPartner(req.body?.code);
    if (!p) return res.status(404).json({ ok: false });
    await Partner.updateOne({ _id: p._id }, { $inc: { clicks: 1 }, $set: { lastClickAt: new Date() } });
    return res.json({ ok: true, off: p.discountOff, min: p.minOrder });
  } catch (error) {
    return res.status(200).json({ ok: false });
  }
});

// ── partner (phone OTP session) ───────────────────────────────────────

const needPartnerLogin = (req, res, next) => {
  const phone = phoneFromSession(req);
  if (!phone) return res.status(401).json({ ok: false, error: 'Please log in with your phone number.' });
  req.phone = phone;
  return next();
};

// GET /api/partners/me — the logged-in partner's dashboard
router.get('/me', needDb, needPartnerLogin, async (req, res) => {
  const p = await Partner.findOne({ phone: req.phone });
  if (!p) return res.json({ ok: true, partner: null, phone: req.phone });
  if (p.status !== 'approved') return res.json({ ok: true, partner: publicPartner(p) });
  const [stats, orders] = await Promise.all([
    partners.statsFor(p._id),
    PartnerOrder.find({ partnerId: p._id }).sort({ placedAt: -1 }).limit(200).lean(),
  ]);
  return res.json({ ok: true, partner: publicPartner(p), stats, orders: orders.map(orderRow) });
});

const applySchema = z.object({
  name: z.string().trim().min(2).max(60),
  instagram: z.string().trim().max(60).optional().default(''),
  upiId: z.string().trim().max(60).optional().default(''),
  code: z.string().trim().min(4).max(15),
});

// POST /api/partners/apply — ask to join (you approve it in admin)
router.post('/apply', needDb, needPartnerLogin, limiter(10), async (req, res) => {
  const parsed = applySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Please fill in your name and a code.' });
  const code = partners.normalizeCode(parsed.data.code);
  if (!partners.CODE_RE.test(code) || partners.RESERVED.has(code)) {
    return res.status(400).json({ ok: false, error: 'Codes are 4–15 letters or numbers (e.g. ANSH150).' });
  }
  if (await Partner.exists({ phone: req.phone })) {
    return res.status(409).json({ ok: false, error: 'You have already applied with this number.' });
  }
  if (await Partner.exists({ code })) return res.status(409).json({ ok: false, error: 'That code is taken. Try another.' });
  const p = await Partner.create({ ...parsed.data, code, phone: req.phone, status: 'pending' });
  logger.info('Partner application', { code });
  return res.json({ ok: true, partner: publicPartner(p) });
});

// ── admin (Google sign-in, allow-listed emails) ───────────────────────

const admin = express.Router();
admin.use(limiter(300), requireAdmin);
admin.use(needDb);

// GET /api/partners/admin/partners — every partner with totals
admin.get('/partners', async (req, res) => {
  const list = await Partner.find().sort({ createdAt: -1 }).lean();
  const rows = await Promise.all(list.map(async (p) => ({ ...publicPartner(p), stats: await partners.statsFor(p._id) })));
  return res.json({ ok: true, partners: rows, admin: req.adminEmail });
});

const partnerSchema = z.object({
  name: z.string().trim().min(2).max(60),
  phone: z.string().trim(),
  code: z.string().trim().min(4).max(15),
  instagram: z.string().trim().max(60).optional().default(''),
  upiId: z.string().trim().max(60).optional().default(''),
  status: z.enum(['pending', 'approved', 'paused', 'rejected']).optional().default('approved'),
  commissionRate: z.number().min(0).max(0.5).optional(),
});
const toPhone = (raw) => {
  const d = String(raw || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(d) ? `+91${d}` : null;
};

// POST /api/partners/admin/partners — add a partner yourself
admin.post('/partners', async (req, res) => {
  const parsed = partnerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Name, phone and code are required.' });
  const phone = toPhone(parsed.data.phone);
  const code = partners.normalizeCode(parsed.data.code);
  if (!phone) return res.status(400).json({ ok: false, error: 'Enter a valid 10-digit mobile number.' });
  if (!partners.CODE_RE.test(code) || partners.RESERVED.has(code)) {
    return res.status(400).json({ ok: false, error: 'Codes are 4–15 letters or numbers.' });
  }
  if (await Partner.exists({ $or: [{ phone }, { code }] })) {
    return res.status(409).json({ ok: false, error: 'A partner with that phone or code already exists.' });
  }
  const p = await Partner.create({ ...parsed.data, phone, code });
  partners.forgetCache();
  return res.json({ ok: true, partner: publicPartner(p) });
});

// PATCH /api/partners/admin/partners/:id — approve / pause / edit
admin.patch('/partners/:id', async (req, res) => {
  const parsed = partnerSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid details.' });
  const update = { ...parsed.data };
  if (update.phone !== undefined) {
    update.phone = toPhone(update.phone);
    if (!update.phone) return res.status(400).json({ ok: false, error: 'Enter a valid 10-digit mobile number.' });
  }
  if (update.code !== undefined) {
    update.code = partners.normalizeCode(update.code);
    if (!partners.CODE_RE.test(update.code) || partners.RESERVED.has(update.code)) {
      return res.status(400).json({ ok: false, error: 'Codes are 4–15 letters or numbers.' });
    }
  }
  try {
    const p = await Partner.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ ok: false, error: 'Partner not found.' });
    partners.forgetCache();
    return res.json({ ok: true, partner: publicPartner(p) });
  } catch (error) {
    const dup = error?.code === 11000;
    return res.status(dup ? 409 : 400).json({ ok: false, error: dup ? 'That phone or code is already used.' : 'Could not save.' });
  }
});

// GET /api/partners/admin/orders?code=&status= — partner orders
admin.get('/orders', async (req, res) => {
  const q = {};
  if (req.query.code) q.code = partners.normalizeCode(req.query.code);
  if (['pending', 'earned', 'cancelled', 'paid'].includes(req.query.status)) q.status = req.query.status;
  const list = await PartnerOrder.find(q).sort({ placedAt: -1 }).limit(1000).lean();
  return res.json({ ok: true, orders: list.map(orderRow) });
});

// PATCH /api/partners/admin/orders/:orderId { status } — e.g. cancel a returned order
admin.patch('/orders/:orderId', async (req, res) => {
  const status = req.body?.status;
  if (!['pending', 'earned', 'cancelled'].includes(status)) return res.status(400).json({ ok: false, error: 'Invalid status.' });
  const o = await PartnerOrder.findOneAndUpdate(
    { orderId: req.params.orderId, status: { $ne: 'paid' } },
    { $set: { status } },
    { new: true },
  );
  if (!o) return res.status(404).json({ ok: false, error: 'Order not found (or already paid).' });
  return res.json({ ok: true, order: orderRow(o) });
});

// POST /api/partners/admin/sync — pull missed orders + delivery updates
admin.post('/sync', async (req, res) => {
  try {
    const orders = await partners.syncOrders();
    const deliveries = await partners.refreshDeliveries();
    return res.json({ ok: true, orders, deliveries });
  } catch (error) {
    logger.error('Partner sync failed', { message: error.message });
    return res.status(502).json({ ok: false, error: 'Sync failed. Please try again.' });
  }
});

// POST /api/partners/admin/partners/:id/payout { reference } — mark earned commission paid
admin.post('/partners/:id/payout', async (req, res) => {
  const result = await partners.payout(req.params.id, req.body?.reference || '');
  return res.json({ ok: true, ...result });
});

router.use('/admin', admin);

module.exports = router;
