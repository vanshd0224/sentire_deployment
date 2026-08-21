const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const logger = require('../utils/logger');

/**
 * POST /api/enquiries
 * Submit customer enquiry
 */
router.post('/', async (req, res) => {
  try {
    const {
      category = 'order-support',
      firstName,
      lastName,
      email,
      phone,
      preferredContact = 'Email',
      orderNumber,
      queryType,
      message
    } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'First Name, Email, and Message are required' });
    }

    const referenceId = `SNT-CS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newEnquiry = new Enquiry({
      referenceId,
      category,
      firstName,
      lastName,
      email,
      phone,
      preferredContact,
      orderNumber,
      queryType,
      message
    });

    await newEnquiry.save();
    logger.info(`New Client Enquiry Saved: ${referenceId} from ${email}`);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      referenceId
    });
  } catch (err) {
    logger.error('Submit Enquiry Error:', err.message);
    return res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

/**
 * GET /api/enquiries
 * Retrieve all submitted customer enquiries (For Store Owner)
 */
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({ success: true, count: enquiries.length, enquiries });
  } catch (err) {
    logger.error('Fetch Enquiries Error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

module.exports = router;
