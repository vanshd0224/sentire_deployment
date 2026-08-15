const chatbotService = require('./backend/services/ai/chatbotService');

async function runTest() {
  console.log("=== LOCAL CHATBOT TEST ===");
  const r1 = await chatbotService.processChat({ message: "What is quantum entanglement?", sessionId: "s1" });
  console.log("\n1. Quantum Entanglement:\n", r1.reply);

  const r2 = await chatbotService.processChat({ message: "best notes for party", sessionId: "s2" });
  console.log("\n2. Party Notes:\n", r2.reply);

  const r3 = await chatbotService.processChat({ message: "Tell me about White Oud perfume", sessionId: "s3" });
  console.log("\n3. White Oud:\n", r3.reply);
}

runTest();
