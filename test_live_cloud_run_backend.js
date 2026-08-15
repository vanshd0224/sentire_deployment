async function testLiveBackend(query) {
  const backendUrl = "https://ecommerce-backend-1041917436859.asia-south1.run.app/chat";
  console.log(`\n================ TESTING LIVE BACKEND QUERY: "${query}" ================`);
  
  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: query, sessionId: "test-live-101" })
    });
    
    console.log("HTTP Status:", res.status);
    const data = await res.json();
    console.log("LIVE BACKEND RESPONSE:\n", JSON.stringify(data, null, 2));
  } catch (e) {
    console.log("Error testing live backend:", e.message);
  }
}

async function run() {
  await testLiveBackend("What is quantum entanglement?");
  await testLiveBackend("best notes for party");
  await testLiveBackend("Tell me about White Oud perfume");
}

run();
