import { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { Palette, Layout, Box, MessageSquare, Sparkles, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dark Bird Designs | Brand Identity & Motion Graphics',
  description: 'We make brands look expensive. Website design, brand identity, motion graphics, 3D modelling, and social media templates with cinematic quality.',
}

const categories = ['All Designs', 'Brand Identity', 'Motion Graphics', 'Web Design', '3D Modelling', 'Social Templates']

const services = [
  {
    icon: Layout,
    title: 'Website & Landing Page Design',
    description: 'Conversion-focused web experiences that look premium and perform.',
  },
  {
    icon: Palette,
    title: 'Brand Identity & Visual Kits',
    description: 'Complete brand systems from logo to guidelines.',
  },
  {
    icon: Sparkles,
    title: 'Social Media Templates',
    description: 'Scroll-stopping templates for consistent brand presence.',
  },
  {
    icon: Box,
    title: '3D Modelling',
    description: 'Product visualization and architectural renders.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Stickers & Digital Swag',
    description: 'Fun, shareable assets that extend your brand.',
  },
  {
    icon: Video,
    title: 'Motion Design',
    description: 'Animated graphics and short-form visual content.',
  },
]

const projects = [
  {
    title: 'Brand Identity System',
    category: 'Brand Identity',
    description: 'Complete visual identity for tech startup',
  },
  {
    title: 'E-commerce Website',
    category: 'Web Design',
    description: 'High-converting online store design',
  },
  {
    title: 'Product Launch Animation',
    category: 'Motion Graphics',
    description: '3D animated reveal sequence',
  },
  {
    title: 'Social Media Kit',
    category: 'Social Templates',
    description: '50+ templates for Instagram & LinkedIn',
  },
  {
    title: 'Architectural Visualization',
    category: '3D Modelling',
    description: 'Photorealistic property renders',
  },
  {
    title: 'Logo Animation',
    category: 'Motion Graphics',
    description: 'Dynamic logo reveal for brand launch',
  },
  {
    title: 'App UI Design',
    category: 'Web Design',
    description: 'Mobile app interface design',
  },
  {
    title: 'Packaging Design',
    category: 'Brand Identity',
    description: 'Premium product packaging',
  },
]

export default function DesignsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-light pt-48 pb-16">
        <div className="container-content">
          <ScrollReveal>
            <h1 className="text-hero font-bold text-charcoal mb-6">
              We Make Brands Look Expensive.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              We design everything from the brand identity that defines you to the
              WhatsApp sticker your audience obsesses over. Each project gets the same
              treatment: visual excellence rooted in strategic thinking. Design should
              look incredible and perform even better.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Button href="/contact">
              Let's Do This
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Our Services</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-12">
              Design That Delivers
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="p-6 bg-charcoal rounded-xl hover:bg-charcoal/80 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center mb-4 group-hover:bg-primary-red/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary-red" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
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

      {/* Work Showcase */}
      <section className="section-cream section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Portfolio</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-8">
              Let's Tell Your Story Together
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

          {/* Projects Grid - Masonry Style */}
          <StaggerReveal className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {projects.map((project, index) => {
              // Vary heights for masonry effect
              const heights = ['aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-video']
              const heightClass = heights[index % heights.length]

              return (
                <div
                  key={project.title}
                  className="break-inside-avoid group cursor-pointer"
                >
                  <div className={`${heightClass} bg-charcoal rounded-xl overflow-hidden relative`}>
                    {/* Placeholder Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 to-charcoal" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Palette className="w-12 h-12 text-white/10" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-red/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white p-4">
                        <span className="text-xs uppercase tracking-wider opacity-80">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold mt-2">{project.title}</h3>
                        <p className="text-sm opacity-80 mt-1">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need Design That Stands Out?"
        description="From brand identity to motion graphics, we create visuals that make an impact."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </>
  )
}
