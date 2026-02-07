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
  {
    client: 'YO Fruits',
    title: 'YO Fruits - Gift Your Loved Ones Good Health',
    youtubeId: 'sucVOCoeDBg',
    description: 'Festive campaign for YO Fruits gift boxes',
  },
  {
    client: 'YO Fruits',
    title: 'YO Fruits - Aap Jahan Phal Wahan',
    youtubeId: 'fYH8UgqPaQQ',
    description: 'Brand campaign showcasing fresh fruit delivery',
  },
  {
    client: 'Hangyo',
    title: 'Hangyo Ice Cream - TVC',
    youtubeId: 'fBkKkgfa5-0',
    description: 'Television commercial for Hangyo Ice Cream',
  },
  {
    client: 'Flipkart',
    title: '#FindYourMatch - Flipkart x Sima Taparia',
    youtubeId: 'a1P87WpuCM4',
    description: 'Brand collaboration campaign with matchmaker Sima Taparia',
  },
  {
    client: 'YO Fruits',
    title: 'YO Fruits - Festive Campaign',
    youtubeId: 'AsuTrS1WX-M',
    description: 'Festive season campaign for YO Fruits',
  },
]

// Property Launch Campaign videos
const launchCampaigns = [
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods - Launch Film',
    src: '/images/socials/brand-campaigns/videos/anjani-launch.mp4',
    description: 'Grand launch announcement for Anjani Lake Woods project',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods - Countdown',
    src: '/images/socials/brand-campaigns/videos/anjani-countdown.mp4',
    description: 'Launch countdown teaser',
  },
  {
    client: 'GK Builders & Developers',
    title: 'Anjani Lake Woods - Launch Teaser',
    src: '/images/socials/brand-campaigns/videos/anjani-launch-short.mp4',
    description: 'Short launch teaser for social media',
  },
  {
    client: 'GK Builders & Developers',
    title: 'GK Hill View - Launch Film',
    src: '/images/socials/brand-campaigns/videos/hillview-launch.mp4',
    description: 'Launch announcement for Hill View Villa project',
  },
  {
    client: 'GK Builders & Developers',
    title: 'GK Hill View - Countdown',
    src: '/images/socials/brand-campaigns/videos/hillview-countdown.mp4',
    description: 'Launch countdown teaser',
  },
  {
    client: 'GK Builders & Developers',
    title: "A Dog's Hope - Brand Film",
    src: '/images/socials/brand-campaigns/videos/dogs-hope.mp4',
    description: 'Emotional brand film showcasing GK Builders values',
  },
  {
    client: 'GK Builders & Developers',
    title: 'GK Hill View - Launch Film 2',
    src: '/images/socials/brand-campaigns/videos/hillview-launch-2.mp4',
    description: 'Additional launch film for Hill View Villa project',
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

      {/* Property Launch Campaigns - Vertical Videos */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8">
              Property Launch Campaigns
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {launchCampaigns.map((campaign) => (
              <div key={campaign.src} className="bg-charcoal rounded-xl overflow-hidden shadow-lg">
                <video
                  src={campaign.src}
                  controls
                  className="w-full aspect-[9/16] object-cover"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="p-3">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {campaign.client}
                  </span>
                  <h3 className="font-semibold text-white text-sm mt-1">{campaign.title}</h3>
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
