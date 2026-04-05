import { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveServiceItemHref, type DivisionServiceItem } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Our Services | Film Production, Marketing, Design & AI Content',
  description: 'Explore Dark Bird Films\' services: Film production, social media marketing, brand design & AI-powered content. Ad films, music videos, influencer marketing, motion graphics & VFX.',
  keywords: [
    'film production services india', 'video production services bengaluru',
    'marketing agency services', 'brand design services india',
    'AI content creation services', 'production house services',
    'dark bird films services', 'creative agency india services',
  ],
  openGraph: {
    title: 'Our Services | Dark Bird Films',
    description: 'Films, Socials, Designs & Labs — everything your brand needs under one roof.',
    url: 'https://darkbirdfilms.com/work',
    type: 'website',
  },
  alternates: {
    canonical: 'https://darkbirdfilms.com/work',
  },
}

type DivisionCard = {
  number: string
  name: string
  tagline: string
  description: string
  services: DivisionServiceItem[]
  href: string
  video: string
}

const divisions: DivisionCard[] = [
  {
    number: '01',
    name: 'Dark Bird Films',
    tagline: 'This is where it all begins with cinema.',
    description: 'We approach every project like a film: with emotion, detail, and a strong sense of purpose. From the first idea to the final cut, we make sure your story doesn\'t just look good — it leaves an impact.',
    services: [
      { label: 'Feature Film Production & Support', slug: 'feature-film-production-support-bangalore' },
      { label: 'Ad Films & Commercials', slug: 'ad-film-production-bangalore' },
      { label: 'Music Videos', slug: 'music-video-production-bangalore' },
      { label: 'Property Walkthrough Films', slug: 'property-walkthrough-film-bangalore' },
      { label: 'Brand & Campaign Films', slug: 'brand-film-production-bangalore' },
      { label: 'Documentaries', slug: 'documentary-production-bangalore' },
      { label: 'Product & Launch Videos', slug: 'product-video-production-bangalore' },
      { label: 'Founder Stories', slug: 'founder-story-video-bangalore' },
    ],
    href: '/filmography',
    video: '/videos/films-loop.mp4',
  },
  {
    number: '02',
    name: 'Dark Bird Socials',
    tagline: 'Because today, your audience lives online.',
    description: 'We help brands show up, stand out, and stay relevant across every digital platform. Whether it\'s building a voice, growing a presence, or running performance campaigns, we make sure your brand feels human and performs smart.',
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
    href: '/work/socials',
    video: '/videos/socials-loop.mp4',
  },
  {
    number: '03',
    name: 'Dark Bird Designs',
    tagline: 'We design experiences that are clean, cinematic, and meaningful.',
    description: 'So your brand feels complete and consistent everywhere it appears. Design should look incredible and perform even better.',
    services: [
      { label: 'Website & Landing Page Design', slug: 'website-design-agency-bangalore' },
      { label: 'Brand Identity & Visual Kits', slug: 'brand-identity-design-bangalore' },
      { label: 'Social Media Templates & Illustrations', slug: 'social-media-design-bangalore' },
      { label: '3D Modelling', slug: '3d-modelling-bangalore' },
      { label: 'WhatsApp Stickers & Digital Swag', slug: 'whatsapp-sticker-design-bangalore' },
      { label: 'Motion Design & Short-Form Animations', slug: 'motion-design-bangalore' },
    ],
    href: '/work/designs',
    video: '/videos/designs-loop.mp4',
  },
  {
    number: '04',
    name: 'Dark Bird Labs',
    tagline: 'Our sandbox for the future of film.',
    description: 'We explore AI as a creative partner — crafting films, commercials, and visuals that feel impossible, immersive, and unmistakably cinematic.',
    services: [
      { label: 'AI Short Films', slug: 'ai-short-film-bangalore' },
      { label: 'AI Commercials & Concept Films', slug: 'ai-commercial-production-bangalore' },
      { label: 'AI Launch Trailers', slug: 'ai-launch-trailer-bangalore' },
      { label: 'AI Music Videos', slug: 'ai-music-video-bangalore' },
      { label: 'AI-Generated Visual Experiments', slug: 'ai-visual-experiment-bangalore' },
      { label: 'Marketing Automation & AI Agents', slug: 'ai-marketing-automation-bangalore' },
    ],
    href: '/work/labs',
    video: '/videos/labs-loop.mp4',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-40 pb-24 relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #E85A3F 0%, transparent 60%)',
          }}
        />

        <div className="container-content relative z-10">
          <div className="max-w-4xl">
            <ScrollReveal>
              <span className="label-parenthetical">Our Services</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-hero text-cream mt-6 mb-8">
                Here's everything we can do for <em className="text-accent">you</em>.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-lg text-silver max-w-3xl">
                At Dark Bird, we don't simply provide services — we shape narratives,
                identities, and campaigns that move people and drive results. Every film
                we produce, every digital strategy we build, and every design we deliver
                is created with intention and expertise.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divisions */}
      {divisions.map((division, index) => (
        <section
          key={division.number}
          className={cn(
            'py-24 md:py-32 relative overflow-hidden',
            index % 2 === 0 ? 'section-dark' : 'section-light'
          )}
        >
          {/* Background accent */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: index % 2 === 0
                ? 'radial-gradient(ellipse at 20% 50%, #E85A3F 0%, transparent 50%)'
                : 'radial-gradient(ellipse at 80% 50%, #E85A3F 0%, transparent 50%)',
            }}
          />

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
              {/* Text Content */}
              <div className={cn(
                "lg:col-span-6",
                index % 2 === 1 ? 'lg:order-2' : ''
              )}>
                <ScrollReveal>
                  <span className={cn(
                    "font-display text-[120px] md:text-[160px] leading-none",
                    index % 2 === 0 ? 'text-accent/10' : 'text-accent/20'
                  )}>
                    {division.number}
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h2 className={cn(
                    "font-display text-display -mt-12 mb-4",
                    index % 2 === 0 ? 'text-cream' : 'text-ink'
                  )}>
                    {division.name}
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-xl text-accent font-display italic mb-6">
                    {division.tagline}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p className={cn(
                    "text-body mb-10",
                    index % 2 === 0 ? 'text-silver' : 'text-stone'
                  )}>
                    {division.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div className="mb-10">
                    <h3 className={cn(
                      "font-mono text-label uppercase tracking-wider mb-4",
                      index % 2 === 0 ? 'text-warm-gray' : 'text-stone'
                    )}>
                      We Create:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {division.services.map((service) => {
                        const href = resolveServiceItemHref(service, division.href)
                        return (
                          <li key={service.label}>
                            <Link
                              href={href}
                              className={cn(
                                "group/item flex items-start gap-3 text-sm rounded-md px-2 py-1.5 -mx-2 transition-colors",
                                index % 2 === 0
                                  ? 'text-silver hover:bg-white/[0.04] hover:text-cream'
                                  : 'text-stone hover:bg-ink/[0.04] hover:text-ink'
                              )}
                            >
                              <span className="text-accent mt-1">•</span>
                              <span className="flex-1">{service.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 mt-1 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-accent" />
                            </Link>
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
                    View Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </ScrollReveal>
              </div>

              {/* Video/Visual Placeholder */}
              <div className={cn(
                "lg:col-span-6",
                index % 2 === 1 ? 'lg:order-1' : ''
              )}>
                <ScrollReveal delay={0.2} x={index % 2 === 0 ? 30 : -30} y={0}>
                  <div className="aspect-video bg-charcoal rounded-2xl overflow-hidden relative group">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={division.video} type="video/mp4" />
                    </video>
                    {/* Border on hover */}
                    <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-colors" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <CTABand
        headline="Let's Build Something Together"
        description="Ready to bring your vision to life? Let's talk about your project."
        buttonText="Get Started"
        buttonHref="/contact"
        variant="accent"
      />
    </>
  )
}
