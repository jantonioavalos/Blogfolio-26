---
name: import-article
description: Import a published web article from antonioavalos.com (or any URL) and convert it into an Obsidian-flavored Markdown case study in content/work, downloading images to content/attachments and validating against the Astro content schema. Use when the user says "import", "bring in", or "convert" an article URL into the site, or invokes /import-article with a URL.
---

# Import a web article → Obsidian Markdown case study

Convert a published article at a given URL into a new post under `content/work/`, matching this repo's existing case-study convention exactly, with images localized and the result validated by a build.

## Input

A single article URL, e.g. `https://antonioavalos.com/commerce-for-social-value-generation/`.
If no URL was provided, ask for one before doing anything else.

## Derive the slug

The output filename slug comes from the **last path segment of the URL**, not the title.
Example: `.../commerce-for-social-value-generation/` → slug `commerce-for-social-value-generation`.
Use this same slug for the `.md` filename and as the prefix for every downloaded image.

## Procedure

Follow these steps in order. Do not skip the two "read for convention" steps — they are what keep new posts consistent with existing ones.

### 1. Load the schema (source of truth for frontmatter)

Read [content.config.ts](src/content.config.ts). Every frontmatter key you emit must exist in the `posts` collection schema, and every value must satisfy its Zod type (`date` is coerced, `type` is the `Case Study | Blog` enum, `layout` is one of the six variants, `outcomes` is an array of `{ value, caption }`, etc.). Never invent keys the schema doesn't define.

### 2. Read one existing post for house style

Read a representative existing post — prefer an image-heavy one like [real-estate-future-value-insights.md](content/work/real-estate-future-value-insights.md), and a text-only one like [rebranding-a-design-system.md](content/work/rebranding-a-design-system.md). Match:
- Frontmatter ordering and which optional keys are typically set.
- Section structure: `##` for top-level sections (Context, Challenge, Solution, Outcome, Lessons learned), `###` for subsections.
- Image reference style: `![](../attachments/<slug>-img-N.png)` — relative path up from `content/work/` into `content/attachments/`.
- The `outcomes` frontmatter mirrors the headline metrics from the article's Outcome section.

### 3. Fetch the article content

Use WebFetch on the URL. Extract **verbatim**, not summarized:
- Title, subtitle/description, publication date, author, tags/categories.
- Full body preserving heading hierarchy, paragraphs, ordered/unordered lists, blockquotes, inline links (with URLs), and every image URL in document order.

Preserve the author's original wording, including any non-native-English phrasing — this is a personal portfolio; do not "correct" or rewrite prose. Fix only obvious conversion artifacts (see step 6).

### 4. Download images to content/attachments/

For each image URL found, in document order, download to `content/attachments/<slug>-img-N.png` (N starting at 1). Use curl with follow-redirects and an HTTP status check; verify each file is a real image with `file`:

```bash
cd content/attachments
curl -sS -L -w "%{http_code}" -o "<slug>-img-N.png" "<image-url>"
file <slug>-img-*.png   # confirm "PNG image data" etc., not an HTML error page
```

If an image is not a PNG (jpg/webp/gif/svg), keep the correct extension and reference that extension in the Markdown. If a download returns non-200 or an HTML error body, note it in the final report and leave a `<!-- TODO: image N failed: <url> -->` marker at that spot rather than a broken embed.

### 5. Map article → frontmatter

- `title`: the article title (quoted).
- `description`: a concise one-liner (roughly ≤ 120 chars) in the terse style of existing posts — condense a long subtitle rather than pasting it whole.
- `date`: publication date as `YYYY-MM-DD`.
- `type`: `Case Study` unless the source is clearly a blog post.
- `tags`: 1–3 tags in the repo's sentence-case style, e.g. `[Product management, E-commerce]`.
- `featured`: `false` by default (only the lead card is `true`).
- `dropcap`: `true` (default flourish used across posts).
- `related`: `true`.
- `layout`: `default` unless the user asks otherwise.
- `outcomes`: 2–3 headline metrics pulled from the Outcome section, as `{ value, caption }`.
- `links`: only include slots (`live`, `figma`, `repo`, `board`) that the article actually provides; omit otherwise.

### 6. Write the Markdown body

Write to `content/work/<slug>.md`. Rules:
- Use **clean standard Markdown**: `**bold**` (single pair), `_italic_`. Do **not** reproduce the doubled `****...****` artifact that appears in some older posts — that is a prior conversion bug, and clean is the target.
- Keep the section headings the author used, normalized to the `## Section` / `### Subsection` hierarchy.
- Place each `![](../attachments/<slug>-img-N.png)` at the same point in the flow where the image appeared in the source.
- Keep inline links with their real URLs (preserve any `?ref=` tracking params as they appear on the source, matching existing posts).
- Do **not** inline a "Jump to / table of contents" list from the source — the site's `Toc.astro` generates that from headings. Omitting it avoids duplication.
- Reproduce the "Lessons learned" emoji-divider format if the source uses it.

### 7. Validate with a build

Run `npx astro build` and confirm:
- The new page appears (`/work/<slug>/index.html`).
- Each new image is picked up and optimized (you'll see `<slug>-img-N ... webp` lines).
- No schema/frontmatter validation errors.

Report the build result. If it fails on frontmatter, fix the offending key against the schema and rebuild.

### 8. Report

Summarize concisely:
- File created + image count and their optimized sizes.
- Build pass/fail.
- Any **choices** the user should sanity-check: the condensed `description`, `featured`/`dropcap` defaults, chosen `tags`, chosen `outcomes`, and anything omitted (e.g. the ToC) or any failed image download.

## Constraints

- Only write files under `content/work/` and `content/attachments/`. Do not modify config, components, or `.gitignore` as part of this skill.
- Do not commit or push. Leave the changes in the working tree for the user to review.
- If a post with the same slug already exists, stop and ask whether to overwrite before writing.

---

## Portable standalone prompt (for use outside this repo/skill)

Paste this into any Claude session, replacing the URL:

> Import the article at **<PASTE_URL>** into this Astro site as an Obsidian-flavored Markdown case study.
>
> 1. Derive the slug from the URL's last path segment.
> 2. Read `src/content.config.ts` to learn the exact frontmatter schema (keys + Zod types) and read one existing image-heavy post in `content/work/` to match house style (section hierarchy `##`/`###`, image refs as `![](../attachments/<slug>-img-N.png)`).
> 3. WebFetch the URL and extract the title, date, tags, and full body **verbatim** — headings, lists, blockquotes, links-with-URLs, and every image URL in order. Preserve the author's original wording; fix only conversion artifacts.
> 4. Download each image with curl (`-sS -L`, check HTTP 200, verify with `file`) into `content/attachments/<slug>-img-N.png`.
> 5. Map to frontmatter: quoted `title`; concise ≤120-char `description`; `date: YYYY-MM-DD`; `type: Case Study`; 1–3 sentence-case `tags`; `featured: false`; `dropcap: true`; `related: true`; `layout: default`; 2–3 `outcomes` `{value, caption}` from the Outcome section; only real `links` slots.
> 6. Write `content/work/<slug>.md` using clean `**bold**`/`_italic_` (NOT doubled `****`), images inline at their source positions, no ToC list (Toc.astro generates it).
> 7. Run `npx astro build` to validate; fix any frontmatter errors and rebuild.
> 8. Report the file, image sizes, build result, and flag the condensed description / defaults / omissions for me to confirm.
