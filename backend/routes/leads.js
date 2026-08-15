const express = require('express');
const router = express.Router();
const { z } = require('zod');
const leadService = require('../services/marketing/leadService');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

// Phone validation schema (plausible 10-digit mobile number)
const leadSchema = z.object({
  phone: z.string()
    .transform(val => val.replace(/[^0-9]/g, ''))
    .refine(val => /^[6-9]\d{9}$/.test(val), {
      message: 'Must be a valid 10-digit mobile number'
    })
});

/**
 * POST /leads/capture (10% off signup popup)
 */
router.post('/capture', async (req, res) => {
  const validation = leadSchema.safeParse(req.body);
  if (!validation.success) {
    logger.warn(`Invalid phone number submitted to /leads/capture: ${req.body?.phone}`);
    return error(res, 'Please provide a valid 10-digit mobile number', 'INVALID_PHONE', 400);
  }

  try {
    const result = await leadService.captureLead(validation.data.phone);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`Error in /leads/capture: ${err.message}`);
    return error(res, 'Failed to capture lead', 'LEAD_CAPTURE_ERROR', 500);
  }
});

module.exports = router;
