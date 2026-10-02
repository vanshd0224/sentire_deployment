const jwt = require('jsonwebtoken');

/**
 * Verify a Firebase Auth ID token (from "Sign in with Google" on the site)
 * against Google's published keys, without the firebase-admin SDK.
 * Returns the token's claims (email, email_verified, …) or throws.
 */
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'sentire-perfumes';
const CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

let certs = null;
let certsUntil = 0;

async function publicCerts() {
  if (certs && Date.now() < certsUntil) return certs;
  const res = await fetch(CERTS_URL);
  if (!res.ok) throw new Error(`Google certs ${res.status}`);
  const maxAge = Number((res.headers.get('cache-control') || '').match(/max-age=(\d+)/)?.[1] || 3600);
  certs = await res.json();
  certsUntil = Date.now() + maxAge * 1000;
  return certs;
}

async function verifyIdToken(token) {
  const decoded = jwt.decode(token, { complete: true });
  const kid = decoded?.header?.kid;
  if (!kid || decoded.header.alg !== 'RS256') throw new Error('Malformed ID token');
  let cert = (await publicCerts())[kid];
  if (!cert) {
    certsUntil = 0; // keys rotated: refetch once
    cert = (await publicCerts())[kid];
  }
  if (!cert) throw new Error('Unknown signing key');
  const claims = jwt.verify(token, cert, {
    algorithms: ['RS256'],
    audience: PROJECT_ID,
    issuer: `https://securetoken.google.com/${PROJECT_ID}`,
  });
  if (!claims.sub) throw new Error('ID token has no subject');
  return claims;
}

module.exports = { verifyIdToken };
