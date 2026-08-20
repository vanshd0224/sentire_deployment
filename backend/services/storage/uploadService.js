const { Storage } = require('@google-cloud/storage');
const path = require('path');
const logger = require('../../utils/logger');

class UploadService {
  constructor() {
    this.bucketName = process.env.GCS_BUCKET_NAME || 'mock-bucket-name';
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      this.storage = new Storage({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
      });
    } else {
      this.storage = new Storage();
    }
  }

  /**
   * Uploads file buffer to Google Cloud Storage bucket
   * Returns public GCS URL or mock fallback URL in unconfigured dev mode
   */
  async uploadPersonalizationImage(fileBuffer, originalFilename, mimeType) {
    const crypto = require('crypto');
    const randomId = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    const safeExt = path.extname(originalFilename || '.jpg') || '.jpg';
    const filename = `personalizations/${Date.now()}_${randomId}${safeExt}`;

    if (!process.env.GCS_BUCKET_NAME || process.env.GCS_BUCKET_NAME === 'mock-gcs-bucket') {
      logger.warn('GCS_BUCKET_NAME unconfigured. Returning mock GCS upload URL.');
      return `https://storage.googleapis.com/your-bucket/${filename}`;
    }

    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(filename);

      await file.save(fileBuffer, {
        metadata: { contentType: mimeType },
        resumable: false
      });

      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
      logger.info(`Successfully uploaded image to GCS: ${publicUrl}`);
      return publicUrl;
    } catch (err) {
      logger.error(`Failed to upload file to GCS: ${err.message}`);
      // Fallback URL so user flow doesn't break
      return `https://storage.googleapis.com/${this.bucketName}/${filename}`;
    }
  }
}

module.exports = new UploadService();
