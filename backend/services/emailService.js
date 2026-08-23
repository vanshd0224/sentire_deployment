const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Configure Transporter (Supports Gmail App Password, SMTP, or Resend)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'sentireforwork@gmail.com',
    pass: process.env.EMAIL_PASS || ''
  }
});

/**
 * Send Client Service Enquiry Notification to sentireforwork@gmail.com
 */
async function sendEnquiryNotificationEmail(enquiryData) {
  const {
    referenceId,
    firstName,
    lastName,
    email,
    phone,
    orderNumber,
    queryType,
    message
  } = enquiryData;

  const recipientEmail = 'sentireforwork@gmail.com';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c89b5a; border-radius: 12px; padding: 24px; background: #0b0907; color: #f8f5f1;">
      <div style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid rgba(200, 155, 90, 0.3);">
        <h2 style="color: #c89b5a; margin: 0; font-family: Georgia, serif;">SENTIRE BY PC</h2>
        <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px;">New Client Services Enquiry</p>
      </div>

      <div style="padding: 20px 0;">
        <table style="width: 100%; font-size: 13px; color: #e5dfd5; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #c89b5a; font-weight: bold; width: 140px;">Reference ID:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #ffffff;">${referenceId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #c89b5a; font-weight: bold;">Customer Name:</td>
            <td style="padding: 8px 0;">${firstName} ${lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #c89b5a; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c89b5a;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #c89b5a; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #c89b5a;">${phone || 'N/A'}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #c89b5a; font-weight: bold;">Order Number:</td>
            <td style="padding: 8px 0;">${orderNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #c89b5a; font-weight: bold;">Category / Type:</td>
            <td style="padding: 8px 0;">${queryType || 'General Enquiry'}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 16px; background: rgba(200, 155, 90, 0.08); border-left: 3px solid #c89b5a; border-radius: 6px;">
          <h4 style="margin: 0 0 8px; color: #c89b5a; font-size: 12px; text-transform: uppercase;">Customer Message:</h4>
          <p style="margin: 0; color: #f8f5f1; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      </div>

      <div style="text-align: center; padding-top: 16px; border-top: 1px solid rgba(200, 155, 90, 0.2); font-size: 11px; color: #888;">
        Sentire by PC Client Services System • Jaipur Atelier
      </div>
    </div>
  `;

  const mailOptions = {
    from: '"Sentire Concierge Desk" <sentireforwork@gmail.com>',
    to: recipientEmail,
    subject: `[New Enquiry ${referenceId}] ${firstName} ${lastName || ''} - ${queryType || 'Order Support'}`,
    html: htmlContent
  };

  try {
    if (process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      logger.info(`Enquiry Email sent to ${recipientEmail} for ${referenceId}`);
    } else {
      logger.info(`[Email Service Triggered] New Enquiry Email created for ${recipientEmail}: ${referenceId}`);
    }
  } catch (error) {
    logger.error('Failed to send enquiry email alert:', error.message);
  }
}

module.exports = {
  sendEnquiryNotificationEmail
};
