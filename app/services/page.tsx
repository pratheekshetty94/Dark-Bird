import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services, type ServiceCategory } from '@/lib/services'
import CTABand from '@/components/sections/CTABand'

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

const categoryOrder: ServiceCategory[] = ['Films', 'Socials', 'Designs', 'Labs']

const categoryDescriptions: Record<ServiceCategory, string> = {
  Films: 'Ad films, brand films, corporate videos, product films and music videos.',
  Socials: 'Performance marketing and social media from the same team that makes the creative.',
  Designs: 'Brand identity, websites and design that match the craft of the film.',
  Labs: 'AI-native film production — directed, not prompted.',
}

export default function ServicesHubPage() {
  return (
    <main className="bg-ink text-cream">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 border-b border-stone/10">
        <div className="container-content">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
            ( Services )
          </span>
          <h1 className="font-display text-4xl md:text-7xl text-cream mt-4 md:mt-6 max-w-4xl">
            One team. Four divisions. <em className="text-accent">Every</em> craft a brand needs.
          </h1>
          <p className="text-silver text-base md:text-lg mt-6 md:mt-8 max-w-2xl">
            Dark Bird is a 9-year film studio in Bangalore. We write, direct, shoot,
            edit, design and run performance under one roof — so the story holds
            from hero film to homepage to the last ad cut.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categoryOrder.map((category) => {
        const categoryServices = services.filter((s) => s.category === category)
        if (categoryServices.length === 0) return null
        return (
          <section key={category} className="py-16 md:py-24 border-b border-stone/10">
            <div className="container-content">
              <div className="flex items-end justify-between mb-10 md:mb-12">
                <div>
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
                    ( Dark Bird {category} )
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl text-cream mt-3">
                    {category}
                  </h2>
                  <p className="text-silver text-sm md:text-base mt-4 max-w-xl">
                    {categoryDescriptions[category]}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {categoryServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group relative block p-6 md:p-8 rounded-2xl border border-stone/15 bg-charcoal/30 hover:border-accent/60 hover:bg-charcoal/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl md:text-2xl text-cream group-hover:text-accent transition-colors">
                        {service.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-warm-gray group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-silver text-sm mt-4">{service.outcomeMetric}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <CTABand
        headline="Start a Project"
        description="Tell us what you're building and we'll map the right craft, scope and team to it — on a 20-minute discovery call."
        buttonText="Book a Discovery Call"
        buttonHref="/contact#book-call"
        variant="accent"
      />
    </main>
  )
}
