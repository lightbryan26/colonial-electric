// One consistent inline SVG icon set (24px grid, 1.75 stroke, round joins). Filled icons marked fill:true.
const I = {
  phone: { d: '<path d="M21.5 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 4.2 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.6 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>' },
  'arrow-right': { d: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>' },
  'arrow-up-right': { d: '<path d="M7 17 17 7M8.5 7H17v8.5"/>' },
  'chevron-down': { d: '<path d="m6 9 6 6 6-6"/>' },
  menu: { d: '<path d="M3.5 7h17M3.5 12h17M3.5 17h11"/>' },
  close: { d: '<path d="M6 6l12 12M18 6 6 18"/>' },
  star: { fill: true, d: '<path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z"/>' },
  bolt: { fill: true, d: '<path d="M13.4 1.8 4.3 13.6h6.4L9.9 22.2l9.2-12h-6.5z"/>' },
  check: { d: '<path d="M4.5 12.5l5 5L19.5 7"/>' },
  shield: { d: '<path d="M12 2.5 4.5 5.5v6c0 4.9 3.2 8.6 7.5 10 4.3-1.4 7.5-5.1 7.5-10v-6z"/><path d="m8.6 12 2.4 2.4 4.4-4.6"/>' },
  mail: { d: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>' },
  pin: { d: '<path d="M12 21.5s-7-6.1-7-11.6a7 7 0 0 1 14 0c0 5.5-7 11.6-7 11.6z"/><circle cx="12" cy="9.8" r="2.6"/>' },
  clock: { d: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>' },
  instagram: { d: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none"/>' },
  calendar: { d: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>' },
  quote: { fill: true, d: '<path d="M4 18.5v-5.2C4 8.7 6.3 5.8 10.2 5l.8 1.9C8.8 7.6 7.7 9 7.6 11H10v7.5zm9.5 0v-5.2c0-4.6 2.3-7.5 6.2-8.3l.8 1.9c-2.2.7-3.3 2.1-3.4 4.1H19.5v7.5z"/>' },
  // services
  outlet: { d: '<rect x="4" y="3" width="16" height="18" rx="3.5"/><path d="M9.5 8.5v3M14.5 8.5v3M10 16.5a2 2 0 0 1 4 0"/>' },
  panel: { d: '<rect x="5" y="2.5" width="14" height="19" rx="1.6"/><path d="M8.5 6.5h7M8.5 10h7M8.5 13.5h7M12 17.2v1.6"/>' },
  generator: { d: '<rect x="2.5" y="7" width="19" height="12" rx="2"/><path d="M6.5 7V4.5h4V7M5.5 19v1.5M18.5 19v1.5"/><path d="M12.8 9.6 10.2 13.4h3.2l-1.2 3.3"/>' },
  battery: { d: '<rect x="2.5" y="7" width="16.5" height="10" rx="2"/><path d="M21.5 10.5v3"/><path d="M11.6 8.8 9.2 12.3h3.4l-2 2.9"/>' },
  surge: { d: '<path d="M12 2.5 4.5 5.5v6c0 4.9 3.2 8.6 7.5 10 4.3-1.4 7.5-5.1 7.5-10v-6z"/><path d="M12.9 7.2 9.8 12.2h3.1l-1.1 4.4"/>' },
  fan: { d: '<circle cx="12" cy="12" r="1.8"/><path d="M12 10.2C11 6.4 11.8 3.2 14.6 3.4c2.5.2 1.9 3.6-1.5 7.3M13.8 12c3.8-1 7-.2 6.8 2.6-.2 2.5-3.6 1.9-7.3-1.5M12 13.8c1 3.8.2 7-2.6 6.8-2.5-.2-1.9-3.6 1.5-7.3M10.2 12c-3.8 1-7 .2-6.8-2.6.2-2.5 3.6-1.9 7.3 1.5"/>' },
  bulb: { d: '<path d="M9 18h6M10 21h4M12 2.8A6.2 6.2 0 0 0 8.4 14c.6.5 1.1 1.2 1.1 2v.2h5V16c0-.8.5-1.5 1.1-2A6.2 6.2 0 0 0 12 2.8z"/>' },
  ev: { d: '<rect x="3.5" y="3" width="10" height="18" rx="1.8"/><path d="M3.5 10h10"/><path d="M9.3 12.2 7.5 15h2.2l-1.1 2.6"/><path d="M13.5 7.5h2.2a2 2 0 0 1 2 2v6.2a1.6 1.6 0 0 0 3.2 0V8.4L19 5.5"/>' },
  wiring: { d: '<path d="M2.5 7h4M2.5 17h4M17.5 7h4M17.5 17h4M6.5 7c5.5 0 5.5 10 11 10M6.5 17c5.5 0 5.5-10 11-10"/>' },
  remodel: { d: '<path d="M3 11.2 12 4l9 7.2M5.5 9.5V20.5h13V9.5"/><path d="M12.9 11.2 10.6 14.6h3l-1.3 3"/>' },
  inspect: { d: '<circle cx="10.5" cy="10.5" r="6.8"/><path d="m15.6 15.6 5 5M7.7 10.6l2 2 3.5-3.7"/>' },
  recessed: { d: '<path d="M2.5 4.5h19M7 4.5v1.7a5 3.2 0 0 0 10 0V4.5"/><path d="M12 12.5v4M7.6 11.8l-1.8 3.4M16.4 11.8l1.8 3.4M12 19.5v1"/>' },
  sparkle: { d: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>' },
};

/** Inline SVG icon. aria-hidden by default; pass label for a meaningful icon. */
export function icon(name, { size = 24, cls = '', label = '' } = {}) {
  const i = I[name];
  if (!i) throw new Error('Unknown icon: ' + name);
  const paint = i.fill ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="icon icon-${name}${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" ${paint} ${a11y}>${i.d}</svg>`;
}
export const iconNames = Object.keys(I);
