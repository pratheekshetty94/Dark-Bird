'use client'

import Link from 'next/link'
import { ArrowLeft, Video, Instagram } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'

// All brand campaigns from all clients
const brandCampaigns = [
  {
    client: 'GK Builders & Developers',
    title: 'GK Hill View Villa - Walkthrough',
    youtubeId: 'AvUbojIz-f8',
    description: 'Cinematic walkthrough of the Hill View Villa project in Devanahalli',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods - Walkthrough',
    youtubeId: '6Eq7L1wl1U8',
    description: 'Property walkthrough for the premium villa plots in Chintamani',
  },
  {
    client: 'GK Builders & Developers',
    title: "A Dog's Hope - GK Builders 2020",
    youtubeId: 'MaAUPpTXbNs',
    description: 'Brand film showcasing the values of GK Builders',
  },
]

export default function BrandCampaignsPage() {
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="px-4 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                Brand Campaigns
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-hero font-bold text-white mb-4">
              Brand Campaigns
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              Cinematic walkthrough films and branded content that tell compelling stories.
              We create visual narratives that sell belief, not just products.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              Walkthrough Films & Branded Content
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCampaigns.map((campaign) => (
              <div key={campaign.youtubeId} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${campaign.youtubeId}`}
                    title={campaign.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {campaign.client}
                  </span>
                  <h3 className="font-semibold text-charcoal mt-1 mb-1">{campaign.title}</h3>
                  {campaign.description && (
                    <p className="text-sm text-warm-gray">{campaign.description}</p>
                  )}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need a Brand Campaign?"
        description="Let us create cinematic content that tells your brand's story."
        buttonText="Let's Talk"
        buttonHref="/contact"
      />
    </>
  )
}
