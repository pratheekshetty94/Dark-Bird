'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Instagram, ExternalLink, Globe, Eye, Heart, MessageCircle, Play, Check } from 'lucide-react'
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
  },
}

export default function BrandDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const brand = brandsData[slug]

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
      {brand.website && (
        <section className="section-dark section-padding">
          <div className="container-content">
            <ScrollReveal>
              <h2 className="text-section font-bold text-white mb-8">
                Website We Built
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-video bg-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-primary-red/50 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-warm-gray/50 mx-auto mb-4" />
                      <p className="text-warm-gray">Click to visit {brand.website}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                    <span className="inline-flex items-center gap-2 text-white font-semibold">
                      Visit Website <ExternalLink className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </section>
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
