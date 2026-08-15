const mongoose = require('mongoose');

const AffiliateClickSchema = new mongoose.Schema({
  affiliateId: { type: String, required: true, index: true },
  referralCode: { type: String, required: true, index: true },
  source: { type: String }, // IP or HTTP Referrer header
  timestamp: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

module.exports = mongoose.models.AffiliateClick || mongoose.model('AffiliateClick', AffiliateClickSchema);
