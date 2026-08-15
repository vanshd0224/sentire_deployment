const apiKey = "AIzaSyDsre9XitnehMTO7Du3aw5-vJfLSjZWl0c";

const candidateModels = [
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash"
];

async function runTest() {
  console.log("=== TESTING FOUND GEMINI API KEY (AIzaSy...) ===");
  
  for (const modelName of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{
        parts: [{ text: "What is quantum entanglement?" }]
      }]
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.status === 200 && data.candidates && data.candidates[0]) {
        console.log(`\n✅ LIVE SUCCESS [${modelName}]:\n${data.candidates[0].content.parts[0].text.trim()}`);
      } else {
        console.log(`❌ FAILED [${modelName}] (Status ${res.status}): ${data.error ? data.error.message : 'Unknown error'}`);
      }
    } catch (e) {
      console.log(`❌ ERROR [${modelName}]: ${e.message}`);
    }
  }
}

runTest();
