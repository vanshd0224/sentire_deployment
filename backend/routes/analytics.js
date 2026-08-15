const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const analyticsEngine = require('../services/analytics/analyticsEngine');
const cohortAnalysis = require('../services/analytics/cohortAnalysis');
const logger = require('../utils/logger');

// Protect all analytics endpoints with JWT authMiddleware
router.use(authMiddleware);

/**
 * GET /analytics/overview
 * Dashboard summary metrics
 */
router.get('/overview', async (req, res) => {
  logger.info('Admin fetching analytics overview');
  try {
    const data = await analyticsEngine.getOverviewData();
    return res.status(200).json(data);
  } catch (err) {
    logger.error(`Error fetching analytics overview: ${err.message}`);
    return res.status(500).json({ error: { message: err.message, code: 'ANALYTICS_ERROR' } });
  }
});

/**
 * GET /analytics/cohorts
 * Cohort and retention metrics
 */
router.get('/cohorts', async (req, res) => {
  logger.info('Admin fetching analytics cohorts');
  try {
    const data = await cohortAnalysis.getCohortData();
    return res.status(200).json(data);
  } catch (err) {
    logger.error(`Error fetching analytics cohorts: ${err.message}`);
    return res.status(500).json({ error: { message: err.message, code: 'COHORT_ERROR' } });
  }
});

module.exports = router;
