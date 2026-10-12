// Service illustrations for the SERVICE template hero (src/pages/service.mjs). Owner: tpl-service.
// The hero shows the actual service, never the founder portrait. No real job photo of any service exists yet
// (photos/services/ is empty) and brief §8 rules out AI images, stock and the live site's framed shots, so each
// service is drawn here by hand as an inline SVG scene in the brand palette (navy, white, steel greys, red accents;
// no yellow or orange). Equipment only: no people, no logos, no text, no numbers, so nothing in a drawing is a claim.
// Coordinate space 400 x 500 (the 4:5 desktop frame). Every subject sits inside the central square y 50..450, so the
// 1:1 crop used below 960px keeps it whole. `detail` is a 4:5 close-up window of the same scene, drawn again in
// block B through <use> (no duplicate markup).

const N = { navy: '#12233E', ink: '#081020', n2: '#0D1A30', n3: '#1A3050', n4: '#24406A', n5: '#2E4C78', blue: '#1E4479', blueD: '#163762', red: '#BF1B2C', redD: '#8F1420', redL: '#E85E6C' };
const S = { s0: '#F6F7F9', s1: '#E8ECF1', s2: '#D5DBE3', s3: '#C9D1DC', s4: '#AEB8C6', s5: '#8994A6', s6: '#5F6B82', s7: '#3B4760' };

/* ---------- shared pieces ---------- */
const defs = `<defs>
  <linearGradient id="sva-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEF1F5"/><stop offset="1" stop-color="#DCE2EA"/></linearGradient>
  <linearGradient id="sva-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBD3DD"/><stop offset="1" stop-color="#B3BDCA"/></linearGradient>
  <linearGradient id="sva-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081020"/><stop offset=".7" stop-color="#1A3050"/></linearGradient>
  <linearGradient id="sva-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".42"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
  <linearGradient id="sva-cone-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".3"/><stop offset="1" stop-color="#FFFFFF" stop-opacity=".03"/></linearGradient>
  <linearGradient id="sva-wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
  <radialGradient id="sva-pool"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".55"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>
  <radialGradient id="sva-pool-r"><stop offset="0" stop-color="#E85E6C" stop-opacity=".55"/><stop offset="1" stop-color="#E85E6C" stop-opacity="0"/></radialGradient>
  <filter id="sva-sh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="sva-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3.5"/></filter>
</defs>`;

const wall = (fill = 'url(#sva-wall)') => `<rect width="400" height="500" fill="${fill}"/>`;
const shadow = (x, y, w, h, rx = 4, o = .22) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${N.navy}" opacity="${o}" filter="url(#sva-sh)"/>`;
const baseboard = (y, floor = true) => `${floor ? `<rect y="${y + 26}" width="400" height="${500 - y - 26}" fill="url(#sva-floor)"/><path d="M0 ${y + 40}H400M0 ${y + 58}H400" stroke="${S.s4}" stroke-width="1" opacity=".5"/>` : ''}<rect y="${y}" width="400" height="26" fill="${S.s0}"/><rect y="${y}" width="400" height="3" fill="${S.s3}"/><rect y="${y + 23}" width="400" height="3" fill="${S.s4}" opacity=".55"/>`;
const conduitV = (x, y1, y2) => `<rect x="${x}" y="${y1}" width="15" height="${y2 - y1}" fill="#B9C2CE"/><rect x="${x + 3}" y="${y1}" width="3" height="${y2 - y1}" fill="#DCE2E9"/><rect x="${x - 2}" y="${y1 + (y2 - y1) * .45}" width="19" height="9" rx="1" fill="${S.s4}"/><rect x="${x - 4}" y="${y2 - 30}" width="23" height="5" rx="1" fill="${S.s5}"/>`;
const pipe = (d, w = 13) => `<path d="${d}" fill="none" stroke="#B9C2CE" stroke-width="${w}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#DCE2E9" stroke-width="3" stroke-linejoin="round" transform="translate(-3 -3)" opacity=".9"/>`;
const glowDot = (x, y, r = 2.6, c = '#FFFFFF') => `<circle cx="${x}" cy="${y}" r="${r * 2.8}" fill="${c}" opacity=".5" filter="url(#sva-glow)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const bolt = (x, y, s = 1, fill = '#FFFFFF') => `<path transform="translate(${x} ${y}) scale(${s})" d="M2 -12 L-7 2 H-1 L-3 12 L7 -3 H1 Z" fill="${fill}"/>`;
const panelClosed = (x, y, w, h) => `${shadow(x + 5, y + 8, w, h)}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#CBD3DD"/><rect x="${x}" y="${y}" width="${w}" height="5" rx="2.5" fill="#DCE2E9"/><rect x="${x + w - 6}" y="${y}" width="6" height="${h}" fill="#B3BDCA"/>
  <rect x="${x + 9}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="2" fill="#D9DFE7" stroke="${S.s4}" stroke-width="1.5"/>
  <rect x="${x + w - 26}" y="${y + h / 2 - 13}" width="8" height="26" rx="2" fill="${S.s7}"/><rect x="${x + 22}" y="${y + 26}" width="${Math.min(60, w - 60)}" height="8" rx="1" fill="${S.s4}"/>`;

/* ---------- 1. Electrical panel, door open ---------- */
function breaker(x, y, side, { test, big } = {}) {
  const h = big ? 35 : 16, hx = side === 'l' ? x + 26 : x + 4;
  let s = `<rect x="${x}" y="${y}" width="48" height="${h}" rx="2" fill="${N.n3}"/><rect x="${x}" y="${y}" width="48" height="3" rx="1.5" fill="${N.n4}"/>`;
  const slot = yy => `<rect x="${hx}" y="${yy + 4}" width="18" height="8" rx="1.5" fill="${N.n2}"/><rect x="${side === 'l' ? hx + 9 : hx + 1}" y="${yy + 4.5}" width="8" height="7" rx="1.5" fill="${S.s5}"/>`;
  s += slot(y);
  if (big) s += slot(y + 19) + `<rect x="${side === 'l' ? hx + 11 : hx + 3}" y="${y + 8}" width="4" height="22" fill="${S.s4}"/>`;
  if (test) s += `<circle cx="${side === 'l' ? x + 10 : x + 38}" cy="${y + 8}" r="2.7" fill="${test}"/>`;
  return s;
}
function breakerPanel() {
  let s = conduitV(155, 0, 98) + conduitV(228, 0, 98);
  s += shadow(118, 104, 180, 320);
  s += `<rect x="110" y="95" width="180" height="320" rx="4" fill="#CBD3DD"/><rect x="110" y="95" width="180" height="6" rx="3" fill="#DCE2E9"/><rect x="284" y="95" width="6" height="320" fill="#B3BDCA"/>`;
  s += `<rect x="119" y="104" width="162" height="302" fill="#27344B"/><path d="M123 110V400M277 110V400" stroke="${N.ink}" stroke-width="3"/><path d="M123 150h6M123 210h6M123 270h6M277 180h-6M277 240h-6M277 330h-6" stroke="${S.s0}" stroke-width="2"/>`;
  s += `<rect x="127" y="112" width="146" height="286" rx="2" fill="#E3E8EE"/><rect x="127" y="112" width="146" height="4" fill="#F1F4F7"/>`;
  // main breaker
  s += `<rect x="166" y="121" width="68" height="44" rx="3" fill="${N.navy}"/><rect x="178" y="130" width="44" height="26" rx="2" fill="${N.n2}"/><rect x="185" y="134" width="30" height="12" rx="2" fill="${S.s5}"/><rect x="185" y="134" width="30" height="3" rx="1.5" fill="${S.s3}"/>`;
  s += `<rect x="197" y="173" width="6" height="214" rx="1" fill="${S.s3}"/>`;
  for (let i = 0; i < 11; i++) {
    const y = 177 + i * 19;
    s += `<rect x="135" y="${y + 6}" width="6" height="3" fill="${S.s4}"/><rect x="259" y="${y + 6}" width="6" height="3" fill="${S.s4}"/>`;
    if (i === 10) s += `<rect x="146" y="${y}" width="48" height="16" rx="2" fill="#CFD6DF"/><rect x="152" y="${y + 5}" width="36" height="6" rx="1" fill="${S.s3}"/>`;
    else s += breaker(146, y, 'l', { test: i === 1 || i === 2 ? '#FFFFFF' : null });
    if (i === 7) continue;
    if (i === 6) s += breaker(206, y, 'r', { big: true });
    else if (i >= 9) s += `<rect x="206" y="${y}" width="48" height="16" rx="2" fill="#CFD6DF"/><rect x="212" y="${y + 5}" width="36" height="6" rx="1" fill="${S.s3}"/>`;
    else s += breaker(206, y, 'r', { test: i === 3 ? N.red : null });
  }
  // door swung open toward the viewer, directory card inside
  s += `<polygon points="110,96 52,113 52,397 110,414" fill="#BCC6D2"/><polygon points="104,104 58,118 58,392 104,406" fill="none" stroke="${S.s4}" stroke-width="2"/><polygon points="52,113 45,115 45,395 52,397" fill="${S.s5}"/>`;
  s += `<polygon points="65,141 99,131 99,320 65,327" fill="#FFFFFF"/><path d="M69 152L95 144" stroke="${N.red}" stroke-width="3"/>`;
  for (let i = 0; i < 10; i++) s += `<path d="M69 ${166 + i * 15}L95 ${158.5 + i * 15}" stroke="${S.s3}" stroke-width="1.6"/>`;
  s += `<rect x="54" y="248" width="5" height="22" rx="1" fill="${S.s7}"/><rect x="107" y="128" width="5" height="16" rx="1" fill="${S.s5}"/><rect x="107" y="366" width="5" height="16" rx="1" fill="${S.s5}"/>`;
  return s;
}
const panelScene = () => wall() + baseboard(462, false) + breakerPanel();

/* ---------- 2. Outlets: a finished duplex with a plug, and a new box being wired ---------- */
const receptacle = (x, y) => `<rect x="${x}" y="${y}" width="44" height="36" rx="11" fill="#EEF1F5" stroke="${S.s2}" stroke-width="1.5"/><rect x="${x + 11}" y="${y + 9}" width="4" height="11" rx="1" fill="${S.s7}"/><rect x="${x + 28}" y="${y + 8}" width="4.5" height="13" rx="1" fill="${S.s7}"/><path d="M${x + 19} ${y + 31}v-4a3 3 0 0 1 6 0v4z" fill="${S.s7}"/>`;
function outletScene() {
  let s = wall() + baseboard(436);
  // finished outlet + plug
  s += shadow(230, 212, 72, 118, 7, .2) + `<rect x="226" y="206" width="72" height="118" rx="7" fill="#FCFDFE" stroke="${S.s2}"/>` + receptacle(240, 220) + receptacle(240, 272) + `<circle cx="262" cy="265" r="3.4" fill="${S.s2}"/><path d="M259.6 265h4.8" stroke="${S.s5}" stroke-width="1.2"/>`;
  s += `<path d="M262 318C262 372 300 380 312 430S346 476 420 474" fill="none" stroke="${N.n3}" stroke-width="8" stroke-linecap="round"/>`;
  s += shadow(246, 274, 36, 44, 8, .25) + `<rect x="243" y="266" width="38" height="50" rx="9" fill="${N.n3}"/><rect x="243" y="266" width="38" height="6" rx="3" fill="${N.n4}"/><path d="M251 284h22M251 291h22M251 298h22" stroke="${N.navy}" stroke-width="2"/><rect x="256" y="312" width="12" height="10" rx="3" fill="${N.navy}"/>`;
  // new box being wired
  s += `<rect x="86" y="211" width="54" height="84" rx="2" fill="${S.s7}"/><rect x="90" y="215" width="46" height="76" rx="2" fill="${N.blue}"/><rect x="96" y="221" width="34" height="64" rx="1" fill="${N.blueD}"/><rect x="104" y="208" width="18" height="6" rx="1" fill="${N.blue}"/><rect x="104" y="292" width="18" height="6" rx="1" fill="${N.blue}"/>`;
  s += `<path d="M106 270C100 300 92 314 92 330" fill="none" stroke="${N.ink}" stroke-width="4" stroke-linecap="round"/><path d="M118 270C118 300 112 316 106 334" fill="none" stroke="${S.s6}" stroke-width="5.5" stroke-linecap="round"/><path d="M118 270C118 300 112 316 106 334" fill="none" stroke="#F7F8FA" stroke-width="3.2" stroke-linecap="round"/><path d="M112 272C114 304 104 330 99 352" fill="none" stroke="${S.s5}" stroke-width="2.2" stroke-linecap="round"/>`;
  s += `<g transform="rotate(-9 96 372)">${shadow(80, 328, 34, 96, 6, .2)}<rect x="88" y="318" width="16" height="108" rx="2" fill="${S.s4}"/><rect x="76" y="326" width="40" height="92" rx="8" fill="#FAFBFC" stroke="${S.s3}" stroke-width="1.5"/>${receptacle(74, 334).replace(/width="44"/, 'width="44"')}<circle cx="73" cy="350" r="4" fill="${S.s4}"/><circle cx="119" cy="350" r="4" fill="${S.s4}"/><circle cx="73" cy="396" r="4" fill="${S.s4}"/><circle cx="119" cy="396" r="4" fill="${S.s4}"/></g>`;
  // cover plate waiting on the baseboard + screwdriver
  s += `<g transform="rotate(-4 168 420)">${shadow(150, 380, 46, 64, 5, .2)}<rect x="146" y="372" width="46" height="70" rx="5" fill="#FCFDFE" stroke="${S.s2}" stroke-width="1.5"/><rect x="154" y="380" width="30" height="22" rx="7" fill="${S.s1}" stroke="${S.s3}"/><rect x="154" y="410" width="30" height="22" rx="7" fill="${S.s1}" stroke="${S.s3}"/></g>`;
  s += `<g transform="rotate(-3 120 482)"><rect x="56" y="474" width="50" height="15" rx="7.5" fill="${N.red}"/><path d="M66 474v15M76 474v15M86 474v15" stroke="${N.redD}" stroke-width="2"/><rect x="104" y="476" width="9" height="11" rx="2" fill="${S.s4}"/><rect x="112" y="479.5" width="62" height="4" fill="${S.s3}"/></g>`;
  return s;
}

/* ---------- 3. Surge protection: whole-house unit on the panel + point-of-use strip ---------- */
function surgeScene() {
  let s = wall() + baseboard(402);
  s += conduitV(102, 0, 112) + conduitV(160, 0, 112);
  s += panelClosed(66, 108, 160, 262);
  s += `<rect x="226" y="228" width="34" height="16" fill="${S.s4}"/><rect x="226" y="231" width="34" height="3" fill="#DCE2E9"/><rect x="232" y="224" width="6" height="24" rx="1" fill="${S.s5}"/><rect x="248" y="224" width="6" height="24" rx="1" fill="${S.s5}"/>`;
  s += shadow(262, 184, 88, 110, 9) + `<rect x="258" y="176" width="88" height="112" rx="9" fill="#F7F8FA" stroke="${S.s3}" stroke-width="1.5"/><path d="M258 206V185a9 9 0 0 1 9-9h70a9 9 0 0 1 9 9v21z" fill="${N.navy}"/>`;
  s += `<rect x="276" y="186" width="52" height="11" rx="3" fill="${N.n2}"/>${glowDot(290, 191.5, 2.4)}${glowDot(314, 191.5, 2.4)}`;
  s += `<circle cx="302" cy="240" r="21" fill="${N.red}"/><circle cx="302" cy="240" r="21" fill="none" stroke="${N.redD}" stroke-width="2"/>${bolt(302, 240, 1.25)}`;
  s += `<rect x="276" y="270" width="52" height="5" rx="2" fill="${S.s3}"/><circle cx="266" cy="184" r="2" fill="${S.s4}"/><circle cx="338" cy="280" r="2" fill="${S.s4}"/>`;
  // point-of-use strip on the floor
  s += `<path d="M300 446C300 470 250 470 230 500" fill="none" stroke="${N.n3}" stroke-width="6" stroke-linecap="round"/><path d="M332 446C336 480 380 470 410 486" fill="none" stroke="${N.n3}" stroke-width="6" stroke-linecap="round"/>`;
  s += shadow(212, 428, 176, 30, 8, .25) + `<rect x="206" y="420" width="176" height="30" rx="8" fill="#FAFBFC" stroke="${S.s3}" stroke-width="1.5"/><rect x="214" y="427" width="20" height="16" rx="3" fill="${N.red}"/><rect x="214" y="427" width="20" height="5" rx="2" fill="${N.redL}"/>`;
  for (const x of [246, 280, 314, 348]) s += `<rect x="${x}" y="426" width="26" height="18" rx="5" fill="${S.s1}" stroke="${S.s3}"/>`;
  s += `<rect x="279" y="414" width="28" height="34" rx="6" fill="${N.n3}"/><rect x="313" y="414" width="28" height="34" rx="6" fill="${N.n3}"/><rect x="279" y="414" width="28" height="5" rx="2.5" fill="${N.n4}"/><rect x="313" y="414" width="28" height="5" rx="2.5" fill="${N.n4}"/>`;
  return s;
}

/* ---------- 4. Ceiling fan with light kit ---------- */
function fanScene() {
  let s = `<rect width="400" height="500" fill="#E3E8EE"/><rect width="400" height="62" fill="#F4F6F9"/><rect y="62" width="400" height="5" fill="${S.s3}"/><rect y="67" width="400" height="22" fill="url(#sva-wash)" opacity=".0"/>`;
  s += `<rect x="236" y="168" width="140" height="196" fill="#FAFBFC"/><rect x="246" y="178" width="56" height="84" fill="#C9D6E4"/><rect x="310" y="178" width="56" height="84" fill="#C9D6E4"/><rect x="246" y="270" width="56" height="84" fill="#C9D6E4"/><rect x="310" y="270" width="56" height="84" fill="#C9D6E4"/><polygon points="246,240 290,178 302,178 302,196 258,262 246,262" fill="#FFFFFF" opacity=".45"/><polygon points="310,330 348,270 366,270 366,280 326,354 310,354" fill="#FFFFFF" opacity=".4"/><rect x="228" y="362" width="156" height="10" fill="${S.s0}"/><rect x="228" y="370" width="156" height="3" fill="${S.s4}"/>`;
  s += baseboard(440);
  const cx = 190, cy = 176, R = 168;
  const blade = th => {
    const p = (a, r, dy = 0) => { const t = (th + a) * Math.PI / 180; return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + dy + r * .27 * Math.sin(t)).toFixed(1)}`; };
    const front = Math.sin(th * Math.PI / 180) > 0;
    return `<polygon points="${p(-17, 34)} ${p(-8, R)} ${p(8, R, 4)} ${p(17, 34, 4)}" fill="${front ? N.n4 : N.n3}"/><polygon points="${p(-17, 34)} ${p(-8, R)} ${p(-6.6, R, 3)} ${p(-15, 34, 3)}" fill="${front ? N.n5 : N.n4}"/><polygon points="${p(-6, 24)} ${p(-5, 52)} ${p(6, 52, 4)} ${p(7, 24, 4)}" fill="${S.s6}"/>`;
  };
  const angles = [18, 90, 162, 234, 306];
  s += `<circle cx="${cx}" cy="96" r="80" fill="#FFFFFF" opacity=".0"/>`;
  s += `<path d="M176 62h28l-4 16h-20z" fill="${N.n4}"/><rect x="186.5" y="76" width="7" height="82" fill="${S.s7}"/><rect x="183" y="150" width="14" height="8" rx="2" fill="${N.n4}"/>`;
  s += angles.filter(a => Math.sin(a * Math.PI / 180) <= 0).map(blade).join('');
  s += `<ellipse cx="${cx}" cy="160" rx="34" ry="8" fill="${N.n5}"/><rect x="156" y="160" width="68" height="24" fill="${N.n3}"/><rect x="156" y="166" width="68" height="3" fill="${N.n4}"/><ellipse cx="${cx}" cy="184" rx="34" ry="8" fill="${N.navy}"/>`;
  s += angles.filter(a => Math.sin(a * Math.PI / 180) > 0).map(blade).join('');
  s += `<rect x="178" y="188" width="24" height="8" rx="2" fill="${N.n3}"/><ellipse cx="${cx}" cy="214" rx="46" ry="38" fill="url(#sva-pool)"/><path d="M168 196h44a22 20 0 0 1-44 0z" fill="#FFFFFF"/><path d="M168 196h44" stroke="${S.s3}" stroke-width="2"/><path d="M${cx} 216v30" stroke="${S.s5}" stroke-width="1.6" stroke-dasharray="1.6 2.2"/><circle cx="${cx}" cy="248" r="2.6" fill="${S.s5}"/>`;
  // sofa back below the fan, so the room reads lived-in
  s += `<path d="M30 372q0-16 16-16h168q16 0 16 16v68H30z" fill="${N.n3}"/><rect x="30" y="356" width="200" height="6" rx="3" fill="${N.n4}"/><rect x="54" y="370" width="44" height="40" rx="8" fill="${S.s0}" transform="rotate(-6 76 390)"/><rect x="164" y="372" width="40" height="38" rx="8" fill="${N.red}" transform="rotate(5 184 391)"/>`;
  return s;
}

/* ---------- 5. EV charger on a garage wall, beside a parked car ---------- */
function evScene() {
  let s = `<rect width="400" height="500" fill="#E3E8EE"/><path d="M300 0V410" stroke="${S.s2}" stroke-width="2"/><rect y="392" width="400" height="18" fill="${S.s3}"/><rect y="410" width="400" height="90" fill="url(#sva-floor)"/><path d="M0 452L400 440" stroke="${S.s4}" stroke-width="2"/>`;
  s += conduitV(161, 0, 150);
  s += shadow(122, 152, 96, 142, 18) + `<rect x="120" y="146" width="96" height="144" rx="18" fill="#FAFBFC" stroke="${S.s3}" stroke-width="1.5"/><rect x="129" y="155" width="78" height="126" rx="12" fill="${N.navy}"/><rect x="129" y="155" width="78" height="30" rx="12" fill="${N.n3}"/>`;
  s += `<rect x="146" y="196" width="44" height="5" rx="2.5" fill="#FFFFFF" opacity=".55" filter="url(#sva-glow)"/><rect x="146" y="196" width="44" height="5" rx="2.5" fill="#FFFFFF"/><circle cx="168" cy="236" r="15" fill="none" stroke="${N.n5}" stroke-width="2"/>${bolt(168, 236, .9, N.red)}<rect x="160" y="288" width="16" height="10" rx="2" fill="${S.s7}"/>`;
  // holster + connector, cable loop
  s += `<path d="M168 298C168 372 250 384 252 300" fill="none" stroke="${N.n2}" stroke-width="10" stroke-linecap="round"/><path d="M168 298C168 372 250 384 252 300" fill="none" stroke="${N.n4}" stroke-width="2.5" stroke-linecap="round" transform="translate(-2 -2)"/>`;
  s += `<rect x="238" y="210" width="28" height="34" rx="6" fill="${S.s7}"/><rect x="243" y="222" width="18" height="78" rx="8" fill="${N.n3}"/><rect x="243" y="222" width="18" height="10" rx="4" fill="${N.red}"/><rect x="247" y="244" width="10" height="26" rx="4" fill="${N.navy}"/>`;
  // parked car, rear quarter
  s += `<ellipse cx="350" cy="478" rx="90" ry="12" fill="${N.navy}" opacity=".25" filter="url(#sva-sh)"/><path d="M420 318L344 324Q306 328 298 360L292 446Q292 462 306 462H420Z" fill="${N.n3}"/><path d="M420 332L350 338Q326 340 320 360L318 368H420Z" fill="${N.n2}"/><path d="M330 356L360 340" stroke="#FFFFFF" stroke-width="3" opacity=".25"/><rect x="292" y="378" width="10" height="34" rx="3" fill="${N.red}"/><rect x="306" y="420" width="114" height="4" fill="${N.n4}"/><circle cx="372" cy="466" r="38" fill="${N.ink}"/><circle cx="372" cy="466" r="18" fill="${S.s6}"/><circle cx="372" cy="466" r="7" fill="${S.s4}"/><circle cx="334" cy="392" r="9" fill="${N.n2}" stroke="${N.n4}" stroke-width="2"/>`;
  return s;
}

/* ---------- 6. Whole-house wiring: open stud wall, cables to boxes ---------- */
function studWall(x0, x1, { cables = true } = {}) {
  const studs = [30, 170, 310].filter(x => x >= x0 - 28 && x <= x1);
  let s = `<rect x="${x0}" y="0" width="${x1 - x0}" height="500" fill="#D3DAE2"/><path d="M${x0} 250H${x1}" stroke="${S.s3}" stroke-width="2"/>`;
  if (cables) {
    s += `<clipPath id="sva-open"><rect x="${x0}" y="0" width="${x1 - x0}" height="500"/></clipPath><g clip-path="url(#sva-open)">`;
    const nm = (d, c, o) => `<path d="${d}" fill="none" stroke="${o}" stroke-width="10" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`;
    s += nm(`M${x0} 214Q100 232 184 214T${x1} 214`, '#F7F8FA', S.s5);
    s += nm(`M${x0} 300Q100 316 184 300T${x1} 300`, N.red, N.redD);
    s += nm(`M${x0} 384Q100 396 184 384T${x1} 384`, N.blue, N.n2);
    s += nm('M236 217C246 236 222 248 218 270', '#F7F8FA', S.s5) + nm('M260 300C262 316 238 312 232 330', N.red, N.redD);
    if (x0 < 60) s += nm('M104 220C112 200 92 186 86 176', '#F7F8FA', S.s5) + nm('M232 386C236 372 252 376 252 362', N.blue, N.n2);
    s += '</g>';
  }
  for (const x of studs) s += `<rect x="${x}" y="54" width="28" height="392" fill="${S.s3}"/><rect x="${x}" y="54" width="5" height="392" fill="${S.s4}"/><rect x="${x + 23}" y="54" width="5" height="392" fill="${S.s2}"/><circle cx="${x + 14}" cy="90" r="2" fill="${S.s5}"/><circle cx="${x + 14}" cy="410" r="2" fill="${S.s5}"/>`;
  s += `<rect x="${x0}" y="36" width="${x1 - x0}" height="18" fill="${S.s4}"/><rect x="${x0}" y="50" width="${x1 - x0}" height="4" fill="${S.s5}"/><rect x="${x0}" y="446" width="${x1 - x0}" height="18" fill="${S.s4}"/><rect x="${x0}" y="446" width="${x1 - x0}" height="4" fill="${S.s5}"/>`;
  return s;
}
const blueBox = (x, y, w = 34, h = 52) => `${shadow(x + 3, y + 4, w, h, 2, .25)}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${N.blue}"/><rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="1" fill="${N.blueD}"/><path d="M${x + 9} ${y + 12}c4 8-2 14 2 22M${x + w - 11} ${y + 12}c-4 10 4 12-1 24" fill="none" stroke="${N.ink}" stroke-width="2.5"/><path d="M${x + w / 2} ${y + 10}c2 10-2 16 1 26" fill="none" stroke="#F7F8FA" stroke-width="2.5"/>`;
function wiringScene() {
  let s = studWall(0, 400);
  s += blueBox(200, 268) + blueBox(60, 140, 50, 48);
  s += `${shadow(232, 344, 40, 56, 3, .2)}<rect x="230" y="338" width="44" height="60" rx="3" fill="none" stroke="${N.navy}" stroke-width="6"/><rect x="246" y="330" width="12" height="8" rx="2" fill="${N.navy}"/><rect x="246" y="398" width="12" height="8" rx="2" fill="${N.navy}"/><circle cx="252" cy="334" r="2" fill="${S.s4}"/><circle cx="252" cy="402" r="2" fill="${S.s4}"/>`;
  s += `<rect x="158" y="208" width="10" height="13" rx="1" fill="${S.s6}"/><rect x="198" y="294" width="10" height="13" rx="1" fill="${S.s6}"/><rect x="300" y="208" width="10" height="13" rx="1" fill="${S.s6}"/><rect x="298" y="378" width="10" height="13" rx="1" fill="${S.s6}"/>`;
  return s;
}

/* ---------- 7. Inspection: open panel, checklist, meter ---------- */
function inspectScene() {
  let s = wall() + baseboard(440);
  s += `<g transform="translate(-22 36) scale(.84)">${breakerPanel()}</g>`;
  s += `<g transform="rotate(5 290 300)">${shadow(214, 206, 150, 202, 8, .3)}<rect x="210" y="198" width="150" height="204" rx="8" fill="${N.n4}"/><rect x="220" y="212" width="130" height="180" rx="2" fill="#FFFFFF"/><rect x="252" y="188" width="66" height="22" rx="5" fill="${S.s5}"/><rect x="262" y="194" width="46" height="9" rx="3" fill="${S.s6}"/>`;
  for (let i = 0; i < 5; i++) {
    const y = 238 + i * 30;
    s += `<rect x="232" y="${y}" width="13" height="13" rx="2" fill="none" stroke="${N.navy}" stroke-width="2"/><rect x="254" y="${y + 1}" width="${[78, 64, 82, 58, 72][i]}" height="4" rx="2" fill="${S.s3}"/><rect x="254" y="${y + 9}" width="${[52, 70, 40, 62, 46][i]}" height="3" rx="1.5" fill="${S.s2}"/>`;
    if (i < 4) s += `<path d="M234 ${y + 6}l4 5 9-12" fill="none" stroke="${N.red}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  s += `</g>`;
  s += `<path d="M148 438C120 470 80 452 40 492" fill="none" stroke="${N.red}" stroke-width="4" stroke-linecap="round"/><path d="M172 440C176 474 140 482 120 506" fill="none" stroke="${N.n2}" stroke-width="4" stroke-linecap="round"/>`;
  s += `<g transform="rotate(-10 164 384)">${shadow(126, 316, 80, 130, 14, .3)}<rect x="122" y="308" width="82" height="134" rx="14" fill="${N.red}"/><rect x="130" y="316" width="66" height="118" rx="8" fill="${N.navy}"/><rect x="138" y="324" width="50" height="30" rx="3" fill="#D9E1EA"/><rect x="144" y="331" width="10" height="16" rx="1" fill="${S.s7}"/><rect x="158" y="331" width="10" height="16" rx="1" fill="${S.s7}"/><rect x="172" y="331" width="10" height="16" rx="1" fill="${S.s7}"/><circle cx="163" cy="384" r="17" fill="${N.n3}" stroke="${N.n5}" stroke-width="2"/><path d="M163 384l9-11" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><circle cx="146" cy="420" r="4" fill="${N.ink}" stroke="${N.red}" stroke-width="2"/><circle cx="163" cy="420" r="4" fill="${N.ink}" stroke="${S.s5}" stroke-width="2"/><circle cx="180" cy="420" r="4" fill="${N.ink}" stroke="${S.s5}" stroke-width="2"/></g>`;
  return s;
}

/* ---------- 8. Recessed lighting: a room at dusk under rows of cans ---------- */
function recessedScene() {
  let s = `<rect width="400" height="500" fill="${N.n3}"/><polygon points="0,0 400,0 330,150 70,150" fill="#22395E"/><polygon points="0,0 70,150 70,380 0,500" fill="#14294A"/><polygon points="400,0 330,150 330,380 400,500" fill="#14294A"/><polygon points="0,500 70,380 330,380 400,500" fill="${N.n2}"/><path d="M70 150H330M70 380H330" stroke="${N.ink}" stroke-width="2" opacity=".6"/>`;
  // wall washes from the far row
  for (const x of [150, 250]) s += `<ellipse cx="${x}" cy="240" rx="46" ry="96" fill="url(#sva-pool)" opacity=".55"/>`;
  s += `<rect x="168" y="214" width="64" height="74" fill="${N.navy}" stroke="${N.n5}" stroke-width="3"/><rect x="178" y="224" width="44" height="54" fill="${N.n4}"/><path d="M178 278l14-22 10 12 8-8 12 18z" fill="${N.n5}"/>`;
  s += `<rect x="112" y="324" width="176" height="10" fill="${N.n5}"/><rect x="112" y="334" width="176" height="4" fill="${N.navy}"/><rect x="122" y="338" width="6" height="44" fill="${N.n4}"/><rect x="272" y="338" width="6" height="44" fill="${N.n4}"/>`;
  // cones + pools
  for (const x of [145, 255]) s += `<polygon points="${x - 13},92 ${x + 13},92 ${x + 54},380 ${x - 54},380" fill="url(#sva-cone-s)" opacity=".6"/><ellipse cx="${x}" cy="392" rx="70" ry="13" fill="url(#sva-pool)" opacity=".55"/>`;
  for (const x of [100, 300]) s += `<polygon points="${x - 20},44 ${x + 20},44 ${x + 92},500 ${x - 92},500" fill="url(#sva-cone)" opacity=".55"/><ellipse cx="${x}" cy="478" rx="104" ry="20" fill="url(#sva-pool)" opacity=".7"/>`;
  // cans: trim ring + lit lens, near row largest
  const can = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx + 4}" ry="${ry + 1.6}" fill="${S.s1}"/><ellipse cx="${x}" cy="${y}" rx="${rx * 1.4}" ry="${ry * 1.6}" fill="#FFFFFF" opacity=".55" filter="url(#sva-glow)"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FFFFFF"/>`;
  s += can(175, 132, 9, 2.4) + can(225, 132, 9, 2.4) + can(145, 90, 14, 3.6) + can(255, 90, 14, 3.6) + can(100, 42, 20, 5.4) + can(300, 42, 20, 5.4);
  return s;
}

/* ---------- 9. Remodel: finished wall meets open studs, ladder, new boxes ---------- */
function remodelScene() {
  let s = wall() + studWall(206, 400);
  s += blueBox(216, 268) + `<rect x="206" y="0" width="8" height="500" fill="#F4F6F9"/><rect x="214" y="0" width="4" height="500" fill="${N.navy}" opacity=".18"/>`;
  s += `<rect width="400" height="36" fill="#F4F6F9"/><rect y="36" width="400" height="4" fill="${S.s3}"/><rect x="302" y="38" width="36" height="9" rx="2" fill="${N.blue}"/><rect x="306" y="40" width="28" height="3" fill="${N.blueD}"/><path d="M314 44c-2 24 6 30 2 50M326 44c2 22-6 32-1 54M320 46c0 18 0 30 0 44" fill="none" stroke="${N.ink}" stroke-width="2.5" stroke-linecap="round"/><path d="M320 46c0 18 0 30 0 44" fill="none" stroke="#F7F8FA" stroke-width="2.5" stroke-linecap="round"/>`;
  s += shadow(102, 236, 40, 64, 4, .2) + `<rect x="100" y="230" width="40" height="64" rx="4" fill="#FCFDFE" stroke="${S.s2}"/><rect x="113" y="248" width="14" height="28" rx="2" fill="${S.s1}" stroke="${S.s3}"/><rect x="115" y="250" width="10" height="13" rx="2" fill="#FFFFFF" stroke="${S.s3}"/>`;
  s += baseboard(440).replace(/<rect y="440" width="400"/g, '<rect y="440" width="206"').replace(/<rect y="463" width="400"/, '<rect y="463" width="206"');
  // step ladder
  s += '<g transform="translate(26 0)">';
  s += `<ellipse cx="282" cy="486" rx="92" ry="9" fill="${N.navy}" opacity=".2" filter="url(#sva-sh)"/><path d="M262 150L214 486M302 150L350 486" stroke="${S.s6}" stroke-width="11" stroke-linecap="round"/><path d="M262 150L214 486M302 150L350 486" stroke="${S.s4}" stroke-width="4" stroke-linecap="round" transform="translate(-2 0)"/>`;
  for (let i = 1; i <= 5; i++) { const y = 150 + i * 56, k = (y - 150) / 336; s += `<rect x="${262 - 48 * k - 2}" y="${y}" width="${40 + 136 * k * .7 + 4}" height="8" rx="2" fill="${S.s5}"/>`; }
  s += `<rect x="248" y="136" width="70" height="20" rx="4" fill="${N.red}"/><rect x="248" y="136" width="70" height="5" rx="2.5" fill="${N.redL}"/><rect x="194" y="476" width="34" height="12" rx="3" fill="${N.n2}"/><rect x="336" y="476" width="34" height="12" rx="3" fill="${N.n2}"/></g>`;
  return s;
}

/* ---------- 10. Lighting additions: kitchen pendants + under-cabinet light ---------- */
function lightingScene() {
  let s = `<rect width="400" height="500" fill="#E3E8EE"/>`;
  s += `<rect y="168" width="400" height="86" fill="#B5BFCC"/>`;
  for (let y = 182; y < 254; y += 16) s += `<path d="M0 ${y}H400" stroke="${S.s4}" stroke-width="1.4"/>`;
  for (let r = 0; r < 5; r++) for (let x = (r % 2) * 20; x < 400; x += 40) s += `<path d="M${x} ${168 + r * 16}v16" stroke="${S.s4}" stroke-width="1.4"/>`;
  s += `<rect y="172" width="400" height="80" fill="url(#sva-wash)" opacity=".75"/>`;
  s += `<rect y="30" width="400" height="140" fill="#F7F8FA"/><rect y="30" width="400" height="6" fill="#FFFFFF"/>`;
  for (const x of [100, 200, 300]) s += `<path d="M${x} 36V164" stroke="${S.s3}" stroke-width="2"/>`;
  for (const x of [84, 116, 184, 216, 284, 316]) s += `<rect x="${x - 2}" y="132" width="4" height="22" rx="2" fill="${S.s6}"/>`;
  s += `<rect y="164" width="400" height="6" fill="${S.s2}"/><rect x="10" y="170" width="380" height="3" rx="1.5" fill="#FFFFFF"/><rect x="10" y="168" width="380" height="7" fill="#FFFFFF" opacity=".7" filter="url(#sva-glow)"/>`;
  s += `<rect width="400" height="30" fill="#F4F6F9"/><rect y="28" width="400" height="3" fill="${S.s3}"/>`;
  s += `<rect y="250" width="400" height="12" fill="${N.navy}"/><rect y="250" width="400" height="3" fill="${N.n5}"/><rect y="262" width="400" height="178" fill="${N.n3}"/>`;
  for (const x of [0, 100, 200, 300]) s += `<rect x="${x + 6}" y="270" width="88" height="162" rx="2" fill="none" stroke="${N.navy}" stroke-width="2.5"/><rect x="${x + 84}" y="286" width="4" height="30" rx="2" fill="${S.s4}"/>`;
  // island
  s += `<rect y="430" width="400" height="16" fill="#F4F6F9"/><rect y="444" width="400" height="4" fill="${S.s4}"/><rect y="448" width="400" height="52" fill="${N.n4}"/>`;
  for (const [x, l] of [[100, 214], [200, 214], [300, 214]]) {
    s += `<polygon points="${x - 22},${l + 4} ${x + 22},${l + 4} ${x + 64},430 ${x - 64},430" fill="url(#sva-cone)" opacity=".8"/><ellipse cx="${x}" cy="436" rx="70" ry="9" fill="url(#sva-pool)"/>`;
    s += `<path d="M${x} 0V${l - 34}" stroke="${N.n2}" stroke-width="2"/><rect x="${x - 4}" y="${l - 36}" width="8" height="8" rx="1" fill="${N.n2}"/><path d="M${x - 30} ${l}C${x - 30} ${l - 34} ${x + 30} ${l - 34} ${x + 30} ${l}Z" fill="${N.navy}"/><path d="M${x - 24} ${l - 14}C${x - 16} ${l - 26} ${x - 4} ${l - 28} ${x + 4} ${l - 28}" fill="none" stroke="${N.n5}" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="${x}" cy="${l}" rx="30" ry="5" fill="#FFFFFF"/><ellipse cx="${x}" cy="${l + 2}" rx="34" ry="8" fill="#FFFFFF" opacity=".6" filter="url(#sva-glow)"/>`;
  }
  return s;
}

/* ---------- 11. Whole home battery on the wall, tied to the panel ---------- */
function batteryScene() {
  let s = `<rect width="400" height="500" fill="#E3E8EE"/><rect y="404" width="400" height="96" fill="url(#sva-floor)"/><rect y="400" width="400" height="6" fill="${S.s4}"/>`;
  s += conduitV(78, 0, 148) + pipe('M86 236V316H168', 12) + pipe('M282 200H316', 12);
  s += shadow(54, 152, 66, 86, 8) + `<rect x="50" y="146" width="70" height="90" rx="8" fill="#FAFBFC" stroke="${S.s3}" stroke-width="1.5"/><rect x="62" y="160" width="46" height="8" rx="2" fill="${S.s2}"/>${glowDot(85, 214, 2.4, N.red)}`;
  s += panelClosed(314, 136, 78, 168);
  s += shadow(172, 116, 112, 290, 20, .28) + `<rect x="166" y="106" width="116" height="298" rx="20" fill="#FAFBFC" stroke="${S.s3}" stroke-width="1.5"/><rect x="268" y="120" width="10" height="270" rx="5" fill="${S.s1}"/><path d="M178 352H270" stroke="${S.s2}" stroke-width="2"/>`;
  s += `<rect x="196" y="150" width="56" height="128" rx="10" fill="${N.navy}"/>${bolt(224, 172, .8, N.red)}`;
  for (let i = 0; i < 4; i++) s += `<rect x="208" y="${194 + i * 19}" width="32" height="12" rx="3" fill="${i ? '#FFFFFF' : N.n4}"/>`;
  s += `<rect x="204" y="190" width="40" height="78" rx="4" fill="#FFFFFF" opacity=".12" filter="url(#sva-glow)"/><rect x="186" y="400" width="76" height="8" rx="2" fill="${S.s5}"/>`;
  return s;
}

/* ---------- 12. Standby generator beside the house, meter and transfer switch ---------- */
function generatorScene() {
  let s = `<rect width="400" height="340" fill="#E3E8EE"/>`;
  for (let y = 22; y < 334; y += 22) s += `<rect y="${y}" width="400" height="3" fill="${S.s2}"/><rect y="${y + 3}" width="400" height="2" fill="#F1F4F7"/>`;
  s += `<rect x="262" y="56" width="104" height="150" fill="#FAFBFC"/><rect x="272" y="66" width="40" height="62" fill="#B4C4D6"/><rect x="316" y="66" width="40" height="62" fill="#B4C4D6"/><rect x="272" y="134" width="40" height="62" fill="#B4C4D6"/><rect x="316" y="134" width="40" height="62" fill="#B4C4D6"/><polygon points="272,110 300,66 312,66 312,80 284,128 272,128" fill="#FFFFFF" opacity=".5"/><rect x="254" y="204" width="120" height="10" fill="${S.s0}"/>`;
  s += `<rect y="330" width="400" height="46" fill="#C3CBD5"/><rect y="330" width="400" height="4" fill="${S.s4}"/><rect y="376" width="400" height="124" fill="#7B879B"/>`;
  for (let i = 0; i < 70; i++) { const x = (i * 97) % 400, y = 384 + ((i * 53) % 112); s += `<circle cx="${x}" cy="${y}" r="${1.5 + (i % 3) * .6}" fill="${i % 2 ? S.s4 : S.s6}"/>`; }
  // meter + transfer switch with conduit
  s += pipe('M70 262V336', 12) + pipe('M176 248V300', 12);
  s += shadow(48, 172, 48, 92, 8) + `<rect x="44" y="164" width="52" height="98" rx="10" fill="${S.s3}"/><rect x="44" y="164" width="52" height="5" rx="2.5" fill="${S.s1}"/><circle cx="70" cy="204" r="21" fill="#EEF2F6" stroke="${S.s4}" stroke-width="3"/><circle cx="70" cy="204" r="13" fill="#FFFFFF"/>`;
  for (const [x, y] of [[62, 199], [70, 197], [78, 199]]) s += `<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="${N.navy}" stroke-width="1.4"/>`;
  s += `<rect x="60" y="208" width="20" height="4" rx="1" fill="${S.s5}"/><path d="M50 204a20 20 0 0 1 8-15" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".9"/>`;
  s += panelClosed(146, 176, 60, 76);
  // generator: front, top, side
  s += `<ellipse cx="236" cy="452" rx="150" ry="14" fill="${N.navy}" opacity=".3" filter="url(#sva-sh)"/><polygon points="78,428 352,428 380,454 54,454" fill="#D3DAE2"/><polygon points="54,454 380,454 380,462 54,462" fill="${S.s4}"/>`;
  s += `<polygon points="100,320 328,320 352,298 124,298" fill="#EEF1F5"/><polygon points="328,320 352,298 352,418 328,440" fill="#AFB9C7"/><rect x="100" y="320" width="228" height="120" fill="#D5DBE3"/><rect x="100" y="320" width="228" height="4" fill="#F1F4F7"/>`;
  for (let i = 0; i < 9; i++) s += `<rect x="116" y="${336 + i * 10}" width="118" height="5" rx="2" fill="${S.s5}"/><rect x="116" y="${336 + i * 10}" width="118" height="2" rx="1" fill="${S.s6}"/>`;
  s += `<rect x="250" y="332" width="64" height="96" rx="3" fill="none" stroke="${S.s4}" stroke-width="2"/><rect x="296" y="372" width="10" height="16" rx="2" fill="${S.s6}"/>${glowDot(262, 344, 2.6, N.red)}<rect x="304" y="304" width="18" height="5" rx="2" fill="${S.s4}"/>`;
  return s;
}

/* ---------- 13. Permanent outdoor lighting: roofline lights at dusk ---------- */
function outdoorScene() {
  let s = `<rect width="400" height="500" fill="url(#sva-dusk)"/>`;
  for (const [x, y, r] of [[34, 40, 1.4], [92, 70, 1], [150, 26, 1.2], [262, 30, 1], [318, 64, 1.4], [372, 24, 1.1], [24, 128, 1], [366, 120, 1.2], [210, 52, 1], [118, 112, .9], [292, 104, .9]]) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity=".75"/>`;
  s += `<polygon points="200,98 -6,240 406,240" fill="${N.ink}"/><polygon points="200,112 22,236 378,236" fill="#132743"/>`;
  s += `<rect x="38" y="236" width="324" height="234" fill="${N.n4}"/>`;
  for (let y = 252; y < 470; y += 16) s += `<rect x="38" y="${y}" width="324" height="2" fill="#1E3A63"/>`;
  s += `<polygon points="200,112 22,236 38,236 200,124 362,236 378,236" fill="#E6EBF1" opacity=".9"/>`;
  s += `<path d="M200 128L50 236H350Z" fill="url(#sva-wash)" opacity=".16"/>`;
  for (const x of [72, 254]) s += `<rect x="${x}" y="280" width="74" height="92" fill="#DDE6F1" opacity=".9"/><rect x="${x + 35}" y="280" width="4" height="92" fill="${N.n3}"/><rect x="${x}" y="324" width="74" height="4" fill="${N.n3}"/><rect x="${x - 6}" y="372" width="86" height="7" fill="#1E3A63"/>`;
  s += `<rect x="178" y="360" width="44" height="110" fill="${N.n2}"/><rect x="186" y="370" width="28" height="34" fill="${N.n3}"/><circle cx="214" cy="418" r="2.5" fill="${S.s4}"/><polygon points="186,180 214,180 200,166" fill="#DDE6F1" opacity=".8"/>`;
  s += `<rect y="468" width="400" height="32" fill="${N.ink}"/><polygon points="176,470 224,470 250,500 150,500" fill="${N.n3}"/>`;
  // lights along the fascia: every fourth one red (custom colours), the rest white
  const pts = [];
  const run = (x1, y1, x2, y2, n) => { for (let i = 0; i <= n; i++) pts.push([x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n]); };
  run(26, 240, 198, 120, 13); run(202, 120, 374, 240, 13);
  pts.forEach(([x, y], i) => { s += glowDot(x.toFixed(1), (y + 4).toFixed(1), 2.6, i % 4 === 2 ? N.redL : '#FFFFFF'); });
  for (const x of [52, 348]) s += `<ellipse cx="${x}" cy="300" rx="34" ry="90" fill="url(#sva-pool)" opacity=".18"/>`;
  return s;
}

/* ---------- registry ---------- */
const ART = {
  'electrical-panel-upgrade': { draw: panelScene, alt: 'Illustration of an electrical panel with its door open, showing the breakers', detail: '100 92 184 230' },
  'electrical-outlets': { draw: outletScene, alt: 'Illustration of a wall outlet with a plug in it, beside a new outlet box being wired', detail: '196 190 132 165' },
  'surge-protection': { draw: surgeScene, alt: 'Illustration of a whole-house surge protector mounted beside an electrical panel, with a surge strip below', detail: '210 150 160 200' },
  'ceiling-fan-installation': { draw: fanScene, alt: 'Illustration of a ceiling fan with a light kit in a living room', detail: '94 40 192 240' },
  'ev-charger-installation': { draw: evScene, alt: 'Illustration of a wall-mounted EV charger in a garage beside a parked car', detail: '96 120 184 230' },
  'whole-house-wiring-or-rewiring': { draw: wiringScene, alt: 'Illustration of an open wall with electrical cables run through the studs into outlet boxes', detail: '150 170 160 200' },
  'electrical-inspections': { draw: inspectScene, alt: 'Illustration of an open electrical panel with an inspection checklist and a multimeter', detail: '180 180 184 230' },
  'recessed-lighting': { draw: recessedScene, alt: 'Illustration of a room lit by rows of recessed ceiling lights', detail: '40 10 192 240' },
  'remodels': { draw: remodelScene, alt: 'Illustration of a room being remodeled, with open studs, a new outlet box and a step ladder', detail: '190 20 184 230' },
  'lighting-additions': { draw: lightingScene, alt: 'Illustration of a kitchen with pendant lights over an island and under-cabinet lighting', detail: '52 96 192 240' },
  'whole-home-battery-back-up': { draw: batteryScene, alt: 'Illustration of a whole home battery mounted on a wall and wired to an electrical panel', detail: '136 90 184 230' },
  'generator': { draw: generatorScene, alt: 'Illustration of a standby generator on a pad beside a house, next to the electric meter', detail: '30 160 216 270' },
  'permanent-outdoor-lighting': { draw: outdoorScene, alt: 'Illustration of a house at dusk with permanent lights along the roofline', detail: '0 92 208 260' },
};

export const hasArt = slug => !!ART[slug];
export const artAlt = slug => ART[slug]?.alt ?? '';

/** The full scene, as the hero image. The scene group carries id="svp-art" so block B can show a close-up of it. */
export function serviceArt(slug, { cls = '' } = {}) {
  const a = ART[slug];
  if (!a) return '';
  return `<svg class="${cls}" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${a.alt}" focusable="false">${defs}<g id="svp-art">${a.draw()}</g></svg>`;
}

/** A 4:5 close-up of the hero scene (same drawing, reused through <use>). Decorative: the hero already describes it. */
export function serviceArtDetail(slug, { cls = '' } = {}) {
  const a = ART[slug];
  if (!a) return '';
  return `<svg class="${cls}" viewBox="${a.detail}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><use href="#svp-art"/></svg>`;
}
