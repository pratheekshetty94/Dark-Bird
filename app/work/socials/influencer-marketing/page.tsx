'use client'

import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'

// All influencer reels from all clients
const influencerReels = [
  // New reels
  { client: 'GK Builders & Developers', reelId: 'DUPnDc9D6He' },
  { client: 'GK Builders & Developers', reelId: 'DTzaNNjiWoc' },
  { client: 'GK Builders & Developers', reelId: 'DTkk4BEksQD' },
  { client: 'GK Builders & Developers', reelId: 'DSHCxhbE1KR' },
  { client: 'GK Builders & Developers', reelId: 'DSFd6CUDeHP' },
  { client: 'GK Builders & Developers', reelId: 'DSB_iA-kcPK' },
  { client: 'GK Builders & Developers', reelId: 'DR_mJ_zEykM' },
  { client: 'GK Builders & Developers', reelId: 'DR9EQjCj2Uf' },
  { client: 'GK Builders & Developers', reelId: 'DR7AwRpD7Yo' },
  { client: 'GK Builders & Developers', reelId: 'DR6Yc3WDzRB' },
  { client: 'GK Builders & Developers', reelId: 'DR3eKzcCCm8' },
  { client: 'GK Builders & Developers', reelId: 'DR1H0acj8hj' },
  { client: 'GK Builders & Developers', reelId: 'DRuqaLKD5zS' },
  // GK Builders influencer reels
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
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              Influencer Reels
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {influencerReels.map((reel) => (
              <div
                key={reel.reelId}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                {/* Full height to show entire embed with header, video, likes/comments */}
                <iframe
                  src={`https://www.instagram.com/reel/${reel.reelId}/embed/captioned/`}
                  className="w-full border-0"
                  style={{ height: '750px', minHeight: '750px' }}
                  allowFullScreen
                  scrolling="yes"
                  title={`Instagram Reel ${reel.reelId}`}
                />
              </div>
            ))}
          </StaggerReveal>
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
