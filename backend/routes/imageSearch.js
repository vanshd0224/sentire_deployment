const express = require('express');
const router = express.Router();
const multer = require('multer');
const visionService = require('../services/ai/visionService');
const { expensiveRouteLimiter } = require('../middleware/rateLimiter');
const constants = require('../config/constants');
const logger = require('../utils/logger');

// Configure Multer for memory storage with file size cap
const upload = multer({
  limits: { fileSize: constants.MAX_UPLOAD_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

/**
 * POST /image-search (multipart/form-data, field: image)
 * Visual search endpoint
 */
router.post('/', expensiveRouteLimiter, upload.single('image'), async (req, res) => {
  logger.info('Processing POST /image-search request');

  try {
    const imageBuffer = req.file ? req.file.buffer : null;
    const result = await visionService.searchByImage(imageBuffer);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`Error in /image-search: ${err.message}`);
    // Fail soft: return empty products array with 200
    return res.status(200).json({ products: [] });
  }
});

module.exports = router;
