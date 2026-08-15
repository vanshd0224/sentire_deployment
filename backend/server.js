require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const constants = require('./config/constants');
const logger = require('./utils/logger');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { defaultLimiter } = require('./middleware/rateLimiter');

// Import Routes
const webhooksRouter = require('./routes/webhooks');
const recommendationsRouter = require('./routes/recommendations');
const chatbotRouter = require('./routes/chatbot');
const imageSearchRouter = require('./routes/imageSearch');
const loyaltyRouter = require('./routes/loyalty');
const analyticsRouter = require('./routes/analytics');
const bundlesRouter = require('./routes/bundles');
const integrationsRouter = require('./routes/integrations');
const uploadsRouter = require('./routes/uploads');
const affiliates = require('./routes/affiliates');
const leadsRouter = require('./routes/leads');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration locked to FRONTEND_URL
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed by policy'));
  },
  credentials: true
}));

// Request timing & structured logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const shopifyTopic = req.headers['x-shopify-topic'] || undefined;
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration,
      shopifyTopic
    });
  });
  next();
});

// Apply default rate limiter
app.use(defaultLimiter);

// 1. Webhook routes (Raw body parser mounted BEFORE global express.json)
app.use('/webhooks', express.raw({ type: 'application/json' }), webhooksRouter);

// 2. JSON and URL-encoded body parsers for non-webhook routes
app.use((req, res, next) => {
  if (req.path.startsWith('/webhooks')) {
    return next();
  }
  express.json({ limit: '10mb' })(req, res, next);
});
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 3. Mount Application Routes
app.use('/recommendations', recommendationsRouter);
app.use('/auth', require('./routes/auth/phoneAuth'));
app.use('/chat', chatbotRouter);
app.use('/image-search', imageSearchRouter);
app.use('/loyalty', loyaltyRouter);
app.use('/analytics', analyticsRouter);
app.use('/bundles', bundlesRouter);
app.use('/integrations', integrationsRouter);
app.use('/uploads', uploadsRouter);
app.use('/affiliates', affiliates.publicRoutes);
app.use('/admin/affiliates', affiliates.adminRoutes);
app.use('/leads', leadsRouter);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: `Route ${req.method} ${req.path} not found`,
      code: 'NOT_FOUND'
    }
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server
const PORT = constants.PORT;
const HOST = '0.0.0.0';

const startServer = async () => {
  // Bind HTTP server IMMEDIATELY to pass Cloud Run container startup health check
  const server = app.listen(PORT, HOST, () => {
    logger.info(`Server running on http://${HOST}:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Connect to DB asynchronously without blocking server listening
  connectDB().catch(err => logger.warn(`Database async connection notice: ${err.message}`));

  // Graceful shutdown handling
  const shutdown = (signal) => {
    logger.info(`${signal} signal received: closing HTTP server`);
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

if (require.main === module) {
  startServer();
}

module.exports = app;
