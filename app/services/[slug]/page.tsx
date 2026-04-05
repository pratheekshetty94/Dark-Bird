import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { services, getServiceBySlug, getServiceSlugs } from '@/lib/services'
import CTABand from '@/components/sections/CTABand'

type Params = { slug: string }

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  const url = `https://darkbirdfilms.com/services/${service.slug}`
  return {
    title: service.meta.title,
    description: service.meta.description,
    keywords: service.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url,
      type: 'website',
    },
  }
}

export default function ServicePage({ params }: { params: Params }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.meta.title,
    description: service.meta.description,
    provider: {
      '@type': 'Organization',
      name: 'Dark Bird Films',
      url: 'https://darkbirdfilms.com',
    },
    areaServed: { '@type': 'City', name: 'Bangalore' },
    serviceType: service.name,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  // 3 related services from the same category, falling back to any 3 others
  const sameCategory = services.filter((s) => s.slug !== service.slug && s.category === service.category)
  const others = services.filter((s) => s.slug !== service.slug && s.category !== service.category)
  const related = [...sameCategory, ...others].slice(0, 3)

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
            <Link href="/services" className="hover:text-accent">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">{service.shortName}</span>
          </nav>

          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full inline-block">
            {service.heroKicker}
          </span>
          <h1 className="font-display text-4xl md:text-7xl text-cream mt-6 md:mt-8 max-w-4xl">
            {service.heroHeadline.split(service.heroAccent).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <em className="text-accent">{service.heroAccent}</em>}
              </span>
            ))}
          </h1>
          <p className="text-silver text-base md:text-lg mt-6 md:mt-8 max-w-2xl">
            {service.heroSubhead}
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

      {/* Gaps */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( The gap we see )
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
              Where most {service.shortName.toLowerCase()} work falls short.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {service.gaps.map((g, i) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-2xl border border-stone/15 bg-charcoal/30"
              >
                <div className="font-display text-4xl text-accent mb-4">0{i + 1}</div>
                <h3 className="font-display text-lg md:text-xl text-cream mb-3">{g.title}</h3>
                <p className="text-silver text-sm">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( What we deliver )
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-cream mt-4 md:mt-6">
              <em className="text-accent">{service.name}</em>, end-to-end.
            </h2>
            <p className="text-silver text-base md:text-lg mt-6 max-w-2xl">
              Every deliverable below comes from the same in-house team — direction,
              DOP, edit, colour, sound, motion, design and performance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-12">
            {service.deliverables.map((d, i) => (
              <div
                key={i}
                className="group p-6 md:p-8 rounded-2xl border border-stone/15 bg-charcoal/20 hover:border-accent/60 transition-all"
              >
                <h3 className="font-display text-xl md:text-2xl text-cream group-hover:text-accent transition-colors">
                  {d.title}
                </h3>
                <p className="text-silver text-sm mt-3">{d.body}</p>
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
                {service.outcomeMetric}.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-5">
                {service.whyUs.map((w, i) => (
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
              {service.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-stone/15 bg-charcoal/30 open:bg-charcoal/50 transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 md:p-6 list-none">
                    <span className="font-display text-base md:text-lg text-cream">{f.q}</span>
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

      {/* Related */}
      <section className="py-16 md:py-24 border-b border-stone/10">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
                ( Related )
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-cream mt-3">
                Other services you might need
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden md:inline-flex items-center gap-2 text-accent hover:text-accent-hover text-sm font-medium"
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-6 rounded-2xl border border-stone/15 bg-charcoal/30 hover:border-accent/60 transition-all"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-2">
                  Dark Bird {s.category}
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
        headline={`Let's make ${service.shortName}`}
        description={`Tell us where you are and where you want to go. We'll map the right craft and scope for ${service.shortName.toLowerCase()}.`}
        buttonText="Start a Project"
        buttonHref="/contact#book-call"
        variant="accent"
      />
    </main>
  )
}
