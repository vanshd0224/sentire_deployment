// What does each heavy script cost? Loads the home page three ways on a
// throttled phone: as-is, without the msg91 OTP script, without OTP+pixel.
import { spawn } from "node:child_process";
const PORT=9531;
const chrome=spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",["--headless=new","--hide-scrollbars",`--remote-debugging-port=${PORT}`,"--window-size=390,844","--use-angle=d3d11","--enable-gpu","about:blank"]);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<60&&!ws;i++){try{const l=await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();ws=l.find(t=>t.type==="page")?.webSocketDebuggerUrl;}catch{} if(!ws)await sleep(250);}
const s=new WebSocket(ws);await new Promise(r=>s.onopen=r);let id=0;const p=new Map();
s.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m.result);p.delete(m.id);}};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);s.send(JSON.stringify({id:i,method:m,params:q}));});
const js=async e=>(await send("Runtime.evaluate",{expression:e,returnByValue:true})).result?.value;
await send("Page.enable");await send("Network.enable");
await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:2,mobile:true});
await send("Emulation.setCPUThrottlingRate",{rate:4});
await send("Network.emulateNetworkConditions",{offline:false,latency:150,downloadThroughput:10*1024*1024/8,uploadThroughput:3*1024*1024/8});
await send("Page.addScriptToEvaluateOnNewDocument",{source:`window.__v={lcp:0,tbt:0,longest:0};
new PerformanceObserver(l=>{const e=l.getEntries();window.__v.lcp=Math.round(e[e.length-1].startTime)}).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries()){window.__v.tbt+=Math.max(0,e.duration-50);window.__v.longest=Math.max(window.__v.longest,Math.round(e.duration))}}).observe({type:'longtask',buffered:true});`});
for (const [label, blocked] of [["as-is",[]],["no OTP script",["*msg91*"]],["no OTP + no pixel",["*msg91*","*facebook.net*","*facebook.com*"]]]) {
  await send("Network.setBlockedURLs",{urls:blocked});
  await send("Network.clearBrowserCache");
  await send("Page.navigate",{url:"https://sentirebypc.com/?t="+Date.now()});
  await sleep(13000);
  const v=await js(`JSON.stringify({...window.__v, fcp:Math.round((performance.getEntriesByType('paint').find(p=>p.name==='first-contentful-paint')||{}).startTime||0), bytes:Math.round(performance.getEntriesByType('resource').reduce((a,r)=>a+(r.encodedBodySize||0),0)/1024)})`);
  console.log(label.padEnd(18), v);
}
s.close();chrome.kill();process.exit(0);
