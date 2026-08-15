const express = require('express');
const router = express.Router();
const recommendationEngine = require('../services/ai/recommendationEngine');
const { expensiveRouteLimiter } = require('../middleware/rateLimiter');
const logger = require('../utils/logger');

/**
 * GET /recommendations/:customerId
 * Rate-limited per-customer endpoint returning personalized recommendations
 */
router.get('/:customerId', expensiveRouteLimiter, async (req, res) => {
  const { customerId } = req.params;

  logger.info(`Processing GET /recommendations/${customerId}`);

  try {
    const result = await recommendationEngine.getRecommendations(customerId);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`Error in GET /recommendations/${customerId}: ${err.message}`);
    // Non-negotiable contract rule: return { "products": [] } with a 200, not an error.
    return res.status(200).json({ products: [] });
  }
});

module.exports = router;
