const srCheckout = require('./shiprocketCheckout');

/**
 * Finding a Shiprocket Checkout order from what a customer has to hand:
 * the full order id, the last 8 characters of it (what our success page
 * shows), or the Fastrr order number. Details are cached in memory; an
 * order's id, number and phone never change, its status is re-read when
 * it's looked up.
 */
const LOOKBACK_DAYS = 120;
const INDEX_TTL = 5 * 60 * 1000;

const details = new Map(); // orderId -> order details
let indexIds = [];
let indexAt = 0;
let indexing = null;

const last10 = (phone) => String(phone || '').replace(/\D/g, '').slice(-10);

async function detailsFor(orderId, fresh = false) {
  if (!fresh && details.has(orderId)) return details.get(orderId);
  const o = await srCheckout.getOrderDetails(orderId);
  if (o) details.set(orderId, o);
  return o;
}

async function refreshIndex() {
  const endDate = new Date().toISOString();
  const startDate = new Date(Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const ids = [];
  for (let page = 0; page < 20; page++) {
    const result = await srCheckout.listOrders({ startDate, endDate, page, limit: 250 });
    const rows = result?.data || [];
    ids.push(...rows.map((r) => String(r.id)));
    if (rows.length < 250) break;
  }
  // fill in details we haven't seen, a few at a time
  const missing = ids.filter((id) => !details.has(id));
  for (let i = 0; i < missing.length; i += 5) {
    await Promise.all(missing.slice(i, i + 5).map((id) => detailsFor(id).catch(() => null)));
  }
  indexIds = ids;
  indexAt = Date.now();
}

async function ensureIndex(maxAge = INDEX_TTL) {
  if (Date.now() - indexAt < maxAge) return;
  if (!indexing) indexing = refreshIndex().finally(() => (indexing = null));
  await indexing;
}

const orderNumber = (o) => (o?.fastrr_order_id ? String(o.fastrr_order_id) : String(o?.order_id || '').slice(-8).toUpperCase());

/**
 * The order matching `query` whose phone is `phone`, with its current
 * status; null if there's no such order (or the phone doesn't match).
 */
async function findOrder(query, phone) {
  const q = String(query || '').trim().replace(/^#/, '');
  const p = last10(phone);
  if (!q || p.length !== 10) return null;

  let id = null;
  if (/^[a-f0-9]{24}$/i.test(q)) {
    id = q.toLowerCase();
  } else {
    await ensureIndex();
    const upper = q.toUpperCase();
    id =
      indexIds.find((oid) => String(details.get(oid)?.fastrr_order_id || '') === q) ||
      (upper.length >= 6 ? indexIds.find((oid) => oid.toUpperCase().endsWith(upper)) : null) ||
      null;
  }
  if (!id) return null;

  const o = await detailsFor(id, true).catch(() => null);
  if (!o) return null;
  const phones = [o.phone, o.shipping_address?.phone, o.billing_address?.phone].map(last10);
  return phones.includes(p) ? o : null;
}

/** Every successful order of the last LOOKBACK_DAYS, with its details. */
async function recentOrders(maxAge) {
  await ensureIndex(maxAge);
  return indexIds.map((id) => details.get(id)).filter(Boolean);
}

/** Recent orders placed with this phone number (newest first). */
async function ordersForPhone(phone, maxAge) {
  const p = last10(phone);
  if (p.length !== 10) return [];
  const orders = await recentOrders(maxAge);
  return orders
    .filter((o) => [o.phone, o.shipping_address?.phone, o.billing_address?.phone].map(last10).includes(p))
    .sort((a, b) => String(b.order_created_date || '').localeCompare(String(a.order_created_date || '')));
}

module.exports = { findOrder, orderNumber, recentOrders, ordersForPhone };
