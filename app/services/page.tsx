import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { divisions } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Services in Bengaluru',
  description:
    'Film production, performance marketing, brand identity, website design and AI video — from a 9-year film studio in Bangalore. One team, four divisions.',
  alternates: { canonical: 'https://www.darkbirdfilms.com/services' },
  openGraph: {
    title: 'Services | Dark Bird Films',
    description:
      'Film production, performance marketing, design and AI video from a 9-year film studio in Bangalore.',
    url: 'https://www.darkbirdfilms.com/services',
  },
}

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
                          const href = service.slug ? `/services/${service.slug}` : division.href
                          return (
                            <li key={service.label}>
                              <Link href={href} className={rowClass}>
                                <span className="flex items-start gap-3">
                                  <span className="text-accent mt-0.5">•</span>
                                  <span className="group-hover:text-accent transition-colors">
                                    {service.label}
                                  </span>
                                </span>
                                <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
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
