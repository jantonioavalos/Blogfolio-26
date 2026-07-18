// src/config/site.ts — the site's data. Edit HERE, not in components.
// (MetricsRow contract: "Data lives in site config, not hardcoded.")

export const SITE = {
  title: 'Antonio Avalos',
  description:
    'Product manager building measurable things — working, speaking and mentoring across product, design systems and second brains.',
  linkedin: 'https://www.linkedin.com/in/jantonioavalos', 
  email: 'mailto:hey@jantonioavalos.com',  
  garden: 'https://notes.antonioavalos.com',
  adplist: 'https://adplist.org/mentors/j-antonio-avalos',        
};

export const VERBS = [
  { label: 'Working', href: '/working/', external: false },
  { label: 'Speaking', href: '/speaking/', external: false },
  { label: 'Mentoring', href: SITE.adplist, external: true },
  { label: 'Thinking', href: SITE.garden, external: true },
] as const;

export const METRICS = [
  { value: '$0.5M Budget', caption: 'from MVP proposals I\'ve managed' },
  { value: '160k Sales', caption: 'in e-commerce\'s first year after converting 16k users' },
  { value: '14k', caption: 'sold accesses, for 13+ courses in 2 languages for 2500+ students' },
];

export const VALUES = [
  { title: 'The mind is for having ideas, not holding them', text: 'Knowledge management is a side project I advocate for, especially for technical operations. Methodology, artifacts, and collaboration spaces have to be crystal clear so they don\'t distract us from delivering Value.' },
  { title: 'Strategize from the need', text: 'Vision and strategy must be understood by the teams so we can look for the foundations of a user\'s problem, then revisit the context and roles involved, and test intentional solutions to meet business goals.' },
  { title: 'Always be learning', text: 'Technology, design, and communication are endless areas to learn. Every day, I\'m exploring a podcast, video, blog, book, or online course to improve some personal or work skills.' }
];

// Talks are data, not markdown — they have no article page (v1).
export type Talk = {
  title: string;
  meta: string[]; // [venue, city, year, lang]
  cover?: string; // event photo in public/covers/ — path WITHOUT the base
  chips?: { deck?: string; video?: string };
};
export const TALKS: Talk[] = [
  { title: 'Cómo definir un MVP', meta: ['FEMSA Agile Community', 'remote', '2023', 'ES'], cover: '/covers/talk-01-como-definir-un-mvp.png', chips: { deck: 'https://drive.google.com/file/d/1OOwef5ct1p1YG3AxPIZDH04vnfFZ8hYJ/view?usp=sharing' } },
  { title: 'Rediseña y crece tu negocio con enfoque a tu propuesta de valor', meta: ['Talent Land', 'Expo Guadalajara', '2023', 'ES'], cover: '/covers/talk-02-redisena-tu-negocio.png', chips: { deck: 'https://drive.google.com/file/d/1ONp6jsdOY2tZ8E0OUxjNFpkdLOK7CxHm/view?usp=sharing' } },
  { title: 'Estrategia de producto', meta: ['FEMSA Agile Community', 'remote', '2022', 'ES'], cover: '/covers/talk-03-estrategia-de-producto.png' },
  { title: 'Product Management. Dándole sentido a cada release de código', meta: ['Hamilton Congress', 'Universidad Panamericana', '2022', 'ES'], cover: '/covers/talk-04-pm-hamilton-congress.jpeg' },
  { title: 'Construyendo tu marca personal', meta: ['Bootcamp Juventudes Zapopan', 'UNIVA', '2022', 'ES'], cover: '/covers/talk-05-construyendo-tu-marca.png', chips: { deck: 'https://drive.google.com/file/d/1OP63Yv3uodBoG84X6A7I5P6qrU78pWIN/view?usp=drive_link' } },
  { title: 'La importancia de la estrategia en tu organización o producto', meta: ['Instituto de la Juventud Jalisco', 'Ciudad Creativa Digital', '2022', 'ES'], cover: '/covers/talk-06-importancia-estrategia.jpg' },
  { title: 'Product Management. Desde la visión hasta los features', meta: ['Talent Land', 'Expo Guadalajara', '2022', 'ES'], cover: '/covers/talk-07-pm-talent-land.jpeg', chips: { video: 'https://youtu.be/q7kY_NP6xiA' } },
  { title: 'Start-up business and product strategy workshop series', meta: ['Enactus Entrepreneurs Hub', 'CUCEI UdeG', '2022'], cover: '/covers/talk-08-startup-business.jpg' },
  { title: 'How Product Managers Cross-Function with Other Teams', meta: ['ADPList Product Week', 'remote', '2022', 'EN'], cover: '/covers/talk-09-pm-cross-function.jpeg', chips: { video: 'https://youtu.be/1xt1Jyx4HeE' } },
  { title: 'Uxability Club — weekly sessions', meta: ['Enactus Entrepreneurs Hub', 'remote', '2020'], cover: '/covers/talk-10-uxability-club.png' },
  { title: 'Construye tu marca y negocio desde el usuario', meta: ['Technovation Challenge', 'CUCEI UdeG', '2019', 'ES'], cover: '/covers/talk-11-construye-tu-marca.png', chips: { deck: 'https://docs.google.com/presentation/d/1IpIumn7LzSt8oIwrYbzd3OxsP1v2jrsJlVsW3B-MeXI/' } },
  { title: 'Prototipando tu MVP con UX', meta: ['Technovation Challenge', 'CUCEI UdeG', '2019', 'ES'], cover: '/covers/talk-12-prototipando-mvp-ux.jpeg', chips: { deck: 'https://docs.google.com/presentation/d/1f7pbzJ-q5-sVi65qaTlyzRPtG9gu59ecXrYGfMsEiVI/' } },
  { title: 'UX Masterclass', meta: ['FreeCodeCamp GDL Talks', '2017', 'ES'], cover: '/covers/talk-13-ux-masterclass.jpeg', chips: { deck: 'https://docs.google.com/presentation/d/15XYIbXvgR7mWwRqtpJCYZcZUvaBr2oHhIXK2pLbHcZE/' } },
];

// SectionsRail — curated “in case you missed it”. internal hrefs are site-relative.
export const RAIL = {
  label: 'Some thoughts from my digital garden',
  items: [
    // { title: 'Building a second brain system', meta: 'Case study · ☕ 4 min', href: '/work/building-a-second-brain-system/', external: false },
    // { title: 'Knowledge management for teams', meta: 'Talk · 2024', href: '/speaking/', external: false },
    { title: 'My 12 favorite problems', meta: 'Evergreen notes · EN', href: `${SITE.garden}/Evergreen+notes/My+12+favorite+problems`, external: true },
    { title: 'My second brain system', meta: 'Evergreen notes · EN', href: `${SITE.garden}/Evergreen+notes/My+second+brain+system`, external: true },
    { title: 'Core Values Exercise', meta: 'Templates · EN', href: `${SITE.garden}/Templates/Core+Values+Exercise+–+Template`, external: true },
  ],
};

export const PROMOS = {
  mentoring: {
    title: 'Mentoring',
    text: 'Free 1:1 sessions for PMs finding their footing.',
    linkLabel: 'ADPList ⧉',
    href: SITE.adplist,
    external: true,
    image: '/covers/ADPLIST-mentorship-2024.png',
  },
  thinking: {
    title: 'Thinking',
    text: 'My digital garden — notes, maps of content, living drafts.',
    linkLabel: 'Visit garden ⧉',
    href: SITE.garden,
    external: true,
    image: '/covers/my-thinking-2025.png',
  },
  speaking: {
    title: 'Speaking',
    text: '13 talks on product, UX and strategy.',
    linkLabel: 'See talks →',
    href: '/speaking/',
    external: false,
    image: '/covers/talk-07-pm-talent-land.jpeg',
  },
};
