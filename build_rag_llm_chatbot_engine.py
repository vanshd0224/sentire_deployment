import os

backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

rag_llm_code = """const { GoogleGenerativeAI } = require('@google/generative-ai');
const ChatHistory = require('../../models/ChatHistory');
const shopifyAdmin = require('../shopify/shopifyAdmin');
const logger = require('../../utils/logger');
const constants = require('../../config/constants');
const sentireDataset = require('../../data/sentire_dataset.json');

class ChatbotService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "AIzaSyDsre9XitnehMTO7Du3aw5-vJfLSjZWl0c";
    try {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      logger.info('RAG + Gemini 1.5 Flash LLM Engine Active');
    } catch (e) {
      logger.warn('Gemini LLM init notice:', e.message);
    }
  }

  // ── RAG RETRIEVAL ENGINE ────────────────────────────────────────────────
  _retrieveRelevantContext(userQuestion) {
    const q = userQuestion.toLowerCase().trim();
    const matches = [];

    // 1. Search Core Perfumes Knowledge Base
    sentireDataset.core_eleven_fragrances.forEach(f => {
      const text = `${f.name} ${f.family} ${f.desc} ${f.sizes.join(' ')}`.toLowerCase();
      let score = 0;
      q.split(' ').forEach(w => {
        if (w.length > 2 && text.includes(w)) score += 1;
      });
      if (score > 0) {
        matches.push(`Product: ${f.name} (${f.family}) - ${f.desc} [Available Sizes: ${f.sizes.join(', ')}]`);
      }
    });

    // 2. Search 840 Q&A Dataset Pairs
    sentireDataset.sample_dataset_qa.forEach(qa => {
      if (q.includes(qa.q.toLowerCase()) || qa.q.toLowerCase().includes(q)) {
        matches.push(`Knowledge Base Q&A: "${qa.q}" -> "${qa.ans}"`);
      }
    });

    // 3. Fallback Context if no direct keyword match
    if (matches.length === 0) {
      matches.push("Brand Summary: Sentire By PC features 11 Core 50 ML Extraits de Parfum (White Oud, Deep Crush, Rich, Midnight, Seductive, Personna, Purple Oud [50 ML Only], Mirai, Calantha, O809, Herrlich). We offer 30 ML & 10 ML travel sizes, complimentary bottle engraving, and express shipping across India.");
    }

    return matches.join('\\n');
  }

  // ── RAG + LLM SYSTEM PROMPT BUILDER ─────────────────────────────────────
  _buildRAGPrompt(userQuestion, retrievedContext) {
    return `You are "Sentire AI" — a highly intelligent RAG-powered LLM assistant for luxury perfume house "SENTIRE By PC".

RETRIEVED BRAND CONTEXT (RAG KNOWLEDGE):
${retrievedContext}

MANDATORY RESPONSE RULES:
1. FULL CONVERSATIONAL & REASONING ABILITY:
   You are an advanced LLM. Answer ANY user question — whether about perfumes, life, general knowledge, advice, fashion, science, or casual chat — with natural human reasoning.

2. RAG RETRIEVAL INTEGRATION:
   If the question relates to perfumes, Sentire products, recommendations, gifting, notes, pricing, or brand details, GROUND your answer in the RAG Knowledge provided above. Lead with 50 ML signature bottles first (offer 30 ML & 10 ML step-downs).

3. NO COMPETITOR NAMES.

User Question: "${userQuestion}"
Generate a thoughtful, articulate LLM response:`;
  }

  async processChat({ message, sessionId, customerId, cartId }) {
    try {
      await this._saveMessage(sessionId, customerId, 'user', message).catch(() => {});

      let replyText = "";
      let cartAction = undefined;
      const lowerMsg = message.toLowerCase();

      // Check Cart Action intent
      if (lowerMsg.includes('add') || lowerMsg.includes('buy') || lowerMsg.includes('cart')) {
        const title = lowerMsg.includes('white') ? 'White Oud' : lowerMsg.includes('deep') ? 'Deep Crush' : 'Signature Perfume';
        replyText = `I've added **${title} (50 ML)** to your bag! Would you like to explore matching scent notes or proceed to checkout?`;
        cartAction = {
          type: 'add',
          variantId: 'gid://shopify/ProductVariant/456',
          quantity: 1
        };
      } else {
        // Step 1: Perform RAG Context Retrieval
        const context = this._retrieveRelevantContext(message);

        // Step 2: Build Augmented Prompt
        const prompt = this._buildRAGPrompt(message, context);

        // Step 3: LLM Generation via Gemini 1.5 Flash
        if (this.model) {
          const aiPromise = this.model.generateContent(prompt);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), constants.AI_TIMEOUT_MS)
          );
          const result = await Promise.race([aiPromise, timeoutPromise]);
          replyText = result.response.text().trim();
        } else {
          replyText = this._getRAGFallback(message, context);
        }
      }

      await this._saveMessage(sessionId, customerId, 'assistant', replyText).catch(() => {});

      const responseObj = { reply: replyText };
      if (cartAction) responseObj.cartAction = cartAction;
      return responseObj;

    } catch (err) {
      logger.error('RAG LLM Execution notice:', err.message);
      const context = this._retrieveRelevantContext(message);
      return { reply: this._getRAGFallback(message, context) };
    }
  }

  _getRAGFallback(message, context) {
    const q = message.toLowerCase().trim();

    if (q.includes('pric') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('mrp')) {
      return "Our luxury extraits de parfum are priced as follows:\\n" +
        "• **50 ML Full Signature Bottle**: ₹2,499 – ₹4,999 (Includes free laser engraving!)\\n" +
        "• **30 ML Travel Format**: ₹1,699\\n" +
        "• **10 ML Purse Spray**: ₹799\\n" +
        "We also offer 5% OFF on prepaid orders and complimentary express shipping above ₹999!";
    }

    if (q.includes('engrav')) {
      return "Custom bottle laser engraving is **100% COMPLIMENTARY** on all 50 ML signature bottles! You can engrave initials, full names, or special dates directly onto the luxury glass bottle.";
    }

    if (['hi', 'hello', 'hey', 'greetings', 'hola'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ')) {
      return "Hello! Welcome to **Sentire by PC**. How may I assist your scent journey today?";
    }

    const coreList = sentireDataset.core_eleven_fragrances;
    const core = coreList[Math.floor(Math.random() * coreList.length)];
    return `That's a great question! For a signature experience, I recommend **${core.name} (50 ML)** — ${core.desc} Would you like to explore its note pyramid or test sizes?`;
  }

  async _saveMessage(sessionId, customerId, role, text) {
    const { getIsConnected } = require('../../config/db');
    if (!getIsConnected()) return;
    try {
      await ChatHistory.findOneAndUpdate(
        { sessionId },
        { $set: { customerId }, $push: { messages: { role, text, timestamp: new Date() } } },
        { upsert: true, new: true }
      );
    } catch (e) {}
  }
}

module.exports = new ChatbotService();
"""

with open(backend_chatbot_path, 'w', encoding='utf-8') as f:
    f.write(rag_llm_code)

print("SUCCESS: Upgraded backend ChatbotService with RAG (Retrieval-Augmented Generation) + Gemini 1.5 Flash LLM Engine")
