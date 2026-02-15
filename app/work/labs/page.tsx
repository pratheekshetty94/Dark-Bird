'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { Cpu, Sparkles, Film, Music, Zap, Bot } from 'lucide-react'

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

export default function LabsPage() {
  return (
    <>
      {/* Spline Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-deep-black">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-4WsTjTGsSlJH27BcJUDBbHnQ/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="autoplay"
        />
      </section>

      {/* Hero Content - Below Spline */}
      <section className="relative py-20 bg-deep-black">
        <div className="container-content text-center">
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
            <p className="text-xl text-warm-gray max-w-2xl mx-auto mb-8">
              AI-driven films and brand visuals that feel bold, cinematic, and culturally current.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
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
