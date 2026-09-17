// Load a URL in headless Chrome and report requests, bytes and timings.
// Dev-only helper: node scripts/perf.mjs <url> [mobile]
import { spawn } from "node:child_process";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = process.argv[2] ?? "http://127.0.0.1:5179/";
const mobile = process.argv[3] === "mobile";
const PORT = 9444;

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  `--remote-debugging-port=${PORT}`,
  "--window-size=1440,1000",
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 40 && !wsUrl; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
  if (!wsUrl) await sleep(250);
}

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const requests = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
  if (msg.method === "Network.responseReceived") {
    requests.push({ url: msg.params.response.url, type: msg.params.type, bytes: 0 });
  }
  if (msg.method === "Network.loadingFinished") {
    const last = requests[requests.length - 1];
    if (last) last.bytes = Math.max(last.bytes, msg.params.encodedDataLength ?? 0);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await send("Network.enable");
await send("Page.enable");
if (mobile) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  // Roughly a mid-range phone on 4G.
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 80,
    downloadThroughput: (9 * 1024 * 1024) / 8,
    uploadThroughput: (2 * 1024 * 1024) / 8,
  });
}

await send("Page.navigate", { url });
await sleep(mobile ? 12000 : 9000);

const { result } = await send("Runtime.evaluate", {
  expression: `(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const lcp = performance.getEntriesByType('largest-contentful-paint').slice(-1)[0];
    const paint = performance.getEntriesByType('paint');
    return JSON.stringify({
      ttfb: Math.round(nav.responseStart),
      dcl: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      fcp: Math.round(paint.find(p => p.name === 'first-contentful-paint')?.startTime ?? 0),
      lcp: Math.round(lcp?.startTime ?? 0),
      lcpEl: lcp?.url ?? lcp?.element?.tagName ?? null,
      videos: [...document.querySelectorAll('video')].length
    });
  })()`,
  returnByValue: true,
});

const totals = requests.reduce((acc, r) => acc + r.bytes, 0);
const byType = {};
for (const r of requests) byType[r.type] = (byType[r.type] ?? 0) + r.bytes;

console.log(mobile ? "— MOBILE (4x CPU throttle, ~9Mbps) —" : "— DESKTOP —");
console.log("metrics:", result.value);
console.log("requests:", requests.length, "| total:", Math.round(totals / 1024), "KB");
console.log(
  "by type:",
  Object.entries(byType)
    .map(([k, v]) => `${k} ${Math.round(v / 1024)}KB`)
    .join(", ")
);
console.log(
  "heaviest:",
  requests
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6)
    .map((r) => `${Math.round(r.bytes / 1024)}KB ${r.url.split("/").slice(-1)[0].slice(0, 40)}`)
    .join(" | ")
);
const media = requests.filter((r) => /\.mp4/.test(r.url));
console.log("video bytes on load:", Math.round(media.reduce((a, r) => a + r.bytes, 0) / 1024), "KB");

ws.close();
chrome.kill();
process.exit(0);
