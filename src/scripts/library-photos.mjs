// Library photos: photos/library/<name>.(jpg|jpeg|png|webp) -> src/assets/img/photos/<name>-<w>.webp + .jpg
// and an entry 'photos/<name>' in src/data/images.json (other keys are never touched). Pages use them with
// picture(ctx, 'photos/<name>', { alt }) for cards and tiles (homepage grid, /services/, about, financing, remodels).
// Real Colonial job photos only, from Colonial's own WordPress media library (see photos/MANIFEST.md): no AI images,
// no stock (brief §8). Filenames carry service words only, never a customer name or a street address.
// usage: node src/scripts/library-photos.mjs && node src/build.mjs
// Never upscales: widths wider than the source are skipped, and a source narrower than 1600px also gets its own width.
// Removing a photo and re-running drops its 'photos/<name>' key and its derived files.
import { createRequire } from 'module';
import fs from 'fs';
const root = new URL('../../', import.meta.url).pathname;
const require = createRequire(root + 'tools/package.json');
const sharp = require('sharp');
const SRC = root + 'photos/library/', OUT = root + 'src/assets/img/photos/', MAN = root + 'src/data/images.json';
const WIDTHS = [480, 800, 1200, 1600];
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const derived = name => (fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(x => new RegExp(`^${esc(name)}-\\d+\\.(webp|jpg)$`).test(x)) : []);

const before = fs.readFileSync(MAN, 'utf8');
const man = JSON.parse(before);
const files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort() : [];
const seen = new Set();
let made = 0;
for (const f of files) {
  const name = f.replace(/\.[^.]+$/, '').toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) { console.warn(`skip ${f}: use lowercase service words joined by hyphens (e.g. panel-basement-2.jpg)`); continue; }
  if (seen.has(name)) { console.warn(`skip ${f}: another photo named ${name} was already used`); continue; }
  seen.add(name);
  const base = sharp(SRC + f).rotate(); // honour EXIF orientation; output carries no metadata (GPS etc. stripped)
  const { info } = await base.clone().toBuffer({ resolveWithObject: true });
  const ws = WIDTHS.filter(w => w <= info.width);
  if (info.width < WIDTHS.at(-1) && !ws.includes(info.width)) ws.push(info.width);
  fs.mkdirSync(OUT, { recursive: true });
  for (const old of derived(name)) fs.rmSync(OUT + old); // a replaced photo never leaves stale widths behind
  for (const w of ws) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().webp({ quality: 78, effort: 5 }).toFile(`${OUT}${name}-${w}.webp`);
    await r.clone().flatten({ background: '#ffffff' }).jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(`${OUT}${name}-${w}.jpg`);
  }
  man['photos/' + name] = { w: info.width, h: info.height, widths: ws.sort((a, b) => a - b), fallback: 'jpg' };
  made++;
  console.log(`photos/${name}: ${info.width}x${info.height} -> ${ws.join(', ')}`);
}
// Photos that were removed: drop their manifest key and derived files.
let dropped = 0;
for (const key of Object.keys(man).filter(k => k.startsWith('photos/'))) {
  const name = key.slice('photos/'.length);
  if (seen.has(name)) continue;
  delete man[key]; dropped++;
  for (const old of derived(name)) fs.rmSync(OUT + old);
  console.log(`${key}: source photo gone, removed`);
}
const after = JSON.stringify(man, null, 1);
if (after !== before) fs.writeFileSync(MAN, after);
console.log(`${made} library photo(s) processed, ${dropped} removed, images.json ${after === before ? 'unchanged' : 'updated'}`);
