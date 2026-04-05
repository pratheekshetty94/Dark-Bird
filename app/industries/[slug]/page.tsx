import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { industries, getIndustryBySlug, getIndustrySlugs } from '@/lib/industries'
import { getIndustryWork } from '@/lib/serviceWork'
import CTABand from '@/components/sections/CTABand'

type Params = { slug: string }

export function generateStaticParams() {
  return getIndustrySlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) return {}
  const url = `https://darkbirdfilms.com/industries/${industry.slug}`
  return {
    title: industry.meta.title,
    description: industry.meta.description,
    keywords: industry.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: industry.meta.title,
      description: industry.meta.description,
      url,
      type: 'website',
    },
  }
}

export default function IndustryPage({ params }: { params: Params }) {
  const industry = getIndustryBySlug(params.slug)
  if (!industry) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.meta.title,
    description: industry.meta.description,
    provider: {
      '@type': 'Organization',
      name: 'Dark Bird Films',
      url: 'https://darkbirdfilms.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
    },
    serviceType: industry.name,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  // Pick 3 sibling industries for the "Also for" nav
  const siblings = industries.filter((i) => i.slug !== industry.slug).slice(0, 3)

  // Cross-department work showcased on this industry page
  const work = getIndustryWork(industry.slug)

  return (
    <main className="bg-ink text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 border-b border-stone/10">
        <div className="container-content">
          <nav className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-6">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/industries" className="hover:text-accent">Industries</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">{industry.shortName}</span>
          </nav>

          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full inline-block">
            {industry.heroKicker}
          </span>
          <h1 className="font-display text-4xl md:text-7xl text-cream mt-6 md:mt-8 max-w-4xl">
            {industry.heroHeadline.split(industry.heroAccent).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <em className="text-accent">{industry.heroAccent}</em>}
              </span>
            ))}
          </h1>
          <p className="text-silver text-base md:text-lg mt-6 md:mt-8 max-w-2xl">
            {industry.heroSubhead}
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-8 md:mt-10">
            <Link
              href="/contact#book-call"
              className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 bg-accent text-cream text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
            >
              Book a Discovery Call
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 border border-cream/30 text-cream text-sm font-medium rounded-lg hover:border-accent hover:text-accent transition-all"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( The gap we see )
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
              Where most {industry.shortName.toLowerCase()} brands lose the story.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {industry.painPoints.map((p, i) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-2xl border border-stone/15 bg-charcoal/30"
              >
                <div className="font-display text-4xl text-accent mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-display text-lg md:text-xl text-cream mb-3">
                  {p.title}
                </h3>
                <p className="text-silver text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( What we make )
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
              Built for <em className="text-accent">{industry.shortName.toLowerCase()}</em>.
            </h2>
            <p className="text-silver text-base md:text-lg mt-6 max-w-2xl">
              Every format below is produced by the same in-house team — direction,
              DOP, edit, colour, sound, motion, design and performance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-12">
            {industry.services.map((s, i) => (
              <div
                key={i}
                className="group p-6 md:p-8 rounded-2xl border border-stone/15 bg-charcoal/20 hover:border-accent/60 transition-all"
              >
                <h3 className="font-display text-xl md:text-2xl text-cream group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-silver text-sm mt-3">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
                ( Why Dark Bird )
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
                {industry.outcomeMetric}.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-5">
                {industry.whyUs.map((w, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <p className="text-cream/90 text-base md:text-lg">{w}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      {work.length > 0 && (
        <section className="py-16 md:py-24 border-b border-stone/10">
          <div className="container-content">
            <div className="flex items-end justify-between mb-10 md:mb-12 gap-6">
              <div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
                  ( Selected work )
                </span>
                <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
                  {industry.shortName} work we've shipped.
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden md:inline-flex items-center gap-2 text-accent hover:text-accent-hover text-sm font-medium whitespace-nowrap"
              >
                See all work
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {work.map((item) => {
                const cardClass =
                  'group block rounded-2xl overflow-hidden border border-stone/15 bg-charcoal/30 hover:border-accent/60 transition-all'
                const inner = (
                  <>
                    <div className="relative aspect-video bg-charcoal overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={item.image.startsWith('http')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      {item.tag && (
                        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider text-cream bg-ink/60 backdrop-blur px-2 py-1 rounded">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      {item.client && (
                        <p className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-1">
                          {item.client}
                        </p>
                      )}
                      <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-silver text-sm mt-2">{item.description}</p>
                      )}
                    </div>
                  </>
                )
                return item.external ? (
                  <a
                    key={`${item.title}-${item.href}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={`${item.title}-${item.href}`}
                    href={item.href}
                    className={cardClass}
                  >
                    {inner}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
                ( FAQ )
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
                Questions, answered.
              </h2>
            </div>
            <div className="mt-12 space-y-4">
              {industry.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-stone/15 bg-charcoal/30 open:bg-charcoal/50 transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 md:p-6 list-none">
                    <span className="font-display text-base md:text-lg text-cream">
                      {f.q}
                    </span>
                    <span className="text-accent text-2xl transition-transform group-open:rotate-45 flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-silver text-sm md:text-base">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Siblings */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
                ( Also for )
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-cream mt-3">
                Other industries we work with
              </h2>
            </div>
            <Link
              href="/industries"
              className="hidden md:inline-flex items-center gap-2 text-accent hover:text-accent-hover text-sm font-medium"
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/industries/${s.slug}`}
                className="group p-6 rounded-2xl border border-stone/15 bg-charcoal/30 hover:border-accent/60 transition-all"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-2">
                  {s.heroKicker}
                </p>
                <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-accent transition-colors">
                  {s.name}
                </h3>
                <p className="text-silver text-sm mt-3">{s.outcomeMetric}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline={`Let's make ${industry.shortName}`}
        description={`Tell us where you are and where you want to go. We'll map the right stories, formats and cadence for ${industry.shortName.toLowerCase()}.`}
        buttonText="Start a Project"
        buttonHref="/contact#book-call"
        variant="accent"
      />
    </main>
  )
}
