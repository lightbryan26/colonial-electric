// usage: node shot.mjs <url> <out.png> [width=1440] [selector|full|viewport]
import { chromium } from 'playwright';
const [url, out, w='1440', target='full'] = process.argv.slice(2);
import fs from 'fs';
const exe = process.env.PW_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const b = await chromium.launch(exe ? { executablePath: exe } : {});
const p = await b.newPage({ viewport: { width: +w, height: +w < 600 ? 812 : 900 } });
// Google Maps embeds can't load from the build sandbox: stand in a neutral placeholder so screenshots stay meaningful (live site loads the real map).
await p.route(/^https:\/\/(www\.|maps\.)?google\.com\/maps/, r => r.fulfill({ contentType: 'text/html', body: '<html><body style="margin:0;display:grid;place-items:center;height:100vh;background:#e5e3df;font:600 14px system-ui;color:#5f6b82">Google Map (loads on the live site)</body></html>' }));
const errors=[]; p.on('pageerror',e=>errors.push(e.message)); p.on('requestfailed',r=>errors.push('FAILED '+r.url()));
p.on('response',r=>{ if(r.status()>=400) errors.push(r.status()+' '+r.url()) });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,60))} scrollTo({top:0,behavior:'instant'}) });
await p.waitForTimeout(800);
if (target==='full') await p.screenshot({ path: out, fullPage: true });
else if (target==='viewport') await p.screenshot({ path: out });
else { await p.addStyleTag({ content: '.site-header,.callbar{visibility:hidden!important}' }); const el=await p.$(target); if(!el){console.error('NO ELEMENT '+target); process.exit(2)} await el.screenshot({ path: out }); }
const hscroll = await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
console.log(JSON.stringify({ title: await p.title(), horizontalScroll: hscroll, errors }));
await b.close();
