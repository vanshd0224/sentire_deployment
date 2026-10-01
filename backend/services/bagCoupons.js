const logger = require('../utils/logger');

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

/**
 * The discount for `code` on these cart lines ([{ variant_id, quantity }]),
 * as Shiprocket's cart_discount ({ coupon_code, amount }), or null.
 */
async function bagDiscount(code, lines) {
  const rule = RULES[String(code || '').trim().toUpperCase()];
  if (!rule) return null;
  try {
    const map = await variantPrices();
    let subtotal = 0;
    for (const l of lines) {
      const price = map.get(String(l.variant_id));
      if (!Number.isFinite(price)) return null; // unknown item: don't guess
      subtotal += price * l.quantity;
    }
    if (subtotal < rule.min) return null;
    return { coupon_code: String(code).trim().toUpperCase(), amount: Math.min(rule.off, subtotal) };
  } catch (error) {
    logger.warn('Bag coupon not applied', { message: error.message });
    return null;
  }
}

module.exports = { bagDiscount };
