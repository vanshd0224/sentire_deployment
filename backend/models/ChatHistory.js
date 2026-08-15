const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const ChatHistorySchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  customerId: {
    type: String,
    index: true
  },
  messages: [MessageSchema]
}, { timestamps: true });

module.exports = mongoose.models.ChatHistory || mongoose.model('ChatHistory', ChatHistorySchema);
