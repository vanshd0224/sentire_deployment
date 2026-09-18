// Frame-rate probe: emulates a phone (390×844, 4× CPU slowdown), then records
// every animation frame while (1) the page idles on the first view and
// (2) the whole page is scrolled top to bottom. Dev-only.
// usage: node scripts/fps.mjs [url] [mobile|desktop]
import { spawn } from "node:child_process";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.argv[2] ?? "http://127.0.0.1:5179/discovery-set";
const MOBILE = (process.argv[3] ?? "mobile") === "mobile";
const PORT = 9455;

const chrome = spawn(CHROME, [
  "--headless=new",
  "--hide-scrollbars",
  "--enable-gpu-rasterization",
  `--remote-debugging-port=${PORT}`,
  "--window-size=1440,900",
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 40 && !wsUrl; i++) {
  try {
    const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = l.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
  if (!wsUrl) await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

if (MOBILE) {
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });
} else {
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
}
await send("Page.navigate", { url: URL });
await sleep(6000);

const PROBE = `(async () => {
  const long = [];
  try {
    new PerformanceObserver((l) => l.getEntries().forEach((e) => long.push(e.duration))).observe({ type: "longtask", buffered: false });
  } catch (e) {}
  const record = (ms, step) => new Promise((resolve) => {
    const frames = [];
    let last = performance.now();
    const t0 = last;
    const tick = (now) => {
      frames.push(now - last);
      last = now;
      if (step) step(now - t0);
      if (now - t0 < ms) requestAnimationFrame(tick);
      else resolve(frames);
    };
    requestAnimationFrame(tick);
  });
  const stats = (f) => {
    const s = [...f].sort((a, b) => a - b);
    const avg = f.reduce((a, b) => a + b, 0) / f.length;
    return {
      fps: +(1000 / avg).toFixed(1),
      p95ms: +s[Math.floor(s.length * 0.95)].toFixed(1),
      jank: +(100 * f.filter((d) => d > 34).length / f.length).toFixed(1),
    };
  };
  window.scrollTo(0, 0);
  const idle = await record(4000);
  const idleLong = long.length;
  const H = document.documentElement.scrollHeight - innerHeight;
  const scroll = await record(14000, (t) => window.scrollTo(0, Math.min(H, (t / 14000) * H)));
  return JSON.stringify({
    idle: stats(idle),
    scroll: stats(scroll),
    longTasksIdle: idleLong,
    longTasksScroll: long.length - idleLong,
    worstLongTaskMs: Math.round(Math.max(0, ...long)),
  });
})()`;
await send("Performance.enable");
const before = Object.fromEntries((await send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
const res = await send("Runtime.evaluate", { expression: PROBE, awaitPromise: true, returnByValue: true });
const after = Object.fromEntries((await send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
const d = (k) => +(after[k] - before[k]).toFixed(k.endsWith("Duration") ? 3 : 0);
console.log("main-thread work over the 18s run:", JSON.stringify({
  scriptS: d("ScriptDuration"),
  styleRecalcS: d("RecalcStyleDuration"),
  layoutS: d("LayoutDuration"),
  taskS: d("TaskDuration"),
  styleRecalcs: d("RecalcStyleCount"),
  layouts: d("LayoutCount"),
}));
console.log(MOBILE ? "MOBILE (4× CPU):" : "DESKTOP:", res.result?.value ?? JSON.stringify(res));
ws.close();
chrome.kill();
process.exit(0);
