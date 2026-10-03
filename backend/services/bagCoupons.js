const logger = require('../utils/logger');
const partners = require('./partners');

/**
 * The website's bag coupons, so the discount a customer sees in the bag is
 * the one Shiprocket Checkout applies. Same rules as the bag
 * (frontend CartPage / CartDrawer couponDiscount) — keep them in step.
 * The amount is worked out here from our own catalog prices, never taken
 * from the browser.
 */
const RULES = {
  PC100: { min: 999, off: 100 },
  ANSH150: { min: 1249, off: 150 },
  BHAVYA150: { min: 1249, off: 150 },
  AV150: { min: 1249, off: 150 },
  AV50: { min: 499, off: 50 },
  TS150: { min: 1249, off: 150 },
  PC200: { min: 1999, off: 200 },
  TEST99: { min: 0, off: 99 },
};

const CATALOG_URL = process.env.SR_CATALOG_URL || 'https://sentirebypc.com/api/sr/seller/products';
const CATALOG_TTL = 10 * 60 * 1000;
let prices = null; // variant id -> price
let pricesAt = 0;

async function variantPrices() {
  if (prices && Date.now() - pricesAt < CATALOG_TTL) return prices;
  const res = await fetch(CATALOG_URL);
  const data = await res.json();
  const map = new Map();
  for (const p of data?.data?.products || []) {
    for (const v of p.variants || []) map.set(String(v.id), Number(v.price));
  }
  if (!map.size) throw new Error('Catalog has no prices');
  prices = map;
  pricesAt = Date.now();
  return prices;
}

// public codes anyone can use; with a bag coupon, the best one applies
const PUBLIC = ['PC100', 'PC200'];

// Build-Your-Own-Bundle: a bundle of 2 / 3 / 4 bottles takes this off,
// split across its bottles (as the bundle page prices them in the bag)
const BUNDLE_OFF = { 2: 150, 3: 250, 4: 400 };

/**
 * The discount for these cart lines ([{ variant_id, quantity }]) — bundle
 * bottles ([{ variant_id, quantity, bundleSize }]) and the bag's coupon —
 * as Shiprocket's cart_discount ({ coupon_code, amount }), or null.
 * Shiprocket locks the checkout to that one discount (its own coupon list
 * can't replace it), so the coupon part is the best of the customer's code
 * and the public codes they qualify for; the code they entered is still
 * kept on the order (requested_coupon). As in the bag, the coupon applies
 * to the total after the bundle discount.
 */
async function bagDiscount(code, lines, bundles = []) {
  const entered = String(code || '').trim().toUpperCase();
  // the bag's code: a site code, or an influencer partner's code
  const enteredRule = entered ? RULES[entered] || (await partners.partnerRule(entered)) : null;
  if (!enteredRule && !bundles.length) return null;
  try {
    const map = await variantPrices();
    let subtotal = 0;
    for (const l of lines) {
      const price = map.get(String(l.variant_id));
      if (!Number.isFinite(price)) return null; // unknown item: don't guess
      subtotal += price * l.quantity;
    }
    let bundleOff = 0;
    for (const b of bundles) {
      const off = BUNDLE_OFF[b.bundleSize];
      if (off) bundleOff += Math.round(off / b.bundleSize) * b.quantity;
    }
    bundleOff = Math.min(bundleOff, subtotal);
    const base = subtotal - bundleOff;

    // The checkout is locked to what we send, so a bundle also gets the best
    // public code it qualifies for (Shiprocket lists PC100/PC200, and
    // tapping them there wouldn't work).
    let best = null;
    const candidates = enteredRule ? [entered, ...PUBLIC.filter((p) => p !== entered)] : PUBLIC;
    for (const c of candidates) {
      const rule = c === entered ? enteredRule : RULES[c];
      if (base < rule.min) continue;
      const amount = Math.min(rule.off, base);
      if (!best || amount > best.amount) best = { coupon_code: c, amount };
    }
    const amount = bundleOff + (best ? best.amount : 0);
    if (!amount) return null;
    const label = best ? (bundleOff ? `${best.coupon_code}+BUNDLE` : best.coupon_code) : 'BUNDLE';
    return { coupon_code: label, amount };
  } catch (error) {
    logger.warn('Bag discount not applied', { message: error.message });
    return null;
  }
}

module.exports = { bagDiscount };
