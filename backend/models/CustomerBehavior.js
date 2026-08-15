const mongoose = require('mongoose');

const PageViewSchema = new mongoose.Schema({
  url: String,
  viewedAt: { type: Date, default: Date.now }
}, { _id: false });

const InteractionSchema = new mongoose.Schema({
  productId: String,
  action: String, // 'view', 'add_to_cart', 'wishlist'
  interactedAt: { type: Date, default: Date.now }
}, { _id: false });

const CustomerBehaviorSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true, index: true },
  pageViews: [PageViewSchema],
  productInteractions: [InteractionSchema],
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.CustomerBehavior || mongoose.model('CustomerBehavior', CustomerBehaviorSchema);
