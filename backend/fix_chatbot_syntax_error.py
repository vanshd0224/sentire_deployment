import os

service_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

clean_code = """const { GoogleGenerativeAI } = require('@google/generative-ai');
const ChatHistory = require('../../models/ChatHistory');
const shopifyAdmin = require('../shopify/shopifyAdmin');
const logger = require('../../utils/logger');
const constants = require('../../config/constants');
const sentireDataset = require('../../data/sentire_dataset.json');

class ChatbotService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey && this.apiKey !== 'mock_gemini_key') {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  /**
   * Constructs the master system prompt trained on the official Sentire 840 Q&A Dataset & Rules
   */
  _buildMasterSystemPrompt(userQuestion, productContext) {
    const coreElevenStr = sentireDataset.core_eleven_fragrances
      .map(f => `- ${f.name} (${f.family}): ${f.desc} [Sizes: ${f.sizes.join(', ')}]`)
      .join('\\n');

    const secondaryStr = sentireDataset.secondary_fragrances_10_30ml.join('\\n');

    return `You are the Official AI Fragrance Assistant & Master Scent Sommelier for "SENTIRE By PC" — Luxury Perfumes.

MANDATORY BRAND & RECOMMENDATION RULES (SOURCE OF TRUTH):
1. CORE RECOMMENDATION FIRST:
   Every recommendation MUST lead with one of our 11 core 50 ML signature fragrances:
\${coreElevenStr}

2. SIZE LADDER OFFERING:
   Always recommend the 50 ML full signature bottle FIRST, and then offer the 30 ML and 10 ML formats as step-down options.
   EXCEPTION: Purple Oud is 50 ML ONLY (limited edition to the house) and is NEVER offered in smaller sizes.

3. SECONDARY EXPLORATION:
   Secondary fragrances may only appear as optional 30 ML / 10 ML exploration AFTER the core recommendation:
\${secondaryStr}

4. ZERO COMPETITOR MENTIONS:
   NEVER name or refer to outside designer houses or competitor brand names under any circumstances.

5. AI INTELLIGENCE & ADAPTABILITY:
   For questions matched in our dataset, provide exact brand-voice recommendations.
   For NEW or UNSEEN customer questions, use your intelligence to match their mood, occasion, weather, season, budget, or personality to Sentire's core fragrance profiles while maintaining our luxurious, warm, articulate, and magnetic brand voice.

Available Shopify Products:
\${productContext}

Customer Question: "\${userQuestion}"

Provide a sophisticated, helpful response (2-4 sentences max) following all rules:`;
  }

  /**
   * Processes chatbot message and returns reply + optional cartAction
   */
  async processChat({ message, sessionId, customerId, cartId }) {
    const fallbackReply = "Sentire Fragrance Master recommends trying our signature White Oud 50ml or Deep Crush 50ml — crafted beyond time. How may I assist your scent journey today?";

    try {
      // 1. Log incoming user message to ChatHistory
      await this._saveMessage(sessionId, customerId, 'user', message).catch(err => 
        logger.warn(`Could not save user chat history: \${err.message}`)
      );

      // 2. Fetch products context from Shopify
      const products = await shopifyAdmin.getProducts().catch(() => []);
      const productContext = products.length > 0 
        ? products.map(p => `\${p.title} (Variant ID: \${p.variants?.[0]?.id || 'gid://shopify/ProductVariant/456'})`).join('\\n')
        : "White Oud (50ml, 30ml, 10ml), Deep Crush (50ml, 30ml, 10ml), Rich (50ml, 30ml, 10ml), Midnight (50ml, 30ml, 10ml), Seductive (50ml, 30ml, 10ml), Personna (50ml, 30ml, 10ml), Purple Oud (50ml only), Mirai (50ml, 30ml, 10ml), Calantha (50ml, 30ml, 10ml), O809 (50ml, 30ml, 10ml), Herrlich (50ml, 30ml, 10ml)";

      let replyText = "";
      let cartAction = undefined;

      const lowerMsg = message.toLowerCase();

      // Check simple cart purchase triggers
      if (lowerMsg.includes('add') || lowerMsg.includes('buy') || lowerMsg.includes('cart')) {
        const matchedProduct = products.find(p => lowerMsg.includes(p.title.toLowerCase()) || lowerMsg.includes(p.handle));
        const variantId = matchedProduct?.variants?.[0]?.id || 'gid://shopify/ProductVariant/456';
        const title = matchedProduct?.title || 'item';

        replyText = `I've added \${title} (50 ML) to your bag! Would you like to explore matching scent notes or proceed to checkout?`;
        cartAction = {
          type: 'add',
          variantId: variantId.toString().startsWith('gid://') ? variantId.toString() : `gid://shopify/ProductVariant/\${variantId}`,
          quantity: 1
        };
      } else {
        // Search dataset for exact/keyword match first
        const matchedQA = sentireDataset.sample_dataset_qa.find(item => 
          lowerMsg.includes(item.q.toLowerCase()) || item.q.toLowerCase().includes(lowerMsg)
        );

        if (matchedQA) {
          replyText = matchedQA.ans;
        } else if (!this.model) {
          // Dataset-informed fallback response if Gemini model not instantiated
          replyText = "For that, I'd reach straight for Deep Crush or White Oud. Deep Crush is soft musk wrapped in warmth — intimate and quietly magnetic. Start with the 50 ML full signature bottle, or try the 30 ML / 10 ML formats for travel.";
        } else {
          // AI Call using trained Master System Prompt
          const systemPrompt = this._buildMasterSystemPrompt(message, productContext);

          const aiPromise = this.model.generateContent(systemPrompt);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('AI Chatbot request timed out')), constants.AI_TIMEOUT_MS)
          );

          const result = await Promise.race([aiPromise, timeoutPromise]);
          replyText = result.response.text().trim();
        }
      }

      // 3. Save assistant reply to ChatHistory
      await this._saveMessage(sessionId, customerId, 'assistant', replyText).catch(err =>
        logger.warn(`Could not save assistant chat history: \${err.message}`)
      );

      const responseObj = { reply: replyText };
      if (cartAction) {
        responseObj.cartAction = cartAction;
      }

      return responseObj;

    } catch (err) {
      logger.error(`Chatbot service error (fail soft): \${err.message}`);
      return { reply: fallbackReply };
    }
  }

  async _saveMessage(sessionId, customerId, role, text) {
    const { getIsConnected } = require('../../config/db');
    if (!getIsConnected()) return;

    try {
      await ChatHistory.findOneAndUpdate(
        { sessionId },
        {
          $set: { customerId },
          $push: { messages: { role, text, timestamp: new Date() } }
        },
        { upsert: true, new: true }
      );
    } catch (e) {
      // Fail-safe logging
    }
  }
}

module.exports = new ChatbotService();
"""

with open(service_path, 'w', encoding='utf-8') as f:
    f.write(clean_code)

print("SUCCESS: Fixed syntax error in backend/services/ai/chatbotService.js")
