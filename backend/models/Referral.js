const mongoose = require('mongoose');

const ReferralHistorySchema = new mongoose.Schema({
  type: { type: String, enum: ['earned', 'redeemed'], required: true },
  points: { type: Number, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  description: { type: String, required: true }
}, { _id: false });

const ReferralSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  referredCustomers: [{
    customerId: String,
    referredAt: Date
  }],
  rewardsEarned: {
    type: Number,
    default: 0
  },
  history: [ReferralHistorySchema]
}, { timestamps: true });

module.exports = mongoose.models.Referral || mongoose.model('Referral', ReferralSchema);
