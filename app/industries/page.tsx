import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { industries } from '@/lib/industries'
import CTABand from '@/components/sections/CTABand'

export const metadata: Metadata = {
  title: 'Industries We Serve in Bengaluru',
  description:
    'Industry-specific film, video and brand storytelling across real estate, e-commerce, restaurants, healthcare, pharma, interior design, CA firms, law firms and edtech. Bangalore-based, India-wide.',
  alternates: { canonical: 'https://www.darkbirdfilms.com/industries' },
  openGraph: {
    title: 'Industries We Serve | Dark Bird Films',
    description:
      'Cinematic video production and brand storytelling for every major industry in India. Made in Bangalore.',
    url: 'https://www.darkbirdfilms.com/industries',
  },
}

export default function IndustriesHubPage() {
  return (
    <main className="bg-ink text-cream">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 border-b border-stone/10">
        <div className="container-content">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
            ( Industries )
          </span>
          <h1 className="font-display text-4xl md:text-7xl text-cream mt-4 md:mt-6 max-w-4xl">
            Every industry has a story. We tell it like a{' '}
            <em className="text-accent">film</em>.
          </h1>
          <p className="text-silver text-base md:text-lg mt-6 md:mt-8 max-w-2xl">
            Dark Bird is a 9-year film studio in Bangalore making cinematic brand
            content for the industries shaping India. Pick your vertical — we’ll
            show you exactly how we’d work with you.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="container-content">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group relative block p-6 md:p-8 rounded-2xl border border-stone/15 bg-charcoal/30 hover:border-accent/60 hover:bg-charcoal/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-3">
                      {industry.heroKicker}
                    </p>
                    <h2 className="font-display text-xl md:text-2xl text-cream group-hover:text-accent transition-colors">
                      {industry.name}
                    </h2>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-warm-gray group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
                <p className="text-silver text-sm mt-4">{industry.outcomeMetric}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Not sure which fits?"
        description="Tell us about your brand and we’ll map the right stories, formats and cadence — on a 20-minute call."
        buttonText="Book a Discovery Call"
        buttonHref="/contact#book-call"
        variant="accent"
      />
    </main>
  )
}
