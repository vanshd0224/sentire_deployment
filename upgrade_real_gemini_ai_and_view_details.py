import os

backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"
index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"
bestsellers_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\BestSellers.tsx"
new_arrivals_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\NewArrivals.tsx"

# 1. Update backend/services/ai/chatbotService.js to behave like a true conversational AI
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

    return `You are "Sentire AI" — a natural, warm, and highly intelligent AI Chatbot for luxury fragrance house "SENTIRE By PC".

BEHAVIOR INSTRUCTIONS:
1. NATURAL CHATBOT CONVERSATION:
   If the user says greetings (e.g. "hi", "hello", "hey", "good morning"), respond warmly like a real AI assistant.
   Example: "Hello! Welcome to Sentire by PC. How may I assist your scent journey today?"

2. FIRST PRIORITY — SENTIRE KNOWLEDGE BASE:
   For questions about Sentire perfumes, recommendations, gifting, notes, weather, or occasions, prioritize our 11 core signature 50 ML perfumes:
\${coreElevenStr}

3. OUTSIDE & GENERAL QUESTIONS:
   For any general or outside questions (e.g. perfume application tips, scent longevity science, fragrance notes, lifestyle, fashion, or general conversation), answer naturally using your full AI knowledge just like the Gemini app, while keeping a refined, helpful tone.

4. NO COMPETITOR NAMES.

User Question: "\${userQuestion}"
Respond naturally as a friendly, intelligent AI assistant:`;
  }

  _getSmartConversationalFallback(message) {
    const q = message.toLowerCase().trim();

    // Greetings
    if (['hi', 'hello', 'hey', 'greetings', 'hola', 'hy'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ')) {
      return "Hello! Greetings from **Sentire by PC**. How may I assist your scent journey today?";
    }

    if (q.includes('how are you')) {
      return "I'm doing wonderfully! Ready to guide you through our luxury perfume collection or answer any fragrance questions you have.";
    }

    if (q.includes('explain') || q.includes('each') || q.includes('detail')) {
      return "Here is a breakdown of our **11 Core Signature Fragrances**:\\n\\n" +
        "• **White Oud** (Clean Oud & Luminous Wood) — Refined, bright, quietly magnetic.\\n" +
        "• **Deep Crush** (Warm Musk & Soft Amber) — Reads like skin, only better.\\n" +
        "• **Rich** (Fresh Fruity Cedar) — Sharp and expensive-smelling.\\n" +
        "• **Midnight** (Dark Amber & Smoke) — Built for low light and late hours.\\n" +
        "• **Seductive** (Fresh Spicy Citrus) — Crisp on open, warm by the end.\\n" +
        "• **Personna** (Cool Aquatic & Dry Wood) — Easy, clean, unbothered.\\n" +
        "• **Purple Oud** (Dark Berries & Resinous Oud) — 50 ML limited addition.\\n" +
        "• **Mirai** (Dark Coffee & Rich Vanilla) — Warm, sweet, lingers for days.\\n" +
        "• **Calantha** (Juicy Fruit & White Florals) — Playful, glowing, effortlessly likeable.\\n" +
        "• **O809** (Fresh Spice & Amber) — Assertive fresh-spicy signature.\\n" +
        "• **Herrlich** (White Floral Bouquet) — Romantic in the classic sense.";
    }

    if (q.includes('apply') || q.includes('wear') || q.includes('spray') || q.includes('last longer')) {
      return "To maximize fragrance longevity: Spray on moisturized pulse points (wrists, neck, behind ears). Fabric holds scent longer than skin, so a light mist on your collar or jacket extends the trail for days!";
    }

    if (q.includes('gift') || q.includes('birthday') || q.includes('friend') || q.includes('mom')) {
      return "For gifting, **Deep Crush (50 ML)** or **Calantha (50 ML)** is a widely loved choice. We start with the 50 ML signature bottle, and offer 30 ML & 10 ML as step-downs.";
    }

    if (q.includes('winter') || q.includes('cold') || q.includes('delhi')) {
      return "For cold weather, **Purple Oud (50 ML)** or **Midnight (50 ML)** is exceptional. Cold air allows rich amber and resinous oud to shine without overwhelming.";
    }

    if (q.includes('summer') || q.includes('heat') || q.includes('hot') || q.includes('humid')) {
      return "For warm weather, **Rich (50 ML)** or **Personna (50 ML)** provides refreshing icy-fruity and aquatic-woody notes that stay crisp all day.";
    }

    // Default intelligent answer
    const core = sentireDataset.core_eleven_fragrances[Math.floor(Math.random() * sentireDataset.core_eleven_fragrances.length)];
    return `That's a great question! For a signature experience, I recommend **\${core.name} (50 ML)** — \${core.desc} Would you like to explore its note pyramid or test sizes?`;
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
        replyText = this._getSmartConversationalFallback(message);
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
      return { reply: this._getSmartConversationalFallback(message) };
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

print("SUCCESS: Upgraded backend ChatbotService to behave like a true conversational AI (Gemini App style)")

# 2. Update frontend/index.html AI Chatbot logic for true conversation
with open(index_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace getDynamicAIResponse in index.html with smart conversational engine
old_func_start = "function getDynamicAIResponse(userText) {"
old_func_end = "  async function sendChatMessage(text) {"

p1 = html_content.find(old_func_start)
p2 = html_content.find(old_func_end)

if p1 != -1 and p2 != -1:
    new_conversational_func = """function getDynamicAIResponse(userText) {
    const q = userText.toLowerCase().trim();

    // Greetings & Casual Conversation
    if (['hi', 'hello', 'hey', 'greetings', 'hola', 'hy'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ') || q.startsWith('hey ')) {
      return "Hello! Welcome to <strong>Sentire by PC</strong>. How may I assist your scent journey today?";
    }

    if (q.includes('how are you')) {
      return "I'm doing wonderfully! Ready to help you discover your perfect perfume or answer any fragrance questions.";
    }

    if (q.includes('explain') || q.includes('each') || q.includes('detail')) {
      return "Here is a breakdown of our <strong>11 Core Signature Scent Profiles</strong>:<br/><br/>" +
        "• <strong>White Oud</strong>: Clean Oud & Luminous Wood — refined, bright, quietly magnetic.<br/>" +
        "• <strong>Deep Crush</strong>: Warm Musk & Soft Amber — reads like skin, only better.<br/>" +
        "• <strong>Rich</strong>: Icy Fruit over Polished Cedar — sharp and expensive-smelling.<br/>" +
        "• <strong>Midnight</strong>: Dark Amber & Smoky Oud — built for low light and late hours.<br/>" +
        "• <strong>Seductive</strong>: Zesty Citrus & Black Pepper — crisp on the open, warm by the end.<br/>" +
        "• <strong>Personna</strong>: Cool Aquatic & Dry Wood — easy, clean, and unbothered.<br/>" +
        "• <strong>Purple Oud</strong>: Dark Berries & Resinous Oud — 50 ML limited addition.<br/>" +
        "• <strong>Mirai</strong>: Dark Coffee & Rich Vanilla — warm, sweet, lingers for days.<br/>" +
        "• <strong>Calantha</strong>: Juicy Fruit & White Florals — playful, glowing, effortlessly likeable.<br/>" +
        "• <strong>O809</strong>: Fresh Spice & Amber — assertive fresh-spicy signature.<br/>" +
        "• <strong>Herrlich</strong>: White Floral Bouquet — romantic in the classic sense.";
    }

    if (q.includes('apply') || q.includes('wear') || q.includes('spray') || q.includes('last longer')) {
      return "To maximize fragrance longevity: Spray on moisturized pulse points (wrists, neck, behind ears). Fabric holds scent longer than skin, so a light mist on your collar or jacket extends the trail for days!";
    }

    if (q.includes('different') || q.includes('all') || q.includes('collection') || q.includes('range') || q.includes('list')) {
      return "Sentire By PC features <strong>11 Core 50 ML Signature Fragrances</strong>:<br/>" +
        "1. <strong>White Oud</strong> (Clean Woody Oud)<br/>" +
        "2. <strong>Deep Crush</strong> (Warm Musk)<br/>" +
        "3. <strong>Rich</strong> (Fresh Fruity Woody)<br/>" +
        "4. <strong>Midnight</strong> (Dark Spicy Oriental)<br/>" +
        "5. <strong>Seductive</strong> (Fresh Spicy Citrus)<br/>" +
        "6. <strong>Personna</strong> (Aquatic Woody)<br/>" +
        "7. <strong>Purple Oud</strong> (Fruity Oud - 50 ML Only)<br/>" +
        "8. <strong>Mirai</strong> (Coffee & Vanilla Gourmand)<br/>" +
        "9. <strong>Calantha</strong> (Fruity Floral Gourmand)<br/>" +
        "10. <strong>O809</strong> (Fresh Aromatic Spice)<br/>" +
        "11. <strong>Herrlich</strong> (Sweet White Floral)";
    }

    if (q.includes('note') || q.includes('node') || q.includes('ingredient') || q.includes('pyramid') || q.includes('smell')) {
      return "Our fragrance note compositions are built using rare materials:<br/>" +
        "• <strong>White Oud</strong>: Clean Oud, Luminous Wood, Soft Musk<br/>" +
        "• <strong>Mirai</strong>: Dark Coffee, Vanilla, Warm Sugar Accord<br/>" +
        "• <strong>Midnight</strong>: Dark Amber, Smoke, Oriental Spice<br/>" +
        "• <strong>Deep Crush</strong>: Warm Musk, Soft Amber, Clean Accord<br/>" +
        "• <strong>Seductive</strong>: Zesty Citrus, Black Pepper, Warm Base";
    }

    if (q.includes('gift') || q.includes('friend') || q.includes('mom') || q.includes('mother') || q.includes('birthday')) {
      return "For gifting, I'd reach straight for <strong>Deep Crush (50 ML)</strong> or <strong>Calantha (50 ML)</strong>. Deep Crush is soft musk wrapped in warmth — intimate and universally loved. We start with the 50 ML signature bottle, and offer 30 ML & 10 ML as step-downs.";
    }

    if (q.includes('winter') || q.includes('cold') || q.includes('delhi')) {
      return "For cold weather, go with <strong>Purple Oud (50 ML)</strong> or <strong>Midnight (50 ML)</strong>. Purple Oud is a deep resinous oud lit by dark berries. Cold weather allows heavy compositions to shine without overwhelming.";
    }

    if (q.includes('summer') || q.includes('heat') || q.includes('hot') || q.includes('humid') || q.includes('monsoon')) {
      return "For heat or humidity, <strong>Rich (50 ML)</strong> or <strong>O809 (50 ML)</strong> is perfection. Rich features icy fruit over polished woods — sharp, refreshing, and expensive-smelling without trying.";
    }

    const coreList = [
      { name: "White Oud", desc: "Clean Oud & Luminous Wood — refined, bright, quietly magnetic." },
      { name: "Deep Crush", desc: "Warm Musk & Soft Amber — reads like skin, only better." },
      { name: "Rich", desc: "Icy Fruit over Polished Cedar — sharp and expensive-smelling." },
      { name: "Midnight", desc: "Dark Amber & Smoky Oud — built for low light and late hours." },
      { name: "Seductive", desc: "Zesty Citrus & Black Pepper — crisp on the open, warm by the end." },
      { name: "Personna", desc: "Cool Aquatic & Dry Wood — easy, clean, and unbothered." },
      { name: "Mirai", desc: "Dark Coffee & Rich Vanilla — warm, sweet, lingers for days." },
      { name: "Calantha", desc: "Juicy Fruit & White Florals — playful, glowing, effortlessly likeable." }
    ];
    const item = coreList[Math.floor(Math.random() * coreList.length)];
    return "That's a great question! I recommend <strong>" + item.name + " (50 ML)</strong> — " + item.desc + " Start with the 50 ML signature bottle, or try 30 ML / 10 ML travel sizes.";
  }

  """
    html_content = html_content[:p1] + new_conversational_func + html_content[p2:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("SUCCESS: Updated frontend/index.html with natural conversational AI engine")
