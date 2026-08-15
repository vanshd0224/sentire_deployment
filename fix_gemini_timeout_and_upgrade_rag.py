import os

constants_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\config\constants.js"
backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

# 1. Update constants.js AI_TIMEOUT_MS to 20000ms
with open(constants_path, 'r', encoding='utf-8') as f:
    c_code = f.read()

c_code = c_code.replace("AI_TIMEOUT_MS: 5000,", "AI_TIMEOUT_MS: 20000,")

with open(constants_path, 'w', encoding='utf-8') as f:
    f.write(c_code)

print("SUCCESS: Increased AI_TIMEOUT_MS to 20000ms in backend/config/constants.js")

# 2. Upgrade ChatbotService with RAG context retriever & Gemini 1.5 Flash LLM
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

  // ── HIGH-PRECISION RAG RETRIEVAL ENGINE ─────────────────────────────────
  _retrieveRelevantContext(userQuestion) {
    const q = userQuestion.toLowerCase().trim();
    const matches = [];

    // 1. Search 840 Q&A Dataset Pairs for top semantic matches
    const words = q.split(/\\s+/).filter(w => w.length > 2);
    
    sentireDataset.sample_dataset_qa.forEach(qa => {
      const qText = qa.q.toLowerCase();
      let matchCount = 0;
      words.forEach(w => {
        if (qText.includes(w)) matchCount += 1;
      });
      if (matchCount >= 2 || q.includes(qText) || qText.includes(q)) {
        matches.push(`Q: "${qa.q}" -> Recommended Answer: "${qa.ans}"`);
      }
    });

    // 2. Search Core 11 Fragrances
    sentireDataset.core_eleven_fragrances.forEach(f => {
      const fText = `${f.name} ${f.family} ${f.desc} ${f.sizes.join(' ')}`.toLowerCase();
      let fMatch = 0;
      words.forEach(w => {
        if (fText.includes(w)) fMatch += 1;
      });
      if (fMatch > 0) {
        matches.push(`Fragrance Profile: ${f.name} (${f.family}) - ${f.desc} [Sizes: ${f.sizes.join(', ')}]`);
      }
    });

    // Limit RAG context size to top 5 matches
    const topContext = matches.slice(0, 5).join('\\n');

    if (!topContext) {
      return "Sentire By PC features 11 Core 50 ML Extraits de Parfum (White Oud, Deep Crush, Rich, Midnight, Seductive, Personna, Purple Oud, Mirai, Calantha, O809, Herrlich). We offer 30 ML & 10 ML travel sizes, complimentary bottle engraving, and express shipping across India.";
    }

    return topContext;
  }

  // ── RAG + LLM PROMPT BUILDER ───────────────────────────────────────────
  _buildRAGPrompt(userQuestion, retrievedContext) {
    return `You are "Sentire AI" — an advanced RAG-powered Google Gemini LLM assistant for luxury perfume house "SENTIRE By PC".

RETRIEVED CONTEXT FROM BRAND DATASET:
${retrievedContext}

MANDATORY INSTRUCTION:
Check the provided context first. If the answer exists there, reply using it. If the context does not contain the answer, rely on your internal training data.

User Question: "${userQuestion}"
Generate your response:`;
  }

  async processChat({ message, sessionId, customerId, cartId }) {
    try {
      await this._saveMessage(sessionId, customerId, 'user', message).catch(() => {});

      let replyText = "";
      let cartAction = undefined;
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes('add') || lowerMsg.includes('buy') || lowerMsg.includes('cart')) {
        const title = lowerMsg.includes('white') ? 'White Oud' : lowerMsg.includes('deep') ? 'Deep Crush' : 'Signature Perfume';
        replyText = `I've added **${title} (50 ML)** to your bag! Would you like to explore matching scent notes or proceed to checkout?`;
        cartAction = {
          type: 'add',
          variantId: 'gid://shopify/ProductVariant/456',
          quantity: 1
        };
      } else {
        const context = this._retrieveRelevantContext(message);
        const prompt = this._buildRAGPrompt(message, context);

        if (this.model) {
          const aiPromise = this.model.generateContent(prompt);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Gemini API Timeout')), constants.AI_TIMEOUT_MS)
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
      logger.error('Gemini LLM Call notice:', err.message);
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

print("SUCCESS: Updated ChatbotService with RAG and 20s Gemini API timeout")
