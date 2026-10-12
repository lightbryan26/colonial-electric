// Service hero photos: photos/services/<slug>.(jpg|jpeg|png|webp) -> src/assets/img/services/<slug>-<w>.webp + .jpg
// and an entry 'services/<slug>' in src/data/images.json (other keys are never touched). The service hero
// (src/pages/service.mjs) shows that photo instead of the branded service panel as soon as the key exists.
// Real Colonial job photos only (Instagram / Google Business Profile): no AI images, no stock (brief §8).
// usage: node src/scripts/service-photos.mjs && node src/build.mjs
// Never upscales: widths wider than the source are skipped, and a source narrower than 1600px also gets its own width.
// Removing a photo and re-running drops its 'services/<slug>' key and its derived files, so the hero falls back to the panel.
import { createRequire } from 'module';
import fs from 'fs';
import { services } from '../data/services.mjs';
const root = new URL('../../', import.meta.url).pathname;
const require = createRequire(root + 'tools/package.json');
const sharp = require('sharp');
const SRC = root + 'photos/services/', OUT = root + 'src/assets/img/services/', MAN = root + 'src/data/images.json';
const WIDTHS = [640, 960, 1280, 1600];
const slugs = new Set(services.map(s => s.slug));
const derived = slug => (fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(x => new RegExp(`^${slug}-\\d+\\.(webp|jpg)$`).test(x)) : []);

const before = fs.readFileSync(MAN, 'utf8');
const man = JSON.parse(before);
const files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort() : [];
const seen = new Set();
let made = 0;
for (const f of files) {
  const slug = f.replace(/\.[^.]+$/, '').toLowerCase();
  if (!slugs.has(slug)) { console.warn(`skip ${f}: "${slug}" is not a service slug (see photos/services/README.md)`); continue; }
  if (seen.has(slug)) { console.warn(`skip ${f}: another photo for ${slug} was already used`); continue; }
  seen.add(slug);
  const base = sharp(SRC + f).rotate(); // honour EXIF orientation
  const { info } = await base.clone().toBuffer({ resolveWithObject: true });
  const ws = WIDTHS.filter(w => w <= info.width);
  if (info.width < WIDTHS.at(-1) && !ws.includes(info.width)) ws.push(info.width);
  fs.mkdirSync(OUT, { recursive: true });
  for (const old of derived(slug)) fs.rmSync(OUT + old); // a replaced photo never leaves stale widths behind
  for (const w of ws) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().webp({ quality: 78, effort: 5 }).toFile(`${OUT}${slug}-${w}.webp`);
    await r.clone().flatten({ background: '#ffffff' }).jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(`${OUT}${slug}-${w}.jpg`);
  }
  man['services/' + slug] = { w: info.width, h: info.height, widths: ws.sort((a, b) => a - b), fallback: 'jpg' };
  made++;
  console.log(`services/${slug}: ${info.width}x${info.height} -> ${ws.join(', ')}`);
}
// Photos that were removed: drop their manifest key and derived files.
let dropped = 0;
for (const key of Object.keys(man).filter(k => k.startsWith('services/'))) {
  const slug = key.slice('services/'.length);
  if (seen.has(slug)) continue;
  delete man[key]; dropped++;
  for (const old of derived(slug)) fs.rmSync(OUT + old);
  console.log(`${key}: source photo gone, removed`);
}
const after = JSON.stringify(man, null, 1);
if (after !== before) fs.writeFileSync(MAN, after);
console.log(`${made} service photo(s) processed, ${dropped} removed, images.json ${after === before ? 'unchanged' : 'updated'}`);
