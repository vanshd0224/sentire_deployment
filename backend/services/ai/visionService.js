const vision = require('@google-cloud/vision');
const shopifyAdmin = require('../shopify/shopifyAdmin');
const logger = require('../../utils/logger');
const constants = require('../../config/constants');

class VisionService {
  constructor() {
    this.apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (this.apiKey && this.apiKey !== 'mock_vision_key') {
      this.client = new vision.ImageAnnotatorClient({
        apiKey: this.apiKey
      });
    }
  }

  /**
   * Search catalog products by uploaded image buffer
   */
  async searchByImage(imageBuffer) {
    try {
      const allProducts = await shopifyAdmin.getProducts().catch(() => []);

      if (!imageBuffer || allProducts.length === 0) {
        return { products: this._formatProducts(allProducts.slice(0, 2)) };
      }

      let detectedLabels = [];

      if (this.client) {
        const [result] = await this.client.labelDetection(imageBuffer);
        detectedLabels = result.labelAnnotations?.map(label => label.description.toLowerCase()) || [];
        logger.info(`Google Vision API detected labels: ${detectedLabels.join(', ')}`);
      }

      // Match products by detected labels or return fallback catalog
      let matchedProducts = allProducts.filter(product => {
        const titleLower = product.title.toLowerCase();
        return detectedLabels.some(label => titleLower.includes(label));
      });

      if (matchedProducts.length === 0) {
        matchedProducts = allProducts.slice(0, 3);
      }

      return {
        products: this._formatProducts(matchedProducts)
      };

    } catch (err) {
      logger.error(`Vision service error (fail soft): ${err.message}`);
      const fallbackProducts = await shopifyAdmin.getProducts().catch(() => []);
      return {
        products: this._formatProducts(fallbackProducts.slice(0, 2))
      };
    }
  }

  _formatProducts(products) {
    return products.map(p => {
      const img = p.image || p.images?.[0]?.src || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500';
      const priceAmount = p.price?.amount || p.variants?.[0]?.price || '5999.00';
      const currency = p.price?.currencyCode || 'INR';

      return {
        id: p.id ? p.id.toString() : 'gid://shopify/Product/123',
        handle: p.handle || 'white-oud',
        title: p.title || 'White Oud',
        image: img,
        price: {
          amount: priceAmount,
          currencyCode: currency
        }
      };
    });
  }
}

module.exports = new VisionService();
