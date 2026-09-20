// Per-page smoothness harness. Scrolls each route the way a finger does
// (small steps, every frame) and reports frame stats, twice:
//   cold  — scrolling while the page is still settling (worst case)
//   warm  — scrolling after everything has loaded (steady state)
//
// usage: node scripts/fps-all.mjs <baseUrl> <mobile|desktop> [cpuThrottle]
import { spawn } from "node:child_process";

const BASE = (process.argv[2] ?? "http://127.0.0.1:5179").replace(/\/$/, "");
const MOBILE = (process.argv[3] ?? "mobile") === "mobile";
const CPU = Number(process.argv[4] ?? (MOBILE ? 4 : 1));
const PORT = 9601 + (MOBILE ? 0 : 1);

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
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
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
const pend = new Map();
s.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) {
    pend.get(m.id)(m.result);
    pend.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pend.set(i, r);
    s.send(JSON.stringify({ id: i, method, params }));
  });
const js = (expression, awaitPromise = true) =>
  send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise }).then(
    (r) => r.result?.value,
  );

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: MOBILE ? 390 : 1440,
  height: MOBILE ? 844 : 900,
  deviceScaleFactor: MOBILE ? 2 : 1,
  mobile: MOBILE,
});
if (CPU > 1) await send("Emulation.setCPUThrottlingRate", { rate: CPU });

// One pass down the page, one step per frame, recording every frame gap.
const SCROLL = `(async (stepPx) => {
  const gaps = [];
  let last = performance.now(), stop = false, tasks = 0;
  let po;
  try { po = new PerformanceObserver(l => { tasks += l.getEntries().length; }); po.observe({ type: 'longtask', buffered: false }); } catch {}
  const tick = (t) => { gaps.push(t - last); last = t; if (!stop) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  const max = document.documentElement.scrollHeight - innerHeight;
  for (let y = 0; y <= max; y += stepPx) {
    scrollTo(0, y);
    await new Promise(r => requestAnimationFrame(r));
  }
  await new Promise(r => setTimeout(r, 300));
  stop = true; if (po) po.disconnect();
  scrollTo(0, 0);
  const sorted = gaps.slice(1).sort((a, b) => a - b);
  const pct = (p) => Math.round(sorted[Math.floor(sorted.length * p)] || 0);
  const avg = sorted.reduce((a, b) => a + b, 0) / (sorted.length || 1);
  return JSON.stringify({
    fps: Math.round(1000 / avg),
    p95: pct(0.95),
    worst: Math.round(sorted[sorted.length - 1] || 0),
    janky: sorted.filter(g => g > 34).length,      // frames over ~2 vsyncs
    frames: sorted.length,
    longTasks: tasks,
    height: document.documentElement.scrollHeight,
  });
})(${MOBILE ? 24 : 40})`;

const rows = [];
for (const [name, path] of ROUTES) {
  await send("Page.navigate", { url: BASE + path });
  await sleep(MOBILE ? 3500 : 2500); // start scrolling while it's still settling
  const cold = JSON.parse(await js(SCROLL));
  await sleep(MOBILE ? 4500 : 3000); // let everything finish
  const warm = JSON.parse(await js(SCROLL));
  rows.push({ page: name, cold, warm });
  console.error("measured", name);
}

const mode = `${MOBILE ? "mobile" : "desktop"}${CPU > 1 ? ` ${CPU}x CPU` : ""}`;
console.log(`\n${BASE}  —  ${mode}\n`);
console.log(
  "page             cold fps  p95   worst  janky | warm fps  p95   worst  janky  longTasks",
);
for (const r of rows) {
  console.log(
    `${r.page.padEnd(16)} ${String(r.cold.fps).padStart(7)}  ${String(r.cold.p95).padStart(4)}ms ${String(r.cold.worst).padStart(5)}ms ${String(r.cold.janky).padStart(5)} | ${String(r.warm.fps).padStart(7)}  ${String(r.warm.p95).padStart(4)}ms ${String(r.warm.worst).padStart(5)}ms ${String(r.warm.janky).padStart(5)} ${String(r.warm.longTasks).padStart(9)}`,
  );
}
s.close();
chrome.kill();
process.exit(0);
