const mongoose = require('mongoose');

const AffiliateConversionSchema = new mongoose.Schema({
  affiliateId: { type: String, required: true, index: true },
  orderId: { type: String, required: true, unique: true, index: true },
  orderValue: { type: Number, required: true },
  commissionAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
    index: true
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.AffiliateConversion || mongoose.model('AffiliateConversion', AffiliateConversionSchema);
