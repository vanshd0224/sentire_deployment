// Walks the buying journey on the live site: product -> add to cart -> cart
// -> checkout button (stops at whatever checkout page appears; buys nothing).
import { spawn } from "node:child_process"; import fs from "node:fs";
const OUT=process.env.OUT||""; if(OUT) fs.mkdirSync(OUT,{recursive:true});
const PORT=9521;
const chrome=spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",["--headless=new","--hide-scrollbars",`--remote-debugging-port=${PORT}`,"--window-size=390,844","--use-angle=d3d11","--enable-gpu","about:blank"]);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ws;for(let i=0;i<60&&!ws;i++){try{const l=await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();ws=l.find(t=>t.type==="page")?.webSocketDebuggerUrl;}catch{} if(!ws)await sleep(250);}
const s=new WebSocket(ws);await new Promise(r=>s.onopen=r);let id=0;const p=new Map();const ev=[];
s.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m.result);p.delete(m.id);}else if(m.method)ev.push(m);};
const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);s.send(JSON.stringify({id:i,method:m,params:q}));});
const js=async(e,a=false)=>(await send("Runtime.evaluate",{expression:e,returnByValue:true,awaitPromise:a})).result?.value;
const shot=async n=>{ if(!OUT) return; const {data}=await send("Page.captureScreenshot",{format:"jpeg",quality:70}); fs.writeFileSync(`${OUT}/${n}.jpg`,Buffer.from(data,"base64")); };
await send("Page.enable");await send("Runtime.enable");await send("Network.enable");
await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:2,mobile:true});

const step = async (label) => {
  const info = await js(`JSON.stringify({url:location.href.slice(0,120), title:document.title.slice(0,70), h1:(document.querySelector('h1')||{}).textContent?.trim().slice(0,60)})`);
  console.log(label.padEnd(22), info);
};

await send("Page.navigate",{url:"https://sentirebypc.com/perfumes/purple-oud/50ml"});await sleep(9000);
await step("1 product page"); await shot("1-product");
// find and click an add-to-cart control
const added = await js(`(()=>{const bs=[...document.querySelectorAll('button')].filter(x=>/add to (bag|cart)/i.test(x.textContent||''));
  // only the one actually on screen (the product's own sticky bar), not the
  // cards behind the modal
  const vis=bs.filter(b=>{const r=b.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight+2&&r.width>40});
  const b=vis[vis.length-1]||bs[0];if(!b)return 'no add button';
  const label=b.textContent.trim().slice(0,40);b.click();return 'clicked: '+label})()`);
console.log("2 add to cart        ", added); await sleep(3500); await shot("2-added");
const cartState = await js(`JSON.stringify({localStorageKeys:Object.keys(localStorage).slice(0,12), drawerOpen:!!document.querySelector('[class*=translate-x-0][class*=fixed]'), bodyText:(document.body.innerText.match(/cart|bag/i)||[]).length})`);
console.log("   cart state        ", cartState);
await send("Page.navigate",{url:"https://sentirebypc.com/cart"});await sleep(7000);
await step("3 cart page"); await shot("3-cart");
const cartItems = await js(`JSON.stringify({items:(document.body.innerText.match(/₹[\d,]+/g)||[]).slice(0,6), empty:/empty/i.test(document.body.innerText), buttons:[...document.querySelectorAll('button,a')].map(b=>b.textContent.trim()).filter(t=>/checkout|proceed|pay/i.test(t)).slice(0,5)})`);
console.log("   cart contents     ", cartItems);
ev.length=0;
const clicked = await js(`(()=>{const b=[...document.querySelectorAll('button,a')].find(x=>/checkout|proceed to pay/i.test(x.textContent||''));if(!b)return 'no checkout button';b.scrollIntoView({block:'center'});b.click();return 'clicked: '+b.textContent.trim().slice(0,40)})()`);
console.log("4 checkout click     ", clicked);
await sleep(12000);
await step("5 after checkout"); await shot("5-checkout");
const nav=[...new Set(ev.filter(e=>e.method==="Network.requestWillBeSent"&&e.params.type==="Document").map(e=>e.params.request.url.slice(0,120)))];
console.log("   document requests ", JSON.stringify(nav.slice(-4)));
const errs=[...new Set(ev.filter(e=>e.method==="Runtime.consoleAPICalled"&&e.params.type==="error").map(e=>e.params.args.map(a=>a.value??a.description??"").join(" ").slice(0,160)))];
console.log("   console errors    ", JSON.stringify(errs.slice(0,5)));
const failed=[...new Set(ev.filter(e=>e.method==="Network.loadingFailed").map(e=>e.params.errorText))];
console.log("   failed requests   ", JSON.stringify(failed.slice(0,5)));
s.close();chrome.kill();process.exit(0);
