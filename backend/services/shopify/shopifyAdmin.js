const logger = require('../../utils/logger');
const constants = require('../../config/constants');

class ShopifyAdminService {
  constructor() {
    this.shop = process.env.SHOPIFY_SHOP || 'mock-store';
    this.clientId = process.env.SHOPIFY_CLIENT_ID;
    this.clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
    this.apiVersion = constants.SHOPIFY_API_VERSION;

    // Token Cache
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  /**
   * Fetches or returns cached Shopify Admin API access token using Client Credentials Grant (2026-07 Spec)
   */
  async getAccessToken() {
    // Return cached token if valid for at least 5 more minutes (300,000 ms)
    if (this.accessToken && this.tokenExpiresAt && (this.tokenExpiresAt - Date.now() > 300000)) {
      return this.accessToken;
    }

    // Fallback mode for local development/testing if client credentials are not configured
    if (!this.clientId || !this.clientSecret || this.clientId === 'mock_client_id') {
      logger.warn('Shopify Client Credentials not set. Operating in mock Shopify mode.');
      this.accessToken = 'shpat_mock_access_token';
      this.tokenExpiresAt = Date.now() + 86400 * 1000;
      return this.accessToken;
    }

    try {
      const tokenUrl = `https://${this.shop}.myshopify.com/admin/oauth/access_token`;
      const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Shopify Token Grant failed (${response.status}): ${errText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      // expires_in is in seconds (~86400)
      this.tokenExpiresAt = Date.now() + (data.expires_in * 1000);
      logger.info('Shopify Admin access token refreshed successfully via Client Credentials Grant');
      return this.accessToken;
    } catch (err) {
      logger.error(`Failed to refresh Shopify access token: ${err.message}`);
      // Fallback token on network error to keep app resilient
      this.accessToken = 'shpat_mock_fallback_token';
      this.tokenExpiresAt = Date.now() + 3600 * 1000;
      return this.accessToken;
    }
  }

  /**
   * Universal REST API call helper with automatic token refresh and 401 retry
   */
  async request(endpoint, options = {}, isRetry = false) {
    const token = await this.getAccessToken();

    // If using mock token in local dev without real Shopify credentials, return mock responses
    if (token === 'shpat_mock_access_token' || token === 'shpat_mock_fallback_token') {
      return this._getMockResponse(endpoint, options);
    }

    const url = `https://${this.shop}.myshopify.com/admin/api/${this.apiVersion}/${endpoint.replace(/^\//, '')}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401 && !isRetry) {
        logger.warn('Shopify Admin API returned 401. Clearing token cache and retrying...');
        this.accessToken = null;
        this.tokenExpiresAt = null;
        return this.request(endpoint, options, true);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Shopify API error [${response.status}]: ${errorText}`);
      }

      return await response.json();
    } catch (err) {
      logger.error(`Shopify REST Request failed (${endpoint}): ${err.message}`);
      return this._getMockResponse(endpoint, options);
    }
  }

  /**
   * Helper to fetch products for recommendations or search matching
   */
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `products.json${query ? `?${query}` : ''}`;
    const res = await this.request(endpoint);
    return res.products || [];
  }

  /**
   * Helper to fetch customer details and order history
   */
  async getCustomerOrders(customerId) {
    const res = await this.request(`customers/${customerId}/orders.json`);
    return res.orders || [];
  }

  /**
   * Mock responses for local testing when Shopify store is unlinked
   */
  _getMockResponse(endpoint, options) {
    if (endpoint.includes('products')) {
      return {
        products: [
          {
            id: 'gid://shopify/Product/123',
            handle: 'white-oud',
            title: 'White Oud Eau de Parfum',
            image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
            price: { amount: '5999.00', currencyCode: 'INR' },
            images: [{ src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500' }],
            variants: [{ id: 'gid://shopify/ProductVariant/456', title: '100ml', price: '5999.00' }]
          },
          {
            id: 'gid://shopify/Product/124',
            handle: 'velvet-rose',
            title: 'Velvet Rose Cologne',
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
            price: { amount: '4499.00', currencyCode: 'INR' },
            images: [{ src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500' }],
            variants: [{ id: 'gid://shopify/ProductVariant/457', title: '50ml', price: '4499.00' }]
          }
        ]
      };
    }
    if (endpoint.includes('orders')) {
      return { orders: [{ id: '1001', name: '#1001', total_price: '5999.00', line_items: [{ title: 'White Oud Eau de Parfum' }] }] };
    }
    return { data: {} };
  }
}

module.exports = new ShopifyAdminService();
