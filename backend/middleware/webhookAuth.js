const { verifyShopifyWebhook } = require('../services/shopify/shopifyWebhookVerify');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

/**
 * Middleware enforcing Shopify HMAC-SHA256 signature verification on raw body
 */
const webhookAuth = (req, res, next) => {
  const hmacHeader = req.headers['x-shopify-hmac-sha256'];
  const topic = req.headers['x-shopify-topic'];

  if (!hmacHeader) {
    logger.warn(`Webhook request missing X-Shopify-Hmac-Sha256 header (Topic: ${topic})`);
    return error(res, 'Missing webhook HMAC signature header', 'UNAUTHORIZED_WEBHOOK', 401);
  }

  // req.body is expected to be a raw Buffer because of express.raw() mounting
  const rawBody = req.body;

  const isValid = verifyShopifyWebhook(rawBody, hmacHeader);

  if (!isValid) {
    logger.error(`Shopify webhook HMAC verification failed for topic: ${topic}`);
    return error(res, 'Invalid webhook HMAC signature', 'INVALID_WEBHOOK_SIGNATURE', 401);
  }

  // Parse raw body buffer to JSON for downstream handlers
  try {
    if (Buffer.isBuffer(req.body)) {
      req.parsedBody = JSON.parse(req.body.toString('utf8'));
    } else if (typeof req.body === 'string') {
      req.parsedBody = JSON.parse(req.body);
    } else {
      req.parsedBody = req.body;
    }
  } catch (parseErr) {
    logger.error(`Webhook payload JSON parse error: ${parseErr.message}`);
    return error(res, 'Invalid webhook JSON payload', 'BAD_REQUEST', 400);
  }

  next();
};

module.exports = webhookAuth;
