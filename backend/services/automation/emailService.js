const logger = require('../../utils/logger');

class EmailService {
  /**
   * Send custom transactional email (e.g. loyalty bonus, referral award)
   */
  async sendLoyaltyNotification(email, customerName, pointsEarned, totalPoints) {
    logger.info(`Sending loyalty notification email to ${email}: Earned ${pointsEarned} points. Total: ${totalPoints}`);
    // Email provider integration placeholder (e.g. SendGrid / Resend / Nodemailer)
    return { success: true, recipient: email };
  }

  async sendAffiliateApprovalEmail(email, affiliateName, referralCode) {
    logger.info(`Sending affiliate approval email to ${email} (Code: ${referralCode})`);
    return { success: true, recipient: email };
  }
}

module.exports = new EmailService();
