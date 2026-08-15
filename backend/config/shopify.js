module.exports = {
  shop: process.env.SHOPIFY_SHOP || 'mock-store',
  clientId: process.env.SHOPIFY_CLIENT_ID,
  clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
  adminApiUrl: process.env.SHOPIFY_ADMIN_API_URL || 'https://mock-store.myshopify.com/admin/api/2026-07',
  apiVersion: '2026-07',
  webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET
};
