const mongoose = require('mongoose');

const AnalyticsEventSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  customerId: { type: String, index: true },
  metadata: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

module.exports = mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
