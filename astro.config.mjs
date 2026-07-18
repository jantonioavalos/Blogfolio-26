// @ts-check
import { defineConfig } from 'astro/config';
import remarkObsidianMedia from 'remark-obsidian-media';

// ── GitHub Pages settings — pick ONE scenario ───────────────────
//  A) PROJECT PAGE  → https://<username>.github.io/<repo>/
//     site: 'https://<username>.github.io',  base: '/<repo>/'
//  B) CUSTOM DOMAIN / USER PAGE → https://antonioavalos.com/
//     site: 'https://antonioavalos.com',     base: '/'
// Wrong `base` = broken CSS + 404 links. Default below = scenario A.
export default defineConfig({
  site: 'https://jantonioavalos.github.io',
  base: '/Blogfolio-26/',
  markdown: {
    // Obsidian-compatible image hints + masonry galleries (packages/remark-obsidian-media)
    remarkPlugins: [remarkObsidianMedia],
  },
});
