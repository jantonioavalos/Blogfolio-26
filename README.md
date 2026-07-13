# blogfolio — antonioavalos.com

Production portfolio: **Obsidian (authoring) → GitHub (source) → Astro 5 (build) → GitHub Pages (host)**, styled by **Design System v1.1** (azul/cherry, 3 schemes, readable article scope). Zero runtime JS except the sanctioned ~10-line theme script.

```
You write in content/ (Obsidian) → git push → Action builds → Pages serves
```

## Quickstart

```bash
npm install
npm run dev        # http://localhost:4321/Blogfolio-26/
npm run build      # static site → dist/
npm run preview    # serve dist/ exactly as production
```

Requires Node 18+ (built & verified on Node 22 / Astro 5.18 / sass).

## Repo map

| Path | Role |
|---|---|
| `content/` | **Your Obsidian vault.** Open THIS folder as a vault. `work/*.md` = case studies (and future blog posts). |
| `docs/content-reference.md` | **Deep reference** for every frontmatter field + how each list selects/counts. The day-to-day companion to this README. |
| `public/covers/` | Card/hero cover images. `cover:` frontmatter points here (see Writing content). |
| `src/config/site.ts` | **Site data**: nav verbs, metrics, values, talks, rail items, promos, your LinkedIn/email/garden URLs. Most edits happen here or in `content/`. |
| `src/content.config.ts` | Content schema (the `type`-field model: Case Study \| Blog, tags, outcomes, links, dropcap, layout…). |
| `src/styles/tokens/` | **Design System v1.1 — source of truth.** `colors.scss` = 3 schemes (edit here; Astro compiles it, no manual step). |
| `src/components/` | 23 `.astro` components ported from the DS `*.prompt.md` contracts. All styling via tokens. |
| `src/pages/` | Home · `/working/` · `/speaking/` · `/work/[slug]/` · 404 |
| `src/layouts/BaseLayout.astro` | Shell: SEO head, **theme script Part A (pre-paint)** + Part B, base-path-aware `@font-face`. |
| `public/fonts/` | The six self-hosted woff2 files (RHD 400/500/700 · SS4 400/600/400i). ✔ already included. |
| `.github/workflows/deploy.yml` | Build + deploy on push to `main`. |

## Design System

Everything the site renders inherits one small, opinionated system — **Design System v1.1**. Source of truth: **`src/styles/tokens/`** (Astro compiles the SCSS at build; no manual step). Components never hard-code values — everything is `var(--*)`.

- **Brand** — azul `#003063` (headlines, buttons, brand surfaces) + cherry `#d9436d` (*display* accent only: hover fills, dropcap, the ∙∙∙ divider, the one solid CTA). Neutral core `#1d1d1b`.
- **Type** — two families, four weights: **Red Hat Display** (sans — UI, headings, card text) and **Source Serif 4** (serif — display H1, article body, quotes). Self-hosted woff2 in `public/fonts/`.
- **Schemes** — one set of *semantic* tokens re-assigned across **Light** (default), **Sepia**, and **Dark**; auto-dark only when no choice was stored. Same markup works in every scheme (see [Architecture notes](#architecture-notes-for-future-you)).
- **Wayfinding is color** — azul `→` stays on site, cherry `↗` leaves. Never mix.

| Token file | Holds |
|---|---|
| `colors.scss` | 3 schemes, one dark mixin — **edit here** |
| `typography.css` | families, weights, fluid scale, `--measure-article` (680px) |
| `spacing.css` | fixed 4/8 space scale, radius, motion |
| `base.css` · `article.css` | page resets · the readable `.article-body` scope (Markdown needs zero classes) |

**Synced to Claude Design.** The token + style layer is also published to [claude.ai/design](https://claude.ai/design) as a standalone *"Blogfolio Tokens & Styles"* design system, so its design agent builds on-brand with the real tokens and fonts. Sync inputs live in **`.design-sync/`** (`config.json`, `NOTES.md`); re-run via the `/design-sync` skill. Note: the `.astro` components are compile-time HTML, not runtime React, so only tokens/styles are synced — not the components.

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
cover: /covers/x.jpg     # optional; file lives in public/covers/. Write the path WITHOUT the Pages base (see Developer notes)
dropcap: true            # opt-in ::first-letter flourish
related: true            # show "More like this"
draft: false
private: false           # hidden from lists, page still builds
outcomes:
  - { value: "−63%", caption: "time to price an asset" }
links: { figma: "https://…", board: "https://…" }   # shown on the /working/ card link row only, NOT on the post page
---
Body in plain Markdown. ## headings feed the sticky TOC automatically.
> Blockquotes render as the oversized serif pull-quote.
==highlight== renders with the brand highlighter. `---` = the ∙ ∙ ∙ divider.
```

3. Save → commit → push. The Action rebuilds and deploys.

Talks live in `src/config/site.ts` (`TALKS`) — they're data, not pages (v1).

## Deploying

1. Push to a new GitHub repo (`main` branch). Note: GitHub Pages serves static files. Astro's build produces a static dist/ folder. So deployment = build on every push, then publish dist/ to Pages. The clean way is a GitHub Actions workflow (Astro publishes an official one). You do not commit dist/ — the Action builds it for you.
2. Repo **Settings → Pages → Source → GitHub Actions**.
3. **Set the path** in `astro.config.mjs` — scenario A (project page, default) or B (custom domain `antonioavalos.com`, `base: '/'`). Wrong `base` = broken CSS.
4. **Custom domain later:** switch to scenario B, add the domain in Settings → Pages, point DNS — do this deliberately so it doesn't collide with the live Ghost DNS.
5. You'd create .github/workflows/deploy.yml. Astro's official version does: checkout → install → astro build → upload dist/ → deploy to Pages. The canonical file is documented here: https://docs.astro.build/en/guides/deploy/github/
6. Sync repo. Every time main is updated it will deploy.
7. Optional: Install the Github actions extension in your VSCode.

## Architecture notes (for future-you)

- **Schemes**: Light default; Sepia/Dark via `data-theme`; auto-dark only when no choice was stored (`:root:not([data-theme])`). Dark ramp is ONE mixin in `colors.scss`.
- **Theme script** = the only runtime JS. Part A inline in `<head>` (pre-paint, no flash); Part B wires `[data-set-theme]` buttons + `localStorage`.
- **Wayfinding is hard-coded**: azul `→` internal, cherry `⧉` external. Never mix.
- **Fonts**: `@font-face` is generated in `BaseLayout` (not a static css) so URLs respect the Pages `base`. `font-display: swap`, 2 families / 4 weights.
- **Cards**: whole-card stretched links with z-indexed secondary links; missing covers fall back to the typographic tile — never broken images.
- **Read time** (☕) is computed at build (~200 wpm). TOC comes from real `##` headings.
- **NextCase** = next item in the collection (wraps around). **RelatedPosts** = shared-tag matches, opt-out with `related: false`.
- **`layout` frontmatter** (6 post-header variants) is declared in the schema but **not read by any code yet** — setting it is a no-op today. See Developer notes for how to wire it.

## Known placeholders (swap when ready)

- `src/config/site.ts`: real LinkedIn / email / ADPList URLs.
- Isotipo: the "A" square in header/hero/favicon awaits your real SVG lockup.
- Case-study bodies in `content/work/` are design-data placeholders; covers absent → typographic tiles by design.
- Talk deck/video chip URLs point at figma.com/youtube.com placeholders.

## Developer notes and disclaimers

> Full field-by-field reference and list-counting logic: **[`docs/content-reference.md`](docs/content-reference.md)**. This section is the short version — the gotchas that bite.

### Base-path asset convention (read before adding images/links)
The site deploys under a Pages **base** (`/Blogfolio-26/` in project-page mode, per `astro.config.mjs`; `/` with a custom domain). Every internal URL is prefixed with that base **inside components** using the repo idiom `base + path.replace(/^\//, '')`.

- **Author frontmatter/config paths WITHOUT the base.** Write `cover: /covers/x.png`, not `/Blogfolio-26/covers/x.png`. Components add the base; writing it yourself double-prefixes (`/Blogfolio-26/Blogfolio-26/…`) and the image 404s.
- This is a **code** concern, not a domain one — it does *not* fix itself when you attach a custom domain while the base is non-root.
- Cover files must live in **`public/covers/`** (only `public/` is web-served). Images in `content/attachments/` are article-body images and are *not* servable as covers — copy one in if you want to reuse it.
- *Regression fixed:* the case-study post header (`src/pages/work/[...slug].astro`) previously rendered `cover` without the base and threw the dev error *"Request URLs for public/ assets must also include your base."* All card and post consumers now base-prefix consistently.

### Dormant / partial frontmatter fields
| Field | State | Note |
|---|---|---|
| `layout` (6 variants) | 🔴 dormant | In the schema, read by no code. To activate, branch on `post.data.layout` in `[...slug].astro`. |
| `extlink` | 🔴 dormant | In the schema, read by no code. Intended to make a card link out externally instead of to its post page. |
| `links` | 🟡 partial | Renders on **/working/ cards only**, not on the post page. |
| `type: Blog` | 🟡 partial | Builds a page, but **no list surface renders Blog posts yet** — every list filters for `Case Study`. |

### List counts & where to change them
| Surface | Count | Change at |
|---|---|---|
| Home · Working peek | newest **3** | `.slice(0, 3)` — [`index.astro:21`](src/pages/index.astro#L21) |
| Working · lead card | **1** (`featured`, else newest) | `posts.find(featured)` — [`working.astro:21`](src/pages/working.astro#L21) |
| Working · tall cards | up to **9** | `.slice(0, 9)` — [`working.astro:22`](src/pages/working.astro#L22) |
| Post · Next case | **1**, wraps around | `[...slug].astro` |
| Post · More like this | up to **3** | `.slice(0, 3)` in *both* `[...slug].astro` and [`RelatedPosts.astro:9`](src/components/RelatedPosts.astro#L9) |

### Hiding content: `draft` vs `private`
- `private: true` → out of every list, **page still builds** (share the URL privately).
- `draft: true` → out of every list **and the page is not built at all**.

Shared list filter: `!draft && !private && type === 'Case Study'`.
