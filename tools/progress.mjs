// usage: node tools/progress.mjs <piece> <status> <round> "<note>" [imagePath]
// status: queued|building|critiquing|lost|won|verifying|done|failed
import fs from 'fs'; import path from 'path';
const dir = new URL('../docs/build-progress/', import.meta.url).pathname;
const file = dir + 'progress.json', lock = dir + '.lock';
const [piece, status, round, note='', img] = process.argv.slice(2);
for (let i=0;i<200;i++){ try{ fs.mkdirSync(lock); break }catch{ await new Promise(r=>setTimeout(r,50)) } }
try {
  const d = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,'utf8')) : { pieces:{}, events:[] };
  let shot;
  if (img && fs.existsSync(img)) { fs.mkdirSync(dir + 'shots', { recursive: true }); shot = `shots/${piece.replace(/[^a-z0-9-]/gi,'_')}-r${round}${path.extname(img)}`; fs.copyFileSync(img, dir+shot); }
  const now = new Date().toISOString();
  d.pieces[piece] = { ...(d.pieces[piece]||{}), status, round:+round, note, updated: now, ...(shot?{shot}:{}) };
  d.events.unshift({ t: now, piece, status, round:+round, note, ...(shot?{shot}:{}) }); d.events = d.events.slice(0,300);
  d.updated = now; fs.writeFileSync(file, JSON.stringify(d,null,1));
} finally { fs.rmdirSync(lock) }
