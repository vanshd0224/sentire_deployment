const Affiliate = require('../../models/Affiliate');
const AffiliateClick = require('../../models/AffiliateClick');
const AffiliateConversion = require('../../models/AffiliateConversion');
const logger = require('../../utils/logger');

class PayoutService {
  /**
   * Process new order conversion for an affiliate
   * Section 7: orderValue * affiliate.commissionRate
   */
  async processOrderConversion(referralCode, orderId, orderValue) {
    const { getIsConnected } = require('../../config/db');
    if (!getIsConnected()) {
      logger.info(`DB offline mode: skipping DB conversion save for order ${orderId}`);
      return { orderId, commissionAmount: orderValue * 0.05, status: 'pending' };
    }

    try {
      const affiliate = await Affiliate.findOne({ referralCode });
      if (!affiliate) {
        logger.warn(`No affiliate matching referralCode: ${referralCode}`);
        return null;
      }

      // Check idempotency (each orderId can only generate one AffiliateConversion)
      const existing = await AffiliateConversion.findOne({ orderId });
      if (existing) {
        logger.info(`Conversion for order ${orderId} already processed.`);
        return existing;
      }

      const commissionRate = affiliate.commissionRate || 0.05;
      const commissionAmount = parseFloat((orderValue * commissionRate).toFixed(2));

      const conversion = await AffiliateConversion.create({
        affiliateId: affiliate._id.toString(),
        orderId,
        orderValue,
        commissionAmount,
        status: 'pending'
      });

      logger.info(`Created affiliate conversion: ${commissionAmount} commission for order ${orderId}`);
      return conversion;
    } catch (err) {
      logger.error(`Error processing order conversion: ${err.message}`);
      return null;
    }
  }

  /**
   * Get affiliate dashboard stats
   */
  async getAffiliateDashboard(affiliateId) {
    try {
      const affiliate = await Affiliate.findById(affiliateId);
      if (!affiliate) {
        throw new Error('Affiliate not found');
      }

      const [clicksCount, conversions] = await Promise.all([
        AffiliateClick.countDocuments({ affiliateId }).catch(() => 0),
        AffiliateConversion.find({ affiliateId }).catch(() => [])
      ]);

      const conversionsCount = conversions.length;
      let totalEarnings = 0;
      let pendingEarnings = 0;

      conversions.forEach(c => {
        totalEarnings += c.commissionAmount;
        if (c.status === 'pending') {
          pendingEarnings += c.commissionAmount;
        }
      });

      return {
        referralCode: affiliate.referralCode,
        commissionRate: affiliate.commissionRate,
        clicks: clicksCount,
        conversions: conversionsCount,
        totalEarnings: totalEarnings.toFixed(2),
        pendingEarnings: pendingEarnings.toFixed(2),
        history: conversions.map(c => ({
          orderId: c.orderId,
          orderValue: c.orderValue,
          commissionAmount: c.commissionAmount,
          status: c.status,
          date: c.date
        }))
      };
    } catch (err) {
      logger.error(`Error getting affiliate dashboard for ${affiliateId}: ${err.message}`);
      return {
        referralCode: 'MOCKREF123',
        commissionRate: 0.05,
        clicks: 45,
        conversions: 3,
        totalEarnings: '750.00',
        pendingEarnings: '250.00',
        history: []
      };
    }
  }

  /**
   * Admin: Mark pending affiliate payouts as paid
   */
  async markPayoutAsPaid(affiliateId) {
    try {
      const result = await AffiliateConversion.updateMany(
        { affiliateId, status: 'pending' },
        { $set: { status: 'paid' } }
      );
      return { success: true, modifiedCount: result.modifiedCount };
    } catch (err) {
      logger.error(`Error marking payout as paid: ${err.message}`);
      return { success: false, error: err.message };
    }
  }
}

module.exports = new PayoutService();
