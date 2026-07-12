# blogfolio — antonioavalos.com

Production portfolio: **Obsidian (authoring) → GitHub (source) → Astro 5 (build) → GitHub Pages (host)**, styled by **Design System v1.1** (azul/cherry, 3 schemes, readable article scope). Zero runtime JS except the sanctioned ~10-line theme script.

```
You write in content/ (Obsidian) → git push → Action builds → Pages serves
```

## Quickstart

```bash
npm install
npm run dev        # http://localhost:4321/blogfolio/
npm run build      # static site → dist/
npm run preview    # serve dist/ exactly as production
```

Requires Node 18+ (built & verified on Node 22 / Astro 5.18 / sass).

## Repo map

| Path | Role |
|---|---|
| `content/` | **Your Obsidian vault.** Open THIS folder as a vault. `work/*.md` = case studies (and future blog posts). |
| `src/config/site.ts` | **Site data**: nav verbs, metrics, values, talks, rail items, promos, your LinkedIn/email/garden URLs. Most edits happen here or in `content/`. |
| `src/content.config.ts` | Content schema (the `type`-field model: Case Study \| Blog, tags, outcomes, links, dropcap, layout…). |
| `src/styles/tokens/` | **Design System v1.1 — source of truth.** `colors.scss` = 3 schemes (edit here; Astro compiles it, no manual step). |
| `src/components/` | 23 `.astro` components ported from the DS `*.prompt.md` contracts. All styling via tokens. |
| `src/pages/` | Home · `/working/` · `/speaking/` · `/work/[slug]/` · 404 |
| `src/layouts/BaseLayout.astro` | Shell: SEO head, **theme script Part A (pre-paint)** + Part B, base-path-aware `@font-face`. |
| `public/fonts/` | The six self-hosted woff2 files (RHD 400/500/700 · SS4 400/600/400i). ✔ already included. |
| `.github/workflows/deploy.yml` | Build + deploy on push to `main`. |

## Writing content (Obsidian)

1. Obsidian → **Open folder as vault** → select `content/`.
2. New note in `work/` with frontmatter:

```md
---
title: "My case study"
description: "One-line teaser used on cards."
date: 2026-07-01
type: Case Study        # or Blog (same collection — R2 model)
tags: [Data]
featured: false          # true = the image-variant lead card on /working/
cover: /covers/x.jpg     # optional; omit → typographic tile
dropcap: true            # opt-in ::first-letter flourish
related: true            # show "More like this"
draft: false
private: false           # hidden from lists, page still builds
outcomes:
  - { value: "−63%", caption: "time to price an asset" }
links: { figma: "https://…", board: "https://…" }   # write-up slot is the page itself
---
Body in plain Markdown. ## headings feed the sticky TOC automatically.
> Blockquotes render as the oversized serif pull-quote.
==highlight== renders with the brand highlighter. `---` = the ∙ ∙ ∙ divider.
```

3. Save → commit → push. The Action rebuilds and deploys.

Talks live in `src/config/site.ts` (`TALKS`) — they're data, not pages (v1).

## Deploying

1. **Set the path** in `astro.config.mjs` — scenario A (project page, default) or B (custom domain `antonioavalos.com`, `base: '/'`). Wrong `base` = broken CSS.
2. Push to a new GitHub repo (`main` branch).
3. Repo **Settings → Pages → Source → GitHub Actions**.
4. Watch the **Actions** tab; the live URL appears in the deploy summary.
5. **Custom domain later:** switch to scenario B, add the domain in Settings → Pages, point DNS — do this deliberately so it doesn't collide with the live Ghost DNS.

## Architecture notes (for future-you)

- **Schemes**: Light default; Sepia/Dark via `data-theme`; auto-dark only when no choice was stored (`:root:not([data-theme])`). Dark ramp is ONE mixin in `colors.scss`.
- **Theme script** = the only runtime JS. Part A inline in `<head>` (pre-paint, no flash); Part B wires `[data-set-theme]` buttons + `localStorage`.
- **Wayfinding is hard-coded**: azul `→` internal, cherry `⧉` external. Never mix.
- **Fonts**: `@font-face` is generated in `BaseLayout` (not a static css) so URLs respect the Pages `base`. `font-display: swap`, 2 families / 4 weights.
- **Cards**: whole-card stretched links with z-indexed secondary links; missing covers fall back to the typographic tile — never broken images.
- **Read time** (☕) is computed at build (~200 wpm). TOC comes from real `##` headings.
- **NextCase** = next item in the collection (wraps around). **RelatedPosts** = shared-tag matches, opt-out with `related: false`.
- **`layout` frontmatter** (6 post-header variants) is in the schema; v1 renders `default` — the other five are the designed next increment.

## Known placeholders (swap when ready)

- `src/config/site.ts`: real LinkedIn / email / ADPList URLs.
- Isotipo: the "A" square in header/hero/favicon awaits your real SVG lockup.
- Case-study bodies in `content/work/` are design-data placeholders; covers absent → typographic tiles by design.
- Talk deck/video chip URLs point at figma.com/youtube.com placeholders.
