import { type ServiceCategory } from '@/lib/services'

// A single offering in a division's service list. Link priority when resolving
// the item's href (used by the /services hub and the navbar Services flyout):
//   1. `slug`        — a dedicated /services/[slug] SEO landing page
//   2. `workHref`    — an existing /work/* case-study or /industries/* vertical
//                      page that is the closest content match
//   3. division.href — the parent department /work/* page as a final fallback
// Every item ends up clickable.
export type DivisionServiceItem = {
  label: string
  slug?: string
  workHref?: string
}

// Resolve the canonical href for a division service item.
export function resolveServiceItemHref(
  item: DivisionServiceItem,
  divisionHref: string
): string {
  if (item.slug) return `/services/${item.slug}`
  if (item.workHref) return item.workHref
  return divisionHref
}

export type Division = {
  number: string
  category: ServiceCategory
  name: string
  tagline: string
  description: string
  href: string // link to the department's /work page
  video: string
  services: DivisionServiceItem[]
}

// Source of truth for every service the studio offers. Consumed by:
// - app/services/page.tsx (the /services hub with loop videos)
// - components/layout/Navbar.tsx (desktop mega flyout + mobile accordion)
export const divisions: Division[] = [
  {
    number: '01',
    category: 'Films',
    name: 'Dark Bird Films',
    tagline: 'This is where it all begins — with cinema.',
    description:
      'Feature films, ad films, brand films, music videos and the crafts that make them — DOP, editing, DI and VFX. Nine years of feature-grade storytelling applied to every project.',
    href: '/filmography',
    video: '/videos/films-loop.mp4',
    services: [
      { label: 'Feature Film Production & Support', slug: 'feature-film-production-support-bangalore' },
      { label: 'Feature Film Cinematography (DOP)', slug: 'feature-film-dop-bangalore' },
      { label: 'Film Editing, DI & Colour Grading', slug: 'film-editing-di-colour-grading-bangalore' },
      { label: 'VFX & Visual Effects', slug: 'vfx-services-bangalore' },
      { label: 'Ad Films & Commercials', slug: 'ad-film-production-bangalore' },
      { label: 'Brand & Campaign Films', slug: 'brand-film-production-bangalore' },
      { label: 'Corporate Videos', slug: 'corporate-video-production-bangalore' },
      { label: 'Product & Launch Videos', slug: 'product-video-production-bangalore' },
      { label: 'Music Videos', slug: 'music-video-production-bangalore' },
      { label: 'Property Walkthrough Films', slug: 'property-walkthrough-film-bangalore' },
      { label: 'Documentaries', slug: 'documentary-production-bangalore' },
      { label: 'Founder Stories', slug: 'founder-story-video-bangalore' },
    ],
  },
  {
    number: '02',
    category: 'Socials',
    name: 'Dark Bird Socials',
    tagline: 'Because today, your audience lives online.',
    description:
      'We help brands show up, stand out and stay relevant across every digital platform. Building a voice, growing a presence and running performance campaigns that feel human and perform smart.',
    href: '/work/socials',
    video: '/videos/socials-loop.mp4',
    services: [
      { label: 'Brand Campaigns', slug: 'brand-campaign-agency-bangalore' },
      { label: 'Performance Marketing', slug: 'performance-marketing-agency-bangalore' },
      { label: 'Social Media Marketing', slug: 'social-media-marketing-agency-bangalore' },
      { label: 'Influencer Marketing', slug: 'influencer-marketing-agency-bangalore' },
      { label: 'Paid Media Strategy', slug: 'paid-media-strategy-bangalore' },
      { label: 'Founder Branding & Social Presence', slug: 'founder-branding-agency-bangalore' },
      { label: 'Social Media Management & Community Growth', slug: 'social-media-management-bangalore' },
      { label: 'Campaign Planning & Execution', slug: 'campaign-planning-bangalore' },
      { label: 'AI Digital Marketing', slug: 'ai-digital-marketing-bangalore' },
    ],
  },
  {
    number: '03',
    category: 'Designs',
    name: 'Dark Bird Designs',
    tagline: 'We design experiences that are clean, cinematic and meaningful.',
    description:
      'Brand identity, websites and editorial design that match the production value of the films. Design that looks incredible and performs even better.',
    href: '/work/designs',
    video: '/videos/designs-loop.mp4',
    services: [
      { label: 'Website & Landing Page Design', slug: 'website-design-agency-bangalore' },
      { label: 'Brand Identity & Visual Kits', slug: 'brand-identity-design-bangalore' },
      { label: 'Social Media Templates & Illustrations', slug: 'social-media-design-bangalore' },
      { label: '3D Modelling', slug: '3d-modelling-bangalore' },
      { label: 'Motion Design & Short-Form Animations', slug: 'motion-design-bangalore' },
      { label: 'WhatsApp Stickers & Digital Swag', slug: 'whatsapp-sticker-design-bangalore' },
    ],
  },
  {
    number: '04',
    category: 'Labs',
    name: 'Dark Bird Labs',
    tagline: 'Our sandbox for the future of film.',
    description:
      'We explore AI as a creative partner — crafting films, commercials and visuals that feel impossible, immersive and unmistakably cinematic. Directed, not prompted.',
    href: '/work/labs',
    video: '/videos/labs-loop.mp4',
    services: [
      { label: 'AI Video Production', slug: 'ai-video-production-bangalore' },
      { label: 'AI Short Films', slug: 'ai-short-film-bangalore' },
      { label: 'AI Commercials & Concept Films', slug: 'ai-commercial-production-bangalore' },
      { label: 'AI Launch Trailers', slug: 'ai-launch-trailer-bangalore' },
      { label: 'AI Music Videos', slug: 'ai-music-video-bangalore' },
      { label: 'AI-Generated Visual Experiments', slug: 'ai-visual-experiment-bangalore' },
      { label: 'Marketing Automation & AI Agents', slug: 'ai-marketing-automation-bangalore' },
    ],
  },
]
