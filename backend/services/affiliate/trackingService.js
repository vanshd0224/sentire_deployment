const Affiliate = require('../../models/Affiliate');
const AffiliateClick = require('../../models/AffiliateClick');
const logger = require('../../utils/logger');

class TrackingService {
  /**
   * Records click on affiliate link and prepares cookie info
   */
  async recordClick(referralCode, sourceIp) {
    const { getIsConnected } = require('../../config/db');
    if (!getIsConnected()) {
      return { referralCode, valid: true };
    }

    try {
      const affiliate = await Affiliate.findOne({ referralCode });

      if (affiliate) {
        await AffiliateClick.create({
          affiliateId: affiliate._id.toString(),
          referralCode,
          source: sourceIp || 'unknown'
        }).catch(err => logger.warn(`Could not log click: ${err.message}`));
      } else {
        logger.warn(`Referral code not found during tracking: ${referralCode}`);
      }

      return {
        referralCode,
        valid: !!affiliate
      };
    } catch (err) {
      logger.error(`Error tracking affiliate click: ${err.message}`);
      return { referralCode, valid: false };
    }
  }
}

module.exports = new TrackingService();
