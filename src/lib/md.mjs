// Minimal Markdown → HTML for the scraped legal pages (headings, paragraphs, "- " lists). Verbatim text.
import fs from 'fs';
import { esc } from './html.mjs';
const root = new URL('../../', import.meta.url).pathname;
export const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function legalDoc(name) {
  const lines = fs.readFileSync(root + `source/pages/${name}.md`, 'utf8').split('\n');
  const body = [], toc = [];
  let list = null, seenH = 0;
  const flush = () => { if (list) { body.push(`<ul>${list.map(i => `<li>${linkify(esc(i))}</li>`).join('')}</ul>`); list = null; } };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l || /^(URL|Slug):/.test(l) || /^# /.test(l)) { if (!l) flush(); continue; }
    const h = l.match(/^##\s+(.*)$/);
    if (h) { flush(); seenH++; if (seenH === 1) continue; const id = slugify(h[1]); toc.push({ id, label: h[1] }); body.push(`<h2 id="${id}">${esc(h[1])}</h2>`); continue; }
    const li = l.match(/^[-*]\s+(.*)$/);
    if (li) { (list ||= []).push(li[1]); continue; }
    flush(); body.push(`<p>${linkify(esc(l))}</p>`);
  }
  flush();
  return { html: body.join('\n'), toc };
}
const linkify = s => s.replace(/([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,})/gi, '<a href="mailto:$1">$1</a>');
