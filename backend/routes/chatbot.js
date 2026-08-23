const express = require('express');
const router = express.Router();
const { z } = require('zod');
const chatbotService = require('../services/ai/chatbotService');
const { expensiveRouteLimiter } = require('../middleware/rateLimiter');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

// Input Validation Schema
const chatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  sessionId: z.string().min(1, 'SessionId is required'),
  customerId: z.string().optional(),
  cartId: z.string().optional()
});

/**
 * POST /chat
 * Conversational AI chatbot route (Unlimited RAG LLM response engine)
 */
router.post('/', async (req, res) => {
  // Validate input
  const validation = chatSchema.safeParse(req.body);
  if (!validation.success) {
    logger.warn(`Invalid /chat input payload: ${JSON.stringify(validation.error.errors)}`);
    return error(res, validation.error.errors[0].message, 'VALIDATION_ERROR', 400);
  }

  try {
    const responseObj = await chatbotService.processChat(validation.data);
    return res.status(200).json(responseObj);
  } catch (err) {
    logger.error(`Error processing chat message: ${err.message}`);
    // Non-negotiable contract rule: return graceful apology with 200, no cartAction
    return res.status(200).json({
      reply: "Sorry, I'm having trouble right now — try again in a moment"
    });
  }
});

module.exports = router;
