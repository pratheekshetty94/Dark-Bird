import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { type ServiceCategory } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Services | Dark Bird Films Bangalore',
  description:
    'Film production, performance marketing, brand identity, website design and AI video — from a 9-year film studio in Bangalore. One team, four divisions.',
  alternates: { canonical: 'https://darkbirdfilms.com/services' },
  openGraph: {
    title: 'Services | Dark Bird Films',
    description:
      'Film production, performance marketing, design and AI video from a 9-year film studio in Bangalore.',
    url: 'https://darkbirdfilms.com/services',
  },
}

type ServiceItem = {
  label: string
  slug?: string // If present, links to /services/[slug]. Otherwise renders as plain bullet.
}

type Division = {
  number: string
  category: ServiceCategory
  name: string
  tagline: string
  description: string
  href: string
  video: string
  services: ServiceItem[]
}

// Division service lists are the source of truth for /services.
// `slug` cross-references lib/services.ts for items with a dedicated detail page.
// Items without `slug` are shown as plain bullets (same as /work page).
const divisions: Division[] = [
  {
    number: '01',
    category: 'Films',
    name: 'Dark Bird Films',
    tagline: 'This is where it all begins — with cinema.',
    description:
      'Feature films, ad films, brand films, music videos and the crafts that make them — DOP, editing, DI and VFX. Nine years of feature-grade storytelling applied to every project.',
    href: '/work/films',
    video: '/videos/films-loop.mp4',
    services: [
      { label: 'Feature Film Production & Support' },
      { label: 'Feature Film Cinematography (DOP)', slug: 'feature-film-dop-bangalore' },
      { label: 'Film Editing, DI & Colour Grading', slug: 'film-editing-di-colour-grading-bangalore' },
      { label: 'VFX & Visual Effects', slug: 'vfx-services-bangalore' },
      { label: 'Ad Films & Commercials', slug: 'ad-film-production-bangalore' },
      { label: 'Brand & Campaign Films', slug: 'brand-film-production-bangalore' },
      { label: 'Corporate Videos', slug: 'corporate-video-production-bangalore' },
      { label: 'Product & Launch Videos', slug: 'product-video-production-bangalore' },
      { label: 'Music Videos', slug: 'music-video-production-bangalore' },
      { label: 'Property Walkthrough Films' },
      { label: 'Documentaries' },
      { label: 'Founder Stories' },
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
      { label: 'Performance Marketing', slug: 'performance-marketing-agency-bangalore' },
      { label: 'Social Media Marketing', slug: 'social-media-marketing-agency-bangalore' },
      { label: 'Influencer Marketing' },
      { label: 'Paid Media Strategy' },
      { label: 'Founder Branding & Social Presence' },
      { label: 'Social Media Management & Community Growth' },
      { label: 'Campaign Planning & Execution' },
      { label: 'AI Digital Marketing' },
      { label: 'Real Estate Digital Marketing' },
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
      { label: 'Social Media Templates & Illustrations' },
      { label: '3D Modelling' },
      { label: 'Motion Design & Short-Form Animations' },
      { label: 'WhatsApp Stickers & Digital Swag' },
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
      { label: 'AI Short Films' },
      { label: 'AI Commercials & Concept Films' },
      { label: 'AI Launch Trailers' },
      { label: 'AI Music Videos' },
      { label: 'AI-Generated Visual Experiments' },
      { label: 'Marketing Automation & AI Agents' },
    ],
  },
]

export default function ServicesHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-40 pb-24 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #E85A3F 0%, transparent 60%)',
          }}
        />
        <div className="container-content relative z-10">
          <div className="max-w-4xl">
            <ScrollReveal>
              <span className="label-parenthetical">Services</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-hero text-cream mt-6 mb-8">
                One team. Four divisions. Every craft a brand <em className="text-accent">needs</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-lg text-silver max-w-3xl">
                Dark Bird is a nine-year film studio in Bangalore. We write, direct,
                shoot, edit, grade, design and run performance under one roof — so the
                story holds from hero film to homepage to the last ad cut.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divisions with loop videos + linked services */}
      {divisions.map((division, index) => {
        const isEven = index % 2 === 0
        return (
          <section
            key={division.number}
            className={cn(
              'py-24 md:py-32 relative overflow-hidden',
              isEven ? 'section-dark' : 'section-light'
            )}
          >
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                background: isEven
                  ? 'radial-gradient(ellipse at 20% 50%, #E85A3F 0%, transparent 50%)'
                  : 'radial-gradient(ellipse at 80% 50%, #E85A3F 0%, transparent 50%)',
              }}
            />

            <div className="container-content relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                {/* Text + Services Grid */}
                <div className={cn('lg:col-span-6', !isEven && 'lg:order-2')}>
                  <ScrollReveal>
                    <span
                      className={cn(
                        'font-display text-[120px] md:text-[160px] leading-none block',
                        isEven ? 'text-accent/10' : 'text-accent/20'
                      )}
                    >
                      {division.number}
                    </span>
                  </ScrollReveal>

                  <ScrollReveal delay={0.1}>
                    <h2
                      className={cn(
                        'font-display text-display -mt-12 mb-4',
                        isEven ? 'text-cream' : 'text-ink'
                      )}
                    >
                      {division.name}
                    </h2>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <p className="text-xl text-accent font-display italic mb-6">
                      {division.tagline}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <p className={cn('text-body mb-10', isEven ? 'text-silver' : 'text-stone')}>
                      {division.description}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.4}>
                    <div className="mb-10">
                      <h3
                        className={cn(
                          'font-mono text-label uppercase tracking-wider mb-4',
                          isEven ? 'text-warm-gray' : 'text-stone'
                        )}
                      >
                        Services we offer:
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {division.services.map((service) => {
                          const rowClass = cn(
                            'group flex items-start justify-between gap-3 py-2 px-3 -mx-3 rounded-lg text-sm transition-colors',
                            isEven
                              ? 'text-silver hover:bg-cream/5 hover:text-cream'
                              : 'text-stone hover:bg-ink/5 hover:text-ink'
                          )
                          const content = (
                            <>
                              <span className="flex items-start gap-3">
                                <span className="text-accent mt-0.5">•</span>
                                <span className={service.slug ? 'group-hover:text-accent transition-colors' : ''}>
                                  {service.label}
                                </span>
                              </span>
                              {service.slug && (
                                <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                              )}
                            </>
                          )
                          return (
                            <li key={service.label}>
                              {service.slug ? (
                                <Link href={`/services/${service.slug}`} className={rowClass}>
                                  {content}
                                </Link>
                              ) : (
                                <div className={cn(rowClass, 'cursor-default')}>{content}</div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.5}>
                    <Link
                      href={division.href}
                      className="group inline-flex items-center gap-3 text-accent font-medium hover:gap-4 transition-all"
                    >
                      See {division.category} Work
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </ScrollReveal>
                </div>

                {/* Loop video */}
                <div className={cn('lg:col-span-6', !isEven && 'lg:order-1')}>
                  <ScrollReveal delay={0.2} x={isEven ? 30 : -30} y={0}>
                    <div className="aspect-video bg-charcoal rounded-2xl overflow-hidden relative group">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={division.video} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-colors" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <CTABand
        headline="Start a Project"
        description="Tell us what you're building and we'll map the right craft, scope and team — on a 20-minute discovery call."
        buttonText="Book a Discovery Call"
        buttonHref="/contact#book-call"
        variant="accent"
      />
    </>
  )
}
