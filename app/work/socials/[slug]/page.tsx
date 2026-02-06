'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Instagram, ExternalLink, Globe, Eye, Heart, MessageCircle, Play, Check, X, Maximize2, Monitor, Smartphone, Tablet } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { cn } from '@/lib/utils'

interface BrandData {
  id: string
  name: string
  tagline: string
  description: string
  instagram?: string
  website?: string
  category: string
  stats: { number: string; label: string }[]
  deliverables: string[]
  videos?: { title: string; youtubeId: string; description?: string }[]
  websiteScreenshots?: { src: string; title: string }[]
  adCreatives?: { src: string; title: string }[]
  adVideos?: { src: string; title: string; description?: string }[]
  influencerReels?: string[] // Instagram reel IDs
}

const brandsData: Record<string, BrandData> = {
  'gk-builders': {
    id: 'gk-builders',
    name: 'GK Builders & Developers',
    tagline: 'Full Social Media Management & Website Development',
    description: 'Long-term retainer partnership managing end-to-end digital presence, social media, and website development. From zero to a thriving online presence with cinematic property walkthroughs.',
    instagram: 'https://www.instagram.com/gkbuildersdevelopers/',
    website: 'https://gkbuildersanddevelopers.com/',
    category: 'Real Estate',
    stats: [
      { number: '156', label: 'Posts Created' },
      { number: '1,337+', label: 'Followers Grown' },
      { number: '2', label: 'Walkthrough Films' },
      { number: '100%', label: 'Client Retention' },
    ],
    deliverables: [
      '156 posts created and published across platforms',
      'Instagram growth from zero to 1,337+ followers',
      'Complete website design & development',
      'Multiple property launches: Anjani Lake Woods, Hill View, Green Valley',
      'End-to-end: strategy + content + ads + community',
      '2 cinematic walkthrough films produced',
      'Consistent brand voice across all channels',
      'NRI support integration on website',
    ],
    websiteScreenshots: [
      { src: '/images/websites/gk-builders-homepage.jpg', title: 'Homepage' },
      { src: '/images/websites/gk-hill-view.png', title: 'GK Hill View Project' },
      { src: '/images/websites/gk-anjani-lakewoods.png', title: 'Anjani Lake Woods Project' },
    ],
    videos: [
      {
        title: 'GK Hill View Villa - Walkthrough',
        youtubeId: 'AvUbojIz-f8',
        description: 'Cinematic walkthrough of the Hill View Villa project in Devanahalli',
      },
      {
        title: 'Anjani Lake Woods - Walkthrough',
        youtubeId: '6Eq7L1wl1U8',
        description: 'Property walkthrough for the premium villa plots in Chintamani',
      },
      {
        title: "A Dog's Hope - GK Builders 2020",
        youtubeId: 'MaAUPpTXbNs',
        description: 'Brand film showcasing the values of GK Builders',
      },
    ],
    adCreatives: [
      { src: '/images/socials/gk-ads/ad-creative-1.png', title: 'Ad Creative 1' },
      { src: '/images/socials/gk-ads/ad-creative-2.png', title: 'Ad Creative 2' },
      { src: '/images/socials/gk-ads/ad-creative-6.png', title: 'Ad Creative 3' },
      { src: '/images/socials/gk-ads/gk-takeoff.png', title: 'GK Takeoff' },
      { src: '/images/socials/gk-ads/post-1.png', title: 'Social Post 1' },
      { src: '/images/socials/gk-ads/post-2.png', title: 'Social Post 2' },
    ],
    influencerReels: [
      'DUPnDc9D6He',
      'DTzaNNjiWoc',
      'DTkk4BEksQD',
      'DSHCxhbE1KR',
      'DSFd6CUDeHP',
      'DSB_iA-kcPK',
      'DR_mJ_zEykM',
      'DR9EQjCj2Uf',
      'DR7AwRpD7Yo',
      'DR6Yc3WDzRB',
      'DR3eKzcCCm8',
      'DR1H0acj8hj',
      'DRuqaLKD5zS',
      'DTnRib3kwgQ',
      'DK0sxXwT8-N',
      'DF-UI5jTbVW',
      'DFIL-VxTasA',
      'DC9SAGlzy3z',
      'C62oBQ0veed',
      'C5I_WuDPNJ-',
      'Cr5jtj2gBaE',
    ],
  },
  'hotel-amaravathi': {
    id: 'hotel-amaravathi',
    name: 'Hotel Amaravathi',
    tagline: 'Website Development & Digital Presence',
    description: 'Complete website design and development for a hospitality establishment on the Bangalore-Mysore highway, creating a seamless booking experience and showcasing their services.',
    website: 'https://hotelamaravathi.in/',
    category: 'Hospitality',
    stats: [
      { number: '4', label: 'Room Categories' },
      { number: '5+', label: 'Guest Reviews' },
      { number: '100%', label: 'Mobile Responsive' },
      { number: '24/7', label: 'Online Presence' },
    ],
    deliverables: [
      'Complete website design & development',
      'Mobile-responsive booking interface',
      'WhatsApp integration for quick reservations',
      'Room showcase with pricing details',
      'Guest testimonial section',
      'Contact and location integration',
      'SEO optimization for local searches',
      'Social media integration',
    ],
    websiteScreenshots: [
      { src: '/images/websites/amaravathi-homepage.png', title: 'Homepage' },
      { src: '/images/websites/amaravathi-2.png', title: 'Room Details' },
    ],
  },
  'gk-builders-ads': {
    id: 'gk-builders-ads',
    name: 'GK Builders - Performance Ads',
    tagline: 'ROI-Focused Meta & Google Ad Campaigns',
    description: 'High-converting performance ad campaigns designed to generate qualified leads for real estate properties. From static creatives to video ads, we craft compelling content that drives results.',
    instagram: 'https://www.instagram.com/gkbuildersdevelopers/',
    website: 'https://gkbuildersanddevelopers.com/',
    category: 'Performance Ads',
    stats: [
      { number: '6+', label: 'Ad Creatives' },
      { number: '3', label: 'Video Ads' },
      { number: 'Meta & Google', label: 'Platforms' },
      { number: 'Lead Gen', label: 'Campaign Focus' },
    ],
    deliverables: [
      'Static ad creatives for Meta & Google',
      'Video ad campaigns for property showcases',
      'A/B testing multiple ad variations',
      'Audience targeting & optimization',
      'Lead generation landing pages',
      'Campaign performance tracking',
      'ROI-focused budget allocation',
      'Retargeting campaigns',
    ],
    adCreatives: [
      { src: '/images/socials/performance-ads/ad-creative-1.png', title: 'Anjani Lake Woods - Lead Gen Ad' },
      { src: '/images/socials/performance-ads/ad-creative-2.png', title: 'Property Features Ad' },
      { src: '/images/socials/performance-ads/ad-creative-6.png', title: 'Investment Opportunity Ad' },
      { src: '/images/socials/performance-ads/gk-takeoff.png', title: 'GK Takeoff Campaign' },
    ],
    influencerReels: [
      'DUPnDc9D6He',
      'DTzaNNjiWoc',
      'DTkk4BEksQD',
      'DSHCxhbE1KR',
      'DSFd6CUDeHP',
      'DSB_iA-kcPK',
      'DR_mJ_zEykM',
      'DR9EQjCj2Uf',
      'DR7AwRpD7Yo',
      'DR6Yc3WDzRB',
      'DR3eKzcCCm8',
      'DR1H0acj8hj',
      'DRuqaLKD5zS',
      'DTnRib3kwgQ',
      'DK0sxXwT8-N',
      'DF-UI5jTbVW',
      'DFIL-VxTasA',
      'DC9SAGlzy3z',
      'C62oBQ0veed',
      'C5I_WuDPNJ-',
      'Cr5jtj2gBaE',
    ],
  },
}

export default function BrandDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const brand = brandsData[slug]
  const [showWebsitePreview, setShowWebsitePreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  if (!brand) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-cream mb-4">Brand Not Found</h1>
          <Link href="/work/socials" className="btn-primary">
            Back to Socials
          </Link>
        </div>
      </div>
    )
  }

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
            <span className="inline-block px-4 py-1 bg-primary-red/20 text-primary-red rounded-full text-sm font-medium mb-4">
              {brand.category}
            </span>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-hero font-bold text-white mb-4">
              {brand.name}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl text-accent mb-4">{brand.tagline}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-body text-warm-gray max-w-3xl mb-8">
              {brand.description}
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap gap-4">
              {brand.instagram && (
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  View on Instagram
                </a>
              )}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-charcoal rounded-lg font-semibold hover:bg-cream transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  Visit Website
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-section font-bold text-charcoal mb-12 text-center">
              Results We Delivered
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brand.stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <span className="block text-4xl md:text-5xl font-display text-primary-red mb-2">
                  {stat.number}
                </span>
                <span className="text-sm text-warm-gray">{stat.label}</span>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* What We Delivered */}
      <section className="section-beige section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-section font-bold text-charcoal mb-8">
              What We Delivered
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brand.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-warm-gray">
                    <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Website Preview */}
      {brand.websiteScreenshots && brand.websiteScreenshots.length > 0 && (
        <section className="section-dark section-padding">
          <div className="container-content">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                <h2 className="text-section font-bold text-white">
                  Website We Built
                </h2>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  {brand.website && (
                    <>
                      <button
                        onClick={() => setShowWebsitePreview(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-red text-white rounded-lg font-semibold hover:bg-primary-red/90 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Preview Website
                      </button>
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-warm-gray hover:text-white transition-colors"
                      >
                        Open in New Tab <ExternalLink className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 gap-6">
              {brand.websiteScreenshots.map((screenshot) => (
                <button
                  key={screenshot.src}
                  onClick={() => setShowWebsitePreview(true)}
                  className="block group text-left w-full"
                >
                  <div className="relative bg-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-primary-red/50 transition-colors">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.title}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                      <span className="text-white font-medium">{screenshot.title}</span>
                      <span className="inline-flex items-center gap-2 text-white font-semibold">
                        <Eye className="w-5 h-5" />
                        Preview Website
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* Website Preview Modal */}
      {showWebsitePreview && brand.website && (
        <div className="fixed inset-0 z-50 bg-deep-black/95 flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-charcoal border-b border-white/10">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold">{brand.name}</span>
              <span className="text-warm-gray text-sm hidden md:block">{brand.website}</span>
            </div>

            {/* Device Toggle */}
            <div className="flex items-center gap-2 bg-ink rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  previewDevice === 'desktop' ? 'bg-primary-red text-white' : 'text-warm-gray hover:text-white'
                )}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  previewDevice === 'tablet' ? 'bg-primary-red text-white' : 'text-warm-gray hover:text-white'
                )}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  previewDevice === 'mobile' ? 'bg-primary-red text-white' : 'text-warm-gray hover:text-white'
                )}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-warm-gray hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Open in New Tab</span>
              </a>
              <button
                onClick={() => setShowWebsitePreview(false)}
                className="p-2 text-warm-gray hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <div
              className={cn(
                "bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300 h-full",
                previewDevice === 'desktop' && 'w-full max-w-full',
                previewDevice === 'tablet' && 'w-[768px] max-w-full',
                previewDevice === 'mobile' && 'w-[375px] max-w-full'
              )}
            >
              <iframe
                src={brand.website}
                title={`${brand.name} Website Preview`}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      )}

      {/* Videos Section */}
      {brand.videos && brand.videos.length > 0 && (
        <section className="section-light section-padding">
          <div className="container-content">
            <ScrollReveal>
              <h2 className="text-section font-bold text-charcoal mb-8">
                Walkthrough Films
              </h2>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brand.videos.map((video) => (
                <div key={video.youtubeId} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-charcoal mb-1">{video.title}</h3>
                    {video.description && (
                      <p className="text-sm text-warm-gray">{video.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* Performance Ad Creatives Section */}
      {brand.adCreatives && brand.adCreatives.length > 0 && (
        <section className="section-beige section-padding">
          <div className="container-content">
            <ScrollReveal>
              <h2 className="text-section font-bold text-charcoal mb-4">
                Ad Creatives
              </h2>
              <p className="text-warm-gray mb-8 max-w-2xl">
                ROI-focused ad creatives designed to drive engagement and conversions across Meta and Google platforms.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {brand.adCreatives.map((ad) => (
                <div key={ad.src} className="group relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={ad.src}
                    alt={ad.title}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-medium text-sm">{ad.title}</span>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* Video Ads Section */}
      {brand.adVideos && brand.adVideos.length > 0 && (
        <section className="section-light section-padding">
          <div className="container-content">
            <ScrollReveal>
              <h2 className="text-section font-bold text-charcoal mb-4">
                Video Ad Campaigns
              </h2>
              <p className="text-warm-gray mb-8 max-w-2xl">
                Engaging video content crafted for social media ads that capture attention and drive action.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brand.adVideos.map((video) => (
                <div key={video.src} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-[9/16]">
                    <video
                      src={video.src}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                      poster=""
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-charcoal mb-1">{video.title}</h3>
                    {video.description && (
                      <p className="text-sm text-warm-gray">{video.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* Influencer Marketing Reels Section */}
      {brand.influencerReels && brand.influencerReels.length > 0 && (
        <section className="section-dark section-padding">
          <div className="container-content">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                <div>
                  <h2 className="text-section font-bold text-white mb-2">
                    Influencer Marketing Campaigns
                  </h2>
                  <p className="text-warm-gray max-w-2xl">
                    Strategic influencer collaborations that drive reach, engagement, and brand awareness.
                  </p>
                </div>
                {brand.instagram && (
                  <a
                    href={brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-red hover:text-white transition-colors mt-4 md:mt-0"
                  >
                    <Instagram className="w-4 h-4" />
                    View All on Instagram
                  </a>
                )}
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brand.influencerReels.slice(0, 8).map((reelId) => (
                <div
                  key={reelId}
                  className="bg-charcoal rounded-xl overflow-hidden border border-white/10"
                >
                  <iframe
                    src={`https://www.instagram.com/reel/${reelId}/embed/`}
                    className="w-full aspect-[9/16] border-0"
                    allowFullScreen
                    scrolling="no"
                    title={`Instagram Reel ${reelId}`}
                  />
                </div>
              ))}
            </StaggerReveal>

            {brand.influencerReels.length > 8 && (
              <ScrollReveal delay={0.2}>
                <div className="text-center mt-8">
                  <a
                    href={brand.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-5 h-5" />
                    View All {brand.influencerReels.length} Reels on Instagram
                  </a>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABand
        headline="Want Similar Results?"
        description="Let us transform your digital presence with our full-stack creative services."
        buttonText="Let's Talk"
        buttonHref="/contact"
      />
    </>
  )
}
