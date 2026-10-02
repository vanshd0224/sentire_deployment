const mongoose = require('mongoose');

/**
 * An influencer partner. Their code is both their link (sentirebypc.com/r/CODE)
 * and their coupon (₹150 off orders of ₹1,249+); they earn `commissionRate`
 * of the product value of orders that come through it, once delivered.
 */
const PartnerSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true }, // +91XXXXXXXXXX, their login
    instagram: { type: String, trim: true, default: '' },
    upiId: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'paused', 'rejected'], default: 'pending', index: true },
    commissionRate: { type: Number, default: 0.15, min: 0, max: 0.5 },
    discountOff: { type: Number, default: 150 },
    minOrder: { type: Number, default: 1249 },
    clicks: { type: Number, default: 0 },
    lastClickAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);
