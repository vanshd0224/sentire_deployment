const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  referenceId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  preferredContact: { type: String, default: 'Email' },
  orderNumber: { type: String },
  queryType: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'NEW' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
