// Screenshot helper: drives headless Chrome over CDP to capture the page at
// several scroll positions, desktop and mobile. Dev-only; not part of the build.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL_BASE = process.env.SHOT_URL ?? "http://127.0.0.1:5178/";
const OUT = process.env.SHOT_OUT ?? path.resolve("../shots");
const PORT = 9333;

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

async function cdpTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("chrome did not start");
}

const wsUrl = await cdpTarget();
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

async function shoot(name, { width, height, mobile, url, scrollTo = 0, wait = 2600 }) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await send("Page.navigate", { url });
  await sleep(wait);
  if (scrollTo) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo({top:${scrollTo},behavior:'instant'})`,
    });
    await sleep(1400);
  }
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, "base64"));
  console.log("saved", name);
}

async function sectionTops() {
  const { result } = await send("Runtime.evaluate", {
    expression:
      "JSON.stringify([...document.querySelectorAll('main > section')].map(s => Math.round(s.getBoundingClientRect().top + scrollY)))",
    returnByValue: true,
  });
  return JSON.parse(result.value);
}

const desktop = { width: 1440, height: 1000, mobile: false, url: URL_BASE };
await shoot("01-desktop-hero", desktop);
let tops = await sectionTops();
const names = [
  "hero",
  "notes",
  "bestsellers",
  "collections",
  "atelier",
  "campaign",
  "newarrivals",
  "watch",
  "celebrity",
  "marks",
  "newsletter",
  "instagram",
];
for (let i = 1; i < tops.length; i++) {
  await shoot(`${String(i + 1).padStart(2, "0")}-desktop-${names[i] ?? i}`, {
    ...desktop,
    scrollTo: tops[i] + 60,
  });
}
await shoot("90-desktop-footer", { ...desktop, scrollTo: 999999 });

const mobile = { width: 390, height: 844, mobile: true, url: URL_BASE };
await shoot("10-mobile-hero", mobile);
tops = await sectionTops();
for (const [i, key] of [[1, "notes"], [2, "bestsellers"], [3, "collections"], [4, "atelier"], [5, "campaign"], [7, "watch"]]) {
  await shoot(`1${i}-mobile-${key}`, { ...mobile, scrollTo: (tops[i] ?? 0) + 40 });
}

ws.close();
chrome.kill();
process.exit(0);
