const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod');
const router = express.Router();
const logger = require('../utils/logger');
const srCheckout = require('../services/shiprocketCheckout');
const ShiprocketOrder = require('../models/ShiprocketOrder');
const { resolveVariantId, ENGRAVING_FEE_VARIANT_ID } = require('./checkout');

const SITE_URL = (process.env.FRONTEND_URL || 'https://sentirebypc.com').replace(/\/+$/, '');

const tokenSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string().regex(/^\d{6,20}$/).optional(),
        productId: z.string().optional(),
        id: z.string().optional(),
        name: z.string().optional(),
        size: z.union([z.number(), z.string()]).optional(),
        quantity: z.number().int().min(1).max(20).optional(),
        isPersonalised: z.boolean().optional(),
        engravingText: z.string().max(40).optional(),
        engravingDate: z.string().max(20).optional(),
      }),
    )
    .min(1)
    .max(30),
  couponCode: z.string().max(40).optional(),
  utm: z.string().max(300).optional(),
});

// POST /api/shiprocket/checkout-token
// The bag, as the site knows it -> a Shiprocket Checkout session token.
router.post('/checkout-token', async (req, res) => {
  const parsed = tokenSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid cart' });
  if (!srCheckout.isConfigured()) return res.status(503).json({ ok: false, error: 'Checkout unavailable' });

  const { items, couponCode, utm } = parsed.data;
  // one line per variant; engraving is its own paid line, like the Shopify cart
  const lines = new Map();
  const engravings = [];
  let engravingCount = 0;
  for (const item of items) {
    const vid = String(resolveVariantId(item));
    const qty = item.quantity || 1;
    lines.set(vid, (lines.get(vid) || 0) + qty);
    if (item.isPersonalised || item.engravingText) {
      engravingCount += qty;
      engravings.push(
        [item.name || item.productId, item.engravingText && `"${item.engravingText}"`, item.engravingDate]
          .filter(Boolean)
          .join(' · '),
      );
    }
  }
  if (engravingCount) {
    const fee = String(ENGRAVING_FEE_VARIANT_ID);
    lines.set(fee, (lines.get(fee) || 0) + engravingCount);
  }

  const customAttributes = {};
  if (engravings.length) customAttributes.engraving = engravings.join(' | ');
  if (couponCode) customAttributes.requested_coupon = couponCode;
  if (utm) customAttributes.utm = utm;

  try {
    const session = await srCheckout.createCheckoutToken({
      items: [...lines].map(([variant_id, quantity]) => ({ variant_id, quantity })),
      customAttributes,
      redirectUrl: `${SITE_URL}/order-success`,
    });
    if (!session.token) throw new Error('No token returned');
    return res.status(200).json({ ok: true, token: session.token, orderId: session.order_id });
  } catch (error) {
    logger.error('Shiprocket checkout token failed', { message: error.message });
    return res.status(error.status || 502).json({ ok: false, error: 'Could not start checkout' });
  }
});

// Save (or update) an order from Shiprocket's data. Safe to repeat.
async function recordOrder(o) {
  if (!o?.order_id || mongoose.connection.readyState !== 1) return;
  await ShiprocketOrder.findOneAndUpdate(
    { orderId: String(o.order_id) },
    {
      $set: {
        status: o.status,
        paymentType: o.payment_type,
        paymentStatus: o.payment_status,
        phone: o.phone || o.shipping_address?.phone,
        email: o.email || o.shipping_address?.email,
        items: (o.cart_data?.items || []).map((i) => ({ variantId: String(i.variant_id), quantity: i.quantity })),
        totalAmount: o.total_amount_payable ?? o.total_amount ?? undefined,
        customAttributes: o.cart_data?.custom_attributes,
        payload: o,
      },
      $inc: { webhookCount: 1 },
    },
    { upsert: true, new: true },
  );
}

// POST /api/shiprocket/order-webhook
// Shiprocket reports an order here once it's placed (possibly more than
// once). It must answer 200; the record is keyed on the order id, so a
// repeat just updates it.
router.post('/order-webhook', async (req, res) => {
  const order = req.body;
  logger.info('Shiprocket order webhook', {
    orderId: order?.order_id,
    status: order?.status,
    paymentType: order?.payment_type,
    paymentStatus: order?.payment_status,
  });
  try {
    await recordOrder(order);
  } catch (error) {
    logger.error('Shiprocket order webhook save failed', { message: error.message, orderId: order?.order_id });
  }
  return res.status(200).json({ ok: true });
});

// GET /api/shiprocket/order-status/:orderId
// For the success page: the order's real state, straight from Shiprocket
// (not trusted from the redirect's query string). Only what the page needs.
router.get('/order-status/:orderId', async (req, res) => {
  const orderId = String(req.params.orderId || '');
  if (!/^[a-f0-9]{12,40}$/i.test(orderId)) return res.status(400).json({ ok: false, error: 'Invalid order id' });
  try {
    const o = await srCheckout.getOrderDetails(orderId);
    recordOrder(o).catch(() => {});
    return res.status(200).json({
      ok: true,
      status: o?.status,
      paymentType: o?.payment_type,
      paymentStatus: o?.payment_status,
      edd: o?.edd,
      firstName: o?.shipping_address?.first_name,
      items: (o?.cart_data?.items || []).map((i) => ({ variantId: String(i.variant_id), quantity: i.quantity })),
    });
  } catch (error) {
    return res.status(error.status || 502).json({ ok: false, error: 'Could not fetch order' });
  }
});

module.exports = router;
