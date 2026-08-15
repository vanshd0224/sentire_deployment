const chatbotService = require('./backend/services/ai/chatbotService');

async function testDiversity() {
  console.log("=== TESTING CREATIVE DIVERSITY OF GEMINI 3.5 FLASH LLM ===");
  try {
    const q1 = await chatbotService.processChat({ message: "What fragrance should I wear for my wedding day?" });
    console.log("\nQuery 1: What fragrance should I wear for my wedding day?\nReply 1:\n", q1.reply);

    const q2 = await chatbotService.processChat({ message: "Recommend a scent for a beach party in Goa." });
    console.log("\nQuery 2: Recommend a scent for a beach party in Goa.\nReply 2:\n", q2.reply);

    const q3 = await chatbotService.processChat({ message: "Tell me about custom image engraving on bottles." });
    console.log("\nQuery 3: Tell me about custom image engraving on bottles.\nReply 3:\n", q3.reply);
  } catch (err) {
    console.error("Test Error:", err);
  }
}

testDiversity();
