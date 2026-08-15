const mongoose = require('mongoose');

const AffiliateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  socialHandle: { type: String },
  referralCode: { type: String, required: true, unique: true, index: true },
  commissionRate: {
    type: Number,
    default: parseFloat(process.env.DEFAULT_AFFILIATE_COMMISSION_RATE || '0.05')
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true
  }
}, { timestamps: true });

module.exports = mongoose.models.Affiliate || mongoose.model('Affiliate', AffiliateSchema);
