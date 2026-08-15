const rateLimit = require('express-rate-limit');
const constants = require('../config/constants');
const { error } = require('../utils/responseFormatter');

const defaultLimiter = rateLimit({
  windowMs: constants.RATE_LIMITS.DEFAULT_WINDOW_MS,
  max: constants.RATE_LIMITS.DEFAULT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return error(res, 'Too many requests, please try again later.', 'RATE_LIMIT_EXCEEDED', 429);
  }
});

const expensiveRouteLimiter = rateLimit({
  windowMs: constants.RATE_LIMITS.EXPENSIVE_WINDOW_MS,
  max: constants.RATE_LIMITS.EXPENSIVE_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Rate limit per customer ID if passed, otherwise per IP
    if (req.params && req.params.customerId) return req.params.customerId;
    if (req.body && req.body.customerId) return req.body.customerId;
    return req.ip;
  },
  handler: (req, res) => {
    return error(res, 'Rate limit exceeded for AI/vision endpoint. Please slow down.', 'RATE_LIMIT_EXCEEDED', 429);
  }
});

module.exports = {
  defaultLimiter,
  expensiveRouteLimiter
};
