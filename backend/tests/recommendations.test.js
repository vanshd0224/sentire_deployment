const request = require('supertest');
const app = require('../server');

jest.setTimeout(10000);

describe('Core Frontend Contract Endpoints', () => {
  describe('GET /health', () => {
    it('should return 200 OK with status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /recommendations/:customerId', () => {
    it('should return products array matching Section 7 spec shape', async () => {
      const res = await request(app).get('/recommendations/cust_123');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('products');
      expect(Array.isArray(res.body.products)).toBe(true);

      if (res.body.products.length > 0) {
        const item = res.body.products[0];
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('handle');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('image');
        expect(item).toHaveProperty('price');
        expect(item.price).toHaveProperty('amount');
        expect(item.price).toHaveProperty('currencyCode');
      }
    });
  });

  describe('POST /chat', () => {
    it('should return reply and optional cartAction shape', async () => {
      const res = await request(app)
        .post('/chat')
        .send({
          message: 'Can you recommend a good perfume?',
          sessionId: 'sess_test_123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('reply');
      expect(typeof res.body.reply).toBe('string');
    });
  });

  describe('GET /loyalty/:customerId', () => {
    it('should return points, referralCode, and history array matching Section 7 spec shape', async () => {
      const res = await request(app).get('/loyalty/cust_123');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('points');
      expect(res.body).toHaveProperty('referralCode');
      expect(res.body).toHaveProperty('history');
      expect(Array.isArray(res.body.history)).toBe(true);
    });
  });

  describe('POST /leads/capture', () => {
    it('should return discountCode for valid 10-digit Indian phone number', async () => {
      const res = await request(app)
        .post('/leads/capture')
        .send({ phone: '9876543210' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('discountCode', 'WELCOME10');
    });

    it('should reject invalid phone number with 400', async () => {
      const res = await request(app)
        .post('/leads/capture')
        .send({ phone: '123' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
