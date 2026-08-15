const { GoogleGenerativeAI } = require('@google/generative-ai');
const shopifyAdmin = require('../shopify/shopifyAdmin');
const logger = require('../../utils/logger');
const constants = require('../../config/constants');

class RecommendationEngine {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey && this.apiKey !== 'mock_gemini_key') {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  /**
   * Generates product recommendations for a customer ID
   * Always fails soft with HTTP 200 shape { products: [] }
   */
  async getRecommendations(customerId) {
    try {
      // 1. Fetch customer's past orders and catalog products from Shopify Admin API
      const [orders, allProducts] = await Promise.all([
        shopifyAdmin.getCustomerOrders(customerId).catch(() => []),
        shopifyAdmin.getProducts().catch(() => [])
      ]);

      if (!allProducts || allProducts.length === 0) {
        return { products: [] };
      }

      // If no AI key or mock mode, return formatted product catalog subset as fallback
      if (!this.model) {
        logger.info('Using fallback product recommendations (Gemini key unconfigured or mock mode).');
        return {
          products: this._formatProducts(allProducts.slice(0, 3))
        };
      }

      // 2. Prepare AI prompt with timeout race
      const userPurchases = orders.flatMap(o => o.line_items?.map(l => l.title) || []).join(', ');
      const catalogTitles = allProducts.map(p => p.title).join(', ');

      const prompt = `Given customer purchase history: [${userPurchases || 'None'}], recommend top 3 matching products from available catalog: [${catalogTitles}]. Return ONLY a JSON array of recommended product titles.`;

      const aiPromise = this.model.generateContent(prompt);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AI Recommendation request timed out')), constants.AI_TIMEOUT_MS)
      );

      const result = await Promise.race([aiPromise, timeoutPromise]);
      const text = result.response.text();

      // Filter catalog by AI response matches or fallback
      const recommended = allProducts.filter(p => text.toLowerCase().includes(p.title.toLowerCase()));
      const finalProducts = recommended.length > 0 ? recommended : allProducts.slice(0, 3);

      return {
        products: this._formatProducts(finalProducts)
      };

    } catch (err) {
      logger.error(`Recommendation engine failed soft: ${err.message}`);
      // Fail soft rule: return empty array with 200, never crash frontend
      const fallbackProducts = await shopifyAdmin.getProducts().catch(() => []);
      return {
        products: this._formatProducts(fallbackProducts.slice(0, 2))
      };
    }
  }

  _formatProducts(products) {
    return products.map(p => {
      const img = p.image || p.images?.[0]?.src || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500';
      const priceAmount = p.price?.amount || p.variants?.[0]?.price || '4999.00';
      const currency = p.price?.currencyCode || 'INR';

      return {
        id: p.id ? p.id.toString() : 'gid://shopify/Product/123',
        handle: p.handle || 'product-handle',
        title: p.title || 'Product Title',
        image: img,
        price: {
          amount: priceAmount,
          currencyCode: currency
        }
      };
    });
  }
}

module.exports = new RecommendationEngine();
