'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Target } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'

// All performance ads from all clients
const performanceAds = [
  {
    client: 'GK Builders & Developers',
    title: 'Ad Creative 1',
    src: '/images/socials/gk-ads/ad-creative-1.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Ad Creative 2',
    src: '/images/socials/gk-ads/ad-creative-2.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Ad Creative 3',
    src: '/images/socials/gk-ads/ad-creative-6.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'GK Takeoff',
    src: '/images/socials/gk-ads/gk-takeoff.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Social Post 1',
    src: '/images/socials/gk-ads/post-1.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Social Post 2',
    src: '/images/socials/gk-ads/post-2.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods - Lead Gen Ad',
    src: '/images/socials/performance-ads/ad-creative-1.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Property Features Ad',
    src: '/images/socials/performance-ads/ad-creative-2.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Investment Opportunity Ad',
    src: '/images/socials/performance-ads/ad-creative-6.png',
  },
  {
    client: 'GK Builders & Developers',
    title: 'GK Takeoff Campaign',
    src: '/images/socials/performance-ads/gk-takeoff.png',
  },
]

export default function PerformanceAdsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-dark pt-44 pb-16">
        <div className="container-content">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href="/work/socials"
              className="inline-flex items-center gap-2 text-warm-gray hover:text-accent transition-all mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Socials</span>
            </Link>
          </ScrollReveal>

          {/* Category Badge */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="px-4 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-medium">
                Performance Ads
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-hero font-bold text-white mb-4">
              Performance Ads
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              ROI-focused ad creatives designed to drive engagement and conversions
              across Meta and Google platforms. We create ads that perform.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Ads Grid */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              Ad Creatives
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {performanceAds.map((ad) => (
              <div key={ad.src} className="group relative rounded-xl overflow-hidden shadow-lg bg-white">
                <div className="aspect-square relative">
                  <Image
                    src={ad.src}
                    alt={ad.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {ad.client}
                  </span>
                  <span className="text-white font-medium text-sm">{ad.title}</span>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need Performance Ads?"
        description="Let us create ad campaigns that drive real results for your business."
        buttonText="Let's Talk"
        buttonHref="/contact"
      />
    </>
  )
}
