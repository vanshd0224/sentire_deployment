// Core Web Vitals + main-thread blocking on the live site, with observers
// installed before the page runs. usage: node scripts/live-vitals.mjs [mobile|desktop]
import { spawn } from "node:child_process";
const MOBILE = (process.argv[2] ?? "mobile") === "mobile";
const PORT = 9511 + (MOBILE ? 0 : 1);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",["--headless=new","--hide-scrollbars",`--remote-debugging-port=${PORT}`,`--window-size=${MOBILE?"390,844":"1440,900"}`,"--use-angle=d3d11","--enable-gpu","about:blank"]);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<60&&!ws;i++){try{const l=await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();ws=l.find(t=>t.type==="page")?.webSocketDebuggerUrl;}catch{} if(!ws)await sleep(250);}
const s=new WebSocket(ws);await new Promise(r=>s.onopen=r);let id=0;const p=new Map();
s.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m.result);p.delete(m.id);}};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);s.send(JSON.stringify({id:i,method:m,params:q}));});
const js=async(e,a=false)=>(await send("Runtime.evaluate",{expression:e,returnByValue:true,awaitPromise:a})).result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:MOBILE?390:1440,height:MOBILE?844:900,deviceScaleFactor:MOBILE?2:1,mobile:MOBILE});
if(MOBILE){await send("Emulation.setCPUThrottlingRate",{rate:4});await send("Network.enable");await send("Network.emulateNetworkConditions",{offline:false,latency:150,downloadThroughput:10*1024*1024/8,uploadThroughput:3*1024*1024/8});}
await send("Page.addScriptToEvaluateOnNewDocument",{source:`
window.__v={lcp:0,cls:0,tbt:0,longest:0,tasks:0,fid:0};
new PerformanceObserver(l=>{const es=l.getEntries();window.__v.lcp=Math.round(es[es.length-1].startTime);}).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) window.__v.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries()){window.__v.tasks++;window.__v.tbt+=Math.max(0,e.duration-50);window.__v.longest=Math.max(window.__v.longest,Math.round(e.duration));}}).observe({type:'longtask',buffered:true});
`});
for(const [name,url] of [["home","https://sentirebypc.com/"],["product","https://sentirebypc.com/perfumes/purple-oud/50ml"],["perfumes","https://sentirebypc.com/perfumes"],["discovery","https://sentirebypc.com/discovery-set"]]){
  await send("Page.navigate",{url});await sleep(MOBILE?12000:8000);
  const v=await js(`JSON.stringify({...window.__v, cls:Math.round(window.__v.cls*1000)/1000, fcp:Math.round((performance.getEntriesByType('paint').find(p=>p.name==='first-contentful-paint')||{}).startTime||0), ttfb:Math.round(performance.getEntriesByType('navigation')[0]?.responseStart||0)})`);
  console.log(name.padEnd(10), v);
}
s.close();chrome.kill();process.exit(0);
