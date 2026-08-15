const request = require('supertest');
const crypto = require('crypto');
const app = require('../server');

describe('Shopify Webhook Routes', () => {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET || 'mock_webhook_secret_key';
  const payload = JSON.stringify({ id: 999111, name: '#1001', total_price: '5999.00' });

  const hmac = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64');

  describe('POST /webhooks/orders-create', () => {
    it('should accept valid HMAC signature and return 200 OK', async () => {
      const res = await request(app)
        .post('/webhooks/orders-create')
        .set('x-shopify-hmac-sha256', hmac)
        .set('x-shopify-topic', 'orders/create')
        .set('Content-Type', 'application/json')
        .send(payload);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('received', true);
    });

    it('should process affiliate attribution from note_attributes on orders-create', async () => {
      const orderPayload = JSON.stringify({
        id: 999333,
        name: '#1003',
        total_price: '10000.00',
        note_attributes: [{ name: 'affiliate_ref', value: 'VANSH250' }]
      });

      const orderHmac = crypto
        .createHmac('sha256', secret)
        .update(orderPayload)
        .digest('base64');

      const res = await request(app)
        .post('/webhooks/orders-create')
        .set('x-shopify-hmac-sha256', orderHmac)
        .set('x-shopify-topic', 'orders/create')
        .set('Content-Type', 'application/json')
        .send(orderPayload);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('received', true);
    });

    it('should handle duplicate webhook gracefully (idempotency check)', async () => {
      const duplicatePayload = JSON.stringify({ id: 999222, name: '#1002' });
      const dupHmac = crypto
        .createHmac('sha256', secret)
        .update(duplicatePayload)
        .digest('base64');

      // First call
      await request(app)
        .post('/webhooks/orders-create')
        .set('x-shopify-hmac-sha256', dupHmac)
        .set('x-shopify-topic', 'orders/create')
        .set('Content-Type', 'application/json')
        .send(duplicatePayload);

      // Second call (duplicate)
      const res2 = await request(app)
        .post('/webhooks/orders-create')
        .set('x-shopify-hmac-sha256', dupHmac)
        .set('x-shopify-topic', 'orders/create')
        .set('Content-Type', 'application/json')
        .send(duplicatePayload);

      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('status', 'skipped_duplicate');
    });
  });
});
