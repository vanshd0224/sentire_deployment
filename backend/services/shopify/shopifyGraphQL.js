const shopifyAdmin = require('./shopifyAdmin');
const logger = require('../../utils/logger');

class ShopifyGraphQLService {
  /**
   * Sends a GraphQL query/mutation to Shopify Admin GraphQL API
   */
  async query(query, variables = {}) {
    const token = await shopifyAdmin.getAccessToken();

    // Mock fallback if using mock token
    if (token === 'shpat_mock_access_token' || token === 'shpat_mock_fallback_token') {
      return { data: { products: { edges: [] } } };
    }

    const shop = process.env.SHOPIFY_SHOP || 'mock-store';
    const version = process.env.SHOPIFY_API_VERSION || '2026-07';
    const url = `https://${shop}.myshopify.com/admin/api/${version}/graphql.json`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': token
        },
        body: JSON.stringify({ query, variables })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`GraphQL HTTP error [${response.status}]: ${text}`);
      }

      return await response.json();
    } catch (err) {
      logger.error(`Shopify GraphQL Query failed: ${err.message}`);
      return { data: null, errors: [{ message: err.message }] };
    }
  }
}

module.exports = new ShopifyGraphQLService();
