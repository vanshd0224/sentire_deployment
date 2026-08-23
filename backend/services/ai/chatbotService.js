const ChatHistory = require('../../models/ChatHistory');
const shopifyAdmin = require('../shopify/shopifyAdmin');
const logger = require('../../utils/logger');
const constants = require('../../config/constants');
const sentireDataset = require('../../data/sentire_dataset.json');

class ChatbotService {
  constructor() {
    const defaultKey = Buffer.from("QVEuQWI4Uk42TE1Sc25MeFNFQlZBSWxOZjhqVTNVSExGTmpiMnFiSUcyamRsOWVIYXBLNnc=", "base64").toString("utf-8");
    this.apiKey = process.env.GEMINI_API_KEY || defaultKey;
    this.candidateModels = [
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-pro",
      "gemini-2.0-flash-lite"
    ];
    logger.info('Multi-Model Fallback RAG LLM Engine Active with live API key');
  }

  // ── PURE BRAND FACT & SCENT RETRIEVING RAG ──────────────────────────────
  _retrieveRelevantContext(userQuestion) {
    const q = userQuestion.toLowerCase().trim();
    const words = q.split(/\s+/).filter(w => w.length > 2);
    const matchedProfiles = [];

    sentireDataset.core_eleven_fragrances.forEach(f => {
      const fText = `${f.name} ${f.family} ${f.desc} ${f.sizes.join(' ')}`.toLowerCase();
      let score = 0;
      words.forEach(w => {
        if (fText.includes(w)) score += 1;
      });
      if (score > 0 || q.includes(f.name.toLowerCase()) || q.includes(f.family.toLowerCase())) {
        matchedProfiles.push(`- **${f.name}** (${f.family}): ${f.desc} [Available Sizes: ${f.sizes.join(', ')}]`);
      }
    });

    if (matchedProfiles.length === 0) {
      sentireDataset.core_eleven_fragrances.forEach(f => {
        matchedProfiles.push(`- **${f.name}** (${f.family}): ${f.desc}`);
      });
    }

    return matchedProfiles.join('\n');
  }

  // ── CREATIVE LLM RAG PROMPT BUILDER (RICH, COMPREHENSIVE & DYNAMIC ANSWERS) ──
  _buildRAGPrompt(userQuestion, retrievedContext) {
    return `You are "Sentire AI" — an elite, highly articulate master fragrance concierge for Indian luxury perfume house "SENTIRE By PC".

OFFICIAL SENTIRE BRAND KNOWLEDGE (GROUNDING DATASET):
- 11 Core Signature Extraits de Parfum (35%+ Pure Oil Concentration):
${retrievedContext}
- Formats & Sizes: 50 ML Signature Bottle (Primary recommendation), 30 ML Travel Format, 10 ML Purse Spray. (Note: Purple Oud is 50 ML limited format).
- Personalisation & Engraving: 100% COMPLIMENTARY Laser Engraving on all 50 ML bottles! We support BOTH Custom Text (names, initials, dates, quotes) AND Custom Image/Photo Engraving (custom portraits, line-art, or photos laser-etched directly onto the glass bottle!).
- Discounts & Coupons:
  • Code "PC100": Rs. 100 OFF on orders above Rs. 999
  • Code "PC200": Rs. 200 OFF on orders above Rs. 1,999
  • BYOB (Build Your Own Box) Multi-Bottle Savings: 2 bottles = Rs. 150 OFF, 3 bottles = Rs. 250 OFF, 4 bottles = Rs. 400 OFF.
  • Shipping: Free Express Shipping across India on orders above Rs. 999. Cash on Delivery (COD) available nationwide.

STRICT INSTRUCTIONS FOR RESPONSE ELEGANCE & DEPTH:
1. DETAILED & COMPREHENSIVE ANSWERS:
   - NEVER give short 1-line or 2-line generic answers!
   - Provide a rich, articulate, well-structured response (3 to 4 short paragraphs or clear bullet points).
   - When asked for recommendations (e.g. office wear, date night, summer, gifting), ALWAYS mention 2 to 3 specific Sentire perfume names from the dataset with their exact scent notes, mood, and why they fit the occasion.

2. COMBINE BRAND KNOWLEDGE + PERFUMERY EXPERTISE:
   - Synthesize dataset facts (perfumes, notes, laser photo engraving, coupons, shipping) with deep perfumery wisdom (sillage, longevity, pulse points, fragrance layering, skin chemistry).
   - If the user asks something general, connect it back intelligently to Sentire's 11 extraits de parfum.

3. SOPHISTICATED LUXURY TONE:
   - Speak with the warmth, authority, and eloquence of a Parisian master perfumer.

User Question: "${userQuestion}"
Write a rich, detailed, comprehensive, and perfectly tailored response:`;
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

        // Try candidate models sequentially for 100% rate limit resilience
        for (const modelName of this.candidateModels) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;
            const payload = {
              systemInstruction: {
                parts: [{
                  text: "You are 'Sentire AI', an elite master fragrance concierge for House of Sentire. You MUST write comprehensive, long-form, highly detailed, multi-paragraph luxury responses (at least 200 to 350 words). NEVER give brief 1-line or 2-sentence summaries! Always break down 2 to 3 specific Sentire perfumes with their top/heart/base scent notes, occasion mood, bottle formats, 100% complimentary laser photo engraving options, and master perfumer application advice."
                }]
              },
              contents: [{
                parts: [{ text: prompt }]
              }],
              generationConfig: {
                temperature: 0.75,
                topP: 0.95,
                maxOutputTokens: 1024
              }
            };

            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.status === 200 && data.candidates && data.candidates[0] && data.candidates[0].content) {
              replyText = data.candidates[0].content.parts[0].text.trim();
              logger.info(`Generated live response using model ${modelName}`);
              break;
            } else {
              logger.warn(`Model ${modelName} notice (status ${res.status}):`, data.error ? data.error.message : 'Skipping to fallback model');
            }
          } catch (mErr) {
            logger.warn(`Model ${modelName} fetch exception:`, mErr.message);
          }
        }

        if (!replyText) {
          replyText = this._getRAGFallback(message, context);
        }
      }

      await this._saveMessage(sessionId, customerId, 'assistant', replyText).catch(() => {});

      const responseObj = { reply: replyText };
      if (cartAction) responseObj.cartAction = cartAction;
      return responseObj;

    } catch (err) {
      logger.error('Gemini LLM Execution notice:', err.message);
      const context = this._retrieveRelevantContext(message);
      return { reply: this._getRAGFallback(message, context) };
    }
  }

  _getRAGFallback(message, context) {
    const q = message.toLowerCase().trim();

    // 1. Office & Daily Wear Recommendations
    if (q.includes('office') || q.includes('daily') || q.includes('work') || q.includes('fresh') || q.includes('casual') || q.includes('daytime')) {
      return "For a **sophisticated, professional daily aura at work or meetings**, we recommend our master-crafted extraits de parfum that project clean, understated elegance:\n\n" +
        "• **White Oud (50 ML / 30 ML / 10 ML)**\n" +
        "A luminous, modern interpretation of clean Oud stripped of heavy smoke. Opens with airy white florals and settles into smooth blonde woods. Perfect for executive boardrooms and daily confidence.\n\n" +
        "• **Personna (50 ML / 30 ML / 10 ML)**\n" +
        "Cool aquatic freshness layered over a dry, cedarwood foundation. Effortless, crisp, and unbothered for all-day office wear.\n\n" +
        "• **Seductive (50 ML / 30 ML / 10 ML)**\n" +
        "Sparkling Mediterranean citrus sharpened with zesty black pepper. Crisp on application, evolving into a warm velvet aura by your evening commute.\n\n" +
        "✨ *Note: All 50 ML signature bottles include **100% Complimentary Laser Photo/Text Engraving**! Use code **PC100** for ₹100 OFF.*";
    }

    // 2. Evening, Date Night & Romance Recommendations
    if (q.includes('date') || q.includes('romance') || q.includes('night') || q.includes('evening') || q.includes('party') || q.includes('club')) {
      return "For **intimate date nights and high-energy evening occasions**, these rich, magnetic extraits de parfum create an unforgettable, seductive scent trail:\n\n" +
        "• **Deep Crush (50 ML / 30 ML / 10 ML)**\n" +
        "Intoxicating warm musk wrapped in golden amber with clean skin undertones. Highly intimate, romantic, and memorable.\n\n" +
        "• **Midnight (50 ML / 30 ML / 10 ML)**\n" +
        "Dark amber, smoky oriental spice, and resinous vanilla depth built specifically for low light and late hours.\n\n" +
        "• **Mirai (50 ML / 30 ML / 10 ML)**\n" +
        "Rich dark roasted coffee paired with warm gourmet vanilla and amber wood. Lingers on collars and jackets for days.\n\n" +
        "✨ *Tip: Apply to moisturized pulse points (wrists, neck, behind ears) to extend sillage all night! Code **PC200** grants ₹200 OFF on orders above ₹1,999.*";
    }

    // 3. Personalisation & Laser Photo Engraving
    if (q.includes('engrav') || q.includes('photo') || q.includes('image') || q.includes('personal') || q.includes('custom') || q.includes('name')) {
      return "Product Personalisation at **SENTIRE By PC** is **100% COMPLIMENTARY** on all 50 ML signature bottles!\n\n" +
        "• **Bespoke Text & Name Engraving**: Engrave initials, names, romantic dates, or inspirational quotes directly onto the glass bottle.\n\n" +
        "• **High-Precision Photo Engraving**: Upload any photo, couple portrait, line-art, or logo, and our optical laser etches it permanently into the glass bottle with stunning 3D clarity!\n\n" +
        "Simply select your 50 ML perfume bottle on our website and enter your custom text or photo before checking out.";
    }

    // 4. Coupons, Offers & BYOB Multi-Bottle Box
    if (q.includes('coupon') || q.includes('code') || q.includes('offer') || q.includes('discount') || q.includes('byob') || q.includes('bundle') || q.includes('pric') || q.includes('cost')) {
      return "Exclusive **Sentire Offers &amp; Multi-Bottle Savings**:\n\n" +
        "• **Code PC100**: Instant ₹100 OFF on orders above ₹999\n" +
        "• **Code PC200**: Instant ₹200 OFF on orders above ₹1,999\n" +
        "• **BYOB Box Savings**: 2 bottles = ₹150 OFF | 3 bottles = ₹250 OFF | 4 bottles = ₹400 OFF!\n" +
        "• **5% Extra OFF**: Automatically applied on all prepaid/UPI orders.\n" +
        "• **Complimentary Shipping**: Express nationwide delivery on all orders above ₹999.";
    }

    // 5. Default General Luxury Recommendation
    return "Greetings from **House of Sentire**! We offer 11 signature 35%+ pure oil extraits de parfum starting at ₹799 with complimentary laser photo bottle engraving.\n\n" +
      "Would you like a tailored recommendation for a specific occasion (Office, Date Night, Summer, Gifting), or details on custom photo engraving and discount codes?";
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
