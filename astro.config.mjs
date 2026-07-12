// @ts-check
import { defineConfig } from 'astro/config';

// ── GitHub Pages settings — pick ONE scenario ───────────────────
//  A) PROJECT PAGE  → https://<username>.github.io/<repo>/
//     site: 'https://<username>.github.io',  base: '/<repo>/'
//  B) CUSTOM DOMAIN / USER PAGE → https://antonioavalos.com/
//     site: 'https://antonioavalos.com',     base: '/'
// Wrong `base` = broken CSS + 404 links. Default below = scenario A.
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/blogfolio/',
});
