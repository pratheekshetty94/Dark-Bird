import { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { Cpu, Sparkles, Film, Music, Zap, Bot } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dark Bird Labs | AI-Powered Creative Experiments',
  description: 'We bend reality for brands. AI short films, AI commercials, AI music videos, and marketing automation. The future of storytelling.',
}

const categories = ['All AI Work', 'Short Films', 'Commercials', 'Music', 'Automation']

const services = [
  {
    icon: Film,
    title: 'AI Short Films',
    description: 'Narrative-driven films created with AI tools that feel cinematic, not synthetic.',
  },
  {
    icon: Sparkles,
    title: 'AI Commercials & Concept Films',
    description: 'Brand stories brought to life with impossible visuals and rapid iteration.',
  },
  {
    icon: Zap,
    title: 'AI Launch Trailers',
    description: 'High-impact product reveals powered by generative visuals.',
  },
  {
    icon: Music,
    title: 'AI Music Videos',
    description: 'Visual experiences that push the boundaries of music storytelling.',
  },
  {
    icon: Cpu,
    title: 'AI Visual Experiments',
    description: 'Exploratory projects that test the limits of AI-human collaboration.',
  },
  {
    icon: Bot,
    title: 'Marketing Automation',
    description: 'AI agents and workflows that scale your marketing efforts.',
  },
]

const projects = [
  {
    title: 'Neural Dreams',
    category: 'Short Films',
    description: 'AI-generated narrative exploring consciousness',
    badge: 'AI Film',
  },
  {
    title: 'Product X Launch',
    category: 'Commercials',
    description: 'Impossible product visualization',
    badge: 'AI Commercial',
  },
  {
    title: 'Synthetic Memories',
    category: 'Music',
    description: 'Music video with AI-generated visuals',
    badge: 'AI Music Video',
  },
  {
    title: 'Brand Avatar System',
    category: 'Automation',
    description: 'AI-powered brand ambassador',
    badge: 'AI Agent',
  },
  {
    title: 'Future Nostalgia',
    category: 'Short Films',
    description: 'Retro-futuristic visual journey',
    badge: 'AI Film',
  },
  {
    title: 'Concept Car Reveal',
    category: 'Commercials',
    description: 'Automotive visualization experiment',
    badge: 'AI Commercial',
  },
]

export default function LabsPage() {
  return (
    <>
      {/* Hero - Dark & Futuristic */}
      <section className="relative pt-32 pb-section overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-deep-black">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(224, 32, 32, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(224, 32, 32, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary-red/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary-red/5 to-transparent" />
        </div>

        <div className="container-content relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-red/10 border border-primary-red/30 rounded-full mb-6">
              <Cpu className="w-4 h-4 text-primary-red" />
              <span className="text-primary-red text-sm font-medium">Experimental Division</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-hero font-bold text-white mt-4 mb-6">
              We Bend Reality<br />For Brands.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              We experiment, prototype, and produce AI-driven films and brand visuals
              that feel bold, cinematic, and culturally current. This is storytelling
              at the speed of imagination — without sacrificing craft.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-primary-red text-lg font-medium mb-8">
              Curious? Good.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Button href="/contact" className="glow-red">
              Step Inside the Lab
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="relative section-padding">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="container-content relative z-10">
          <ScrollReveal>
            <SectionLabel>Capabilities</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-12">
              AI-Powered Creations
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="p-6 bg-deep-black border border-white/5 rounded-xl hover:border-primary-red/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-red/10 flex items-center justify-center mb-4 group-hover:bg-primary-red group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-primary-red group-hover:text-white transition-colors" />
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
      <section className="relative section-padding">
        <div className="absolute inset-0 bg-deep-black" />
        <div className="container-content relative z-10">
          <ScrollReveal>
            <SectionLabel>Experiments</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-white mt-4 mb-8">
              From The Lab
            </h2>
          </ScrollReveal>

          {/* Filter Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                    index === 0
                      ? 'bg-primary-red text-white'
                      : 'bg-white/5 text-warm-gray border border-white/10 hover:border-primary-red hover:text-primary-red'
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
              <div
                key={project.title}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-charcoal rounded-xl overflow-hidden relative border border-white/5 hover:border-primary-red/50 transition-colors">
                  {/* AI Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-red/90 text-white text-xs font-mono rounded">
                      <Cpu className="w-3 h-3" />
                      {project.badge}
                    </span>
                  </div>

                  {/* Placeholder Pattern */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 30% 70%, rgba(224, 32, 32, 0.3) 0%, transparent 50%),
                          radial-gradient(circle at 70% 30%, rgba(224, 32, 32, 0.2) 0%, transparent 50%)
                        `,
                      }}
                    />
                  </div>

                  {/* Hover Glitch Effect */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-primary-red font-mono text-sm glitch">
                      [LOADING...]
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-primary-red text-xs font-mono uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-white font-semibold mt-1 group-hover:text-primary-red transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-warm-gray text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        variant="dark"
        headline="Ready to Explore the Future?"
        description="Let's push the boundaries of what's possible with AI-powered creativity."
        buttonText="Enter the Lab"
        buttonHref="/contact"
      />
    </>
  )
}
