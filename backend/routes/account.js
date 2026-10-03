const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod');
const Customer = require('../models/Customer');
const srOrders = require('../services/shiprocketOrders');
const srCheckout = require('../services/shiprocketCheckout');
const { phoneFromSession } = require('./auth/phoneAuth');
const logger = require('../utils/logger');

/**
 * /api/account — the logged-in customer (phone verified by OTP): their
 * name, and the orders placed with their number, on any device.
 */
const router = express.Router();

router.use((req, res, next) => {
  const phone = phoneFromSession(req);
  if (!phone) return res.status(401).json({ ok: false, error: 'Please log in again.' });
  req.phone = phone;
  return next();
});

const dbReady = () => mongoose.connection.readyState === 1;

// GET /api/account/me
router.get('/me', async (req, res) => {
  const c = dbReady() ? await Customer.findOne({ phone: req.phone }).lean() : null;
  return res.json({ ok: true, phone: req.phone, name: c?.name || '', email: c?.email || '' });
});

const profileSchema = z.object({
  name: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(120).optional().or(z.literal('')),
});

// POST /api/account/profile { name, email? }
router.post('/profile', async (req, res) => {
  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Please enter your name.' });
  if (!dbReady()) return res.json({ ok: true, saved: false });
  const update = { name: parsed.data.name, lastLoginAt: new Date() };
  if (parsed.data.email !== undefined) update.email = parsed.data.email;
  await Customer.updateOne({ phone: req.phone }, { $set: update }, { upsert: true });
  return res.json({ ok: true, saved: true });
});

// GET /api/account/orders?fresh=1 — orders placed with this number (Shiprocket Checkout)
router.get('/orders', async (req, res) => {
  if (!srCheckout.isConfigured()) return res.json({ ok: true, orders: [] });
  try {
    // just back from the checkout: re-read Shiprocket's order list
    const orders = await srOrders.ordersForPhone(req.phone, req.query.fresh ? 15 * 1000 : undefined);
    return res.json({
      ok: true,
      orders: orders.slice(0, 50).map((o) => ({
        orderId: o.order_id,
        number: srOrders.orderNumber(o),
        placedAt: o.order_created_date || null,
        status: o.status,
        paymentType: o.payment_type || null,
        total: o.total_amount_payable ?? null,
        edd: o.edd || null,
        items: (o.cart_data?.items || []).map((i) => ({
          variantId: String(i.variant_id),
          quantity: i.quantity,
          price: i.price ?? null,
        })),
      })),
    });
  } catch (error) {
    logger.error('Account orders failed', { message: error.message });
    return res.status(502).json({ ok: false, error: "We couldn't load your orders right now." });
  }
});

module.exports = router;
