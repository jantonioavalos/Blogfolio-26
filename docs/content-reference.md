# Content reference — frontmatter & list logic

> Day-to-day companion to the README. Everything here is traced to real code.
> Schema lives in [`src/content.config.ts`](../src/content.config.ts); each case study is a
> Markdown file in [`content/work/`](../content/work/).

---

## 1. Frontmatter fields

Every field, its type, default, whether it's actually wired to code, and what reads it.

| Field | Type | Default | Required | Status | Read by |
|---|---|---|---|---|---|
| `title` | string | — | ✅ yes | 🟢 active | H1 on post; title on every card |
| `description` | string | `''` | no | 🟢 active | card subtitle; `<meta description>` on post |
| `date` | date (`YYYY-MM-DD`) | — | ✅ yes | 🟢 active | **sort key for every list**; shown as `Mon YYYY` |
| `type` | `Case Study` \| `Blog` | `Case Study` | no | 🟢 active | **list filter** (all lists want `Case Study`); chip on post |
| `tags` | string[] | `[]` | no | 🟢 active | TagChips; `tags[0]` on home cards; **drives "More like this" matching** |
| `cover` | string (path under `/public`) | — | no | 🟢 active | card image + post featured band. Write `/covers/x.png` (no base) |
| `outcomes` | `{value, caption}[]` | `[]` | no | 🟢 active | Outcome box in the post's sticky rail |
| `links` | `{live, figma, repo, board}` | `{}` | no | 🟡 partial | **working-page cards only** (via `withWriteup`). Not shown on the post page |
| `draft` | boolean | `false` | no | 🟢 active | `true` → **removed from lists AND the page is not built** |
| `private` | boolean | `false` | no | 🟢 active | `true` → hidden from lists, **but the page still builds** (shareable by URL) |
| `featured` | boolean | `false` | no | 🟢 active | Marks the **image-variant lead** on the working page (newest featured wins) |
| `dropcap` | boolean | `false` | no | 🟢 active | Adds the `::first-letter` flourish to the article body |
| `related` | boolean | `true` | no | 🟢 active | `false` → hides the "More like this" block on that post |
| `layout` | 6 enum variants¹ | `default` | no | 🔴 **dormant** | **Declared in schema but no code reads it yet** |
| `extlink` | string | — | no | 🔴 **dormant** | **Declared in schema but no code reads it yet** |

¹ `layout` enum: `default` · `full-image` · `box-image` · `background-image` · `default-with-background` · `box-with-background`.

### The two dormant fields — your biggest customization opportunity
`layout` and `extlink` are defined in the schema (so setting them won't error), but **nothing in `src/` consumes them**. They're scaffolding for features not yet built:

- **`layout`** — was meant to switch the post's header/hero treatment (6 variants). To activate: branch on `post.data.layout` in [`src/pages/work/[...slug].astro`](../src/pages/work/[...slug].astro) around the `.featured` band.
- **`extlink`** — was meant to make a card link **out** to an external URL instead of to the internal post page. To activate: in the card builders, use `extlink` as the `href` (+ `external`) when present.

Everything else is live.

---

## 2. `draft` vs `private` — the two ways to hide

```
                     in lists?     page builds?     reachable by URL?
  (normal)              yes            yes                yes
  private: true         NO             yes                yes   ← share a link privately
  draft: true           NO             NO                 NO    ← fully parked
```

Filter used by every list: `!draft && !private && type === 'Case Study'`.

---

## 3. Field → where it appears

```
  title ─────────────┬─► post H1
                     ├─► working card / home card / related card titles
  description ───────┼─► card subtitle + <meta>
  date ──────────────┼─► "Mon YYYY" label  +  SORT KEY for all lists
  tags ──────────────┼─► chips  +  tags[0] on home card  +  related matching
  cover ─────────────┼─► working card image / home card image / post featured band
  outcomes ──────────┼─► post rail Outcome box
  links ─────────────┴─► working-page card link row   (NOT on the post page)
  featured ──► working-page LEAD selector
  related  ──► toggles the post's "More like this"
  dropcap  ──► post body first-letter
```

---

## 4. How every list selects & counts

Three data sources feed the site:
- **`posts`** = Markdown in `content/work/` (case studies)
- **`TALKS`, `RAIL`, `PROMOS`** = hardcoded arrays in [`src/config/site.ts`](../src/config/site.ts)

### 🏠 Home — [`src/pages/index.astro`](../src/pages/index.astro)

| Block | Source | Count | Selection logic |
|---|---|---|---|
| Working sneak-peek | `posts` | **3** | `posts.slice(0, 3)` → **newest 3 case studies** |
| Speaking sneak-peek | `TALKS` | **3** | `TALKS.slice(0, 3)` → first 3 in config order |
| SectionsRail | `RAIL.items` | all (4) | manual curation in config |
| Promos | `PROMOS` | 2 | hardcoded: `mentoring`, `thinking` |

### 💼 Working — [`src/pages/working.astro`](../src/pages/working.astro)

```
  posts  ──filter(!draft,!private, Case Study)──  sort(date desc)
     │
     ├─►  lead   = posts.find(featured) ?? posts[0]        → 1 big image-variant card
     │
     └─►  rest   = everything except lead, .slice(0, 9)    → up to 9 tall cards
                    imageSide alternates right/left/right…
```

| Block | Count | Selection logic |
|---|---|---|
| Lead card | **1** | first post with `featured: true`; if none, the newest post |
| Tall cards | **up to 9** | all remaining, newest first, alternating image side (`i % 2`) |
| Promos | 2 | hardcoded: `mentoring`, `speaking` |

> The `9` cap is the one you edit at [`working.astro:22`](../src/pages/working.astro#L22) (`.slice(0, 9)`).

### 🎤 Speaking — [`src/pages/speaking.astro`](../src/pages/speaking.astro)

| Block | Source | Count | Selection logic |
|---|---|---|---|
| Talk grid | `TALKS` | **all** | `TALKS.map(...)` — every talk, config order |

### 📄 Case study post — [`src/pages/work/[...slug].astro`](../src/pages/work/[...slug].astro)

All post-view lists work off `all` = same-type posts, `!draft && !private`, sorted newest-first.

```
  ┌─ Outcome box ──── this post's `outcomes[]`          → all, in array order
  ├─ Table of contents ── this post's H2 headings only  → all `##` headings
  ├─ Next case ───── all[(idx + 1) % all.length]        → 1, next by date, WRAPS to start
  └─ More like this ─ (only if related !== false)       → up to 3
         step 1: same type + shares ≥1 tag
         step 2: pad with other same-type posts if <3
         step 3: dedupe, slice(0, 3)
```

| Block | Count | Selection logic |
|---|---|---|
| Outcome box | all | renders each `outcomes` entry (hidden if empty) |
| TOC | all H2 | built from real `## ` headings (`depth === 2`) |
| Next case | **1** | the next post by date; wraps around at the end |
| More like this | **up to 3** | tag-matches first, padded by recency; gated by `related` |

> "Read time" everywhere = `body words ÷ 200`, min 1 — computed, never authored.

---

## 5. Common edits — where to reach

| I want to… | Edit |
|---|---|
| Change how many tall cards on Working | `.slice(0, 9)` at [`working.astro:22`](../src/pages/working.astro#L22) |
| Change how many cards on Home | `.slice(0, 3)` at [`index.astro:21`](../src/pages/index.astro#L21) |
| Pick a different lead card | set `featured: true` on that case study (newest featured wins) |
| Change related count | `.slice(0, 3)` in [`[...slug].astro`](../src/pages/work/[...slug].astro) **and** [`RelatedPosts.astro:9`](../src/components/RelatedPosts.astro#L9) (both cap at 3) |
| Add talks / rail items / promos | edit the arrays in [`site.ts`](../src/config/site.ts) |
| Add a Blog listing | there's no Blog surface yet — `type: Blog` builds a page but appears in no list |
| Activate `layout` / `extlink` | wire them in `[...slug].astro` / card builders (see §1) |

---

## 6. Minimal vs. full frontmatter

**Minimum that builds:**
```yaml
---
title: "My case study"
date: 2025-01-15
---
```

**Everything, annotated:**
```yaml
---
title: "Rebranding a design system"      # H1 + card titles
description: "One library, 6k assets…"   # card subtitle + meta
date: 2025-06-10                         # sort key (newest first)
type: Case Study                         # Case Study | Blog
tags: [Design system, B2B]               # chips; tags[0] on home; related matching
cover: /covers/rebranding.png            # /public path, NO base prefix
featured: true                           # lead card on Working
dropcap: true                            # article first-letter flourish
related: true                            # show "More like this"
private: false                           # true = hide from lists, keep URL
draft: false                             # true = hide everywhere + skip build
outcomes:                                # rail Outcome box
  - { value: "6k", caption: "assets migrated" }
  - { value: "1k", caption: "users, zero freeze" }
links:                                   # working-page card link row only
  live: "https://…"
  figma: "https://…"
# layout: default                        # ⚠ dormant — not read by any code yet
# extlink: "https://…"                   # ⚠ dormant — not read by any code yet
---
```
