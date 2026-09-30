const crypto = require('crypto');
const logger = require('../utils/logger');

/**
 * Shiprocket Checkout — custom website integration ("SRC Custom Integration"
 * API doc). Every call is signed: X-Api-Key, and X-Api-HMAC-SHA256 = the
 * Base64 HMAC-SHA256 of the exact request body, keyed with the API secret.
 *
 * Config (Cloud Run env vars, never in code):
 *   SHIPROCKET_CHECKOUT_API_KEY
 *   SHIPROCKET_CHECKOUT_API_SECRET
 *   SHIPROCKET_CHECKOUT_BASE_URL  (optional; defaults to production)
 *     staging:    https://fastrr-api-dev.pickrr.com
 *     production: https://checkout-api.shiprocket.com
 */
const BASE_URL = (process.env.SHIPROCKET_CHECKOUT_BASE_URL || 'https://checkout-api.shiprocket.com').replace(/\/+$/, '');

const isConfigured = () =>
  Boolean(process.env.SHIPROCKET_CHECKOUT_API_KEY && process.env.SHIPROCKET_CHECKOUT_API_SECRET);

const sign = (body) =>
  crypto.createHmac('sha256', process.env.SHIPROCKET_CHECKOUT_API_SECRET || '').update(body).digest('base64');

/** POST a signed JSON body to a Shiprocket Checkout API path. */
async function call(path, payload) {
  if (!isConfigured()) {
    const err = new Error('Shiprocket Checkout is not configured');
    err.status = 503;
    throw err;
  }
  // sign exactly the bytes we send
  const body = JSON.stringify(payload);
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.SHIPROCKET_CHECKOUT_API_KEY,
      'X-Api-HMAC-SHA256': sign(body),
    },
    body,
  });
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  if (!res.ok || !data || data.ok === false) {
    logger.warn('Shiprocket Checkout API error', { path, status: res.status, error: data?.error });
    const err = new Error(data?.error?.message || data?.error || `Shiprocket Checkout API ${res.status}`);
    err.status = 502;
    throw err;
  }
  return data.result;
}

/**
 * Start a checkout session for these items.
 * items: [{ variant_id: string, quantity: number }]
 * Returns { token, expires_at, order_id }.
 */
async function createCheckoutToken({ items, customAttributes = {}, redirectUrl }) {
  const result = await call('/api/v1/access-token/checkout', {
    cart_data: {
      items,
      custom_attributes: customAttributes,
      mobile_app: false,
    },
    redirect_url: redirectUrl,
    timestamp: new Date().toISOString(),
  });
  return { token: result?.token, expires_at: result?.expires_at, order_id: result?.data?.order_id };
}

/** The authoritative state of an order (status, payment, address...). */
async function getOrderDetails(orderId) {
  return call('/api/v1/custom-platform-order/details', {
    order_id: orderId,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { isConfigured, createCheckoutToken, getOrderDetails, sign };
