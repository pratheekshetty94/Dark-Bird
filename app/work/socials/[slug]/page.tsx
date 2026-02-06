'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Instagram, ExternalLink, Globe, Eye, Heart, MessageCircle, Play, Check, X, Maximize2, Monitor, Smartphone, Tablet, Building2, Video, Target, Users, Megaphone, TrendingUp } from 'lucide-react'
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
  // New categorized sections
  categories?: {
    id: string
    title: string
    description: string
    icon: string
    color: string
  }[]
}

// Category navigation for GK Builders (3 categories - no website, that's on designs page)
const gkCategories = [
  {
    id: 'brand-campaigns',
    title: 'Brand Campaigns',
    description: 'Walkthrough films & branded content',
    icon: 'Video',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'performance-ads',
    title: 'Performance Ads',
    description: 'ROI-focused Meta & Google ads',
    icon: 'Target',
    color: 'from-red-600 to-red-800',
  },
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing',
    description: '34 influencer collaborations',
    icon: 'Users',
    color: 'from-pink-600 to-pink-800',
  },
]

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
      'CbkGYnygBqW',
      'CZUFfpUlfAn',
      'DSJW5dzEywI',
      'DKo1uGiyBB4',
      'C1UR8PTL-xt',
      'Cwey6maJS-3',
      'CztSRCwSmVs',
      'CztN3ftySFJ',
      'CztMQPbRl35',
      'Czqru2PJcyq',
      'CzqpJ-FIxNy',
      'CzqF9T9v1Ks',
      'Czp5wiBSDFi',
      'CzoJ5dlPbZh',
      'CziszaHvs1P',
      'CzgYv1FyJsY',
      'CwpryBWysgf',
      'CwpmHBLyArf',
      'CwnFHYlMwCD',
      'CwkeeCdyNbB',
      'CwkakgBqp83',
      'CwiHtJsIyqk',
    ],
  },
}

// Icon mapping for categories
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Video,
  Target,
  Users,
  Megaphone,
  TrendingUp,
  Globe,
}

export default function BrandDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const brand = brandsData[slug]
  const [showWebsitePreview, setShowWebsitePreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeCategory, setActiveCategory] = useState('brand-campaigns')

  // Check if this is GK Builders (which has categorized content)
  const isGkBuilders = slug === 'gk-builders'

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

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveCategory(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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

      {/* Category Navigation Cards - Only for GK Builders */}
      {isGkBuilders && (
        <section className="section-light py-8 sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {gkCategories.map((cat) => {
                const IconComponent = iconMap[cat.icon]
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToSection(cat.id)}
                    className={cn(
                      "group relative p-4 rounded-xl text-left transition-all overflow-hidden",
                      activeCategory === cat.id
                        ? "bg-charcoal text-white shadow-lg"
                        : "bg-white hover:bg-charcoal/5 border border-charcoal/10"
                    )}
                  >
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                      cat.color
                    )} />
                    <div className="relative">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                        activeCategory === cat.id ? "bg-primary-red" : "bg-charcoal/10"
                      )}>
                        {IconComponent && (
                          <IconComponent className={cn(
                            "w-4 h-4",
                            activeCategory === cat.id ? "text-white" : "text-charcoal"
                          )} />
                        )}
                      </div>
                      <h3 className={cn(
                        "font-semibold text-sm mb-0.5",
                        activeCategory === cat.id ? "text-white" : "text-charcoal"
                      )}>
                        {cat.title}
                      </h3>
                      <p className={cn(
                        "text-xs line-clamp-1",
                        activeCategory === cat.id ? "text-warm-gray" : "text-warm-gray/80"
                      )}>
                        {cat.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h3 className="text-xl font-bold text-charcoal mb-8 text-center">
              Results We Delivered
            </h3>
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

      {/* ==================== BRAND CAMPAIGNS SECTION ==================== */}
      {brand.videos && brand.videos.length > 0 && (
        <section id="brand-campaigns" className="section-light section-padding scroll-mt-32">
          <div className="container-content">
            {/* Section Header for GK Builders */}
            {isGkBuilders && (
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-charcoal">Brand Campaigns</h2>
                    <p className="text-sm text-warm-gray">Walkthrough Films & Branded Content</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <h3 className="text-xl font-bold text-charcoal mb-8">
                Cinematic Walkthrough Films
              </h3>
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

      {/* ==================== PERFORMANCE ADS SECTION ==================== */}
      {brand.adCreatives && brand.adCreatives.length > 0 && (
        <section id="performance-ads" className="section-beige section-padding scroll-mt-32">
          <div className="container-content">
            {/* Section Header for GK Builders */}
            {isGkBuilders && (
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-charcoal">Performance Ads</h2>
                    <p className="text-sm text-warm-gray">ROI-Focused Meta & Google Ads</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <h3 className="text-xl font-bold text-charcoal mb-4">
                Ad Creatives
              </h3>
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

      {/* ==================== INFLUENCER MARKETING SECTION ==================== */}
      {brand.influencerReels && brand.influencerReels.length > 0 && (
        <section id="influencer-marketing" className="section-dark section-padding scroll-mt-32">
          <div className="container-content">
            {/* Section Header for GK Builders */}
            {isGkBuilders && (
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Influencer Marketing</h2>
                    <p className="text-sm text-warm-gray">{brand.influencerReels.length} Influencer Collaborations</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Influencer Marketing Campaigns
                  </h3>
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
