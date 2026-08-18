module.exports = {
  shop: process.env.SHOPIFY_SHOP || 'hbj1d0-99.myshopify.com',
  clientId: process.env.SHOPIFY_CLIENT_ID,
  clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
  adminAccessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
  adminApiUrl: process.env.SHOPIFY_ADMIN_API_URL || 'https://hbj1d0-99.myshopify.com/admin/api/2026-07',
  apiVersion: '2026-07',
  webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET
};
