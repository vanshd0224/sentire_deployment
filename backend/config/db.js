const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Disable command buffering globally so queries fail immediately when DB is disconnected
mongoose.set('bufferCommands', false);

let isConnected = false;

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test' && !process.env.TEST_DB) {
    logger.info('Test environment detected. Operating in mock database mode.');
    return false;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 500
      });
      isConnected = true;
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (e) {
      logger.warn('MongoDB connection failed/offline. Database operating in degraded mock mode.');
      return false;
    }
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
