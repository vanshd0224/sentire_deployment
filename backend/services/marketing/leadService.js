const Lead = require('../../models/Lead');
const { getIsConnected } = require('../../config/db');
const constants = require('../../config/constants');
const logger = require('../../utils/logger');

class LeadService {
  /**
   * Captures phone lead and returns discount code idempotently
   */
  async captureLead(phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const discountCode = constants.WELCOME_DISCOUNT_CODE;

    if (!getIsConnected()) {
      logger.info(`DB offline mode: returning default discount code for ${cleanPhone}`);
      return { discountCode };
    }

    try {
      let existingLead = await Lead.findOne({ phone: cleanPhone });

      if (existingLead) {
        logger.info(`Lead phone ${cleanPhone} re-submitted. Returning existing discountCode.`);
        return { discountCode: existingLead.discountCode };
      }

      await Lead.create({
        phone: cleanPhone,
        discountCode,
        capturedAt: new Date()
      });

      logger.info(`Successfully captured new lead for phone ${cleanPhone}`);
      return { discountCode };
    } catch (err) {
      logger.error(`Error saving lead: ${err.message}`);
      return { discountCode };
    }
  }
}

module.exports = new LeadService();
