const mongoose = require('mongoose');

const LoyaltyPointsSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.models.LoyaltyPoints || mongoose.model('LoyaltyPoints', LoyaltyPointsSchema);
