// Page audit: screenshots every route at desktop + mobile and reports
// basic UX signals (tap targets, tiny text, contrast-ish checks, overflow).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.AUDIT_URL ?? "http://127.0.0.1:5178";
const OUT = process.env.AUDIT_OUT ?? path.resolve("../audit");
const PORT = 9355;

const ROUTES = [
  ["home", "/"],
  ["perfumes", "/perfumes"],
  ["bestsellers", "/bestsellers"],
  ["new-arrivals", "/new-arrivals"],
  ["discovery-set", "/discovery-set"],
  ["byob", "/byob"],
  ["personalisation", "/personalised-perfume"],
  ["about", "/about"],
  ["client-services", "/client-services"],
  ["track-order", "/track-order"],
  ["cart", "/cart"],
  ["product", "/perfumes/purple-oud/50ml"],
];

fs.mkdirSync(OUT, { recursive: true });
const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
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
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

const PROBE = `(() => {
  const vis = el => el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
  const tap = [...document.querySelectorAll('a,button,input,select,[role=button]')]
    .filter(vis)
    .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 40 || r.height < 40); });
  const small = [...document.querySelectorAll('p,span,a,li,div')]
    .filter(e => vis(e) && e.children.length === 0 && e.innerText && e.innerText.trim())
    .filter(e => parseFloat(getComputedStyle(e).fontSize) < 12);
  const caps = [...document.querySelectorAll('*')]
    .filter(e => vis(e) && e.children.length === 0 && e.innerText && e.innerText.trim().length > 3)
    .filter(e => { const s = getComputedStyle(e); return s.textTransform === 'uppercase' && parseFloat(s.letterSpacing) > 2; });
  const fonts = {};
  [...document.querySelectorAll('h1,h2,h3,p,button,a')].slice(0, 400).forEach(e => {
    const f = getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '');
    fonts[f] = (fonts[f] || 0) + 1;
  });
  const imgs = [...document.images];
  return JSON.stringify({
    h1: [...document.querySelectorAll('h1')].map(h => h.innerText.replace(/\\n/g,' ').slice(0, 42)),
    h2count: document.querySelectorAll('h2').length,
    tapTooSmall: tap.length,
    tinyText: small.length,
    wideCaps: caps.length,
    fonts,
    imgs: imgs.length,
    imgsNoAlt: imgs.filter(i => !i.alt).length,
    overflowX: document.documentElement.scrollWidth > window.innerWidth + 2,
    docHeight: document.body.scrollHeight,
    legacyGold: document.body.innerHTML.match(/c89b5a|d4af37/gi)?.length || 0
  });
})()`;

const report = {};
for (const [name, route] of ROUTES) {
  for (const [label, metrics] of [
    ["desktop", { width: 1440, height: 1000, mobile: false }],
    ["mobile", { width: 390, height: 844, mobile: true }],
  ]) {
    await send("Emulation.setDeviceMetricsOverride", { ...metrics, deviceScaleFactor: 1 });
    await send("Page.navigate", { url: BASE + route });
    await sleep(3200);
    const { data } = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUT, `${name}-${label}.png`), Buffer.from(data, "base64"));
    if (label === "mobile") {
      const { result } = await send("Runtime.evaluate", { expression: PROBE, returnByValue: true });
      report[name] = JSON.parse(result.value);
    }
  }
  console.log("audited", name);
}

fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
ws.close();
chrome.kill();
process.exit(0);
