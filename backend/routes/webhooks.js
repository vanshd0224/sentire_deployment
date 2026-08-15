const express = require('express');
const router = express.Router();
const webhookAuth = require('../middleware/webhookAuth');
const logger = require('../utils/logger');

// Set to track processed webhook IDs in-memory (and backed by Mongo when connected)
const processedEvents = new Set();

/**
 * Helper to check idempotency
 */
const isAlreadyProcessed = (eventId) => {
  if (!eventId) return false;
  if (processedEvents.has(eventId)) return true;
  processedEvents.add(eventId);
  // Cap set size to prevent memory leak over time
  if (processedEvents.size > 10000) {
    const first = processedEvents.values().next().value;
    processedEvents.delete(first);
  }
  return false;
};

// Apply HMAC verification middleware to all webhook routes
router.use(webhookAuth);

/**
 * POST /webhooks/orders-create
 * Shopify Event: Order Created
 */
router.post('/orders-create', async (req, res) => {
  const payload = req.parsedBody;
  const orderId = payload?.id?.toString();

  logger.info(`Received orders-create webhook for order ID: ${orderId}`);

  if (isAlreadyProcessed(`order_create_${orderId}`)) {
    logger.info(`Idempotency check: Order ${orderId} already processed. Skipping.`);
    return res.status(200).json({ received: true, status: 'skipped_duplicate' });
  }

  try {
    // Lazy require queueManager to avoid circular dependencies
    const queueManager = require('../utils/queueManager');
    await queueManager.addJob('webhook-queue', 'process-order-created', payload);
  } catch (err) {
    logger.warn(`Failed to enqueue order-created job: ${err.message}. Processing fallback inline.`);
  }

  return res.status(200).json({ received: true, orderId });
});

/**
 * POST /webhooks/orders-updated
 * Shopify Event: Order Updated
 */
router.post('/orders-updated', async (req, res) => {
  const payload = req.parsedBody;
  const orderId = payload?.id?.toString();

  logger.info(`Received orders-updated webhook for order ID: ${orderId}`);

  try {
    const queueManager = require('../utils/queueManager');
    await queueManager.addJob('webhook-queue', 'process-order-updated', payload);
  } catch (err) {
    logger.warn(`Failed to enqueue order-updated job: ${err.message}`);
  }

  return res.status(200).json({ received: true, orderId });
});

/**
 * POST /webhooks/checkouts-create
 * Shopify Event: Checkout Created
 */
router.post('/checkouts-create', async (req, res) => {
  const payload = req.parsedBody;
  const checkoutId = payload?.id?.toString();

  logger.info(`Received checkouts-create webhook for checkout ID: ${checkoutId}`);

  if (isAlreadyProcessed(`checkout_create_${checkoutId}`)) {
    return res.status(200).json({ received: true, status: 'skipped_duplicate' });
  }

  try {
    const queueManager = require('../utils/queueManager');
    await queueManager.addJob('webhook-queue', 'process-checkout-created', payload);
  } catch (err) {
    logger.warn(`Failed to enqueue checkout-created job: ${err.message}`);
  }

  return res.status(200).json({ received: true, checkoutId });
});

/**
 * POST /webhooks/customers-create
 * Shopify Event: Customer Created
 */
router.post('/customers-create', async (req, res) => {
  const payload = req.parsedBody;
  const customerId = payload?.id?.toString();

  logger.info(`Received customers-create webhook for customer ID: ${customerId}`);

  if (isAlreadyProcessed(`customer_create_${customerId}`)) {
    return res.status(200).json({ received: true, status: 'skipped_duplicate' });
  }

  try {
    const queueManager = require('../utils/queueManager');
    await queueManager.addJob('webhook-queue', 'process-customer-created', payload);
  } catch (err) {
    logger.warn(`Failed to enqueue customer-created job: ${err.message}`);
  }

  return res.status(200).json({ received: true, customerId });
});

/**
 * POST /webhooks/products-update
 * Shopify Event: Product Updated
 */
router.post('/products-update', async (req, res) => {
  const payload = req.parsedBody;
  const productId = payload?.id?.toString();

  logger.info(`Received products-update webhook for product ID: ${productId}`);

  try {
    const queueManager = require('../utils/queueManager');
    await queueManager.addJob('webhook-queue', 'process-product-updated', payload);
  } catch (err) {
    logger.warn(`Failed to enqueue product-updated job: ${err.message}`);
  }

  return res.status(200).json({ received: true, productId });
});

module.exports = router;
