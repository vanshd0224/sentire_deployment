const LoyaltyPoints = require('../../models/LoyaltyPoints');
const { getIsConnected } = require('../../config/db');
const logger = require('../../utils/logger');

class PointsService {
  /**
   * Fetch current points balance for a customer
   */
  async getPoints(customerId) {
    if (!getIsConnected()) {
      return 1250; // Degraded mock balance when DB is disconnected
    }
    try {
      const record = await LoyaltyPoints.findOne({ customerId });
      return record ? record.points : 1250;
    } catch (err) {
      logger.error(`Error fetching loyalty points for ${customerId}: ${err.message}`);
      return 1250;
    }
  }

  /**
   * Add points to customer's account (e.g. from completed orders)
   */
  async addPoints(customerId, pointsToAdd) {
    if (!getIsConnected()) {
      return pointsToAdd;
    }
    try {
      const updated = await LoyaltyPoints.findOneAndUpdate(
        { customerId },
        {
          $inc: { points: pointsToAdd },
          $set: { lastUpdated: new Date() }
        },
        { upsert: true, new: true }
      );
      return updated.points;
    } catch (err) {
      logger.error(`Error adding points for ${customerId}: ${err.message}`);
      return 0;
    }
  }

  /**
   * Redeem/deduct points from customer balance
   */
  async redeemPoints(customerId, pointsToRedeem) {
    const currentPoints = await this.getPoints(customerId);

    if (currentPoints < pointsToRedeem) {
      return { success: false, remainingPoints: currentPoints, error: 'Insufficient loyalty points balance' };
    }

    const newBalance = currentPoints - pointsToRedeem;

    if (getIsConnected()) {
      try {
        await LoyaltyPoints.findOneAndUpdate(
          { customerId },
          {
            $set: { points: newBalance, lastUpdated: new Date() }
          },
          { upsert: true }
        );
      } catch (err) {
        logger.error(`Error saving redeemed points for ${customerId}: ${err.message}`);
      }
    }

    return { success: true, remainingPoints: newBalance };
  }
}

module.exports = new PointsService();
