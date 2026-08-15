const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'shopify-backend' },
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'production'
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, ...metadata }) => {
              let msg = `[${timestamp}] ${level}: ${message}`;
              if (Object.keys(metadata).length > 0 && metadata.service) {
                const { service, ...rest } = metadata;
                if (Object.keys(rest).length > 0) {
                  msg += ` ${JSON.stringify(rest)}`;
                }
              }
              return msg;
            })
          )
    })
  ]
});

module.exports = logger;
