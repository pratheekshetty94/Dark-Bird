'use client'

import Link from 'next/link'
import { ArrowLeft, Users, Instagram } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'

// All influencer reels from all clients
const influencerReels = [
  // GK Builders influencer reels
  { client: 'GK Builders & Developers', reelId: 'DR6Yc3WDzRB' },
  { client: 'GK Builders & Developers', reelId: 'DR3eKzcCCm8' },
  { client: 'GK Builders & Developers', reelId: 'DR1H0acj8hj' },
  { client: 'GK Builders & Developers', reelId: 'DRuqaLKD5zS' },
  { client: 'GK Builders & Developers', reelId: 'DTnRib3kwgQ' },
  { client: 'GK Builders & Developers', reelId: 'DK0sxXwT8-N' },
  { client: 'GK Builders & Developers', reelId: 'DF-UI5jTbVW' },
  { client: 'GK Builders & Developers', reelId: 'DFIL-VxTasA' },
  { client: 'GK Builders & Developers', reelId: 'DC9SAGlzy3z' },
  { client: 'GK Builders & Developers', reelId: 'C62oBQ0veed' },
  { client: 'GK Builders & Developers', reelId: 'C5I_WuDPNJ-' },
  { client: 'GK Builders & Developers', reelId: 'Cr5jtj2gBaE' },
  { client: 'GK Builders & Developers', reelId: 'CbkGYnygBqW' },
  { client: 'GK Builders & Developers', reelId: 'CZUFfpUlfAn' },
  { client: 'GK Builders & Developers', reelId: 'DSJW5dzEywI' },
  { client: 'GK Builders & Developers', reelId: 'DKo1uGiyBB4' },
  { client: 'GK Builders & Developers', reelId: 'C1UR8PTL-xt' },
  { client: 'GK Builders & Developers', reelId: 'Cwey6maJS-3' },
  { client: 'GK Builders & Developers', reelId: 'CztSRCwSmVs' },
  { client: 'GK Builders & Developers', reelId: 'CztN3ftySFJ' },
  { client: 'GK Builders & Developers', reelId: 'CztMQPbRl35' },
  { client: 'GK Builders & Developers', reelId: 'Czqru2PJcyq' },
  { client: 'GK Builders & Developers', reelId: 'CzqpJ-FIxNy' },
  { client: 'GK Builders & Developers', reelId: 'CzqF9T9v1Ks' },
  { client: 'GK Builders & Developers', reelId: 'Czp5wiBSDFi' },
  { client: 'GK Builders & Developers', reelId: 'CzoJ5dlPbZh' },
  { client: 'GK Builders & Developers', reelId: 'CziszaHvs1P' },
  { client: 'GK Builders & Developers', reelId: 'CzgYv1FyJsY' },
  { client: 'GK Builders & Developers', reelId: 'CwpryBWysgf' },
  { client: 'GK Builders & Developers', reelId: 'CwpmHBLyArf' },
  { client: 'GK Builders & Developers', reelId: 'CwnFHYlMwCD' },
  { client: 'GK Builders & Developers', reelId: 'CwkeeCdyNbB' },
  { client: 'GK Builders & Developers', reelId: 'CwkakgBqp83' },
  { client: 'GK Builders & Developers', reelId: 'CwiHtJsIyqk' },
]

export default function InfluencerMarketingPage() {
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="px-4 py-1 bg-pink-600/20 text-pink-400 rounded-full text-sm font-medium">
                Influencer Marketing
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-hero font-bold text-white mb-4">
              Influencer Marketing
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl text-warm-gray max-w-3xl mb-4">
              Strategic influencer collaborations that drive reach, engagement, and brand awareness.
              We connect brands with the right creators to tell authentic stories.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex items-center gap-4 text-warm-gray">
              <span className="text-4xl font-display text-primary-red">{influencerReels.length}</span>
              <span>Influencer Collaborations</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reels Grid */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              <h2 className="text-2xl font-bold text-charcoal">
                Influencer Reels
              </h2>
              <a
                href="https://www.instagram.com/gkbuildersdevelopers/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-red hover:text-charcoal transition-colors mt-4 md:mt-0"
              >
                <Instagram className="w-4 h-4" />
                View All on Instagram
              </a>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {influencerReels.slice(0, 12).map((reel) => (
              <div
                key={reel.reelId}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <iframe
                  src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
                  className="w-full aspect-[9/16] border-0"
                  allowFullScreen
                  scrolling="no"
                  title={`Instagram Reel ${reel.reelId}`}
                />
              </div>
            ))}
          </StaggerReveal>

          {influencerReels.length > 12 && (
            <ScrollReveal delay={0.2}>
              <div className="text-center mt-8">
                <a
                  href="https://www.instagram.com/gkbuildersdevelopers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  View All {influencerReels.length} Reels on Instagram
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need Influencer Marketing?"
        description="Let us connect your brand with the right creators for authentic storytelling."
        buttonText="Let's Talk"
        buttonHref="/contact"
      />
    </>
  )
}
