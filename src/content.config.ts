import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The rescued R2 content model: ONE collection, branch on `type`.
// content/ is the Obsidian vault; work/ holds Case Studies (and later Blog posts).
const posts = defineCollection({
  loader: glob({ pattern: 'work/**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    type: z.enum(['Case Study', 'Blog']).default('Case Study'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),          // path under /public, e.g. /covers/x.jpg
    draft: z.boolean().default(false),
    private: z.boolean().default(false),   // rescued: hide from lists, page still builds
    featured: z.boolean().default(false),  // lead (image-variant) card on /working/
    dropcap: z.boolean().default(false),   // opt-in ::first-letter flourish
    related: z.boolean().default(true),    // show "More like this"
    layout: z
      .enum(['default', 'full-image', 'box-image', 'background-image', 'default-with-background', 'box-with-background'])
      .default('default'),                 // the 6 post-layout variants (O9 prop)
    outcomes: z.array(z.object({ value: z.string(), caption: z.string() })).default([]),
    links: z
      .object({
        live: z.string().optional(),
        figma: z.string().optional(),
        repo: z.string().optional(),
        board: z.string().optional(),
      })
      .default({}),                        // R4 multi-link slots (write-up is the page itself)
    extlink: z.string().optional(),        // rescued: card links out instead of to a page
  }),
});

export const collections = { posts };
