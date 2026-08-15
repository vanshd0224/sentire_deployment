import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace getDynamicAIResponse in index.html with comprehensive conversational intelligence
old_start = "function getDynamicAIResponse(userText) {"
old_end = "  async function sendChatMessage(text) {"

p1 = html.find(old_start)
p2 = html.find(old_end)

if p1 != -1 and p2 != -1:
    new_engine = """function getDynamicAIResponse(userText) {
    const q = userText.toLowerCase().trim();

    // 1. Greetings & Casual Conversation
    if (['hi', 'hello', 'hey', 'greetings', 'hola', 'hy'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ') || q.startsWith('hey ')) {
      return "Hello! Welcome to <strong>Sentire by PC</strong>. How may I assist your scent journey today?";
    }

    if (q.includes('how are you')) {
      return "I'm doing wonderfully! Ready to guide you through our luxury perfume collection or answer any questions about our brand.";
    }

    // 2. Brand & Website Knowledge
    if (q.includes('website') || q.includes('about this') || q.includes('what is sentire') || q.includes('who are you') || q.includes('what do you sell')) {
      return "<strong>Sentire by PC</strong> is an Indian luxury fragrance house crafting artisanal perfumes beyond time. We offer 11 core signature 50 ML extraits de parfum, 30 ML / 10 ML travel formats, custom bottle engraving, and VIP rewards! Explore our Best Sellers, BYOB bundles, or ask me for personalized scent recommendations.";
    }

    // 3. Shipping, Delivery & Payment
    if (q.includes('shipping') || q.includes('delivery') || q.includes('cod') || q.includes('cash on delivery') || q.includes('how long') || q.includes('time')) {
      return "We offer <strong>Complimentary Express Shipping</strong> across India on all orders above ₹999, along with Cash on Delivery (COD) and 5% OFF on prepaid orders! Orders are dispatched within 24 hours and delivered in 2-4 business days.";
    }

    // 4. Fragrance Application & Longevity Tips
    if (q.includes('apply') || q.includes('wear') || q.includes('spray') || q.includes('last longer')) {
      return "To maximize fragrance longevity: Spray on moisturized pulse points (wrists, neck, behind ears). Fabric holds scent longer than skin, so a light mist on your collar or jacket extends the trail for days!";
    }

    // 5. Fragrance Breakdown & Notes
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

    if (q.includes('size') || q.includes('ml') || q.includes('bottle') || q.includes('price') || q.includes('cost')) {
      return "Our signature collection leads with the <strong>50 ML full signature bottle</strong>. We also offer 30 ML and 10 ML travel formats as step-downs (except Purple Oud which is 50 ML only).";
    }

    return "Thank you for asking! <strong>Sentire by PC</strong> offers 11 artisanal perfumes. Would you like a recommendation for a specific occasion, season, or gifting recipient?";
  }

  """
    html = html[:p1] + new_engine + html[p2:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Updated index.html with full conversational AI intelligence")
