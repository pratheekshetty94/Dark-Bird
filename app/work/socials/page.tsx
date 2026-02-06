import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { Instagram, ExternalLink, Building2, Video, Target, Users, BarChart3, Settings, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Social Media Work | Dark Bird Socials',
  description: 'Brand campaigns, performance ads, and influencer marketing. We turn audiences into communities and brands into movements.',
}

const categories = ['All', 'Brand Campaigns', 'Performance Ads', 'Influencer Marketing']

const projects = [
  // Brand Campaigns - links to category page showing all clients
  {
    title: 'Brand Campaigns',
    client: 'All Clients',
    category: 'Brand Campaigns',
    description: 'Walkthrough films & branded content',
    image: '/images/socials/gk-ads/post-1.png',
    href: '/work/socials/brand-campaigns',
  },
  // Performance Ads - links to category page showing all clients
  {
    title: 'Performance Ads',
    client: 'All Clients',
    category: 'Performance Ads',
    description: 'ROI-focused Meta & Google ad campaigns',
    image: '/images/socials/performance-ads/ad-creative-1.png',
    href: '/work/socials/performance-ads',
  },
  // Influencer Marketing - links to category page showing all clients
  {
    title: 'Influencer Marketing Campaign',
    client: 'All Clients',
    category: 'Influencer Marketing',
    description: '34 influencer collaborations',
    image: '/images/socials/gk-ads/post-2.png',
    href: '/work/socials/influencer-marketing',
  },
]

const services = [
  {
    title: 'AI Digital Marketing',
    description: 'Leverage AI for smarter targeting, content optimization, and campaign automation.',
  },
  {
    title: 'Influencer Marketing',
    description: 'Strategic partnerships with creators who align with your brand values.',
  },
  {
    title: 'Paid Media Strategy',
    description: 'ROI-focused campaigns across Meta, Google, YouTube, and LinkedIn.',
  },
  {
    title: 'Founder Branding',
    description: 'Build your personal brand and thought leadership presence.',
  },
  {
    title: 'Social Media Management',
    description: 'End-to-end content creation, scheduling, and community management.',
  },
  {
    title: 'Campaign Planning',
    description: 'Strategic campaign development from concept to execution.',
  },
]

// Real Estate Marketing Services
const realEstateServices = [
  {
    icon: Video,
    title: 'Cinematic Property Walkthroughs',
    description: 'Our signature product — immersive video tours that sell belief, not just square feet.',
  },
  {
    icon: Target,
    title: 'Brand & Project Positioning',
    description: 'Strategic positioning that differentiates your development in a crowded market.',
  },
  {
    icon: Building2,
    title: 'Digital Launch Campaigns',
    description: 'Cinematic production quality for your property launches across all channels.',
  },
  {
    icon: Users,
    title: 'Social Media Management',
    description: 'Creatives, reels, and community growth that builds your developer brand.',
  },
  {
    icon: BarChart3,
    title: 'Performance Marketing',
    description: 'Lead generation campaigns on Meta, Google, and YouTube that deliver ROI.',
  },
  {
    icon: Settings,
    title: 'CRM & Lead Automation',
    description: 'Setup and nurturing workflows that convert inquiries into site visits.',
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

const caseStudyResults = [
  { number: '156', label: 'Posts Created' },
  { number: '1,337+', label: 'Followers Grown' },
  { number: '2', label: 'Walkthrough Films' },
  { number: '100%', label: 'Client Retention' },
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
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>What We Do</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              Our Digital Services
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-white rounded-xl border border-charcoal/10 hover:border-primary-red/30 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {service.title}
                </h3>
                <p className="text-warm-gray text-sm">
                  {service.description}
                </p>
              </div>
            ))}
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
            <h2 className="text-section font-bold text-charcoal mt-4 mb-8">
              Our Social Media Work
            </h2>
          </ScrollReveal>

          {/* Filter Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-primary-red text-white'
                      : 'bg-white text-charcoal hover:bg-primary-red hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
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
                      View Project <ExternalLink className="w-4 h-4" />
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
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ========== REAL ESTATE MARKETING SECTION ========== */}
      <section className="section-dark section-padding" id="real-estate">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Real Estate Marketing</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-6">
              Marketing That Sells Belief,<br />Not Square Feet.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-12">
              We bring cinema-grade storytelling to real estate — turning properties into
              aspirational narratives and developers into trusted brands. From cinematic
              walkthrough videos to full-stack digital marketing, we are the creative
              partner developers trust.
            </p>
          </ScrollReveal>

          {/* Real Estate Services */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realEstateServices.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="p-6 bg-charcoal rounded-xl border border-white/10 hover:border-primary-red/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-red" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-warm-gray text-sm">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

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

      {/* Case Study: GK Builders */}
      <section className="section-beige section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Case Study</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-4">
              GK Builders & Developers
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-body text-warm-gray max-w-2xl mb-8">
              Long-term retainer partnership managing end-to-end digital presence and
              cinematic property walkthroughs. From zero to a thriving social presence.
            </p>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {caseStudyResults.map((result) => (
                <div key={result.label} className="text-center">
                  <span className="block text-4xl md:text-5xl font-display text-primary-red">
                    {result.number}
                  </span>
                  <span className="text-sm text-warm-gray">{result.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Achievements */}
          <ScrollReveal delay={0.4}>
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-lg font-semibold text-charcoal mb-4">What We Delivered:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2 text-warm-gray">
                  <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  156 posts created and published across platforms
                </li>
                <li className="flex items-start gap-2 text-warm-gray">
                  <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  1,337+ Instagram followers grown from zero
                </li>
                <li className="flex items-start gap-2 text-warm-gray">
                  <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  Multiple property launches: Anjani Lake Woods, Hill View
                </li>
                <li className="flex items-start gap-2 text-warm-gray">
                  <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  End-to-end: strategy + content + ads + community
                </li>
                <li className="flex items-start gap-2 text-warm-gray">
                  <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  2 cinematic walkthrough films produced
                </li>
                <li className="flex items-start gap-2 text-warm-gray">
                  <Check className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  Consistent brand voice across all channels
                </li>
              </ul>
            </div>
          </ScrollReveal>
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
