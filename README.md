# Headless Shopify Custom E-Commerce Backend API

Production-grade Node.js/Express API powering custom AI-driven features, loyalty, affiliate marketing, visual search, and personalized image uploads for a headless Shopify storefront.

---

## 🚀 Quick Start

### 1. Installation
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and fill in your store and API keys:
```bash
cp .env.example .env
```

Key environment variables:
- `PORT`: Server listening port (default: 8080)
- `FRONTEND_URL`: Allowed CORS origin
- `SHOPIFY_SHOP`: Your Shopify store domain
- `SHOPIFY_CLIENT_ID`: Shopify Dev Dashboard App Client ID
- `SHOPIFY_CLIENT_SECRET`: Shopify Dev Dashboard App Client Secret
- `SHOPIFY_WEBHOOK_SECRET`: Shopify Webhook HMAC secret
- `MONGODB_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection URL (for BullMQ queues)
- `GEMINI_API_KEY`: Google Gemini API key
- `GOOGLE_VISION_API_KEY`: Google Cloud Vision API key
- `GCS_BUCKET_NAME`: Google Cloud Storage bucket for customer uploads
- `JWT_SECRET`: Secret key for admin JWT authentication

### 3. Run Locally
```bash
# Development mode with live reload
npm run dev

# Run automated test suite
npm test

# Production mode
npm start
```

---

## 📡 Key API Endpoints

### Frontend-Facing Contract
- **`GET /recommendations/:customerId`**: Personalized product recommendations using Gemini AI.
- **`POST /chat`**: Conversational shopping chatbot (`{ message, sessionId, customerId?, cartId? }`).
- **`POST /image-search`**: Multipart photo search matching Shopify catalog via Google Cloud Vision API.
- **`GET /loyalty/:customerId`**: Customer points balance, referral code, and transaction history.
- **`POST /loyalty/redeem`**: Points redemption endpoint (`{ customerId, pointsToRedeem }`).
- **`POST /leads/capture`**: Phone lead capture popup with Indian mobile validation (`{ phone }`).
- **`POST /uploads/personalization-image`**: Upload customer personalization image to GCS (5MB max).
- **`GET /affiliates/track/:code`**: Sets 30-day attribution cookie and 302 redirects to storefront.
- **`GET /health`**: Uptime monitoring health check.

### Shopify Webhook Receivers
- **`POST /webhooks/orders-create`** (Includes HMAC verification & affiliate commission attribution)
- **`POST /webhooks/orders-updated`**
- **`POST /webhooks/checkouts-create`**
- **`POST /webhooks/customers-create`**
- **`POST /webhooks/products-update`**

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Express.js on Node.js 20+
- **Database**: MongoDB + Mongoose
- **Queues**: BullMQ + Redis
- **Auth**: Shopify 2026-07 Client Credentials Grant with auto-refresh + Admin JWT
- **Security**: HMAC-SHA256 constant-time webhook signature verification + Zod validation + Rate limiting
- **Logging**: Winston JSON logging

---

## 🐳 Docker Deployment

Build and run using Docker:
```bash
cd backend
docker build -t shopify-custom-backend .
docker run -p 8080:8080 --env-file .env shopify-custom-backend
```
