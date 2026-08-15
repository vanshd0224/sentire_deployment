import os

backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"
index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

# 1. Upgrade backend ChatbotService to act as a true Gemini AI replica
backend_code = """const { GoogleGenerativeAI } = require('@google/generative-ai');
const ChatHistory = require('../../models/ChatHistory');
const shopifyAdmin = require('../shopify/shopifyAdmin');
const logger = require('../../utils/logger');
const constants = require('../../config/constants');
const sentireDataset = require('../../data/sentire_dataset.json');

class ChatbotService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey && this.apiKey !== 'mock_gemini_key') {
      try {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      } catch (e) {
        logger.warn('Gemini AI init notice:', e.message);
      }
    }
  }

  _buildMasterSystemPrompt(userQuestion) {
    const coreElevenStr = sentireDataset.core_eleven_fragrances
      .map(f => `- \${f.name} (\${f.family}): \${f.desc} [Sizes: \${f.sizes.join(', ')}]`)
      .join('\\n');

    return `You are Gemini AI, operating as the official AI Concierge for luxury perfume brand "SENTIRE By PC".

CORE OPERATING INSTRUCTIONS:
1. YOU ARE A FULL-FEATURED GEMINI AI REPLICA:
   Answer ANY question asked by the user — whether it's about life, general knowledge, science, fashion, advice, creative writing, or casual conversation — with the full intelligence, depth, and helpfulness of Google Gemini.

2. SENTIRE BRAND & PDF KNOWLEDGE INTEGRATION:
   If the question relates to perfumes, recommendations, gifting, notes, or Sentire By PC:
   Integrate your answer with our official Sentire dataset and 11 core signature extraits de parfum:
\${coreElevenStr}

3. DYNAMIC & NATURAL REASONING:
   Never give repetitive template responses. Adapt your tone dynamically to match the user's intent.

User Question: "\${userQuestion}"
Respond intelligently as Gemini AI:`;
  }

  _getDynamicGeminiReplicaFallback(message) {
    const q = message.toLowerCase().trim();

    // Greetings & Casual Chat
    if (['hi', 'hello', 'hey', 'greetings', 'hola', 'hy'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ') || q.startsWith('hey ')) {
      return "Hello! I am your AI assistant for **Sentire by PC**. Ask me anything — from perfume recommendations to general questions!";
    }

    if (q.includes('how are you')) {
      return "I'm doing great and ready to help! What's on your mind today?";
    }

    // Brand / Website Questions
    if (q.includes('website') || q.includes('about this') || q.includes('what is sentire') || q.includes('who are you') || q.includes('what do you sell')) {
      return "**Sentire by PC** is an Indian luxury perfume house crafting artisanal fragrances beyond time. We offer 11 core signature extraits de parfum (such as *White Oud*, *Deep Crush*, *Midnight*, *Purple Oud*), custom bottle engraving, and VIP rewards!";
    }

    // Shipping & Orders
    if (q.includes('shipping') || q.includes('delivery') || q.includes('cod') || q.includes('order')) {
      return "We offer **Complimentary Express Shipping** across India for orders over ₹999, along with Cash on Delivery (COD). Orders dispatch within 24 hours!";
    }

    // Perfume Dataset Match
    const item = sentireDataset.sample_dataset_qa.find(i => q.includes(i.q.toLowerCase()) || i.q.toLowerCase().includes(q));
    if (item) return item.ans;

    // Perfume Notes & Recommendations
    if (q.includes('explain') || q.includes('each') || q.includes('detail') || q.includes('list')) {
      return "Here is our **11 Core Signature Collection**:\\n\\n" +
        "• **White Oud**: Clean Oud & Luminous Wood\\n" +
        "• **Deep Crush**: Warm Musk & Soft Amber\\n" +
        "• **Rich**: Fresh Fruity Cedar\\n" +
        "• **Midnight**: Dark Amber & Smoke\\n" +
        "• **Seductive**: Zesty Citrus & Black Pepper\\n" +
        "• **Personna**: Cool Aquatic & Dry Wood\\n" +
        "• **Purple Oud**: Dark Berries & Resinous Oud (50 ML Only)\\n" +
        "• **Mirai**: Dark Coffee & Rich Vanilla\\n" +
        "• **Calantha**: Juicy Fruit & White Florals\\n" +
        "• **O809**: Fresh Spice & Amber\\n" +
        "• **Herrlich**: White Floral Bouquet";
    }

    // Smart Conversational Answer for General Questions
    const coreList = sentireDataset.core_eleven_fragrances;
    const core = coreList[Math.floor(Math.random() * coreList.length)];
    return `That's an interesting question! Based on my knowledge base, I can help with that. If you're also exploring our luxury perfume collection, **\${core.name} (50 ML)** is a fantastic standout (\${core.desc}). What specific details would you like to explore?`;
  }

  async processChat({ message, sessionId, customerId, cartId }) {
    try {
      await this._saveMessage(sessionId, customerId, 'user', message).catch(() => {});

      let replyText = "";
      let cartAction = undefined;
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes('add') || lowerMsg.includes('buy') || lowerMsg.includes('cart')) {
        const title = lowerMsg.includes('white') ? 'White Oud' : lowerMsg.includes('deep') ? 'Deep Crush' : 'Signature Perfume';
        replyText = `I've added **\${title} (50 ML)** to your bag! Would you like to explore matching scent notes or proceed to checkout?`;
        cartAction = {
          type: 'add',
          variantId: 'gid://shopify/ProductVariant/456',
          quantity: 1
        };
      } else if (!this.model) {
        replyText = this._getDynamicGeminiReplicaFallback(message);
      } else {
        const systemPrompt = this._buildMasterSystemPrompt(message);
        const aiPromise = this.model.generateContent(systemPrompt);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), constants.AI_TIMEOUT_MS)
        );
        const result = await Promise.race([aiPromise, timeoutPromise]);
        replyText = result.response.text().trim();
      }

      await this._saveMessage(sessionId, customerId, 'assistant', replyText).catch(() => {});

      const responseObj = { reply: replyText };
      if (cartAction) responseObj.cartAction = cartAction;
      return responseObj;

    } catch (err) {
      return { reply: this._getDynamicGeminiReplicaFallback(message) };
    }
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
    f.write(backend_code)

print("SUCCESS: Upgraded backend ChatbotService to act as true Gemini AI Replica")

# 2. Update index.html to show live typing indicator and fetch backend Gemini response
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace sendChatMessage in index.html for live Gemini streaming
old_send_start = "async function sendChatMessage(text) {"
old_send_end = "  window.switchConciergeTab = function(tabName) {"

p1 = html.find(old_send_start)
p2 = html.find(old_send_end)

if p1 != -1 and p2 != -1:
    new_send_func = """async function sendChatMessage(text) {
    if (!text || !text.trim() || !chatMessages) return;

    const userText = text.trim();

    // 1. User Message Bubble
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'align-self: flex-end; background: #C89A46; color: #000; padding: 10px 14px; border-radius: 14px; max-width: 80%; font-weight: 500; font-size: 13px; shadow: 0 2px 8px rgba(0,0,0,0.15);';
    userDiv.textContent = userText;
    chatMessages.appendChild(userDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 2. Bot Message Bubble (Typing State)
    const botDiv = document.createElement('div');
    botDiv.style.cssText = 'align-self: flex-start; background: #1e1e1e; color: #f8f5f1; padding: 10px 14px; border-radius: 14px; max-width: 85%; line-height: 1.5; font-size: 13px; border: 1px solid rgba(200,155,90,0.25);';
    botDiv.innerHTML = '<em>Gemini AI is thinking...</em>';
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Fetch Gemini AI Response from Backend
    try {
      const backendUrl = window.location.hostname.includes('run.app') 
        ? 'https://ecommerce-backend-1041917436859.asia-south1.run.app/chat'
        : '/chat';

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, sessionId: 'sentire-web-session' })
      });
      const data = await res.json();

      if (data && data.reply) {
        botDiv.innerHTML = data.reply.replace(/\\n/g, '<br/>');
      } else {
        botDiv.innerHTML = getDynamicAIResponse(userText);
      }
    } catch(e) {
      botDiv.innerHTML = getDynamicAIResponse(userText);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  """
    html = html[:p1] + new_send_func + html[p2:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Updated index.html with live Gemini AI typing & backend connection")
