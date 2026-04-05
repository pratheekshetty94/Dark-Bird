// Portfolio pieces surfaced on service detail pages (/services/[slug]) and
// industry detail pages (/industries/[slug]).
//
// Architecture:
//   1. Four department work pools (FILMS/SOCIALS/DESIGNS/LABS) hold the
//      cross-cutting proof points that any service/industry can pull from.
//   2. `serviceWork` holds optional per-slug "hero" items — short, curated
//      picks that appear first.
//   3. `serviceDepartments` maps every service slug to an ordered list of
//      department pools that should be appended after the hero items.
//   4. `getServiceWork(slug)` merges hero + department pools, dedupes by
//      `href`, and caps the list so pages stay focused.

export type ServiceWorkItem = {
  title: string
  client?: string
  description?: string
  // Either a local image path or a remote one already whitelisted in
  // next.config.js (i.ytimg.com is allowed for YouTube thumbnails).
  image: string
  // Where the item opens when clicked — a /work/* page or external URL.
  href: string
  external?: boolean
  tag?: string
}

export type WorkDepartment = 'films' | 'socials' | 'designs' | 'labs'

const yt = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// ─────────────────────────────────────────────────────────────────────────────
// Department work pools
// ─────────────────────────────────────────────────────────────────────────────

export const FILMS_WORK: ServiceWorkItem[] = [
  {
    title: 'Kantara',
    client: 'Hombale Films',
    description: '100M+ views — production support & editorial on the blockbuster',
    image: yt('8mrVmf239GU'),
    href: 'https://www.youtube.com/watch?v=8mrVmf239GU',
    external: true,
    tag: 'Feature Film',
  },
  {
    title: '777 Charlie',
    client: 'Paramvah Studios',
    description: 'Feature cinematography · 26M+ views',
    image: yt('REqFOV2A7sI'),
    href: 'https://www.youtube.com/watch?v=REqFOV2A7sI',
    external: true,
    tag: 'Feature Film',
  },
  {
    title: 'Gandhada Gudi',
    client: 'PRK Productions',
    description: 'Wildlife & landscape cinematography · 13M+ views',
    image: yt('UdPisHeGMQM'),
    href: 'https://www.youtube.com/watch?v=UdPisHeGMQM',
    external: true,
    tag: 'Feature Doc',
  },
  {
    title: 'HERO',
    client: 'Rishab Shetty Films',
    description: 'Edit + post-production',
    image: yt('MiJPnyCOoUc'),
    href: 'https://www.youtube.com/watch?v=MiJPnyCOoUc',
    external: true,
    tag: 'Feature Film',
  },
  {
    title: 'Su From So',
    client: 'Lighter Buddha Films',
    description: 'Editing & post-production partner',
    image: yt('Fe11GLdTL5k'),
    href: 'https://www.youtube.com/watch?v=Fe11GLdTL5k',
    external: true,
    tag: 'Feature Film',
  },
  {
    title: '#FindYourMatch',
    client: 'Flipkart × Sima Taparia',
    description: 'National campaign hero film',
    image: yt('a1P87WpuCM4'),
    href: 'https://www.youtube.com/watch?v=a1P87WpuCM4',
    external: true,
    tag: 'Ad Film',
  },
  {
    title: 'Hangyo Ice Cream TVC',
    client: 'Hangyo',
    description: 'Multi-language television commercial',
    image: yt('fBkKkgfa5-0'),
    href: 'https://www.youtube.com/watch?v=fBkKkgfa5-0',
    external: true,
    tag: 'TVC',
  },
  {
    title: 'YO Fruits — Aap Jahan Phal Wahan',
    client: 'YO Fruits',
    description: 'Brand campaign film',
    image: yt('fYH8UgqPaQQ'),
    href: 'https://www.youtube.com/watch?v=fYH8UgqPaQQ',
    external: true,
    tag: 'Ad Film',
  },
  {
    title: 'Mother Earth',
    client: 'Ricky Kej · Divine Tides',
    description: 'Grammy-winning album visuals',
    image: yt('QR56NkP3yaU'),
    href: 'https://www.youtube.com/watch?v=QR56NkP3yaU',
    external: true,
    tag: 'Music Video',
  },
]

export const SOCIALS_WORK: ServiceWorkItem[] = [
  {
    title: 'Brand Campaigns',
    description: 'Walkthrough films, hero campaigns & brand storytelling reels',
    image: '/images/socials/thumbnails/brand-campaigns.jpg',
    href: '/work/socials#brand-campaigns',
    tag: 'Campaigns',
  },
  {
    title: 'Performance Ads',
    description: 'ROI-focused Meta & Google campaigns across clients',
    image: '/images/socials/thumbnails/performance-ads.jpg',
    href: '/work/socials#performance-ads',
    tag: 'Paid Media',
  },
  {
    title: 'Influencer Marketing',
    description: 'Creator-led content across verticals',
    image: '/images/socials/thumbnails/influencer-marketing.jpg',
    href: '/work/socials#influencer-marketing',
    tag: 'Influencer',
  },
  {
    title: 'Social Media Reels',
    description: 'Scroll-stopping vertical content for IG, Shorts & beyond',
    image: '/images/socials/brand-campaigns/static-posts/anjani-scroll-1.webp',
    href: '/work/socials#reels',
    tag: 'Reels',
  },
  {
    title: 'Social Media Posts',
    description: 'Static creatives built for engagement and recall',
    image: '/images/socials/brand-campaigns/static-posts/best-of-both.webp',
    href: '/work/socials#posts',
    tag: 'Posts',
  },
]

export const DESIGNS_WORK: ServiceWorkItem[] = [
  {
    title: 'GK Builders & Developers',
    client: 'GK Builders',
    description: 'Premium real estate website with luxury villa showcases',
    image: '/images/designs/websites/screengrabs/gk-website/home-page.jpeg',
    href: '/work/designs/websites/gk-builders',
    tag: 'Website',
  },
  {
    title: 'Hotel Amaravathi',
    client: 'Amaravathi Hospitality',
    description: 'Hospitality site with booking integration',
    image: '/images/designs/websites/screengrabs/amaravathi/amaravathi-1.jpg',
    href: '/work/designs/websites/amaravathi',
    tag: 'Website',
  },
  {
    title: 'Digital Ad Creatives',
    description: 'Campaign creatives and ad posters across channels',
    image: '/images/designs/ad-posters/ad-creative_1-1.jpg',
    href: '/work/designs',
    tag: 'Digital',
  },
  {
    title: 'Offline & Print',
    description: 'Billboards, signboards and arch gates across projects',
    image: '/images/designs/offline/billboard-1.jpg',
    href: '/work/designs',
    tag: 'Print',
  },
  {
    title: 'Brand Identity & Logos',
    description: 'Identities built to last — logos designed with precision',
    image: '/images/designs/logos/bake-a-luru.jpg',
    href: '/work/socials#branding',
    tag: 'Branding',
  },
]

export const LABS_WORK: ServiceWorkItem[] = [
  {
    title: 'AI Avatar & Digital Twins',
    description: 'Autonomous virtual influencers and founder digital twins',
    image: '/images/labs/labs-project-founder-avatar.jpg',
    href: '/work/labs',
    tag: 'AI Avatar',
  },
  {
    title: 'AI Launch Trailers',
    description: 'Cinematic product trailers crafted with AI',
    image: '/images/labs/ai-launch-trailers.jpeg',
    href: '/work/labs',
    tag: 'AI Trailer',
  },
  {
    title: 'AI Commercials',
    description: 'Premium ads at startup speed — hyper-personalised at scale',
    image: '/images/labs/ai-commercials.jpeg',
    href: '/work/labs',
    tag: 'AI Ad',
  },
  {
    title: 'AI Motion Graphics',
    description: 'Kinetic typography & dynamic graphics in hours, not weeks',
    image: '/images/labs/labs-project-motion-graphics.jpg',
    href: '/work/labs',
    tag: 'AI Motion',
  },
  {
    title: 'AI Music Videos',
    description: 'Generative visual storytelling synced to rhythm',
    image: '/images/labs/labs-project-music-videos.jpg',
    href: '/work/labs',
    tag: 'AI Music',
  },
]

const POOLS: Record<WorkDepartment, ServiceWorkItem[]> = {
  films: FILMS_WORK,
  socials: SOCIALS_WORK,
  designs: DESIGNS_WORK,
  labs: LABS_WORK,
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-service "hero" picks — optional, appear before department pool items.
// Keep tight (2–3 items) for services that have a signature case study.
// ─────────────────────────────────────────────────────────────────────────────

export const serviceWork: Record<string, ServiceWorkItem[]> = {
  'feature-film-dop-bangalore': [
    {
      title: '777 Charlie',
      client: 'Paramvah Studios',
      description: 'Feature cinematography · 26M+ views',
      image: yt('REqFOV2A7sI'),
      href: 'https://www.youtube.com/watch?v=REqFOV2A7sI',
      external: true,
      tag: 'Feature Film',
    },
    {
      title: 'Gandhada Gudi',
      client: 'PRK Productions',
      description: 'Wildlife & landscape cinematography · 13M+ views',
      image: yt('UdPisHeGMQM'),
      href: 'https://www.youtube.com/watch?v=UdPisHeGMQM',
      external: true,
      tag: 'Feature Doc',
    },
  ],

  'feature-film-production-support-bangalore': [
    {
      title: 'Kantara',
      client: 'Hombale Films',
      description: '100M+ views — production support & editorial',
      image: yt('8mrVmf239GU'),
      href: 'https://www.youtube.com/watch?v=8mrVmf239GU',
      external: true,
      tag: 'Feature Film',
    },
  ],

  'film-editing-di-colour-grading-bangalore': [
    {
      title: 'Kantara',
      client: 'Hombale Films',
      description: 'Edit + DI on the 100M+ view blockbuster',
      image: yt('8mrVmf239GU'),
      href: 'https://www.youtube.com/watch?v=8mrVmf239GU',
      external: true,
      tag: 'Editing · DI',
    },
  ],

  'ad-film-production-bangalore': [
    {
      title: '#FindYourMatch',
      client: 'Flipkart × Sima Taparia',
      description: 'National campaign hero film',
      image: yt('a1P87WpuCM4'),
      href: 'https://www.youtube.com/watch?v=a1P87WpuCM4',
      external: true,
      tag: 'Commercial',
    },
    {
      title: 'Hangyo Ice Cream TVC',
      client: 'Hangyo',
      description: 'Multi-language television commercial',
      image: yt('fBkKkgfa5-0'),
      href: 'https://www.youtube.com/watch?v=fBkKkgfa5-0',
      external: true,
      tag: 'TVC',
    },
  ],

  'brand-film-production-bangalore': [
    {
      title: "A Dog's Hope",
      client: 'GK Builders',
      description: 'Emotive brand storytelling film',
      image: yt('MaAUPpTXbNs'),
      href: 'https://www.youtube.com/watch?v=MaAUPpTXbNs',
      external: true,
      tag: 'Brand Film',
    },
    {
      title: 'GK Hill View Villa',
      client: 'GK Builders',
      description: 'Cinematic property brand film',
      image: yt('AvUbojIz-f8'),
      href: 'https://www.youtube.com/watch?v=AvUbojIz-f8',
      external: true,
      tag: 'Brand Film',
    },
  ],

  'property-walkthrough-film-bangalore': [
    {
      title: 'GK Hill View Villa',
      client: 'GK Builders',
      description: 'Cinematic walkthrough film',
      image: yt('AvUbojIz-f8'),
      href: 'https://www.youtube.com/watch?v=AvUbojIz-f8',
      external: true,
      tag: 'Walkthrough',
    },
    {
      title: 'Anjani Lake Woods',
      client: 'GK Builders',
      description: 'Project launch walkthrough',
      image: yt('6Eq7L1wl1U8'),
      href: 'https://www.youtube.com/watch?v=6Eq7L1wl1U8',
      external: true,
      tag: 'Walkthrough',
    },
  ],

  'music-video-production-bangalore': [
    {
      title: 'Mother Earth',
      client: 'Ricky Kej · Divine Tides',
      description: 'Grammy-winning album visuals',
      image: yt('QR56NkP3yaU'),
      href: 'https://www.youtube.com/watch?v=QR56NkP3yaU',
      external: true,
      tag: 'Music Video',
    },
    {
      title: 'Alemaari',
      client: 'Raghu Dixit · Shakkar',
      description: 'Direction & cinematography',
      image: yt('RqLSlcm32WI'),
      href: 'https://www.youtube.com/watch?v=RqLSlcm32WI',
      external: true,
      tag: 'Music Video',
    },
  ],

  'documentary-production-bangalore': [
    {
      title: 'Gandhada Gudi',
      client: 'PRK Productions',
      description: 'Feature documentary · 13M+ views',
      image: yt('UdPisHeGMQM'),
      href: 'https://www.youtube.com/watch?v=UdPisHeGMQM',
      external: true,
      tag: 'Documentary',
    },
  ],

  'ai-music-video-bangalore': [
    {
      title: 'AI Music Videos',
      description: 'Generative visual storytelling synced to rhythm',
      image: '/images/labs/labs-project-music-videos.jpg',
      href: '/work/labs',
      tag: 'AI Music',
    },
  ],

  'ai-commercial-production-bangalore': [
    {
      title: 'AI Commercials',
      description: 'Premium ads at startup speed — hyper-personalised at scale',
      image: '/images/labs/ai-commercials.jpeg',
      href: '/work/labs',
      tag: 'AI Ad',
    },
  ],

  'ai-launch-trailer-bangalore': [
    {
      title: 'AI Launch Trailers',
      description: 'Cinematic product trailers crafted with AI',
      image: '/images/labs/ai-launch-trailers.jpeg',
      href: '/work/labs',
      tag: 'AI Trailer',
    },
  ],

  'ai-short-film-bangalore': [
    {
      title: 'AI Short Films',
      description: 'Short-form cinematic storytelling crafted with generative tools',
      image: '/images/labs/labs-project-short-films.jpg',
      href: '/work/labs',
      tag: 'AI Short',
    },
  ],

  'ai-visual-experiment-bangalore': [
    {
      title: 'AI Visual Experiments',
      description: 'Sandbox experiments pushing the boundary of generative visuals',
      image: '/images/labs/ai-visual-experiments.jpeg',
      href: '/work/labs',
      tag: 'AI Visual',
    },
  ],

  'ai-video-production-bangalore': [
    {
      title: 'AI Avatar & Digital Twins',
      description: 'Autonomous virtual influencers and founder digital twins',
      image: '/images/labs/labs-project-founder-avatar.jpg',
      href: '/work/labs',
      tag: 'AI Avatar',
    },
    {
      title: 'AI Launch Trailers',
      description: 'Cinematic product trailers crafted with AI',
      image: '/images/labs/ai-launch-trailers.jpeg',
      href: '/work/labs',
      tag: 'AI Trailer',
    },
    {
      title: 'AI Commercials',
      description: 'Premium ads at startup speed — hyper-personalised at scale',
      image: '/images/labs/ai-commercials.jpeg',
      href: '/work/labs',
      tag: 'AI Ad',
    },
    {
      title: 'AI Motion Graphics',
      description: 'Kinetic typography & dynamic graphics in hours, not weeks',
      image: '/images/labs/labs-project-motion-graphics.jpg',
      href: '/work/labs',
      tag: 'AI Motion',
    },
    {
      title: 'AI Music Videos',
      description: 'Generative visual storytelling synced to rhythm',
      image: '/images/labs/labs-project-music-videos.jpg',
      href: '/work/labs',
      tag: 'AI Music',
    },
  ],

  // Socials — narrow services each get one curated card from SOCIALS_WORK
  'brand-campaign-agency-bangalore': [
    {
      title: 'Brand Campaigns',
      description: 'Walkthrough films, hero campaigns & brand storytelling reels',
      image: '/images/socials/thumbnails/brand-campaigns.jpg',
      href: '/work/socials#brand-campaigns',
      tag: 'Campaigns',
    },
  ],

  'performance-marketing-agency-bangalore': [
    {
      title: 'Performance Ads',
      description: 'ROI-focused Meta & Google campaigns across clients',
      image: '/images/socials/thumbnails/performance-ads.jpg',
      href: '/work/socials#performance-ads',
      tag: 'Paid Media',
    },
  ],

  'paid-media-strategy-bangalore': [
    {
      title: 'Performance Ads',
      description: 'ROI-focused Meta & Google campaigns across clients',
      image: '/images/socials/thumbnails/performance-ads.jpg',
      href: '/work/socials#performance-ads',
      tag: 'Paid Media',
    },
  ],

  'influencer-marketing-agency-bangalore': [
    {
      title: 'Influencer Marketing',
      description: 'Creator-led content across verticals',
      image: '/images/socials/thumbnails/influencer-marketing.jpg',
      href: '/work/socials#influencer-marketing',
      tag: 'Influencer',
    },
  ],

  'campaign-planning-bangalore': [
    {
      title: 'Brand Campaigns',
      description: 'Walkthrough films, hero campaigns & brand storytelling reels',
      image: '/images/socials/thumbnails/brand-campaigns.jpg',
      href: '/work/socials#brand-campaigns',
      tag: 'Campaigns',
    },
  ],

  'founder-branding-agency-bangalore': [
    {
      title: 'Influencer Marketing',
      description: 'Founder-led content that builds authority',
      image: '/images/socials/thumbnails/influencer-marketing.jpg',
      href: '/work/socials#influencer-marketing',
      tag: 'Founder',
    },
    {
      title: 'Brand Identity & Logos',
      description: 'Identities built to last — logos designed with precision',
      image: '/images/designs/logos/bake-a-luru.jpg',
      href: '/work/socials#branding',
      tag: 'Branding',
    },
  ],

  // Designs — narrow services with specific hero items
  'brand-identity-design-bangalore': [
    {
      title: 'Brand Identity & Logos',
      description: 'Identities built to last — logos designed with precision',
      image: '/images/designs/logos/bake-a-luru.jpg',
      href: '/work/socials#branding',
      tag: 'Branding',
    },
  ],

  'social-media-design-bangalore': [
    {
      title: 'Social Media Posts',
      description: 'Static creatives built for engagement and recall',
      image: '/images/socials/brand-campaigns/static-posts/best-of-both.webp',
      href: '/work/socials#posts',
      tag: 'Posts',
    },
    {
      title: 'Social Media Reels',
      description: 'Scroll-stopping vertical content for IG, Shorts & beyond',
      image: '/images/socials/brand-campaigns/static-posts/anjani-scroll-1.webp',
      href: '/work/socials#reels',
      tag: 'Reels',
    },
  ],

  'motion-design-bangalore': [
    {
      title: 'AI Motion Graphics',
      description: 'Kinetic typography & dynamic graphics at studio polish',
      image: '/images/labs/labs-project-motion-graphics.jpg',
      href: '/work/labs',
      tag: 'Motion',
    },
  ],

  // AI Marketing Automation — not shipped case studies, but a capability
  // matrix. Each card describes an automation we plug into growth stacks
  // and links to /contact#book-call so prospects can scope their own build.
  'ai-marketing-automation-bangalore': [
    {
      title: 'WhatsApp Lead Automation',
      client: 'GK Builders',
      description:
        'Auto-qualify inbound leads, route hot prospects to sales instantly and nurture the rest with AI-personalised drip flows on WhatsApp.',
      image: '/images/labs/labs-workflow-automation.jpg',
      href: '/contact#book-call',
      tag: 'WhatsApp',
    },
    {
      title: 'Meta & Google Ads — Real-Time AI Optimisation',
      description:
        'AI agents that watch every campaign hourly, kill losers, scale winners and reallocate budget across Meta, Google and YouTube without human lag.',
      image: '/images/labs/labs-genai-marketing.jpg',
      href: '/contact#book-call',
      tag: 'Paid Media',
    },
    {
      title: 'Live Ad Creative Testing',
      description:
        'Ship dozens of creative variants at once, let AI benchmark CTR, CPL and hook-rate in real time, and auto-promote the winners — no manual review cycles.',
      image: '/images/labs/ai-commercials.jpeg',
      href: '/contact#book-call',
      tag: 'Creative Testing',
    },
    {
      title: 'CRM Automations & Integrations',
      description:
        'Zoho, HubSpot, Salesforce, Kylas — we wire lead capture, scoring, stage movement and follow-up sequences end-to-end so nothing falls through the cracks.',
      image: '/images/labs/labs-custom-llm.jpg',
      href: '/contact#book-call',
      tag: 'CRM',
    },
    {
      title: 'AI Reporting & Dashboards',
      description:
        'One live dashboard across ads, CRM, WhatsApp and site analytics — with AI narratives that explain what moved and what to do next.',
      image: '/images/labs/labs-vision-applications.jpg',
      href: '/contact#book-call',
      tag: 'Reporting',
    },
    {
      title: 'Content & Campaign Ops',
      description:
        'AI-assisted brief → copy → creative → schedule pipelines that turn a single idea into a full multi-platform rollout in hours, not weeks.',
      image: '/images/labs/labs-project-motion-graphics.jpg',
      href: '/contact#book-call',
      tag: 'Content Ops',
    },
  ],

  'website-design-agency-bangalore': [
    {
      title: 'GK Builders & Developers',
      client: 'GK Builders',
      description: 'Premium real estate website with luxury villa showcases',
      image: '/images/designs/websites/screengrabs/gk-website/home-page.jpeg',
      href: '/work/designs/websites/gk-builders',
      tag: 'Website',
    },
    {
      title: 'Hotel Amaravathi',
      client: 'Amaravathi Hospitality',
      description: 'Hospitality site with booking integration',
      image: '/images/designs/websites/screengrabs/amaravathi/amaravathi-1.jpg',
      href: '/work/designs/websites/amaravathi',
      tag: 'Website',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Service slug → department pools to append. Every service should appear here
// (even films services get socials/designs where relevant, so clients see the
// full Dark Bird stack behind a single service).
// ─────────────────────────────────────────────────────────────────────────────

// Narrow services rely exclusively on their curated hero list above so they
// only surface work that genuinely represents the service. Broad services
// that cover a whole department (e.g. Social Media Marketing) still append a
// single matching pool. Missing entries default to [] and hide the section.
const serviceDepartments: Record<string, WorkDepartment[]> = {
  // Films — every film service is a specific sub-craft, hero items only
  'feature-film-dop-bangalore': [],
  'feature-film-production-support-bangalore': [],
  'film-editing-di-colour-grading-bangalore': [],
  'vfx-services-bangalore': [],
  'ad-film-production-bangalore': [],
  'brand-film-production-bangalore': [],
  'corporate-video-production-bangalore': [],
  'product-video-production-bangalore': [],
  'music-video-production-bangalore': [],
  'documentary-production-bangalore': [],
  'property-walkthrough-film-bangalore': [],
  'founder-story-video-bangalore': [],

  // Socials — only Social Media Marketing and Management are broad enough
  // to show the full socials pool. Every other service narrows to its hero.
  'social-media-marketing-agency-bangalore': ['socials'],
  'social-media-management-bangalore': ['socials'],
  'brand-campaign-agency-bangalore': [],
  'performance-marketing-agency-bangalore': [],
  'influencer-marketing-agency-bangalore': [],
  'paid-media-strategy-bangalore': [],
  'campaign-planning-bangalore': [],
  'founder-branding-agency-bangalore': [],
  'ai-digital-marketing-bangalore': ['socials'],

  // Designs — each service is a specific craft, hero items only
  'website-design-agency-bangalore': [],
  'brand-identity-design-bangalore': [],
  'social-media-design-bangalore': [],
  '3d-modelling-bangalore': [],
  'motion-design-bangalore': [],
  'whatsapp-sticker-design-bangalore': [],

  // Labs — AI Video Production is the only broad labs service; every other
  // sub-service is a specific format with its own curated hero entry.
  'ai-video-production-bangalore': [],
  'ai-short-film-bangalore': [],
  'ai-commercial-production-bangalore': [],
  'ai-launch-trailer-bangalore': [],
  'ai-music-video-bangalore': [],
  'ai-visual-experiment-bangalore': [],
  'ai-marketing-automation-bangalore': [],
}

const MAX_ITEMS = 12

function mergeAndDedupe(
  hero: ServiceWorkItem[],
  depts: WorkDepartment[],
): ServiceWorkItem[] {
  const seen = new Set<string>()
  const result: ServiceWorkItem[] = []
  const push = (item: ServiceWorkItem) => {
    const key = `${item.title}|${item.href}`
    if (seen.has(key)) return
    seen.add(key)
    result.push(item)
  }
  hero.forEach(push)
  depts.forEach((d) => POOLS[d].forEach(push))
  return result.slice(0, MAX_ITEMS)
}

export function getServiceWork(slug: string): ServiceWorkItem[] {
  const hero = serviceWork[slug] ?? []
  const depts = serviceDepartments[slug] ?? []
  return mergeAndDedupe(hero, depts)
}

// Optional per-service override for the work section headings. Used when a
// service is better presented as a capability matrix rather than a shipped
// portfolio (e.g. AI Marketing Automation).
export type ServiceWorkHeading = {
  kicker: string
  title: string
  hideSeeAll?: boolean
}

const serviceWorkHeadings: Record<string, ServiceWorkHeading> = {
  'ai-marketing-automation-bangalore': {
    kicker: '( What we automate )',
    title: 'Automations that earn their keep.',
    hideSeeAll: true,
  },
}

export function getServiceWorkHeading(slug: string): ServiceWorkHeading | null {
  return serviceWorkHeadings[slug] ?? null
}

// ─────────────────────────────────────────────────────────────────────────────
// Industry slug → curated work. Unlike services (which can showcase the full
// Dark Bird stack), industry pages must only show work actually done for that
// vertical. We hand-curate each industry — no department pool fallback.
// Industries with no shipped work in the vertical simply hide the section.
// ─────────────────────────────────────────────────────────────────────────────

const industryWorkMap: Record<string, ServiceWorkItem[]> = {
  'real-estate-video-production-bangalore': [
    {
      title: 'GK Hill View Villa',
      client: 'GK Builders',
      description: 'Cinematic property walkthrough film',
      image: yt('AvUbojIz-f8'),
      href: 'https://www.youtube.com/watch?v=AvUbojIz-f8',
      external: true,
      tag: 'Walkthrough',
    },
    {
      title: 'Anjani Lake Woods',
      client: 'GK Builders',
      description: 'Project launch walkthrough',
      image: yt('6Eq7L1wl1U8'),
      href: 'https://www.youtube.com/watch?v=6Eq7L1wl1U8',
      external: true,
      tag: 'Walkthrough',
    },
    {
      title: "A Dog's Hope",
      client: 'GK Builders',
      description: 'Emotive brand storytelling film',
      image: yt('MaAUPpTXbNs'),
      href: 'https://www.youtube.com/watch?v=MaAUPpTXbNs',
      external: true,
      tag: 'Brand Film',
    },
    {
      title: 'GK Builders Website',
      client: 'GK Builders',
      description: 'Premium real estate website with luxury villa showcases',
      image: '/images/designs/websites/screengrabs/gk-website/home-page.jpeg',
      href: '/work/designs/websites/gk-builders',
      tag: 'Website',
    },
    {
      title: 'Anjani Lake Woods — Performance Ads',
      client: 'GK Builders',
      description: 'Always-on Meta & Google ad campaign — 5 lead-gen creatives',
      image: '/images/socials/performance-ads/SP_1.png',
      href: '/work/socials#performance-ads',
      tag: 'Paid Media',
    },
    {
      title: 'GK Builders — Influencer Marketing',
      client: 'GK Builders',
      description: '28 creator collaborations across projects',
      image: '/images/socials/thumbnails/influencer-marketing.jpg',
      href: '/work/socials#influencer-marketing',
      tag: 'Influencer',
    },
    {
      title: 'GK Builders — Social Reels',
      client: 'GK Builders',
      description: 'Scroll-stopping vertical content across projects',
      image: '/images/socials/brand-campaigns/static-posts/anjani-scroll-1.webp',
      href: '/work/socials#reels',
      tag: 'Reels',
    },
    {
      title: 'GK Builders — Social Posts',
      client: 'GK Builders',
      description: 'Static creatives built for engagement',
      image: '/images/socials/brand-campaigns/static-posts/best-of-both.webp',
      href: '/work/socials#posts',
      tag: 'Posts',
    },
    {
      title: 'GK Builders — Offline & Print',
      client: 'GK Builders',
      description: 'Billboards, signboards and arch gates across projects',
      image: '/images/designs/offline/billboard-1.jpg',
      href: '/work/designs',
      tag: 'Print',
    },
  ],

  'ecommerce-video-production-bangalore': [
    {
      title: 'YO Fruits — Aap Jahan Phal Wahan',
      client: 'YO Fruits',
      description: 'E-commerce brand campaign film',
      image: yt('fYH8UgqPaQQ'),
      href: 'https://www.youtube.com/watch?v=fYH8UgqPaQQ',
      external: true,
      tag: 'Ad Film',
    },
    {
      title: 'Hangyo Ice Cream TVC',
      client: 'Hangyo',
      description: 'Multi-language DTC television commercial',
      image: yt('fBkKkgfa5-0'),
      href: 'https://www.youtube.com/watch?v=fBkKkgfa5-0',
      external: true,
      tag: 'TVC',
    },
  ],

  'restaurant-food-marketing-bangalore': [
    {
      title: 'YO Fruits — Aap Jahan Phal Wahan',
      client: 'YO Fruits',
      description: 'Fresh-food brand campaign film',
      image: yt('fYH8UgqPaQQ'),
      href: 'https://www.youtube.com/watch?v=fYH8UgqPaQQ',
      external: true,
      tag: 'Ad Film',
    },
    {
      title: 'Hangyo Ice Cream TVC',
      client: 'Hangyo',
      description: 'Multi-language television commercial',
      image: yt('fBkKkgfa5-0'),
      href: 'https://www.youtube.com/watch?v=fBkKkgfa5-0',
      external: true,
      tag: 'TVC',
    },
  ],

  'interior-design-marketing-bangalore': [
    {
      title: 'GK Hill View Villa',
      client: 'GK Builders',
      description: 'Cinematic interior showcase film',
      image: yt('AvUbojIz-f8'),
      href: 'https://www.youtube.com/watch?v=AvUbojIz-f8',
      external: true,
      tag: 'Walkthrough',
    },
    {
      title: 'Hotel Amaravathi',
      client: 'Amaravathi Hospitality',
      description: 'Hospitality interior & brand website',
      image: '/images/designs/websites/screengrabs/amaravathi/amaravathi-1.jpg',
      href: '/work/designs/websites/amaravathi',
      tag: 'Website',
    },
  ],

  // Industries without shipped work in-vertical — section stays hidden.
  'healthcare-marketing-bangalore': [],
  'pharma-marketing-bangalore': [],
  'ca-finance-marketing-bangalore': [],
  'law-firm-marketing-bangalore': [],
  'edtech-education-marketing-bangalore': [],
}

export function getIndustryWork(slug: string): ServiceWorkItem[] {
  return (industryWorkMap[slug] ?? []).slice(0, MAX_ITEMS)
}
