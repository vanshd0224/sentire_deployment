const chatbotService = require('./backend/services/ai/chatbotService');

async function testEngraving() {
  console.log("=== TESTING IMAGE ENGRAVING & PERSONALISATION RAG PROMPT ===");
  try {
    const res = await chatbotService.processChat({ message: "Can I engrave a photo or image on the bottle?" });
    console.log("\nQuery: Can I engrave a photo or image on the bottle?");
    console.log("Gemini LLM Reply:\n", res.reply);
  } catch (err) {
    console.error("Test Error:", err);
  }
}

testEngraving();
