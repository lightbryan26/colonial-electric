import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://dribbble.com/shots/27120544-Electrical-Services-Website-Design', { waitUntil: 'networkidle' });
const urls = await p.$$eval('img, source', els => els.flatMap(e => [e.currentSrc||e.src, ...(e.srcset||'').split(',').map(s=>s.trim().split(' ')[0])]).filter(u => u && u.includes('userupload')));
console.log([...new Set(urls)].join('\n'));
await b.close();
