// Town "Top Sites" photos: re-export the 84 landmark photos with a per-image crop so no Google Maps chrome
// (watermark, contributor chip, carousel arrows), ad copy or photographer mark shows in any card or hero.
// Originals: source/images/town/<key>-800.jpg (the 800x800 exports first made by images.mjs from the live uploads).
// Crops:     src/data/town-crops.json ({l,t,r,b} pixels trimmed from each side of the original).
// Output:    src/assets/img/town/<key>-<w>.(webp|jpg) + the town/* entries of src/data/images.json.
// Idempotent: always crops from the archived originals. usage: node src/scripts/town-crops.mjs
import { createRequire } from 'module';
import fs from 'fs';
const root = new URL('../../', import.meta.url).pathname;
const require = createRequire(root + 'tools/package.json');
const sharp = require('sharp');
const ORIG = root + 'source/images/town/', OUT = root + 'src/assets/img/town/', MAN = root + 'src/data/images.json';
const crops = JSON.parse(fs.readFileSync(root + 'src/data/town-crops.json', 'utf8'));
const man = JSON.parse(fs.readFileSync(MAN, 'utf8'));

let n = 0;
for (const file of fs.readdirSync(ORIG).filter(f => f.endsWith('-800.jpg')).sort()) {
  const key = file.slice(0, -'-800.jpg'.length);
  const c = crops[key];
  if (!c) throw new Error('No crop for ' + key);
  const src = sharp(ORIG + file);
  const { width: W, height: H } = await src.metadata();
  const box = { left: c.l || 0, top: c.t || 0, width: W - (c.l || 0) - (c.r || 0), height: H - (c.t || 0) - (c.b || 0) };
  const base = src.clone().extract(box);
  // 400 + full crop width (never upscaled). Drop stale renditions of a different width.
  const widths = [...new Set([400, box.width].filter(w => w <= box.width))].sort((a, b) => a - b);
  if (!widths.length) widths.push(box.width);
  for (const f of fs.readdirSync(OUT).filter(f => f.startsWith(key + '-') && /^\d+\.(webp|jpg)$/.test(f.slice(key.length + 1)))) {
    if (!widths.includes(+f.slice(key.length + 1).split('.')[0])) fs.unlinkSync(OUT + f);
  }
  for (const w of widths) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().webp({ quality: 74, effort: 5 }).toFile(`${OUT}${key}-${w}.webp`);
    await r.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${OUT}${key}-${w}.jpg`);
  }
  man['town/' + key] = { w: box.width, h: box.height, widths, fallback: 'jpg' };
  n++;
}
fs.writeFileSync(MAN, JSON.stringify(man, null, 1));
console.log(n, 'town photos cropped');
