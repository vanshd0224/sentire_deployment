const https = require('https');

const META_PIXEL_ID = "4305047443093499";
const META_CAPI_TOKEN = "EAAOrZBJm6eOUBSVZBpg9UVS3ZBZBUWdY9UyAlAQzF3q9iIHZAM41lXnevRq2dGOh1YHTMLsML8aB56ZAXX99Nkz0BZCAsjmb54NgZC3qleyNqalKvQdV1ZA7ZBD9ispcMX7vfD5nZCWaYZAZAzc66FZBUfr5XoRjR8G90EvhiMwCZCocDAQ2eX4haWoIHKbfk7H5Cj5n9AZCHQZDZD";
const TEST_CODE = "TEST26873";

const now = Math.floor(Date.now() / 1000);

const payload = JSON.stringify({
  test_event_code: TEST_CODE,
  data: [
    {
      event_name: "AddToCart",
      event_time: now,
      event_id: `evt_test_add_to_cart_${Date.now()}`,
      event_source_url: "https://sentirebypc.com/perfumes/calantha/50ml",
      action_source: "website",
      user_data: {
        client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        client_ip_address: "49.36.1.1",
        fbp: "fb.1.1788854000.123456789",
        fbc: "fb.1.1788854000.IwAR123456789"
      },
      custom_data: {
        content_ids: ["calantha"],
        content_name: "Calantha 50ml",
        content_type: "product",
        value: 1085,
        currency: "INR"
      }
    },
    {
      event_name: "InitiateCheckout",
      event_time: now,
      event_id: `evt_test_checkout_${Date.now()}`,
      event_source_url: "https://sentirebypc.com/perfumes/calantha/50ml",
      action_source: "website",
      user_data: {
        client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        client_ip_address: "49.36.1.1",
        fbp: "fb.1.1788854000.123456789",
        fbc: "fb.1.1788854000.IwAR123456789"
      },
      custom_data: {
        content_ids: ["calantha"],
        content_type: "product",
        value: 1085,
        currency: "INR",
        num_items: 1
      }
    }
  ]
});

const req = https.request({
  hostname: 'graph.facebook.com',
  path: `/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('META CAPI RESPONSE STATUS:', res.statusCode);
    console.log('META CAPI RESPONSE BODY:', body);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(payload);
req.end();
