import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import BrandCampaignsSection from '@/components/sections/socials/BrandCampaignsSection'
import PerformanceAdsSection from '@/components/sections/socials/PerformanceAdsSection'
import InfluencerMarketingSection from '@/components/sections/socials/InfluencerMarketingSection'
import { Instagram, Check, ArrowUpRight, Megaphone, TrendingUp, Users2, Target, UserCheck, MessageSquare, CalendarRange, Sparkles, Rocket } from 'lucide-react'

// All services we offer under Dark Bird Socials — each links to its dedicated
// /services/[slug] landing page.
const socialsServices = [
  {
    icon: Megaphone,
    title: 'Brand Campaigns',
    description: 'Idea-led campaigns with hero films, social cutdowns and the media plan that carries them.',
    slug: 'brand-campaign-agency-bangalore',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Meta, Google and YouTube ads run by the same team that makes the creative.',
    slug: 'performance-marketing-agency-bangalore',
  },
  {
    icon: Users2,
    title: 'Social Media Marketing',
    description: 'Content strategy, reels and carousels that actually sound like the brand.',
    slug: 'social-media-marketing-agency-bangalore',
  },
  {
    icon: UserCheck,
    title: 'Influencer Marketing',
    description: 'Creator-led campaigns across tier-1 and micro creators, briefed, shot and measured.',
    slug: 'influencer-marketing-agency-bangalore',
  },
  {
    icon: Target,
    title: 'Paid Media Strategy',
    description: 'Full-funnel media planning, buying and creative ops for brands serious about spend.',
    slug: 'paid-media-strategy-bangalore',
  },
  {
    icon: Rocket,
    title: 'Founder Branding',
    description: 'Founder-led storytelling, social presence and thought leadership at scale.',
    slug: 'founder-branding-agency-bangalore',
  },
  {
    icon: MessageSquare,
    title: 'Social Media Management',
    description: 'Community growth, inbox, DMs and always-on content handled end-to-end.',
    slug: 'social-media-management-bangalore',
  },
  {
    icon: CalendarRange,
    title: 'Campaign Planning & Execution',
    description: 'From the first brief to the last asset — campaign calendars built for momentum.',
    slug: 'campaign-planning-bangalore',
  },
  {
    icon: Sparkles,
    title: 'AI Digital Marketing',
    description: 'AI-assisted content pipelines, automation and real-time ad optimisation.',
    slug: 'ai-digital-marketing-bangalore',
  },
]

export const metadata: Metadata = {
  title: 'Socials — Marketing Agency, Bengaluru',
  description: 'Dark Bird Socials — India\'s #1 marketing agency. Brand campaigns, performance marketing, influencer marketing, paid media, founder branding, social media management & AI digital marketing. Based in Bengaluru, serving brands across India.',
  keywords: [
    // High-intent #1 / best queries
    'no 1 marketing agency in india', 'no 1 marketing agency in bangalore',
    'best marketing agency in india', 'best marketing agency in bangalore',
    'top marketing agency india', 'top marketing agency bangalore',
    'no 1 social media marketing agency india', 'best social media marketing agency bangalore',
    'top digital marketing agency india', 'best digital marketing agency bangalore',
    // Service categories
    'social media marketing agency india', 'brand campaign agency bangalore',
    'performance marketing agency bangalore', 'influencer marketing agency india',
    'paid media strategy agency', 'founder branding agency bangalore',
    'social media management agency', 'campaign planning agency india',
    'ai digital marketing agency bangalore', 'ai marketing agency india',
    // Brand + location
    'dark bird socials', 'dark bird films marketing', 'marketing agency bengaluru',
    'creative marketing agency india', 'advertising agency bangalore',
  ],
  openGraph: {
    title: 'Dark Bird Socials | #1 Marketing Agency in India',
    description: 'Brand campaigns, performance marketing, influencer marketing & AI digital marketing that convert. India\'s #1 marketing agency, based in Bangalore.',
    url: 'https://www.darkbirdfilms.com/work/socials',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.darkbirdfilms.com/work/socials',
  },
}

// Jump cards at the top of the page — scroll to the corresponding inline section.
const projects = [
  {
    title: 'Brand Campaigns',
    category: 'Brand Campaigns',
    description: 'Walkthrough films & brand storytelling',
    image: '/images/socials/thumbnails/brand-campaigns.jpg',
    href: '#brand-campaigns',
  },
  {
    title: 'Reels',
    category: 'Reels',
    description: 'Scroll-stopping vertical content',
    image: '/images/socials/brand-campaigns/static-posts/anjani-scroll-1.webp',
    href: '#reels',
  },
  {
    title: 'Posts',
    category: 'Posts',
    description: 'Static creatives built for engagement',
    image: '/images/socials/brand-campaigns/static-posts/best-of-both.webp',
    href: '#posts',
  },
  {
    title: 'Branding',
    category: 'Branding',
    description: 'Logos & identities built to last',
    image: '/images/designs/logos/bake-a-luru.jpg',
    href: '#branding',
  },
  {
    title: 'Performance Ads',
    category: 'Performance Ads',
    description: 'ROI-focused Meta & Google ad campaigns',
    image: '/images/socials/thumbnails/performance-ads.jpg',
    href: '#performance-ads',
  },
  {
    title: 'Influencer Marketing',
    category: 'Influencer Marketing',
    description: '43 influencer collaborations',
    image: '/images/socials/thumbnails/influencer-marketing.jpg',
    href: '#influencer-marketing',
  },
]

const engagementModels = [
  {
    title: 'Monthly Retainer',
    description: 'Full social media + ads + content + reporting',
    idealFor: 'Developers with ongoing projects',
    features: ['Social media management', 'Content creation', 'Paid media', 'Monthly reporting'],
  },
  {
    title: 'Project-Based',
    description: 'Cinematic walkthrough film (end-to-end)',
    idealFor: 'Developers launching new properties',
    features: ['Pre-production planning', 'Professional shoot', 'Post-production', 'Delivery in multiple formats'],
  },
  {
    title: 'Performance Partnership',
    description: 'We invest in ads, you pay per result',
    idealFor: 'Landowners seeking qualified leads',
    features: ['Zero upfront cost', 'Pay per qualified lead', 'Full campaign management', 'Transparent reporting'],
  },
]

export default function SocialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-44 pb-16">
        <div className="container-content">
          <ScrollReveal>
            <h1 className="text-hero font-bold text-white mb-6">
              Digital Powerhouse
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-4">
              Dark Bird Socials is our digital powerhouse, where we build brands for
              the now — using content, creators, and platforms to create movements,
              not just moments. Your brand becomes a conversation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-body text-warm-gray max-w-3xl mb-8">
              From data-driven campaigns to influencer collaborations to performance
              marketing that delivers — we turn audiences into communities and brands
              into movements.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/darkbirdsocials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                ⚠ Warning: Contains proof
              </a>
              <Button href="/contact" variant="ghost">
                ☕ Coffee?
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap items-center gap-5 mt-10 text-sm">
              <Link
                href="/services#socials"
                className="group inline-flex items-center gap-2 text-warm-gray hover:text-primary-red transition-colors"
              >
                Browse all Socials services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <span className="text-warm-gray/30">·</span>
              <Link
                href="/industries"
                className="group inline-flex items-center gap-2 text-warm-gray hover:text-primary-red transition-colors"
              >
                Pick your industry
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="section-dark section-padding border-t border-white/[0.06]">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Our Services</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-4">
              Everything Socials, under one roof
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-warm-gray max-w-2xl mb-12">
              From the big idea to the last DM — brand campaigns, content, creators and
              media buying run by the same team. Tap any service to see the full offering.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {socialsServices.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group p-6 bg-charcoal/60 border border-white/[0.06] rounded-2xl hover:border-primary-red/50 hover:bg-charcoal/80 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center group-hover:bg-primary-red/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary-red" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-warm-gray group-hover:text-primary-red group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Work Showcase */}
      <section className="section-beige section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Portfolio</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              Our Social Media Work
            </h2>
          </ScrollReveal>

          {/* Jump-to cards — scroll to inline sections below */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-charcoal relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <span className="inline-flex items-center gap-1 text-white text-sm">
                      Jump to section <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-primary-red text-xs font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-charcoal font-semibold mt-1 mb-1 group-hover:text-primary-red transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-warm-gray text-sm">{project.description}</p>
                </div>
              </a>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Inline sections — moved from former /work/socials/* sub-pages */}
      <BrandCampaignsSection />
      <PerformanceAdsSection />
      <InfluencerMarketingSection />

      {/* Engagement Models */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>How We Work</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              Engagement Models
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div
                key={model.title}
                className="p-6 bg-white rounded-xl border-t-4 border-primary-red shadow-lg"
              >
                <h3 className="text-xl font-bold text-charcoal mb-2">
                  {model.title}
                </h3>
                <p className="text-warm-gray mb-4">
                  {model.description}
                </p>
                <div className="mb-6">
                  <span className="text-primary-red text-sm font-medium">
                    Ideal for: {model.idealFor}
                  </span>
                </div>
                <ul className="space-y-2">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-charcoal/80">
                      <Check className="w-4 h-4 text-primary-red flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Ready to Dominate Digital?"
        description="From social media to real estate marketing — let's build a presence that turns heads and drives results."
        buttonText="Let's Talk Strategy"
        buttonHref="/contact"
      />
    </>
  )
}
