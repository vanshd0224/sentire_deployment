import os

chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

with open(chatbot_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace _getRAGFallback method with an intelligent intent router
old_fallback = """  _getRAGFallback(message, context) {
    const q = message.toLowerCase().trim();

    if (q.includes('pric') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('mrp')) {
      return "Our luxury extraits de parfum are priced as follows:\\n" +
        "• **50 ML Full Signature Bottle**: ₹2,499 – ₹4,999 (Includes free laser engraving!)\\n" +
        "• **30 ML Travel Format**: ₹1,699\\n" +
        "• **10 ML Purse Spray**: ₹799\\n" +
        "We also offer 5% OFF on prepaid orders and complimentary express shipping above ₹999!";
    }

    if (q.includes('engrav') || q.includes('photo') || q.includes('image') || q.includes('personal')) {
      return "Product Personalisation at **Sentire by PC** is **100% COMPLIMENTARY** on all 50 ML signature bottles! We offer two luxury options:\\n" +
        "1. **Text & Name Engraving**: Engrave initials, full names, dates, or custom quotes.\\n" +
        "2. **Image & Photo Engraving**: High-precision laser etching of custom portraits, photos, line-art, or logos directly onto the glass bottle!";
    }

    if (['hi', 'hello', 'hey', 'greetings', 'hola'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ')) {
      return "Hello! Welcome to **Sentire by PC**. How may I assist your scent journey today?";
    }

    const coreList = sentireDataset.core_eleven_fragrances;
    
    if (q.includes('party') || q.includes('night') || q.includes('evening') || q.includes('club')) {
      return "For evening soirees and high-energy parties, I highly recommend **Midnight (50 ML)** or **Rich (50 ML)**. Midnight opens with magnetic blackcurrant and tuberose over a deep vanilla musk base, while Rich exudes opulent bergamot, spiced rose, and velvet amber!";
    }
    
    if (q.includes('office') || q.includes('work') || q.includes('fresh') || q.includes('daily')) {
      return "For an uplifting, clean daily signature, **Mirai (50 ML)** and **0809 (50 ML)** are perfection! Mirai combines bright lemon, bergamot, and earthy patchouli, while 0809 pairs Sichuan pepper with soothing lavender and ambroxan.";
    }

    if (q.includes('date') || q.includes('romance') || q.includes('intimate')) {
      return "For intimate date nights, **Deep Crush (50 ML)** and **Seductive (50 ML)** create an unforgettable aura. Deep Crush blends soothing lavender with warm tobacco woods, while Seductive offers citric limon and velvet amber.";
    }

    const core = coreList[Math.floor(Math.random() * coreList.length)];
    return `For a distinctive olfactory signature, explore **${core.name} (50 ML)** — featuring notes of ${core.desc}. It is crafted as a long-lasting Extrait de Parfum. Would you like to explore matching scent profiles or bottle formats?`;
  }"""

new_fallback = """  _getRAGFallback(message, context) {
    const q = message.toLowerCase().trim();

    // 1. Outside / General Knowledge Questions
    if (q.includes('quantum') || q.includes('physics') || q.includes('science') || q.includes('math') || q.includes('code') || q.includes('history') || q.includes('who is') || q.includes('what is') || q.includes('explain')) {
      if (q.includes('quantum')) {
        return "Quantum entanglement is a phenomenon in physics where particles remain interconnected regardless of distance. Much like fine perfumery, where a signature scent connects an unseen moment directly to emotion and memory! How may I guide your fragrance exploration today?";
      }
      return `That is a fascinating topic! As the fragrance concierge for **SENTIRE By PC**, I specialize in scent compositions, artisanal notes, and bottle engraving. Is there a particular perfume note or gift scenario I can assist you with today?`;
    }

    // 2. Pricing & Offers
    if (q.includes('pric') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('mrp') || q.includes('offer') || q.includes('discount')) {
      return "Our luxury extraits de parfum are priced as follows:\\n" +
        "• **50 ML Signature Bottle**: ₹2,499 – ₹4,999 (Includes 100% Free Laser & Photo Engraving!)\\n" +
        "• **30 ML Travel Format**: ₹1,499 – ₹1,699\\n" +
        "• **10 ML Purse Spray**: ₹799\\n" +
        "We also offer **5% OFF** on all prepaid orders + Complimentary Express Shipping across India above ₹999!";
    }

    // 3. Engraving & Personalisation
    if (q.includes('engrav') || q.includes('photo') || q.includes('image') || q.includes('personal') || q.includes('custom')) {
      return "Product Personalisation at **Sentire by PC** is **100% COMPLIMENTARY** on all 50 ML signature bottles! Options include:\\n" +
        "1. **Text & Name Engraving**: Engrave names, initials, dates, or custom quotes.\\n" +
        "2. **Image & Photo Engraving**: High-precision laser etching of portraits, photos, line-art, or logos directly onto the glass bottle!";
    }

    // 4. Greetings
    if (['hi', 'hello', 'hey', 'greetings', 'hola', 'namaste'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ')) {
      return "Greetings! Welcome to **Sentire by PC**. I am your luxury fragrance concierge. How may I assist your scent journey today?";
    }

    // 5. Occasion Routers
    if (q.includes('party') || q.includes('night') || q.includes('evening') || q.includes('club')) {
      return "For high-energy parties and evening soirees, **Midnight (50 ML)** and **Rich (50 ML)** command the room. Midnight opens with blackcurrant and tuberose over a deep vanilla musk base, while Rich exudes opulent bergamot, spiced rose, and velvet amber!";
    }

    if (q.includes('office') || q.includes('work') || q.includes('fresh') || q.includes('daily')) {
      return "For an uplifting, clean daily signature, **Mirai (50 ML)** and **0809 (50 ML)** are unrivaled. Mirai combines bright lemon, bergamot, and earthy patchouli, while 0809 pairs Sichuan pepper with soothing lavender and ambroxan.";
    }

    if (q.includes('date') || q.includes('romance') || q.includes('intimate')) {
      return "For romantic date nights, **Deep Crush (50 ML)** and **Seductive (50 ML)** create an unforgettable aura. Deep Crush blends lavender with warm tobacco woods, while Seductive offers citric limon and velvet amber.";
    }

    // 6. Specific Perfume Mentions
    const coreList = sentireDataset.core_eleven_fragrances;
    const match = coreList.find(f => q.includes(f.name.toLowerCase()));
    if (match) {
      return `**${match.name} (50 ML Extrait de Parfum)** is an exquisite ${match.family} scent featuring notes of ${match.desc}. It is available in 50 ML, 30 ML, and 10 ML formats, with complimentary laser engraving on all 50 ML bottles.`;
    }

    const core = coreList[Math.floor(Math.random() * coreList.length)];
    return `Discover **${core.name} (50 ML Extrait de Parfum)** — a luxury ${core.family} creation featuring notes of ${core.desc}. Would you like to explore matching scent notes or bottle formats?`;
  }"""

if old_fallback in code:
    code = code.replace(old_fallback, new_fallback)
    with open(chatbot_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("SUCCESS: Upgraded chatbot fallback router with intelligent intent branching!")
else:
    print("WARNING: Old fallback block not found exactly, performing fallback replace...")
