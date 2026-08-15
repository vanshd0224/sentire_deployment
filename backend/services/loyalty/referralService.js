const Referral = require('../../models/Referral');
const { getIsConnected } = require('../../config/db');
const logger = require('../../utils/logger');

class ReferralService {
  /**
   * Get referral info & history for a customer
   */
  async getReferralData(customerId) {
    const mockHistory = [
      { type: 'earned', points: 100, date: '2026-07-20', description: 'Order #1234' }
    ];

    if (!getIsConnected()) {
      return {
        referralCode: 'VANSH250',
        history: mockHistory
      };
    }

    try {
      let record = await Referral.findOne({ customerId });

      if (!record) {
        const defaultCode = `VANSH${Math.floor(100 + Math.random() * 900)}`;
        record = await Referral.create({
          customerId,
          referralCode: defaultCode,
          history: mockHistory
        });
      }

      return {
        referralCode: record.referralCode,
        history: record.history?.map(h => ({
          type: h.type,
          points: h.points,
          date: h.date,
          description: h.description
        })) || []
      };
    } catch (err) {
      logger.error(`Error getting referral data for ${customerId}: ${err.message}`);
      return {
        referralCode: 'VANSH250',
        history: mockHistory
      };
    }
  }
}

module.exports = new ReferralService();
