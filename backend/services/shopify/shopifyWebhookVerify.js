const crypto = require('crypto');
const logger = require('../../utils/logger');

/**
 * Computes and verifies Shopify HMAC-SHA256 webhook signature using constant-time comparison
 * @param {Buffer|string} rawBody - Raw request body buffer or string
 * @param {string} hmacHeader - Value of X-Shopify-Hmac-Sha256 header
 * @returns {boolean} true if signature is valid
 */
function verifyShopifyWebhook(rawBody, hmacHeader) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  if (!secret) {
    logger.warn('SHOPIFY_WEBHOOK_SECRET not set. Skipping HMAC verification in dev mode.');
    return true; // Bypass in unconfigured dev mode
  }

  if (!rawBody || !hmacHeader) {
    return false;
  }

  try {
    const generatedHmac = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('base64');

    const generatedBuffer = Buffer.from(generatedHmac, 'utf8');
    const headerBuffer = Buffer.from(hmacHeader, 'utf8');

    if (generatedBuffer.length !== headerBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(generatedBuffer, headerBuffer);
  } catch (err) {
    logger.error(`Error verifying Shopify HMAC signature: ${err.message}`);
    return false;
  }
}

module.exports = { verifyShopifyWebhook };
