const Affiliate = require('../../models/Affiliate');
const constants = require('../../config/constants');
const logger = require('../../utils/logger');

class AffiliateService {
  /**
   * Register a new affiliate
   */
  async registerAffiliate({ name, email, socialHandle }) {
    const { getIsConnected } = require('../../config/db');
    if (!getIsConnected()) {
      const mockCode = `REF${Math.floor(100 + Math.random() * 900)}`;
      return {
        affiliateId: `aff_${Date.now()}`,
        referralCode: mockCode,
        status: 'pending'
      };
    }

    try {
      const existing = await Affiliate.findOne({ email });
      if (existing) {
        return {
          affiliateId: existing._id.toString(),
          referralCode: existing.referralCode,
          status: existing.status
        };
      }

      // Generate unique referral code
      const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 5);
      const referralCode = `${cleanName}${Math.floor(100 + Math.random() * 900)}`;

      const newAffiliate = await Affiliate.create({
        name,
        email,
        socialHandle,
        referralCode,
        commissionRate: constants.DEFAULT_COMMISSION_RATE,
        status: 'pending'
      });

      return {
        affiliateId: newAffiliate._id.toString(),
        referralCode: newAffiliate.referralCode,
        status: newAffiliate.status
      };
    } catch (err) {
      logger.error(`Error registering affiliate: ${err.message}`);
      // Fallback response for offline dev mode
      const mockCode = `REF${Math.floor(100 + Math.random() * 900)}`;
      return {
        affiliateId: `aff_${Date.now()}`,
        referralCode: mockCode,
        status: 'pending'
      };
    }
  }

  /**
   * Admin: List all affiliates
   */
  async listAllAffiliates() {
    try {
      return await Affiliate.find().sort({ createdAt: -1 });
    } catch (err) {
      logger.error(`Error listing affiliates: ${err.message}`);
      return [];
    }
  }

  /**
   * Admin: Update affiliate status or commission rate
   */
  async updateAffiliate(id, { status, commissionRate }) {
    try {
      const updates = {};
      if (status) updates.status = status;
      if (commissionRate !== undefined) updates.commissionRate = commissionRate;

      const updated = await Affiliate.findByIdAndUpdate(id, { $set: updates }, { new: true });
      return updated;
    } catch (err) {
      logger.error(`Error updating affiliate ${id}: ${err.message}`);
      return null;
    }
  }
}

module.exports = new AffiliateService();
