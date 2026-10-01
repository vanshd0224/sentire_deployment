const logger = require('../utils/logger');

/**
 * Shiprocket shipping (apiv2) — courier tracking for an order once it has
 * been shipped. Uses a Shiprocket "API user" (Shiprocket panel → Settings →
 * API → Create API User), set as Cloud Run env vars:
 *   SHIPROCKET_API_EMAIL
 *   SHIPROCKET_API_PASSWORD
 * Without them, tracking simply reports nothing (the order status from
 * Shiprocket Checkout is still shown).
 */
const BASE = 'https://apiv2.shiprocket.in/v1/external';
const TOKEN_TTL = 8 * 24 * 60 * 60 * 1000; // tokens last 10 days

let token = null;
let tokenAt = 0;

const isConfigured = () => Boolean(process.env.SHIPROCKET_API_EMAIL && process.env.SHIPROCKET_API_PASSWORD);

async function getToken(force = false) {
  if (!force && token && Date.now() - tokenAt < TOKEN_TTL) return token;
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.SHIPROCKET_API_EMAIL, password: process.env.SHIPROCKET_API_PASSWORD }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.token) throw new Error(`Shiprocket login failed (${res.status})`);
  token = data.token;
  tokenAt = Date.now();
  return token;
}

async function get(path) {
  let t = await getToken();
  let res = await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${t}` } });
  if (res.status === 401) {
    t = await getToken(true);
    res = await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${t}` } });
  }
  return res.json().catch(() => null);
}

// the response nests tracking_data under the order id (or not); find it
function findTrackingData(node, depth = 0) {
  if (!node || typeof node !== 'object' || depth > 4) return null;
  if (node.tracking_data) return node.tracking_data;
  for (const v of Array.isArray(node) ? node : Object.values(node)) {
    const found = findTrackingData(v, depth + 1);
    if (found) return found;
  }
  return null;
}

function shape(td) {
  const track = (td.shipment_track || [])[0] || {};
  const activities = (td.shipment_track_activities || []).map((a) => ({
    date: a.date,
    status: a['sr-status-label'] || a.activity || a.status,
    location: a.location || '',
  }));
  if (!track.awb_code && !activities.length) return null;
  return {
    courier: track.courier_name || null,
    awb: track.awb_code || null,
    status: track.current_status || activities[0]?.status || null,
    edd: track.edd || td.etd || null,
    deliveredAt: track.delivered_date || null,
    trackUrl: td.track_url || null,
    activities: activities.slice(0, 20),
  };
}

/**
 * Courier tracking for an order, trying each id Shiprocket might know it
 * by (the checkout order id, then the Fastrr order number). null if the
 * order hasn't shipped yet or tracking isn't set up.
 */
async function trackOrder(ids) {
  if (!isConfigured()) return null;
  for (const id of ids.filter(Boolean)) {
    try {
      const data = await get(`/courier/track?order_id=${encodeURIComponent(id)}`);
      const td = findTrackingData(data);
      const shipment = td && shape(td);
      if (shipment) return shipment;
    } catch (error) {
      logger.warn('Shiprocket tracking failed', { message: error.message });
      return null;
    }
  }
  return null;
}

module.exports = { isConfigured, trackOrder };
