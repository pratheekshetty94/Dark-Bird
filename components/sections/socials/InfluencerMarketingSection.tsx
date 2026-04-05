import { Users, ExternalLink } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'

const influencerReels = [
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
]

export default function InfluencerMarketingSection() {
  return (
    <section id="influencer-marketing" className="section-light section-padding scroll-mt-24">
      <div className="container-content">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="px-4 py-1 bg-pink-600/20 text-pink-600 rounded-full text-sm font-medium">
              Influencer Marketing
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-section font-bold text-charcoal mb-4">Influencer Reels</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-warm-gray max-w-2xl mb-6">
            Strategic influencer collaborations that drive reach, engagement, and brand awareness.
            We connect brands with the right creators to tell authentic stories.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="flex items-center gap-3 text-warm-gray mb-10">
            <span className="text-4xl font-display text-primary-red">{influencerReels.length}</span>
            <span>Influencer<br />Collaborations</span>
          </div>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {influencerReels.map((reel) => (
            <div
              key={reel.reelId}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className="relative overflow-hidden"
                style={{ height: '400px', background: '#ffffff' }}
              >
                <iframe
                  src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
                  className="absolute border-0"
                  style={{ width: '150%', height: '580px', top: '-50px', left: '-25%' }}
                  scrolling="no"
                  title={`Instagram Reel ${reel.reelId}`}
                  loading="lazy"
                />
              </div>
              <a
                href={`https://www.instagram.com/reel/${reel.reelId}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-primary-red hover:bg-red-700 transition-colors"
              >
                <span className="text-white text-sm font-medium">Watch on Instagram</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
