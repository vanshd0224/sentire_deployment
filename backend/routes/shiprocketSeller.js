const express = require('express');
const router = express.Router();
const https = require('https');
const logger = require('../utils/logger');

const SHOPIFY_SHOP = process.env.SHOPIFY_SHOP || 'hbj1d0-99.myshopify.com';
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN || '';

// Helper to convert string/bigint to number (long integer for Shiprocket)
const toLong = (val, defaultVal = 0) => {
  if (typeof val === 'number') return Math.floor(val);
  if (!val) return defaultVal;
  const parsed = parseInt(String(val).replace(/\D/g, ''), 10);
  return isNaN(parsed) ? defaultVal : parsed;
};

// Native HTTPS GET helper
const fetchShopifyJson = (urlStr) => {
  return new Promise((resolve) => {
    try {
      const options = {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
          'Content-Type': 'application/json'
        }
      };
      https.get(urlStr, options, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(null);
          }
        });
      }).on('error', () => resolve(null));
    } catch (e) {
      resolve(null);
    }
  });
};

// 1. GET /api/sr/seller/products
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const collectionId = req.query.collection_id ? toLong(req.query.collection_id) : null;

    let shopifyUrl = `https://${SHOPIFY_SHOP}/admin/api/2026-07/products.json?limit=${limit}`;
    if (collectionId) {
      shopifyUrl = `https://${SHOPIFY_SHOP}/admin/api/2026-07/collections/${collectionId}/products.json?limit=${limit}`;
    }

    const shopifyData = await fetchShopifyJson(shopifyUrl);
    const products = shopifyData?.products || [];

    // Format products with long IDs for Shiprocket Fastrr
    const formattedProducts = products.map((p) => {
      const productIdLong = toLong(p.id);
      return {
        id: productIdLong,
        product_id: productIdLong,
        title: p.title,
        handle: p.handle,
        body_html: p.body_html || '',
        vendor: p.vendor || 'SENTIRE By PC',
        product_type: p.product_type || 'Extrait de Parfum',
        status: p.status || 'active',
        images: (p.images || []).map((img) => ({
          id: toLong(img.id),
          product_id: productIdLong,
          src: img.src
        })),
        variants: (p.variants || []).map((v) => ({
          id: toLong(v.id),
          variant_id: toLong(v.id),
          product_id: productIdLong,
          title: v.title,
          price: parseFloat(v.price) || 0,
          compare_at_price: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
          sku: v.sku || String(v.id),
          inventory_quantity: v.inventory_quantity || 100,
          requires_shipping: true,
          taxable: true
        }))
      };
    });

    return res.status(200).json({
      status: true,
      message: 'Products fetched successfully',
      page,
      limit,
      total: formattedProducts.length,
      data: formattedProducts
    });
  } catch (error) {
    logger.error('Error fetching Shiprocket seller products:', error);
    return res.status(500).json({
      status: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// 2. GET /api/sr/seller/collections
router.get('/collections', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;

    const [customData, smartData] = await Promise.all([
      fetchShopifyJson(`https://${SHOPIFY_SHOP}/admin/api/2026-07/custom_collections.json?limit=${limit}`),
      fetchShopifyJson(`https://${SHOPIFY_SHOP}/admin/api/2026-07/smart_collections.json?limit=${limit}`)
    ]);

    const customCollections = customData?.custom_collections || [];
    const smartCollections = smartData?.smart_collections || [];

    const allCollections = [...customCollections, ...smartCollections];
    const formattedCollections = allCollections.map((c) => ({
      id: toLong(c.id),
      collection_id: toLong(c.id),
      title: c.title,
      handle: c.handle,
      updated_at: c.updated_at
    }));

    return res.status(200).json({
      status: true,
      message: 'Collections fetched successfully',
      page,
      limit,
      total: formattedCollections.length,
      data: formattedCollections
    });
  } catch (error) {
    logger.error('Error fetching Shiprocket seller collections:', error);
    return res.status(500).json({
      status: false,
      message: 'Failed to fetch collections',
      error: error.message
    });
  }
});

// 3. GET /api/sr/seller/productsByCollection
router.get('/productsByCollection', async (req, res) => {
  const collectionId = req.query.collection_id;
  req.url = `/products?collection_id=${collectionId || ''}`;
  return router.handle(req, res);
});

module.exports = router;
