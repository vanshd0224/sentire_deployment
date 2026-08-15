const express = require('express');
const router = express.Router();
const { z } = require('zod');
const affiliateService = require('../services/affiliate/affiliateService');
const trackingService = require('../services/affiliate/trackingService');
const payoutService = require('../services/affiliate/payoutService');
const authMiddleware = require('../middleware/authMiddleware');
const constants = require('../config/constants');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

// Input Validation Schemas
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  socialHandle: z.string().optional()
});

const patchSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  commissionRate: z.number().min(0).max(1).optional()
});

/**
 * POST /affiliates/register
 * Public affiliate registration
 */
router.post('/register', async (req, res) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return error(res, validation.error.errors[0].message, 'VALIDATION_ERROR', 400);
  }

  try {
    const result = await affiliateService.registerAffiliate(validation.data);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`Error in /affiliates/register: ${err.message}`);
    return error(res, 'Affiliate registration failed', 'REGISTRATION_ERROR', 500);
  }
});

/**
 * GET /affiliates/:affiliateId/dashboard
 * Affiliate dashboard analytics
 */
router.get('/:affiliateId/dashboard', async (req, res) => {
  const { affiliateId } = req.params;
  try {
    const dashboardData = await payoutService.getAffiliateDashboard(affiliateId);
    return res.status(200).json(dashboardData);
  } catch (err) {
    logger.error(`Error in affiliate dashboard: ${err.message}`);
    return error(res, 'Failed to fetch affiliate dashboard', 'DASHBOARD_ERROR', 500);
  }
});

/**
 * GET /affiliates/track/:code
 * 302 redirect to storefront, sets 30-day attribution cookie, records click
 */
router.get('/track/:code', async (req, res) => {
  const { code } = req.params;
  const sourceIp = req.ip || req.headers['x-forwarded-for'];

  logger.info(`Tracking affiliate link click for code: ${code}`);

  await trackingService.recordClick(code, sourceIp);

  // Set 30-day attribution cookie (30 days = 30 * 24 * 60 * 60 * 1000 ms)
  res.cookie('affiliate_ref', code, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: 'lax'
  });

  const redirectUrl = `${constants.FRONTEND_URL}?ref=${encodeURIComponent(code)}`;
  return res.redirect(302, redirectUrl);
});

// Admin-only endpoints mounted under /admin/affiliates on main Express server
const adminRouter = express.Router();
adminRouter.use(authMiddleware);

/**
 * GET /admin/affiliates
 * List all affiliates
 */
adminRouter.get('/', async (req, res) => {
  try {
    const list = await affiliateService.listAllAffiliates();
    return res.status(200).json(list);
  } catch (err) {
    return error(res, 'Failed to list affiliates', 'ADMIN_ERROR', 500);
  }
});

/**
 * PATCH /admin/affiliates/:id
 * Approve/reject affiliate or set commissionRate
 */
adminRouter.patch('/:id', async (req, res) => {
  const validation = patchSchema.safeParse(req.body);
  if (!validation.success) {
    return error(res, validation.error.errors[0].message, 'VALIDATION_ERROR', 400);
  }

  try {
    const updated = await affiliateService.updateAffiliate(req.params.id, validation.data);
    return res.status(200).json(updated);
  } catch (err) {
    return error(res, 'Failed to update affiliate', 'ADMIN_ERROR', 500);
  }
});

/**
 * POST /admin/affiliates/:id/payout
 * Mark pending commissions as paid
 */
adminRouter.post('/:id/payout', async (req, res) => {
  try {
    const result = await payoutService.markPayoutAsPaid(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return error(res, 'Failed to mark payout as paid', 'ADMIN_ERROR', 500);
  }
});

module.exports = {
  publicRoutes: router,
  adminRoutes: adminRouter
};
