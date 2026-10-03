const { verifyIdToken } = require('../services/firebaseIdToken');
const logger = require('../utils/logger');

/**
 * Only the store's admins: a Google sign-in (Firebase ID token) whose email
 * is on ADMIN_EMAILS. Used by /admin's API routes.
 */
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'sentireforwork@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

async function requireAdmin(req, res, next) {
  const h = String(req.headers.authorization || '');
  if (!h.startsWith('Bearer ')) return res.status(401).json({ ok: false, error: 'Please sign in.' });
  try {
    const claims = await verifyIdToken(h.slice(7));
    const email = String(claims.email || '').toLowerCase();
    if (!claims.email_verified || !ADMIN_EMAILS.includes(email)) {
      logger.warn('Admin access refused', { email, path: req.originalUrl });
      return res.status(403).json({ ok: false, error: 'This account is not an admin.' });
    }
    req.adminEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: 'Your sign-in has expired. Please sign in again.' });
  }
}

module.exports = { requireAdmin, ADMIN_EMAILS };
