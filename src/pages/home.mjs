// Homepage: composed from src/sections/home/<id>.mjs in narrative order. Each returns <section id="s-<id>">.
export const sectionOrder = ['hero', 'safety', 'services', 'about', 'why', 'reviews', 'process', 'guarantee', 'contact-cta', 'membership', 'contact-form', 'faqs'];
export async function render(ctx) {
  ctx.preloadImage = 'owner-van';
  ctx.preloadSizes = '(min-width: 1200px) 48vw, 100vw';
  const out = [];
  for (const id of sectionOrder) {
    const mod = await import(`../sections/home/${id}.mjs`);
    out.push(await mod.render(ctx));
  }
  return out.join('\n');
}
