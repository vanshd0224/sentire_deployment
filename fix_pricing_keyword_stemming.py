import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"
backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

# 1. Update index.html to handle 'pricing', 'price', 'rate', 'cost', 'how much', 'rs', 'rupee'
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace getDynamicAIResponse in index.html with stem matching for pricing and all queries
old_start = "function getDynamicAIResponse(userText) {"
old_end = "  async function sendChatMessage(text) {"

p1 = html.find(old_start)
p2 = html.find(old_end)

if p1 != -1 and p2 != -1:
    new_engine = """function getDynamicAIResponse(userText) {
    const q = userText.toLowerCase().trim();

    // 1. Pricing / Cost / Rates / How Much
    if (q.includes('pric') || q.includes('cost') || q.includes('rate') || q.includes('rupee') || q.includes('rs') || q.includes('how much') || q.includes('mrp') || q.includes('buy') || q.includes('amount')) {
      return "Our luxury extraits de parfum are priced as follows:<br/>" +
        "• <strong>50 ML Full Signature Bottle</strong>: ₹2,499 – ₹4,999 (Includes free laser engraving!)<br/>" +
        "• <strong>30 ML Travel Format</strong>: ₹1,699<br/>" +
        "• <strong>10 ML Purse Spray</strong>: ₹799<br/>" +
        "We also offer 5% OFF on prepaid orders and complimentary express shipping above ₹999!";
    }

    // 2. Greetings & Casual Chat
    if (['hi', 'hello', 'hey', 'greetings', 'hola', 'hy'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ') || q.startsWith('hey ')) {
      return "Hello! Welcome to <strong>Sentire by PC</strong>. How may I assist your scent journey today?";
    }

    if (q.includes('how are you')) {
      return "I'm doing wonderfully! Ready to guide you through our luxury perfume collection or answer any questions about our brand.";
    }

    // 3. Engraving & Personalisation
    if (q.includes('engrav') || q.includes('custom') || q.includes('name on bottle') || q.includes('personal')) {
      return "Custom bottle laser engraving is <strong>100% COMPLIMENTARY</strong> on all 50 ML signature bottles! You can engrave initials, full names, or special dates directly onto the luxury glass bottle.";
    }

    // 4. Brand & Website Knowledge
    if (q.includes('website') || q.includes('about this') || q.includes('what is sentire') || q.includes('who are you') || q.includes('what do you sell')) {
      return "<strong>Sentire by PC</strong> is an Indian luxury fragrance house crafting artisanal perfumes beyond time. We offer 11 core signature 50 ML extraits de parfum, 30 ML / 10 ML travel formats, custom bottle engraving, and VIP rewards!";
    }

    // 5. Shipping, Delivery & Payment
    if (q.includes('shipp') || q.includes('deliver') || q.includes('cod') || q.includes('cash on delivery') || q.includes('how long') || q.includes('track')) {
      return "We offer <strong>Complimentary Express Shipping</strong> across India on all orders above ₹999, along with Cash on Delivery (COD) and 5% OFF on prepaid orders! Orders are dispatched within 24 hours and delivered in 2-4 business days.";
    }

    // 6. Fragrance Application & Longevity Tips
    if (q.includes('apply') || q.includes('wear') || q.includes('spray') || q.includes('last longer') || q.includes('longevity')) {
      return "To maximize fragrance longevity: Spray on moisturized pulse points (wrists, neck, behind ears). Fabric holds scent longer than skin, so a light mist on your collar or jacket extends the trail for days!";
    }

    // 7. Fragrance Breakdown & Notes
    if (q.includes('explain') || q.includes('each') || q.includes('detail')) {
      return "Here is a breakdown of our <strong>11 Core Signature Scent Profiles</strong>:<br/><br/>" +
        "• <strong>White Oud</strong>: Clean Oud & Luminous Wood — refined, bright, quietly magnetic.<br/>" +
        "• <strong>Deep Crush</strong>: Warm Musk & Soft Amber — reads like skin, only better.<br/>" +
        "• <strong>Rich</strong>: Icy Fruit over Polished Cedar — sharp and expensive-smelling.<br/>" +
        "• <strong>Midnight</strong>: Dark Amber & Smoky Oud — built for low light and late hours.<br/>" +
        "• <strong>Seductive</strong>: Zesty Citrus & Black Pepper — crisp on open, warm by end.<br/>" +
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

    return "Thank you for asking! <strong>Sentire by PC</strong> offers 11 extraits de parfum starting at ₹799. Would you like a recommendation for a specific occasion, season, or gifting recipient?";
  }

  """
    html = html[:p1] + new_engine + html[p2:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Updated index.html with stemmed matching for 'pricing' and all queries")

# 2. Update backend/services/ai/chatbotService.js fallback for pricing queries
with open(backend_chatbot_path, 'r', encoding='utf-8') as f:
    bcode = f.read()

old_b_fallback = "_getDynamicGeminiReplicaFallback(message) {"
p_b = bcode.find(old_b_fallback)

if p_b != -1:
    pricing_rule = """_getDynamicGeminiReplicaFallback(message) {
    const q = message.toLowerCase().trim();

    if (q.includes('pric') || q.includes('cost') || q.includes('rate') || q.includes('rupee') || q.includes('rs') || q.includes('how much') || q.includes('mrp') || q.includes('buy') || q.includes('amount')) {
      return "Our luxury extraits de parfum are priced as follows:\\n" +
        "• **50 ML Full Signature Bottle**: ₹2,499 – ₹4,999 (Includes free laser engraving!)\\n" +
        "• **30 ML Travel Format**: ₹1,699\\n" +
        "• **10 ML Purse Spray**: ₹799\\n" +
        "We also offer 5% OFF on prepaid orders and complimentary express shipping above ₹999!";
    }
"""
    bcode = bcode[:p_b] + pricing_rule + bcode[p_b + len(old_b_fallback):]
    with open(backend_chatbot_path, 'w', encoding='utf-8') as f:
        f.write(bcode)
    print("SUCCESS: Updated backend ChatbotService fallback for pricing queries")
