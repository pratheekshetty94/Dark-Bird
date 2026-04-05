'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { cn } from '@/lib/utils'

const divisions = [
  {
    number: '01',
    name: 'Dark Bird Films',
    tagline: 'This is where it all begins with cinema.',
    description:
      'We approach every project like a film: with emotion, detail, and a strong sense of purpose. From the first idea to the final cut, we make sure your story doesn\'t just look good — it leaves an impact.',
    services: [
      'Feature Film Production & Support',
      'Ad Films & Commercials',
      'Music Videos',
      'Property Walkthrough Films',
      'Brand & Campaign Films',
      'Documentaries',
      'Product & Launch Videos',
      'Founder Stories',
    ],
    href: '/work/films',
    video: '/videos/films-loop.mp4',
  },
  {
    number: '02',
    name: 'Dark Bird Socials',
    tagline: 'Because today, your audience lives online.',
    description:
      'We help brands show up, stand out, and stay relevant across every digital platform. Whether it\'s building a voice, growing a presence, or running performance campaigns, we make sure your brand feels human and performs smart.',
    services: [
      'AI Digital Marketing',
      'Influencer Marketing',
      'Paid Media Strategy',
      'Founder Branding & Social Presence',
      'Social Media Management & Community Growth',
      'Campaign Planning & Execution',
      'Real Estate Digital Marketing',
    ],
    href: '/work/socials',
    video: '/videos/socials-loop.mp4',
  },
  {
    number: '03',
    name: 'Dark Bird Designs',
    tagline: 'We design experiences that are clean, cinematic, and meaningful.',
    description:
      'So your brand feels complete and consistent everywhere it appears. Design should look incredible and perform even better.',
    services: [
      'Website & Landing Page Design',
      'Brand Identity & Visual Kits',
      'Social Media Templates & Illustrations',
      '3D Modelling',
      'WhatsApp Stickers & Digital Swag',
      'Motion Design & Short-Form Animations',
    ],
    href: '/work/designs',
    video: '/videos/designs-loop.mp4',
  },
  {
    number: '04',
    name: 'Dark Bird Labs',
    tagline: 'Our sandbox for the future of film.',
    description:
      'We explore AI as a creative partner — crafting films, commercials, and visuals that feel impossible, immersive, and unmistakably cinematic.',
    services: [
      'AI Short Films',
      'AI Commercials & Concept Films',
      'AI Launch Trailers',
      'AI Music Videos',
      'AI-Generated Visual Experiments',
      'Marketing Automation & AI Agents',
    ],
    href: '/work/labs',
    video: '/videos/labs-loop.mp4',
  },
]

export default function ServicesShowcase() {
  return (
    <>
      {/* Section Header */}
      <section className="section-dark pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="container-content">
          <ScrollReveal>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( Our Services )
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-cream mt-3 md:mt-4 max-w-4xl">
              Here's everything we can do for <em className="text-accent">you</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-body-lg text-silver max-w-3xl mt-4 md:mt-6">
              Films, Socials, Designs & Labs — every division working under one roof to
              shape narratives, identities, and campaigns that move people and drive results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Divisions */}
      {divisions.map((division, index) => (
        <section
          key={division.number}
          className={cn(
            'py-16 md:py-24 relative overflow-hidden',
            index % 2 === 0 ? 'section-dark' : 'section-light'
          )}
        >
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background:
                index % 2 === 0
                  ? 'radial-gradient(ellipse at 20% 50%, #E85A3F 0%, transparent 50%)'
                  : 'radial-gradient(ellipse at 80% 50%, #E85A3F 0%, transparent 50%)',
            }}
          />

          <div className="container-content relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center">
              {/* Text */}
              <div
                className={cn(
                  'lg:col-span-6',
                  index % 2 === 1 ? 'lg:order-2' : ''
                )}
              >
                <ScrollReveal>
                  <span
                    className={cn(
                      'font-display text-[80px] md:text-[120px] lg:text-[160px] leading-none',
                      index % 2 === 0 ? 'text-accent/10' : 'text-accent/20'
                    )}
                  >
                    {division.number}
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h3
                    className={cn(
                      'font-display text-3xl md:text-5xl -mt-8 md:-mt-12 mb-3 md:mb-4',
                      index % 2 === 0 ? 'text-cream' : 'text-ink'
                    )}
                  >
                    {division.name}
                  </h3>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-base md:text-xl text-accent font-display italic mb-4 md:mb-6">
                    {division.tagline}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p
                    className={cn(
                      'text-sm md:text-body mb-6 md:mb-10',
                      index % 2 === 0 ? 'text-silver' : 'text-stone'
                    )}
                  >
                    {division.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div className="mb-6 md:mb-10">
                    <h4
                      className={cn(
                        'font-mono text-[10px] md:text-label uppercase tracking-wider mb-3 md:mb-4',
                        index % 2 === 0 ? 'text-warm-gray' : 'text-stone'
                      )}
                    >
                      We Create:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {division.services.map((service) => (
                        <li
                          key={service}
                          className={cn(
                            'flex items-start gap-2 md:gap-3 text-xs md:text-sm',
                            index % 2 === 0 ? 'text-silver' : 'text-stone'
                          )}
                        >
                          <span className="text-accent mt-0.5 md:mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <Link
                    href={division.href}
                    className="group inline-flex items-center gap-2 md:gap-3 text-accent text-sm md:text-base font-medium hover:gap-4 transition-all"
                  >
                    View Work
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </ScrollReveal>
              </div>

              {/* Video */}
              <div
                className={cn(
                  'lg:col-span-6',
                  index % 2 === 1 ? 'lg:order-1' : ''
                )}
              >
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
                    <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-colors" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
