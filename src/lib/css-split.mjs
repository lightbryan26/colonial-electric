// Per-template CSS bundles (src/build.mjs). The single site.css carried every page's rules, so 74-89% of the
// render-blocking stylesheet was unused on any one page. Each template now links assets/site-<template>.css: the
// src/css files that can style at least one of its pages, kept in the global cascade order (base.css, then A-Z), so
// no rule changes position relative to any other rule it can meet.
//
// "Can style" is a deliberate over-approximation: a file is kept for a template when any selector in it could match on
// any page of that template. A selector could match when every class, id and tag it names (ignoring pseudo-classes,
// pseudo-elements, attribute tests and the contents of :not()/:is()/:where()/:has()) occurs somewhere in the page.
// Classes that scripts add at runtime (classList.add/toggle/remove in src) are treated as always present.
// Dropping a file is therefore only possible when none of its rules can ever apply to that template.
// @keyframes used by a kept file but defined in another file pull that file in too.
import fs from 'fs';
import path from 'path';

/** Remove pseudo-classes/elements (with their parenthesised arguments) and attribute selectors. */
function skeleton(sel) {
  let out = '', i = 0;
  while (i < sel.length) {
    const c = sel[i];
    if (c === ':') {
      i++; if (sel[i] === ':') i++;
      while (i < sel.length && /[\w-]/.test(sel[i])) i++;
      if (sel[i] === '(') { let d = 0; do { if (sel[i] === '(') d++; else if (sel[i] === ')') d--; i++; } while (i < sel.length && d > 0); }
      continue;
    }
    if (c === '[') { let d = 0; do { if (sel[i] === '[') d++; else if (sel[i] === ']') d--; i++; } while (i < sel.length && d > 0); continue; }
    out += c; i++;
  }
  return out;
}

/** Split a stylesheet into its style-rule selectors, keyframe names (defined) and animation names (used). */
export function analyseCss(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '""');
  const selectors = [], keyframes = new Set(), animations = new Set();
  const stack = [];
  let buf = '';
  for (const ch of text) {
    if (ch === '{') {
      const head = buf.trim();
      const inKeyframes = stack.some(h => /^@(-\w+-)?keyframes/.test(h));
      if (/^@(-\w+-)?keyframes\s/.test(head)) keyframes.add(head.split(/\s+/)[1]);
      else if (!head.startsWith('@') && !inKeyframes) selectors.push(...head.split(',').map(s => s.trim()).filter(Boolean));
      stack.push(head); buf = '';
    } else if (ch === '}' || ch === ';') {
      const decl = buf.trim().match(/^animation(?:-name)?\s*:\s*(.+)$/);
      if (decl) for (const tok of decl[1].split(/[\s,]+/)) animations.add(tok);
      if (ch === '}') stack.pop();
      buf = '';
    } else buf += ch;
  }
  return { selectors, keyframes, animations };
}

/** Class names that scripts toggle at runtime (src/js and the inline scripts in pages/sections/blocks/partials). */
export function runtimeClasses(srcDir) {
  const found = new Set();
  for (const d of ['js', 'pages', 'sections', 'blocks', 'partials']) {
    const dir = path.join(srcDir, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir, { recursive: true })) {
      if (!/\.m?js$/.test(f)) continue;
      const t = fs.readFileSync(path.join(dir, f), 'utf8');
      for (const m of t.matchAll(/classList\.(?:add|toggle|remove|replace)\(\s*(['"])([\w-]+)\1/g)) found.add(m[2]);
      for (const m of t.matchAll(/classList\.replace\(\s*['"][\w-]+['"]\s*,\s*(['"])([\w-]+)\1/g)) found.add(m[2]);
      for (const m of t.matchAll(/\.className\s*\+?=\s*(['"])([^'"]*)\1/g)) m[2].split(/\s+/).forEach(c => c && found.add(c));
    }
  }
  return found;
}

/** What a selector needs to exist in the page before it can match. */
function requirements(sel, runtime) {
  const s = skeleton(sel);
  return {
    cls: [...s.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]).filter(c => !runtime.has(c)),
    ids: [...s.matchAll(/#(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]),
    tags: [...s.replace(/[.#][\w-]+/g, ' ').matchAll(/(?:^|[\s>+~])([a-zA-Z][\w-]*)/g)].map(m => m[1].toLowerCase()),
  };
}

/** Classes, ids and tag names that occur anywhere in a rendered page (inline scripts included, on purpose). */
export function pageFeatures(html, into = { cls: new Set(), ids: new Set(), tags: new Set() }) {
  for (const m of html.matchAll(/\sclass="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c) into.cls.add(c);
  for (const m of html.matchAll(/\sid="([^"]*)"/g)) into.ids.add(m[1]);
  for (const m of html.matchAll(/<([a-zA-Z][\w-]*)/g)) into.tags.add(m[1].toLowerCase());
  into.tags.add('html'); into.tags.add('body');
  return into;
}

/**
 * files: [{ name, css }] in cascade order. Returns a function features -> ordered list of file names to bundle.
 */
export function planner(files, runtime) {
  const info = files.map(f => {
    const a = analyseCss(f.css);
    return { name: f.name, reqs: a.selectors.map(s => requirements(s, runtime)), keyframes: a.keyframes, animations: a.animations };
  });
  return features => {
    const keep = new Set();
    for (const f of info) {
      if (f === info[0] || f.reqs.some(r => r.cls.every(c => features.cls.has(c)) && r.ids.every(i => features.ids.has(i)) && r.tags.every(t => features.tags.has(t)))) keep.add(f.name);
    }
    // keyframes closure
    for (let changed = true; changed;) {
      changed = false;
      for (const f of info) {
        if (!keep.has(f.name)) continue;
        for (const a of f.animations) {
          if (info.some(g => keep.has(g.name) && g.keyframes.has(a))) continue;
          const def = info.find(g => g.keyframes.has(a));
          if (def) { keep.add(def.name); changed = true; }
        }
      }
    }
    return info.filter(f => keep.has(f.name)).map(f => f.name);
  };
}
