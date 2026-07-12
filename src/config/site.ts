// src/config/site.ts — the site's data. Edit HERE, not in components.
// (MetricsRow contract: "Data lives in site config, not hardcoded.")

export const SITE = {
  title: 'Antonio Ávalos',
  description:
    'Product manager building measurable things — working, speaking and mentoring across product, design systems and second brains.',
  linkedin: 'https://www.linkedin.com/', // TODO: your real profile URL
  email: 'mailto:hi@antonioavalos.com',  // TODO: your real address
  garden: 'https://notes.antonioavalos.com',
  adplist: 'https://adplist.org/',        // TODO: your ADPList profile
};

export const VERBS = [
  { label: 'Working', href: '/working/', external: false },
  { label: 'Speaking', href: '/speaking/', external: false },
  { label: 'Mentoring', href: SITE.adplist, external: true },
  { label: 'Thinking', href: SITE.garden, external: true },
] as const;

export const METRICS = [
  { value: '$160k', caption: 'first-year sales, new product line' },
  { value: '6k · 1k', caption: 'assets · users on the design system' },
  { value: '14k', caption: 'courses delivered' },
  { value: '13', caption: 'talks · ES & EN' },
];

export const VALUES = [
  { title: 'Clarity over cleverness', text: "If the team can't repeat it, it isn't strategy." },
  { title: 'Systems over heroics', text: "Fix the pipeline, not just this week's fire." },
  { title: 'Evidence over opinion', text: 'Outcomes get a number or they get a question mark.' },
];

// Talks are data, not markdown — they have no article page (v1).
export type Talk = {
  title: string;
  meta: string[]; // [venue, city, year, lang]
  chips?: { deck?: string; video?: string };
};
export const TALKS: Talk[] = [
  { title: 'Second brain for product managers', meta: ['Product Fest', 'CDMX', '2025', 'ES'], chips: { deck: 'https://figma.com/', video: 'https://youtube.com/' } },
  { title: 'Design systems as products', meta: ['UX Nights', 'remote', '2025', 'EN'], chips: { deck: 'https://figma.com/' } },
  { title: 'Discovery en equipos remotos', meta: ['PM Summit', 'GDL', '2024', 'ES'] },
  { title: 'Knowledge management for teams', meta: ['Agile MX', 'remote', '2024', 'ES'], chips: { video: 'https://youtube.com/' } },
];

// SectionsRail — curated “in case you missed it”. internal hrefs are site-relative.
export const RAIL = {
  label: 'In case you missed it — Knowledge management',
  items: [
    { title: 'Building a second brain system', meta: 'Case study · ☕ 4 min', href: '/work/building-a-second-brain-system/', external: false },
    { title: '12 favorite problems', meta: 'Note · notes.', href: `${SITE.garden}/12-favorite-problems`, external: true },
    { title: 'Evergreen content, explained', meta: 'Note · notes.', href: SITE.garden, external: true },
    { title: 'Knowledge management for teams', meta: 'Talk · 2024', href: '/speaking/', external: false },
  ],
};

export const PROMOS = {
  mentoring: {
    title: 'Mentoring',
    text: 'Free 1:1 sessions for PMs finding their footing.',
    linkLabel: 'ADPList ⧉',
    href: SITE.adplist,
    external: true,
  },
  thinking: {
    title: 'Thinking',
    text: 'My digital garden — notes, maps of content, living drafts.',
    linkLabel: 'Visit garden ⧉',
    href: SITE.garden,
    external: true,
  },
  speaking: {
    title: 'Speaking',
    text: '13 talks on product, systems and second brains.',
    linkLabel: 'See talks →',
    href: '/speaking/',
    external: false,
  },
};
