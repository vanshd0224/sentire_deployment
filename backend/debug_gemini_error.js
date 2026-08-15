const { GoogleGenerativeAI } = require('@google/generative-ai');

async function debugGemini() {
  const apiKey = "AIzaSyDsre9XitnehMTO7Du3aw5-vJfLSjZWl0c";
  console.log("Testing API Key:", apiKey);
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const res = await model.generateContent("Hello Gemini! Tell me a 1-sentence greeting.");
    console.log("SUCCESS! Gemini Response:\n", res.response.text());
  } catch (err) {
    console.error("EXACT GEMINI API ERROR:", err.message);
  }
}

debugGemini();
