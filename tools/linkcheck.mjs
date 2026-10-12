// usage: node linkcheck.mjs <baseUrl ending in />  -> crawls all same-origin pages under base, checks every href/src
import { chromium } from 'playwright';
const base = process.argv[2]; const seen=new Set(), bad=[], pages=[]; const queue=[base];
const fs = await import('fs');
const exe = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const b = await chromium.launch(exe ? { executablePath: exe } : {}); const ctx = await b.newContext(); const p = await ctx.newPage();
const checked=new Map();
async function status(u){ if(checked.has(u)) return checked.get(u); let s; try{ const r=await ctx.request.get(u,{timeout:30000}); s=r.status() }catch(e){ s='ERR '+e.message.slice(0,60) } checked.set(u,s); return s }
while(queue.length){ const u=queue.shift(); if(seen.has(u)) continue; seen.add(u);
  const r=await p.goto(u,{waitUntil:'load',timeout:60000}).catch(e=>null); const st=r?r.status():'ERR';
  pages.push([u,st]); if(st!==200){ bad.push(['PAGE',u,st]); continue }
  const refs=await p.$$eval('a[href],link[href],img[src],script[src],source[srcset],img[srcset]',els=>els.flatMap(e=>{const o=[];const h=typeof e.href==='string'?e.href:(e.href&&e.href.baseVal?new URL(e.href.baseVal,document.baseURI).href:'');/* SVG <a>: href is an SVGAnimatedString */if(h&&e.tagName!=='LINK'||e.tagName==='LINK'&&e.rel!=='preconnect'&&e.rel!=='dns-prefetch')o.push(h);if(e.src)o.push(e.src);if(e.srcset)o.push(...e.srcset.split(',').map(s=>new URL(s.trim().split(' ')[0],location.href).href));return o}));
  for(const ref of refs){ if(!ref||/^(tel:|mailto:|sms:|javascript:)/.test(ref)) continue; const clean=ref.split('#')[0]; if(!clean) continue;
    if(clean.startsWith(base)){ if(/\/$|\.html$/.test(clean)&&!seen.has(clean)) queue.push(clean); else { const s=await status(clean); if(s!==200) bad.push(['ASSET',u,clean,s]) } }
    else if(/^https?:/.test(clean)){ const s=await status(clean); if(!(s>=200&&s<400)&&s!==403&&s!==429&&s!==999) bad.push(['EXTERNAL',u,clean,s]) }
    else bad.push(['NON-RELATIVE/OUTSIDE BASE',u,clean]) } }
console.log(JSON.stringify({pagesCrawled:pages.length, bad},null,1)); await b.close(); process.exit(bad.length?1:0);
