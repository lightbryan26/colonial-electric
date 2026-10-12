// Meta descriptions: first verbatim sentence of each page's scraped copy, <=160 chars (brief §9 Meta).
import fs from 'fs';
const root = new URL('../../', import.meta.url).pathname;
const dir = root + 'source/pages/';
const out = { '': 'Colonial Electric - Top-notch electrical services in South Shore Massachusetts. Count on us to meet your electrical needs with the utmost quality and care.' };
const override = {
  'we-offer-financing/': 'We’ve partnered with Wisetack to offer our customers flexible financing options, so you can pay over time rather than all at once.',
  'calendar/': out[''],
};
for (const f of fs.readdirSync(dir)) {
  if (f === 'home.md') continue;
  const slug = f.replace('.md', '').replace(/__/g, '/') + '/';
  if (override[slug]) { out[slug] = override[slug]; continue; }
  const lines = fs.readFileSync(dir + f, 'utf8').split('\n').map(l => l.trim());
  const para = lines.find(l => l && !l.startsWith('#') && !/^(URL|Slug):/.test(l) && l.length > 70 && !/\$|%/.test(l) && !l.startsWith('Whether you need it for your home'));
  if (!para) { out[slug] = out['']; continue; }
  const sents = para.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+(?=\s|$)/g) || [para];
  let s = sents[0].trim();
  for (let i = 1; s.length < 60 && i < sents.length && (s + ' ' + sents[i].trim()).length <= 160; i++) s += ' ' + sents[i].trim();
  if (s.length > 160) { s = s.slice(0, 157).replace(/\s+\S*$/, '') + '…'; }
  out[slug] = s;
}
fs.writeFileSync(root + 'src/data/descriptions.json', JSON.stringify(out, null, 1));
console.log(Object.keys(out).length);
