const AUTH_KEY = "562962AgqwUH0qSWc6a883d11P1";
const WIDGET_ID = "3668756c6855323939333039";
const TOKEN_AUTH = "562962T3pkOoGcL6a884028P1";
const TEST_MOBILE = "919079603729";

async function testAll() {
  console.log("=== MSG91 API TEST ===");

  // Test 1: Send OTP with widgetId in header
  try {
    const res = await fetch(`https://control.msg91.com/api/v5/otp?mobile=${TEST_MOBILE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': AUTH_KEY,
        'tokenAuth': TOKEN_AUTH,
        'widgetId': WIDGET_ID
      }
    });
    console.log("Test 1 Result:", await res.json());
  } catch(e) { console.error("Test 1 err:", e.message); }

  // Test 2: Send OTP with widgetId in JSON body
  try {
    const res = await fetch(`https://control.msg91.com/api/v5/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': AUTH_KEY
      },
      body: JSON.stringify({
        widgetId: WIDGET_ID,
        tokenAuth: TOKEN_AUTH,
        mobile: TEST_MOBILE
      })
    });
    console.log("Test 2 Result:", await res.json());
  } catch(e) { console.error("Test 2 err:", e.message); }

  // Test 3: Send OTP with template_id in body
  try {
    const res = await fetch(`https://control.msg91.com/api/v5/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': AUTH_KEY
      },
      body: JSON.stringify({
        template_id: WIDGET_ID,
        mobile: TEST_MOBILE
      })
    });
    console.log("Test 3 Result:", await res.json());
  } catch(e) { console.error("Test 3 err:", e.message); }
}

testAll();
