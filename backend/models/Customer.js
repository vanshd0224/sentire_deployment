const mongoose = require('mongoose');

/** A customer who logged in with phone + OTP: the name they gave us. */
const CustomerSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true }, // +91XXXXXXXXXX (verified by OTP)
    name: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
