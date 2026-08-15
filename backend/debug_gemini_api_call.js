const apiKey = Buffer.from("QVEuQWI4Uk42TE1Sc25MeFNFQlZBSWxOZjhqVTNVSExGTmpiMnFiSUcyamRsOWVIYXBLNnc=", "base64").toString("utf-8");

console.log("Decoded API Key:", apiKey);

const candidateModels = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash",
  "gemini-3.5-flash",
  "gemini-3.7-flash"
];

async function debugCall() {
  for (const modelName of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    console.log(`\nTesting URL for [${modelName}]...`);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "What is quantum entanglement?" }] }]
        })
      });
      const data = await res.json();
      console.log(`Status: ${res.status}`);
      console.log("Response Body:", JSON.stringify(data, null, 2));
    } catch (e) {
      console.log("Fetch Error:", e.message);
    }
  }
}

debugCall();
