import { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import VideoGrid from '@/components/ui/VideoGrid'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { featureFilms, commercials, musicVideos } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'Films — Kantara, 777 Charlie & Ad Films',
  description: 'Watch our complete film portfolio: Kantara (100M+ views), 777 Charlie, ad films for Flipkart & top brands, and 15+ music videos. Feature films, commercials & music video production.',
  keywords: [
    'kantara trailer', 'kantara editing', '777 charlie trailer', '777 charlie cinematography',
    'ad film production portfolio', 'flipkart ad film', 'music video production india',
    'dark bird films portfolio', 'commercial production reel', 'feature film production india',
    'best ad film production company', 'music video director india',
  ],
  openGraph: {
    title: 'Films Portfolio | Dark Bird Films',
    description: 'Feature films, ad films & music videos. Watch our complete portfolio including Kantara & 777 Charlie.',
    url: 'https://www.darkbirdfilms.com/work/films',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.darkbirdfilms.com/work/films',
  },
}




export default function FilmsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-section">
        <div className="container-content">
          <ScrollReveal>
            <h1 className="text-hero font-bold text-white mb-6">
              Cinematic Excellence
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              We craft films, commercials, and music videos with a filmmaker's eye
              and a brand strategist's brain. Every project is built to resonate
              emotionally and deliver results.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">
                Let's Break the Internet
              </Button>
              <p className="text-warm-gray italic self-center">
                *And then your revenue records.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Films */}
      <section id="feature-films" className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Feature Films</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              Our Work Lives on Screens Across India
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <VideoGrid videos={featureFilms} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* Ad Films & Commercials */}
      <section id="ad-films" className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Ad Films & Commercials</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-4">
              Brand Campaigns
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-warm-gray mb-12">
              Flipkart • Shopsy • YO Fruits • Hangyo • GK Builders
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <VideoGrid videos={commercials} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* Music Videos */}
      <section id="music-videos" className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Music Videos</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              The Sounds We've Turned Into Visuals
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <VideoGrid videos={musicVideos} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Have a Film Project in Mind?"
        description="From feature films to brand campaigns, we bring cinematic craft to every frame."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </>
  )
}
