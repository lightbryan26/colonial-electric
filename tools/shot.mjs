// usage: node shot.mjs <url> <out.png> [width=1440] [selector|full|viewport]
import { chromium } from 'playwright';
const [url, out, w='1440', target='full'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +w < 600 ? 812 : 900 } });
const errors=[]; p.on('pageerror',e=>errors.push(e.message)); p.on('requestfailed',r=>errors.push('FAILED '+r.url()));
p.on('response',r=>{ if(r.status()>=400) errors.push(r.status()+' '+r.url()) });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))} scrollTo(0,0) });
await p.waitForTimeout(800);
if (target==='full') await p.screenshot({ path: out, fullPage: true });
else if (target==='viewport') await p.screenshot({ path: out });
else { const el=await p.$(target); if(!el){console.error('NO ELEMENT '+target); process.exit(2)} await el.screenshot({ path: out }); }
const hscroll = await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
console.log(JSON.stringify({ title: await p.title(), horizontalScroll: hscroll, errors }));
await b.close();
