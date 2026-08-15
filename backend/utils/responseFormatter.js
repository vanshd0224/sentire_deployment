/**
 * Formats standard success and error responses for the API
 */

const success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

const error = (res, message, code = 'INTERNAL_ERROR', statusCode = 500) => {
  return res.status(statusCode).json({
    error: {
      message,
      code
    }
  });
};

module.exports = { success, error };
