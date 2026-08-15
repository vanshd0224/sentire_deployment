const chatbotService = require('./backend/services/ai/chatbotService');

async function testGemini() {
  console.log("=== TESTING LIVE GEMINI 1.5 FLASH LLM CALL ===");
  try {
    const res1 = await chatbotService.processChat({ message: "What is the best perfume for a summer date night?" });
    console.log("\nQuery 1: What is the best perfume for a summer date night?");
    console.log("Gemini LLM Reply 1:\n", res1.reply);

    const res2 = await chatbotService.processChat({ message: "Tell me a short poetic story about scent and memory." });
    console.log("\nQuery 2: Tell me a short poetic story about scent and memory.");
    console.log("Gemini LLM Reply 2:\n", res2.reply);
  } catch (err) {
    console.error("Test Error:", err);
  }
}

testGemini();
