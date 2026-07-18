# Blogfolio — Tokens & Styles

The design language of Antonio Ávalos's portfolio/blog (an Astro site), shipped as **tokens, fonts, and global styles** — no runtime components. Build layouts with your own markup and style them with these tokens; every design will be on-brand.

## How to use it

Link the single stylesheet — it `@import`s the whole closure (fonts, colors, type, spacing, base resets, article styles):

```html
<link rel="stylesheet" href="styles.css">
```

There is **no component bundle** to import (`_ds_bundle.js` is intentionally empty). Style with CSS custom properties (`var(--token)`), never hard-coded values.

## Themes

One set of **semantic** tokens, re-assigned across three schemes. Switch by setting `data-theme` on a container (or `:root`); descendants inherit:

- **Light** — `:root` (default)
- **Sepia** — `[data-theme="sepia"]`
- **Dark** — `[data-theme="dark"]`

Because tokens are semantic, the same markup works in every theme. Read `tokens/colors.css` for the full per-theme ramps.

## Token vocabulary (real names — use these)

Read the source files for the complete list: `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`.

**Color** — brand: `--brand` (#003063 azul), `--brand-soft`, `--brand-tint`; accent: `--accent` (#d9436d cherry, display use only — hover fills, dropcap, the one solid CTA), `--accent-tint`; `--ink`. Text: `--text-heading`, `--text-body`, `--text-secondary`, `--text-meta`, `--text-on-brand`. Links (color *is* the wayfinding): `--link-internal` (stays on site), `--link-external` (leaves). Surfaces: `--surface-page`, `--surface-1`, `--surface-2`, `--surface-card`, `--surface-brand`. Borders: `--border`, `--border-hairline`. Feedback: `--highlighter`.

**Type** — families: `--font-sans` (Red Hat Display — UI, headings, card text), `--font-serif` (Source Serif 4 — display H1, article body, quotes). Weights: `--weight-regular` 400, `--weight-medium` 500, `--weight-bold` 700, `--weight-serif-semibold` 600. Scale: `--text-hero`, `--text-article-h1`, `--text-section`, `--text-card-title`, `--text-card-title-lg`, `--text-h2-article`, `--text-body-article`, `--text-blockquote`, `--text-ui`, `--text-ui-sm`, `--text-meta-size`, `--text-eyebrow`, `--text-stat`. Reading measure: `--measure-article` (680px).

**Space** — fixed 4/8 scale: `--space-1` (4px) … `--space-16` (64px); `--gutter-page`, `--max-page` (1200px). Radius: `--radius-chip` 8, `--radius-brandmark` 9, `--radius-action` 12, `--radius-media` 12, `--radius-card` 14, `--radius-band` 16. Motion: `--ease`, `--dur-fast` (150ms), `--dur-lift` (200ms). Elevation: `--shadow-card-sm`, `--shadow-card`, `--shadow-card-hover`.

## Idiom

- **Long-form reading** gets the `.article-body` scope (in `tokens/article.css`): serif body at `--text-body-article`, `line-height` 1.66, capped at `--measure-article`, with element-styled headings/quotes/figures — Markdown needs zero classes. Opt in to a drop cap with `.has-dropcap` on the article root.
- **Cards** rest at `--shadow-card` and lift `translateY(-4px)` into `--shadow-card-hover` on hover; all motion respects `prefers-reduced-motion`.

## One idiomatic snippet

```html
<article class="card" style="
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);">
  <p style="font: 700 var(--text-eyebrow)/1 var(--font-sans);
            letter-spacing:.12em; text-transform:uppercase; color: var(--brand-soft)">Case study</p>
  <h3 style="font-family: var(--font-sans); font-weight: var(--weight-bold);
             font-size: var(--text-card-title); color: var(--text-heading)">Rebuilding the checkout</h3>
  <a href="#" style="color: var(--link-internal); font-size: var(--text-ui)">Read →</a>
</article>
```
