const jwt = require('jsonwebtoken');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

/**
 * Middleware for authenticating JWT token on admin/internal routes
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Unauthorized access attempt to ${req.path}: Missing Bearer token`);
    return error(res, 'Authorization token missing or malformed', 'UNAUTHORIZED', 401);
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_dev_mode';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(`JWT Verification failed on ${req.path}: ${err.message}`);
    return error(res, 'Invalid or expired authorization token', 'INVALID_TOKEN', 403);
  }
};

module.exports = authMiddleware;
