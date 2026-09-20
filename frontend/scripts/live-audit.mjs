// Live-site audit: loads every route in headless Chrome and reports what a
// real visit would hit — failed requests, console errors, load metrics,
// scroll smoothness under a throttled phone CPU, layout and SEO basics.
//
// usage: node scripts/live-audit.mjs [baseUrl] [mobile|desktop]
import { spawn } from "node:child_process";
import fs from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] ?? "https://sentirebypc.com").replace(/\/$/, "");
const MOBILE = (process.argv[3] ?? "mobile") === "mobile";
const OUT = process.env.AUDIT_OUT ?? "";
const PORT = 9501 + (MOBILE ? 0 : 1);

const ROUTES = [
  ["home", "/"],
  ["perfumes", "/perfumes"],
  ["bestsellers", "/bestsellers"],
  ["new-arrivals", "/new-arrivals"],
  ["discovery-set", "/discovery-set"],
  ["byob", "/byob"],
  ["product", "/perfumes/purple-oud/50ml"],
  ["about", "/about"],
  ["client-services", "/client-services"],
  ["track-order", "/track-order"],
  ["cart", "/cart"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, [
  "--headless=new",
  "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  `--window-size=${MOBILE ? "390,844" : "1440,900"}`,
  "--use-angle=d3d11",
  "--enable-gpu",
  "about:blank",
]);

let ws;
for (let i = 0; i < 60 && !ws; i++) {
  try {
    const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    ws = l.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
  if (!ws) await sleep(250);
}
const s = new WebSocket(ws);
await new Promise((r) => (s.onopen = r));
let id = 0;
const pending = new Map();
const events = [];
s.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  } else if (m.method) events.push(m);
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    s.send(JSON.stringify({ id: i, method, params }));
  });
const evalJS = async (expression, awaitPromise = false) =>
  (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise }))
    .result?.value;

await send("Network.enable");
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: MOBILE ? 390 : 1440,
  height: MOBILE ? 844 : 900,
  deviceScaleFactor: MOBILE ? 2 : 1,
  mobile: MOBILE,
});
if (MOBILE) {
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (10 * 1024 * 1024) / 8, // ~10 Mbps, typical 4G
    uploadThroughput: (3 * 1024 * 1024) / 8,
  });
}

const report = [];

for (const [name, path] of ROUTES) {
  events.length = 0;
  const reqs = new Map();
  await send("Network.clearBrowserCache");
  const t0 = Date.now();
  await send("Page.navigate", { url: BASE + path });
  await sleep(MOBILE ? 9000 : 6500);

  // collect network + console from the event stream
  for (const e of events) {
    if (e.method === "Network.requestWillBeSent")
      reqs.set(e.params.requestId, {
        url: e.params.request.url,
        type: e.params.type,
        start: e.params.timestamp,
      });
    if (e.method === "Network.responseReceived") {
      const r = reqs.get(e.params.requestId);
      if (r) {
        r.status = e.params.response.status;
        r.mime = e.params.response.mimeType;
      }
    }
    if (e.method === "Network.loadingFinished") {
      const r = reqs.get(e.params.requestId);
      if (r) {
        r.bytes = e.params.encodedDataLength;
        r.ms = Math.round((e.params.timestamp - r.start) * 1000);
      }
    }
    if (e.method === "Network.loadingFailed") {
      const r = reqs.get(e.params.requestId);
      if (r) r.failed = e.params.errorText;
    }
  }
  const consoleErrors = events
    .filter((e) => e.method === "Runtime.consoleAPICalled" && e.params.type === "error")
    .map((e) =>
      e.params.args
        .map((a) => a.value ?? a.description ?? a.type)
        .join(" ")
        .slice(0, 200),
    );
  const exceptions = events
    .filter((e) => e.method === "Runtime.exceptionThrown")
    .map((e) =>
      (e.params.exceptionDetails.exception?.description ??
        e.params.exceptionDetails.text ??
        "")
        .split("\n")[0]
        .slice(0, 200),
    );

  // metrics from inside the page
  const metrics = await evalJS(
    `(async () => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const paints = Object.fromEntries(performance.getEntriesByType('paint').map(p => [p.name, Math.round(p.startTime)]));
      let lcp = 0, cls = 0;
      try {
        const lcps = performance.getEntriesByType('largest-contentful-paint');
        lcp = Math.round(lcps.length ? lcps[lcps.length - 1].startTime : 0);
      } catch {}
      try { for (const e of performance.getEntriesByType('layout-shift')) if (!e.hadRecentInput) cls += e.value; } catch {}
      const longTasks = performance.getEntriesByType('longtask') || [];
      const imgs = [...document.images];
      const noAlt = imgs.filter(i => !i.getAttribute('alt')).length;
      const oversized = imgs.filter(i => i.naturalWidth > i.clientWidth * (devicePixelRatio + 0.5) && i.clientWidth > 0).length;
      const lazy = imgs.filter(i => i.loading === 'lazy').length;
      const tiny = [...document.querySelectorAll('a,button')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 32 || r.width < 32); }).length;
      const h1 = [...document.querySelectorAll('h1')].map(h => h.textContent.trim().slice(0, 60));
      return JSON.stringify({
        title: document.title.slice(0, 90),
        desc: (document.querySelector('meta[name=description]')?.content || '').length,
        canonical: !!document.querySelector('link[rel=canonical]'),
        og: !!document.querySelector('meta[property="og:image"]'),
        lcpMs: lcp, fcpMs: paints['first-contentful-paint'] || 0,
        domReadyMs: Math.round(nav.domContentLoadedEventEnd || 0),
        loadMs: Math.round(nav.loadEventEnd || 0),
        cls: Math.round(cls * 1000) / 1000,
        longTasks: longTasks.length,
        longTaskMs: Math.round(longTasks.reduce((a, t) => a + t.duration, 0)),
        nodes: document.getElementsByTagName('*').length,
        imgs: imgs.length, noAlt, oversized, lazy, tinyTargets: tiny, h1,
        scrollW: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        innerW: innerWidth,
      });
    })()`,
    true,
  );

  // scroll smoothness: drive the page down and count dropped frames
  const smooth = await evalJS(
    `(async () => {
      let frames = 0, worst = 0, last = performance.now();
      let stop = false;
      const tick = (t) => { const d = t - last; last = t; frames++; if (d > worst) worst = d; if (!stop) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      const t0 = performance.now();
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < Math.min(h, 12000); y += 320) { scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
      stop = true;
      const secs = (performance.now() - t0) / 1000;
      scrollTo(0, 0);
      return JSON.stringify({ fps: Math.round(frames / secs), worstFrameMs: Math.round(worst), scrollHeight: h });
    })()`,
    true,
  );

  const all = [...reqs.values()];
  const failed = all.filter((r) => r.failed || (r.status && r.status >= 400));
  const bytes = all.reduce((a, r) => a + (r.bytes || 0), 0);
  const byType = {};
  for (const r of all) {
    const k = r.type || "other";
    byType[k] = byType[k] || { n: 0, kb: 0 };
    byType[k].n++;
    byType[k].kb += Math.round((r.bytes || 0) / 1024);
  }
  const heavy = all
    .filter((r) => (r.bytes || 0) > 250 * 1024)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8)
    .map((r) => `${Math.round(r.bytes / 1024)}KB ${r.url.split("/").pop().slice(0, 50)}`);
  const thirdParty = [
    ...new Set(
      all
        .filter((r) => !r.url.includes(new URL(BASE).host) && r.url.startsWith("http"))
        .map((r) => new URL(r.url).host),
    ),
  ];
  const slow = all
    .filter((r) => (r.ms || 0) > 1500)
    .sort((a, b) => b.ms - a.ms)
    .slice(0, 5)
    .map((r) => `${r.ms}ms ${r.url.split("/").pop().slice(0, 45)}`);

  report.push({
    page: name,
    path,
    wallMs: Date.now() - t0,
    ...JSON.parse(metrics),
    ...JSON.parse(smooth),
    requests: all.length,
    totalKB: Math.round(bytes / 1024),
    byType,
    failed: failed.map((r) => `${r.status || r.failed} ${r.url.slice(0, 90)}`),
    heavy,
    slow,
    thirdParty,
    consoleErrors: [...new Set(consoleErrors)].slice(0, 6),
    exceptions: [...new Set(exceptions)].slice(0, 6),
  });
  console.error("audited", name);
}

const json = JSON.stringify({ base: BASE, mode: MOBILE ? "mobile" : "desktop", report }, null, 1);
if (OUT) fs.writeFileSync(OUT, json);
else console.log(json);
s.close();
chrome.kill();
process.exit(0);
