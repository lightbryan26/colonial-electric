import { faqs } from '../../blocks/faqs.mjs';
import { faqs as items } from '../../data/home.mjs';
export function render(ctx) { return faqs(ctx, items, { id: 's-faqs' }); }
