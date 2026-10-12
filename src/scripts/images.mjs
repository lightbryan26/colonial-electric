// One-off image pipeline: originals (shots/raw + source/images) -> src/assets/img (WebP + JPEG/PNG fallback)
// usage: node src/scripts/images.mjs
import { createRequire } from 'module';
import fs from 'fs'; import path from 'path';
const root = new URL('../../', import.meta.url).pathname;
const require = createRequire(root + 'tools/package.json');
const sharp = require('sharp');
const RAW = root + 'shots/raw/', OUT = root + 'src/assets/img/', MAN = root + 'src/data/images.json';
const man = {};
async function job(key, src, widths, { fallback = 'jpg', quality = 78, crop } = {}) {
  let base = sharp(src).rotate();
  if (crop) base = base.extract(crop);
  const meta = await base.clone().toBuffer({ resolveWithObject: true }).then(r => r.info);
  const ws = widths.filter(w => w <= meta.width);
  if (!ws.includes(Math.min(meta.width, widths.at(-1))) && meta.width < widths.at(-1)) ws.push(meta.width);
  const dir = path.dirname(OUT + key); fs.mkdirSync(dir, { recursive: true });
  for (const w of [...new Set(ws)]) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().webp({ quality, effort: 5 }).toFile(`${OUT}${key}-${w}.webp`);
    if (fallback === 'jpg') await r.clone().flatten({ background: '#ffffff' }).jpeg({ quality: quality + 2, mozjpeg: true, progressive: true }).toFile(`${OUT}${key}-${w}.jpg`);
    else await r.clone().png({ compressionLevel: 9, palette: false }).toFile(`${OUT}${key}-${w}.png`);
  }
  man[key] = { w: meta.width, h: meta.height, widths: [...new Set(ws)].sort((a, b) => a - b), fallback };
}
await job('owner-van', root + 'source/images/owner-van.jpg', [640, 960, 1280, 1600, 2048], { quality: 76 });
await job('scott-portrait', RAW + 'DSC_6221-Ev-scaled.jpg', [480, 800, 1200, 1600]);
await job('logo-lockup', RAW + 'COLONIALELECTRIC_LogoPackageWS_Both.png', [320, 621], { fallback: 'png', quality: 90 });
await job('logo-badge', RAW + 'COLONIALELECTRIC_Web2_Badge.png', [250], { fallback: 'png', quality: 92 });
await job('emblem', RAW + 'cropped-Untitled-design-5.png', [256, 512], { fallback: 'png', quality: 90 });
for (const f of fs.readdirSync(RAW).filter(f => /-MA-/.test(f))) {
  const key = 'town/' + f.replace(/\.(png|jpe?g)$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
  await job(key, RAW + f, [400, 800], { quality: 72 });
}
// favicons (never upscaled; source is 512x512)
const em = RAW + 'cropped-Untitled-design-5.png';
for (const s of [32, 180, 192, 512]) await sharp(em).resize(s, s).png({ compressionLevel: 9 }).toFile(`${OUT}favicon-${s}.png`);
fs.writeFileSync(MAN, JSON.stringify(man, null, 1));
console.log(Object.keys(man).length, 'images');
