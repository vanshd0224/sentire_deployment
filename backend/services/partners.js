const mongoose = require('mongoose');
const Partner = require('../models/Partner');
const PartnerOrder = require('../models/PartnerOrder');
const srOrders = require('./shiprocketOrders');
const srShipping = require('./shiprocketShipping');
const logger = require('../utils/logger');

/**
 * Influencer partners: which code an order belongs to, what it earns, and
 * whether that's been delivered / paid. Orders come from Shiprocket (its
 * order webhook, the success page, and a sync that re-reads recent orders
 * in case a webhook was missed).
 */

// site-wide codes that can't be taken as a partner code
const RESERVED = new Set(['PC100', 'PC200', 'TEST99']);
const CODE_RE = /^[A-Z0-9]{4,15}$/;

const dbReady = () => mongoose.connection.readyState === 1;
const normalizeCode = (c) => String(c || '').trim().toUpperCase().replace(/^#/, '');
const round2 = (n) => Math.round(n * 100) / 100;

// approved partners by code, briefly cached (looked up on every checkout)
let cache = new Map();
let cacheAt = 0;
async function approvedPartner(code) {
  const c = normalizeCode(code);
  if (!CODE_RE.test(c) || !dbReady()) return null;
  if (Date.now() - cacheAt > 60 * 1000) {
    const list = await Partner.find({ status: 'approved' }).lean();
    cache = new Map(list.map((p) => [p.code, p]));
    cacheAt = Date.now();
  }
  return cache.get(c) || null;
}
const forgetCache = () => (cacheAt = 0);

/** The partner coupon rule for a code ({ off, min }), if it's an approved partner. */
async function partnerRule(code) {
  try {
    const p = await approvedPartner(code);
    return p ? { off: p.discountOff, min: p.minOrder } : null;
  } catch (error) {
    logger.warn('Partner rule lookup failed', { message: error.message });
    return null;
  }
}

/**
 * Which partner gets an order: a partner coupon the customer used wins
 * (it's the strongest signal), else the partner link they came from.
 */
async function partnerFor({ couponCode, ref }) {
  return (await approvedPartner(couponCode)) || (await approvedPartner(ref));
}

/** Record (or update) an order for its partner, from Shiprocket's order details. */
async function recordOrder(o) {
  if (!o?.order_id || !dbReady()) return null;
  if (String(o.status || '').toUpperCase() !== 'SUCCESS') return null;
  const attrs = o.cart_data?.custom_attributes || {};
  const coupons = [...(o.coupon_codes || []), attrs.requested_coupon].filter(Boolean);
  let code = normalizeCode(attrs.affiliate);
  if (!code) {
    for (const c of coupons) {
      if (await Partner.exists({ code: normalizeCode(c) })) {
        code = normalizeCode(c);
        break;
      }
    }
  }
  if (!code) return null;
  const partner = await Partner.findOne({ code });
  if (!partner) return null;

  const orderValue = Math.max(0, round2(Number(o.subtotal_price || 0) - Number(o.total_discount || 0)));
  const existing = await PartnerOrder.findOne({ orderId: String(o.order_id) });
  if (existing) return existing; // amounts are fixed once recorded
  const rec = await PartnerOrder.create({
    orderId: String(o.order_id),
    orderNumber: o.fastrr_order_id ? String(o.fastrr_order_id) : '',
    code,
    partnerId: partner._id,
    placedAt: o.order_created_date ? new Date(o.order_created_date) : new Date(),
    orderValue,
    commissionRate: partner.commissionRate,
    commission: round2(orderValue * partner.commissionRate),
    paymentType: o.payment_type || '',
    couponUsed: (o.coupon_codes || [])[0] || '',
  });
  logger.info('Partner order recorded', { code, orderId: rec.orderId, commission: rec.commission });
  return rec;
}

const DELIVERED = /DELIVERED/;
const LOST = /RTO|RETURN|CANCEL|LOST|DESTROY|UNDELIVERED/;

/** Move pending commissions on: delivered → earned, cancelled / returned → cancelled. */
async function refreshDeliveries() {
  if (!dbReady() || !srShipping.isConfigured()) return { checked: 0, earned: 0, cancelled: 0 };
  const pending = await PartnerOrder.find({ status: 'pending' }).limit(200);
  let earned = 0;
  let cancelled = 0;
  for (const po of pending) {
    const s = await srShipping.trackOrder([po.orderId, po.orderNumber]).catch(() => null);
    if (!s) continue;
    const status = String(s.status || '').toUpperCase();
    po.shipmentStatus = s.status || '';
    if (LOST.test(status)) {
      po.status = 'cancelled';
      cancelled++;
    } else if (s.deliveredAt || DELIVERED.test(status)) {
      po.status = 'earned';
      po.deliveredAt = s.deliveredAt ? new Date(s.deliveredAt) : new Date();
      earned++;
    }
    await po.save();
  }
  return { checked: pending.length, earned, cancelled };
}

/** Re-read recent Shiprocket orders and record any partner order we missed. */
async function syncOrders() {
  if (!dbReady()) return { scanned: 0, recorded: 0 };
  const orders = await srOrders.recentOrders();
  let recorded = 0;
  for (const o of orders) {
    const before = await PartnerOrder.exists({ orderId: String(o.order_id) });
    if (!before && (await recordOrder(o))) recorded++;
  }
  return { scanned: orders.length, recorded };
}

/** Totals for one partner: orders, and commission pending / earned (unpaid) / paid. */
async function statsFor(partnerId) {
  const rows = await PartnerOrder.aggregate([
    { $match: { partnerId: new mongoose.Types.ObjectId(String(partnerId)) } },
    { $group: { _id: '$status', count: { $sum: 1 }, commission: { $sum: '$commission' }, value: { $sum: '$orderValue' } } },
  ]);
  const by = Object.fromEntries(rows.map((r) => [r._id, r]));
  const sum = (k, f) => round2(by[k]?.[f] || 0);
  return {
    orders: rows.reduce((n, r) => n + r.count, 0),
    sales: round2(rows.filter((r) => r._id !== 'cancelled').reduce((n, r) => n + r.value, 0)),
    pending: sum('pending', 'commission'),
    earned: sum('earned', 'commission'),
    paid: sum('paid', 'commission'),
  };
}

/** Mark a partner's earned (delivered, unpaid) commissions as paid. */
async function payout(partnerId, reference = '') {
  const due = await PartnerOrder.find({ partnerId, status: 'earned' });
  const amount = round2(due.reduce((n, o) => n + o.commission, 0));
  if (!due.length) return { orders: 0, amount: 0 };
  await PartnerOrder.updateMany(
    { _id: { $in: due.map((o) => o._id) } },
    { $set: { status: 'paid', paidAt: new Date(), payoutRef: String(reference).slice(0, 80) } },
  );
  return { orders: due.length, amount };
}

module.exports = {
  RESERVED,
  CODE_RE,
  dbReady,
  normalizeCode,
  approvedPartner,
  forgetCache,
  partnerRule,
  partnerFor,
  recordOrder,
  refreshDeliveries,
  syncOrders,
  statsFor,
  payout,
};
