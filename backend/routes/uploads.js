const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadService = require('../services/storage/uploadService');
const constants = require('../config/constants');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

// Configure Multer for personalization image uploads
const upload = multer({
  limits: { fileSize: constants.MAX_UPLOAD_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type: Only images (JPEG/PNG/WebP) are allowed'), false);
    }
  }
});

/**
 * POST /uploads/personalization-image
 * Uploads personalization image to GCS and returns public URL
 */
router.post('/personalization-image', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      logger.warn(`Personalization image upload error: ${err.message}`);
      return error(res, err.message, 'UPLOAD_VALIDATION_ERROR', 400);
    }

    if (!req.file) {
      return error(res, 'No image file provided in field "image"', 'MISSING_FILE', 400);
    }

    try {
      const imageUrl = await uploadService.uploadPersonalizationImage(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      res.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
      res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return res.status(200).json({ imageUrl });
    } catch (uploadErr) {
      logger.error(`Error uploading personalization image: ${uploadErr.message}`);
      return error(res, 'Failed to process image upload', 'UPLOAD_FAILED', 500);
    }
  });
});

module.exports = router;
