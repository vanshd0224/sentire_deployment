const mongoose = require('mongoose');

/**
 * Orders placed through Shiprocket Checkout, as reported by its order
 * webhook (which may arrive more than once — keyed on Shiprocket's
 * order_id, so repeats update the same record).
 */
const ShiprocketOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  status: { type: String, index: true }, // CREATED / INITIATED / FAILED / SUCCESS
  paymentType: { type: String }, // CASH_ON_DELIVERY / PREPAID
  paymentStatus: { type: String }, // Pending / Success / Failed
  phone: { type: String, index: true },
  email: { type: String },
  items: [{ variantId: String, quantity: Number }],
  totalAmount: { type: Number },
  customAttributes: { type: mongoose.Schema.Types.Mixed },
  payload: { type: mongoose.Schema.Types.Mixed }, // the full webhook body, as received
  webhookCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.models.ShiprocketOrder || mongoose.model('ShiprocketOrder', ShiprocketOrderSchema);
