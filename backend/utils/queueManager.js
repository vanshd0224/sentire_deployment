const { Queue } = require('bullmq');
const Redis = require('ioredis');
const logger = require('./logger');

class QueueManager {
  constructor() {
    this.redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    this.queues = {};
    this.workers = {};
    this.isRedisAvailable = false;

    if (process.env.NODE_ENV !== 'test') {
      this.init();
    }
  }

  init() {
    try {
      this.connection = new Redis(this.redisUrl, {
        maxRetriesPerRequest: null,
        enableOfflineQueue: false,
        connectTimeout: 2000,
        lazyConnect: true
      });

      this.connection.on('connect', () => {
        this.isRedisAvailable = true;
        logger.info('Connected to Redis for BullMQ queues');
      });

      this.connection.on('error', (err) => {
        this.isRedisAvailable = false;
        logger.warn(`Redis connection unavailable: ${err.message}. Queues running in fallback mode.`);
      });

      this.connection.connect().catch(err => {
        this.isRedisAvailable = false;
      });
    } catch (err) {
      this.isRedisAvailable = false;
      logger.warn(`QueueManager initialization error: ${err.message}`);
    }
  }

  async addJob(queueName, jobName, data) {
    if (this.isRedisAvailable && this.connection) {
      try {
        if (!this.queues[queueName]) {
          this.queues[queueName] = new Queue(queueName, { connection: this.connection });
        }
        await this.queues[queueName].add(jobName, data);
        logger.info(`Enqueued job ${jobName} in queue ${queueName}`);
      } catch (err) {
        logger.warn(`Failed to add BullMQ job (${jobName}): ${err.message}`);
      }
    }

    // Always process inline fallback execution to ensure affiliate attribution and analytics run
    await this._processJobInline(jobName, data);
    return true;
  }

  async _processJobInline(jobName, payload) {
    logger.info(`[Inline Worker Processing] Executing ${jobName}`);
    try {
      if (jobName === 'process-order-created') {
        const noteAttributes = payload.note_attributes || payload.attributes || [];
        const affiliateAttr = noteAttributes.find(attr => (attr.name || attr.key) === 'affiliate_ref');

        if (affiliateAttr && affiliateAttr.value) {
          const referralCode = affiliateAttr.value;
          const orderId = payload.id?.toString();
          const orderValue = parseFloat(payload.total_price || payload.total_price_set?.shop_money?.amount || '0');

          if (orderId && orderValue > 0) {
            const payoutService = require('../services/affiliate/payoutService');
            await payoutService.processOrderConversion(referralCode, orderId, orderValue);
          }
        }
      }
    } catch (err) {
      logger.error(`Error in background job worker (${jobName}): ${err.message}`);
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.disconnect();
    }
  }
}

module.exports = new QueueManager();
