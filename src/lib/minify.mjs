// Dependency-free, deliberately conservative minifiers used by src/build.mjs.
//
// minifyCss: removes comments and collapses every whitespace run to one space, outside strings and url(). A space is
//   dropped only next to { } ; , and after ':' (never before ':', so '.x :is(.y)' keeps its descendant combinator),
//   plus the last ';' before '}'. Spaces around + - * / > ~ and inside calc() or media queries are kept, so no
//   selector or value can change meaning. Verified lossless when introduced: the browser's CSSOM serialisation of the
//   source and of the output was identical, rule for rule.
// minifyJs: line-based, for the small hand-written src/js bundle. Drops whole-line // comments, /* */ comments that
//   start a line, blank lines and indentation. Every newline that carries code is kept, so automatic semicolon
//   insertion behaves exactly as in the source. Template literals would make indentation significant, so a source with a
//   backtick is returned unchanged.

export function minifyCss(src) {
  let out = '';
  let pendingSpace = false;
  let i = 0;
  const n = src.length;
  const NO_SPACE_AFTER = '{};,:';
  const NO_SPACE_BEFORE = '{};,';
  const emit = s => {
    if (pendingSpace && out && !NO_SPACE_AFTER.includes(out.at(-1)) && !NO_SPACE_BEFORE.includes(s[0])) out += ' ';
    pendingSpace = false;
    out += s;
  };
  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end === -1 ? n : end + 2; // a comment is not whitespace: '.a/**/.b' is the compound '.a.b'
      continue;
    }
    if (/\s/.test(c)) { pendingSpace = true; i++; continue; }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === '\\') j++; j++; }
      emit(src.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    // url( unquoted ): copy verbatim up to the closing paren
    if ((c === 'u' || c === 'U') && /^url\(\s*[^\s"')]/i.test(src.slice(i, i + 6))) {
      const end = src.indexOf(')', i);
      emit(src.slice(i, end + 1));
      i = end + 1;
      continue;
    }
    if (c === '}') {
      pendingSpace = false;
      if (out.at(-1) === ';') out = out.slice(0, -1);
      out += '}';
      i++;
      continue;
    }
    emit(c);
    i++;
  }
  return out.trim() + '\n';
}

export function minifyJs(src) {
  if (src.includes('`')) return src;
  const lines = src.split('\n');
  const kept = [];
  let inBlock = false;
  for (const raw of lines) {
    let line = raw.trim();
    if (inBlock) {
      const end = line.indexOf('*/');
      if (end === -1) continue;
      inBlock = false;
      line = line.slice(end + 2).trim();
    }
    while (line.startsWith('/*')) {
      const end = line.indexOf('*/', 2);
      if (end === -1) { inBlock = true; line = ''; break; }
      line = line.slice(end + 2).trim();
    }
    if (!line || line.startsWith('//')) continue;
    kept.push(line);
  }
  return kept.join('\n') + '\n';
}
