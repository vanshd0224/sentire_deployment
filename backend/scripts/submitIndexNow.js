/**
 * Sentire by PC - IndexNow Batch Submission Script
 * Submits all canonical URLs and legacy migrated URLs to Bing & search engines.
 * Usage: node backend/scripts/submitIndexNow.js
 */

const https = require('https');

const HOST = 'sentirebypc.com';
const KEY = 'c7e48b39401b4424a1b0288f3478912e';
const KEY_LOCATION = 'https://sentirebypc.com/c7e48b39401b4424a1b0288f3478912e.txt';

const URLS_TO_SUBMIT = [
  // Canonical Main Pages
  'https://sentirebypc.com/',
  'https://sentirebypc.com/perfumes',
  'https://sentirebypc.com/bestsellers',
  'https://sentirebypc.com/new-arrivals',
  'https://sentirebypc.com/personalisation',
  'https://sentirebypc.com/byob',
  'https://sentirebypc.com/about',
  'https://sentirebypc.com/client-services',
  'https://sentirebypc.com/track-order',

  // Canonical Product Deep Links
  'https://sentirebypc.com/perfumes?id=calantha',
  'https://sentirebypc.com/perfumes?id=deep-crush',
  'https://sentirebypc.com/perfumes?id=herrlich',
  'https://sentirebypc.com/perfumes?id=midnight',
  'https://sentirebypc.com/perfumes?id=mirai',
  'https://sentirebypc.com/perfumes?id=0809',
  'https://sentirebypc.com/perfumes?id=personna',
  'https://sentirebypc.com/perfumes?id=purple-oud',
  'https://sentirebypc.com/perfumes?id=rich',
  'https://sentirebypc.com/perfumes?id=seductive',
  'https://sentirebypc.com/perfumes?id=white-oud',
  'https://sentirebypc.com/perfumes?id=zephyrine',
  'https://sentirebypc.com/perfumes?id=bijou',

  // Legacy Migrated URLs for Bing / Engine Cache Invalidation
  'https://sentirebypc.com/collections/perfumes',
  'https://sentirebypc.com/collections/10-ml',
  'https://sentirebypc.com/collections/30-ml',
  'https://sentirebypc.com/collections/50-ml',
  'https://sentirebypc.com/collections/all',
  'https://sentirebypc.com/collections/best-sellers',
  'https://sentirebypc.com/collections/new-arrivals',
  'https://sentirebypc.com/pages/about-us',
  'https://sentirebypc.com/pages/our-story',
  'https://sentirebypc.com/pages/contact-us',
  'https://sentirebypc.com/pages/celebs',
  'https://sentirebypc.com/products/white-oud',
  'https://sentirebypc.com/products/purple-oud',
  'https://sentirebypc.com/products/calantha',
  'https://sentirebypc.com/products/deep-crush',
  'https://sentirebypc.com/products/herrlich',
  'https://sentirebypc.com/products/midnight',
  'https://sentirebypc.com/products/mirai',
  'https://sentirebypc.com/products/0809',
  'https://sentirebypc.com/products/personna',
  'https://sentirebypc.com/products/rich',
  'https://sentirebypc.com/products/seductive'
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS_TO_SUBMIT
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`[IndexNow] Submitting ${URLS_TO_SUBMIT.length} URLs to api.indexnow.org for ${HOST}...`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`[IndexNow] Success! Response status: ${res.statusCode} (URLs accepted for indexing/cache invalidation)`);
    } else {
      console.log(`[IndexNow] Response status: ${res.statusCode}. Details: ${data}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`[IndexNow] Error: ${e.message}`);
});

req.write(payload);
req.end();
