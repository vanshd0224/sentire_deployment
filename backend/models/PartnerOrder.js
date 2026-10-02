const mongoose = require('mongoose');

/**
 * An order credited to a partner. Commission is `pending` until the parcel
 * is delivered (`earned`), `cancelled` if it isn't (cancelled / returned to
 * origin), and `paid` once paid out. No customer details are kept here.
 */
const PartnerOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // Shiprocket Checkout order id
    orderNumber: { type: String, default: '' }, // Fastrr order number, as customers see it
    code: { type: String, required: true, index: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', index: true },
    placedAt: { type: Date },
    orderValue: { type: Number, required: true }, // products after discount, without COD / shipping
    commissionRate: { type: Number, required: true },
    commission: { type: Number, required: true },
    paymentType: { type: String, default: '' },
    couponUsed: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'earned', 'cancelled', 'paid'], default: 'pending', index: true },
    shipmentStatus: { type: String, default: '' },
    deliveredAt: { type: Date },
    paidAt: { type: Date },
    payoutRef: { type: String, default: '' },
  },
  { timestamps: true },
);

module.exports = mongoose.models.PartnerOrder || mongoose.model('PartnerOrder', PartnerOrderSchema);
