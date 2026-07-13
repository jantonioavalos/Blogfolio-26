# design-sync notes — Blogfolio (Astro)

## Shape: off-script, tokens-only
- This is a **pure Astro** portfolio/blog. No Storybook, no React, no JSX/TSX, no bundlable component `dist/` (the `dist/` is the built static HTML site). The `design-sync` converter (`package-build.mjs`) targets React DSes and cannot run here.
- The UI is `.astro` components in `src/components/` (~24) that compile to static HTML at build time — they are **not** runtime-renderable React and cannot be shipped in a `_ds_bundle.js`.
- Therefore this sync ships **tokens + styles only**, with the `ds-bundle/` layout **hand-produced** (not converter output):
  - `_ds_bundle.js` — empty-bodied (`window.Blogfolio={}`) with the `/* @ds-bundle: … */` first-line header.
  - `styles.css` — `@import` closure over `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/base.css`, `tokens/article.css`.
  - `tokens/` — copied from `src/styles/tokens/`; `colors.css` compiled from `colors.scss` via `npx sass`.
  - `fonts/` — the 6 self-hosted woff2 from `public/fonts/`.
  - `tokens/fonts.css` — hand-authored `@font-face` set (source uses BaseLayout-generated, base-path-aware `@font-face`; here paths are `../fonts/*.woff2`).
  - `components/Foundations/<Name>/<Name>.html` — hand-authored foundation preview cards (Colors, Typography, Spacing, Radius, Elevation, Themes). No `.jsx`/`.d.ts` (no runtime components).

## Two projects exist for this repo
- **Blogfolio-26-vAstro** (`02b3c36a-034f-437a-b9f2-60b767768e91`) — a **complete React design system** (22 components + guidelines + tokens) synced by a prior/manual process. Its `.jsx` components have **no source of truth in this repo** (the `design-system/` folder is empty and never tracked in git). Treat that project as the canonical copy of that work. Do NOT let a tokens-only sync reconcile-delete into it.
- **Blogfolio Tokens & Styles** (`ac203dd7-f010-4058-9b65-dc42268b6c3e`) — THIS sync's target. Tokens/styles/fonts + foundation cards only.

## Re-sync risks
- No `_ds_sync.json` anchor is produced (off-script tokens-only) — every re-sync re-verifies from scratch. That's correct and safe here.
- Token source of truth is `src/styles/tokens/` in the Astro repo. `colors.css` must be recompiled from `colors.scss` on any color change.
- The color VALUES matched the other project's tokens at sync time (2026-07-13); only the auto-dark wiring differs (this repo uses a `@media (prefers-color-scheme: dark)` block; the other project defers to a `scripts/theme.js`).
