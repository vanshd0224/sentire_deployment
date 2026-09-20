import { spawn } from "node:child_process"; import fs from "node:fs";
const PORT=9541; const OUT=process.env.OUT||"";
if(OUT) fs.mkdirSync(OUT,{recursive:true});
const chrome=spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",["--headless=new","--hide-scrollbars",`--remote-debugging-port=${PORT}`,"--window-size=390,844","--use-angle=d3d11","--enable-gpu","about:blank"]);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<60&&!ws;i++){try{const l=await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();ws=l.find(t=>t.type==="page")?.webSocketDebuggerUrl;}catch{} if(!ws)await sleep(250);}
const s=new WebSocket(ws);await new Promise(r=>s.onopen=r);let id=0;const p=new Map();
s.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m.result);p.delete(m.id);}};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);s.send(JSON.stringify({id:i,method:m,params:q}));});
const js=async(e,a=false)=>(await send("Runtime.evaluate",{expression:e,returnByValue:true,awaitPromise:a})).result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:2,mobile:true});
await send("Page.addScriptToEvaluateOnNewDocument",{source:`window.__lcpEl='';new PerformanceObserver(l=>{const e=l.getEntries().pop();window.__lcpEl=(e.element?(e.element.tagName+'.'+String(e.element.className).slice(0,40)+' '+(e.element.currentSrc||'').split('/').pop():e.url||'').slice(0,90))+' @'+Math.round(e.startTime)+'ms'}).observe({type:'largest-contentful-paint',buffered:true});`});
await send("Page.navigate",{url:"https://sentirebypc.com/"});await sleep(11000);
console.log("LCP element:", await js("window.__lcpEl"));
console.log("images on home:", await js(`(()=>{const im=[...document.images];const big=im.filter(i=>i.naturalWidth>i.clientWidth*2.5&&i.clientWidth>0).map(i=>({f:(i.currentSrc||'').split('/').pop().slice(0,38),nat:i.naturalWidth,shown:Math.round(i.clientWidth)}));return JSON.stringify({total:im.length,offscreenNotLazy:im.filter(i=>i.loading!=='lazy'&&i.getBoundingClientRect().top>900).length,worst:big.slice(0,8)})})()`));
console.log("videos:", await js(`(()=>{const v=[...document.querySelectorAll('video')];return JSON.stringify({count:v.length,autoplay:v.filter(x=>x.autoplay).length,preload:v.map(x=>x.preload).slice(0,6),srcs:v.map(x=>(x.currentSrc||x.src||'').split('/').pop()).slice(0,6)})})()`));
console.log("tap targets <32px:", await js(`(()=>{const t=[...document.querySelectorAll('a,button')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<32||r.width<32)}).map(el=>(el.textContent||el.getAttribute('aria-label')||el.className).trim().slice(0,28));return JSON.stringify([...new Set(t)].slice(0,12))})()`));
console.log("no-alt images:", await js(`(()=>{const a=[...document.images].filter(i=>!i.getAttribute('alt')).map(i=>(i.currentSrc||'').split('/').pop().slice(0,34));return JSON.stringify([...new Set(a)].slice(0,10))})()`));
await send("Page.navigate",{url:"https://sentirebypc.com/this-page-does-not-exist"});await sleep(6000);
console.log("404 page shows:", await js(`JSON.stringify({h1:(document.querySelector('h1')||{}).textContent?.trim().slice(0,60), text:document.body.innerText.slice(0,120).replace(/\n/g,' | ')})`));
if(OUT){const {data}=await send("Page.captureScreenshot",{format:"jpeg",quality:70});fs.writeFileSync(`${OUT}/404.jpg`,Buffer.from(data,"base64"));}
s.close();chrome.kill();process.exit(0);
