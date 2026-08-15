const logger = require('../utils/logger');
const { error: formatError } = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected error occurred';
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  logger.error('Unhandled API Error', {
    method: req.method,
    path: req.path,
    statusCode,
    code,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });

  return formatError(res, message, code, statusCode);
};

module.exports = errorHandler;
