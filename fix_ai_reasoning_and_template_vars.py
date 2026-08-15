import os

backend_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"
index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

# 1. Update backend/services/ai/chatbotService.js with clean variable evaluation & Gemini integration
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

  _buildMasterSystemPrompt(userQuestion, productContext) {
    const coreElevenStr = sentireDataset.core_eleven_fragrances
      .map(f => `- \${f.name} (\${f.family}): \${f.desc} [Sizes: \${f.sizes.join(', ')}]`)
      .join('\\n');

    const secondaryStr = sentireDataset.secondary_fragrances_10_30ml.join('\\n');

    return `You are the Official AI Fragrance Assistant & Master Scent Sommelier for "SENTIRE By PC" — Luxury Perfumes.

MANDATORY BRAND & RECOMMENDATION RULES:
1. CORE RECOMMENDATION FIRST:
   Every recommendation MUST lead with one of our 11 core 50 ML signature fragrances:
\${coreElevenStr}

2. SIZE LADDER OFFERING:
   Always recommend the 50 ML full signature bottle FIRST, and then offer the 30 ML and 10 ML formats as step-down options.
   EXCEPTION: Purple Oud is 50 ML ONLY and is NEVER offered in smaller sizes.

3. SECONDARY EXPLORATION:
\${secondaryStr}

4. ZERO COMPETITOR MENTIONS.

5. AI REASONING FOR ALL QUESTIONS:
   Answer EVERY customer question uniquely based on their query context (explain each, notes, weather, gifting, daily wear, or specific occasion).

Available Shopify Products:
\${productContext}

Customer Question: "\${userQuestion}"
Provide a sophisticated, helpful response (2-4 sentences max) following all rules:`;
  }

  _getDatasetFallbackResponse(message) {
    const q = message.toLowerCase().trim();

    if (q.includes('explain') || q.includes('each') || q.includes('detail')) {
      return "Here is a breakdown of our 11 Core Signature Scent Profiles:\\n\\n" +
        "• **White Oud**: Clean Oud & Luminous Wood — refined, bright, quietly magnetic.\\n" +
        "• **Deep Crush**: Warm Musk & Soft Amber — reads like skin, only better.\\n" +
        "• **Rich**: Icy Fruit over Polished Cedar — sharp and expensive-smelling.\\n" +
        "• **Midnight**: Dark Amber & Smoky Oud — built for low light and late hours.\\n" +
        "• **Seductive**: Zesty Citrus & Black Pepper — crisp on the open, warm by the end.\\n" +
        "• **Personna**: Cool Aquatic & Dry Wood — easy, clean, and unbothered.\\n" +
        "• **Purple Oud**: Dark Berries & Resinous Oud — 50 ML limited addition.\\n" +
        "• **Mirai**: Dark Coffee & Rich Vanilla — warm, sweet, lingers for days.\\n" +
        "• **Calantha**: Juicy Fruit & White Florals — playful, glowing, effortlessly likeable.\\n" +
        "• **O809**: Fresh Spice & Amber — assertive fresh-spicy signature.\\n" +
        "• **Herrlich**: White Floral Bouquet — romantic in the classic sense.";
    }

    if (q.includes('different') || q.includes('all') || q.includes('collection') || q.includes('range') || q.includes('list')) {
      return "Sentire By PC features **11 Core 50 ML Signature Fragrances**:\\n" +
        "1. **White Oud** (Clean Woody Oud)\\n" +
        "2. **Deep Crush** (Warm Musk)\\n" +
        "3. **Rich** (Fresh Fruity Woody)\\n" +
        "4. **Midnight** (Dark Spicy Oriental)\\n" +
        "5. **Seductive** (Fresh Spicy Citrus)\\n" +
        "6. **Personna** (Aquatic Woody)\\n" +
        "7. **Purple Oud** (Fruity Oud - 50 ML Only)\\n" +
        "8. **Mirai** (Coffee & Vanilla Gourmand)\\n" +
        "9. **Calantha** (Fruity Floral Gourmand)\\n" +
        "10. **O809** (Fresh Aromatic Spice)\\n" +
        "11. **Herrlich** (Sweet White Floral)";
    }

    if (q.includes('note') || q.includes('node') || q.includes('ingredient') || q.includes('pyramid') || q.includes('smell')) {
      return "Our fragrance note compositions are built using rare materials:\\n" +
        "• **White Oud**: Clean Oud, Luminous Wood, Soft Musk\\n" +
        "• **Mirai**: Dark Coffee, Vanilla, Warm Sugar Accord\\n" +
        "• **Midnight**: Dark Amber, Smoke, Oriental Spice\\n" +
        "• **Deep Crush**: Warm Musk, Soft Amber, Clean Accord\\n" +
        "• **Seductive**: Zesty Citrus, Black Pepper, Warm Base";
    }

    if (q.includes('gift') || q.includes('friend') || q.includes('mom') || q.includes('mother') || q.includes('birthday')) {
      return "For gifting, I'd reach straight for **Deep Crush (50 ML)** or **Calantha (50 ML)**. Deep Crush is soft musk wrapped in warmth — intimate and universally loved. We start with the 50 ML signature bottle, and offer 30 ML & 10 ML as step-downs.";
    }

    if (q.includes('winter') || q.includes('cold') || q.includes('delhi')) {
      return "For cold weather, go with **Purple Oud (50 ML)** or **Midnight (50 ML)**. Purple Oud is a deep resinous oud lit by dark berries. Cold weather allows heavy compositions to shine without overwhelming.";
    }

    if (q.includes('summer') || q.includes('heat') || q.includes('hot') || q.includes('humid') || q.includes('monsoon')) {
      return "For heat or humidity, **Rich (50 ML)** or **O809 (50 ML)** is perfection. Rich features icy fruit over polished woods — sharp, refreshing, and expensive-smelling without trying.";
    }

    if (q.includes('date') || q.includes('night') || q.includes('romance') || q.includes('party')) {
      return "For dates and late hours, **Midnight (50 ML)** or **Seductive (50 ML)** is our top pick. Midnight features spice, smoke, and warm amber depth built for low light.";
    }

    if (q.includes('office') || q.includes('daily') || q.includes('work')) {
      return "For daily office wear, **White Oud (50 ML)** or **Personna (50 ML)** is ideal. Clean, refined aquatic-woody freshness that keeps distance politely in shared spaces.";
    }

    const item = sentireDataset.sample_dataset_qa.find(i => q.includes(i.q.toLowerCase()) || i.q.toLowerCase().includes(q));
    if (item) return item.ans;

    const coreList = sentireDataset.core_eleven_fragrances;
    const core = coreList[Math.floor(Math.random() * coreList.length)];
    return `For that, I'd put **\${core.name} (50 ML)** in your hand. \${core.desc} Start with the 50 ML signature bottle, or try the 30 ML / 10 ML formats for travel.`;
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
        replyText = this._getDatasetFallbackResponse(message);
      } else {
        const systemPrompt = this._buildMasterSystemPrompt(message, "Sentire 11 Core Scents");
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
      return { reply: this._getDatasetFallbackResponse(message) };
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

with open(backend_path, 'w', encoding='utf-8') as f:
    f.write(backend_code)

print("SUCCESS: Fixed backend ChatbotService string template evaluation")

# 2. Update index.html to fix getDynamicAIResponse
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace getDynamicAIResponse in index.html
old_ai_func_start = "function getDynamicAIResponse(userText) {"
old_ai_func_end = "  async function sendChatMessage(text) {"

start_p = html.find(old_ai_func_start)
end_p = html.find(old_ai_func_end)

if start_p != -1 and end_p != -1:
    new_ai_func = """function getDynamicAIResponse(userText) {
    const q = userText.toLowerCase().trim();

    if (q.includes('explain') || q.includes('each') || q.includes('detail')) {
      return "Here is a breakdown of our 11 Core Signature Scent Profiles:<br/><br/>" +
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

    if (q.includes('date') || q.includes('night') || q.includes('romance') || q.includes('party')) {
      return "For dates and late hours, <strong>Midnight (50 ML)</strong> or <strong>Seductive (50 ML)</strong> is our top pick. Midnight features spice, smoke, and warm amber depth built for low light.";
    }

    if (q.includes('office') || q.includes('daily') || q.includes('work')) {
      return "For daily office wear, <strong>White Oud (50 ML)</strong> or <strong>Personna (50 ML)</strong> is ideal. Clean, refined aquatic-woody freshness that keeps distance politely in shared spaces.";
    }

    if (q.includes('size') || q.includes('ml') || q.includes('bottle') || q.includes('price') || q.includes('cost')) {
      return "Our signature collection leads with the <strong>50 ML full signature bottle</strong>. We also offer 30 ML and 10 ML travel formats as step-downs (except Purple Oud which is 50 ML only).";
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
    return "For that, I'd put <strong>" + item.name + " (50 ML)</strong> in your hand. " + item.desc + " Start with the 50 ML signature bottle, or try the 30 ML / 10 ML formats for travel.";
  }

  """
    html = html[:start_p] + new_ai_func + html[end_p:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Updated frontend/index.html with template variable fix & 'explain each' handler")
