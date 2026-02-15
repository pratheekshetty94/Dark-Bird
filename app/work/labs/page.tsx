'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { Cpu, Sparkles, Brain, Workflow, Eye, ChevronDown } from 'lucide-react'

const services = [
  {
    icon: Sparkles,
    title: 'GenAI Marketing & Content',
    description:
      'AI-powered content creation that scales your marketing with cinematic quality and cultural relevance.',
  },
  {
    icon: Brain,
    title: 'Custom LLM Deployments',
    description:
      'Tailored language models integrated into your existing infrastructure for smarter decision-making.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'End-to-end AI agents and pipelines that automate repetitive tasks and accelerate your operations.',
  },
  {
    icon: Eye,
    title: 'Vision Applications',
    description:
      'Computer vision solutions that see, interpret, and act — from quality control to creative generation.',
  },
]

const experiments = [
  {
    src: '/images/labs/ai-launch-trailers.jpeg',
    title: 'AI Launch Trailers',
  },
  {
    src: '/images/labs/ai-visual-experiments.jpeg',
    title: 'AI Visual Experiments',
  },
  {
    src: '/images/labs/ai-music-videos.jpeg',
    title: 'AI Music Videos',
  },
  {
    src: '/images/labs/ai-commercials.jpeg',
    title: 'AI Commercials & Concept Films',
  },
  {
    src: '/images/labs/ai-short-films.jpeg',
    title: 'AI Short Films',
  },
]

export default function LabsPage() {
  return (
    <>
      {/* ─── Spline Hero ─── */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-ink">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-4WsTjTGsSlJH27BcJUDBbHnQ/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="autoplay"
        />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <ChevronDown className="w-6 h-6 text-cream/40 animate-bounce" />
        </div>
      </section>

      {/* ─── Hero Content ─── */}
      <section className="relative py-16 md:py-24 bg-ink overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,90,63,0.06),transparent_70%)] pointer-events-none" />

        <div className="container-content relative z-10 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8 animate-[pulse_3s_ease-in-out_infinite]">
              <Cpu className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium tracking-wide">
                Experimental Division
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-hero text-cream mt-2 mb-6">
              We Bend Reality
              <br />
              <em className="text-accent">For Brands.</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-body-lg text-silver max-w-2xl mx-auto mb-10">
              AI-driven films and brand visuals that feel bold, cinematic, and
              culturally current.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Button href="/contact" className="glow-accent">
              Step Inside the Lab
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Capabilities ─── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="container-content relative z-10">
          <ScrollReveal>
            <SectionLabel>Capabilities</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-section text-cream mt-4 mb-4">
              We bring AI, engineering &amp; content{' '}
              <em className="text-accent">expertise</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-body text-silver max-w-3xl mb-14">
              Each problem is looked at from a fresh lens to provide you with a
              solution that solves your specific requirements and integrates with
              your existing infrastructure.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="relative p-8 bg-ink/60 border border-cream/[0.08] rounded-2xl
                             hover:border-accent/30 hover:shadow-glow
                             transition-all duration-300 group overflow-hidden"
                >
                  {/* Number label */}
                  <span className="absolute top-6 right-7 font-mono text-xs text-cream/10 group-hover:text-accent/40 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Top accent bar on hover */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-500 ease-out" />

                  <div className="flex items-start gap-5">
                    {/* Accent bar */}
                    <div className="hidden md:block w-[2px] h-[22px] bg-accent/60 mt-1 shrink-0" />
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-6 h-6 text-accent group-hover:text-cream transition-colors duration-300" />
                      </div>
                      <h3 className="text-cream font-semibold text-lg mb-2">
                        {service.title}
                      </h3>
                      <p className="text-warm-gray text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── Magical Experiences ─── */}
      <section className="relative section-padding bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,90,63,0.05),transparent_60%)] pointer-events-none" />

        <div className="container-content relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel>What We Build</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-section text-cream mt-4 mb-6">
                  Magical customer{' '}
                  <em className="text-accent">experiences</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-silver mb-6 leading-relaxed">
                  Allow your customers &amp; audience to be part of a movie
                  trailer with their favourite actor or create a custom lullaby
                  for their kids. Create unique marketing experiences &amp;
                  content to maximise reach and engagement.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p className="text-body text-warm-gray italic">
                  This is a level of user personalisation never seen before.
                </p>
              </ScrollReveal>
            </div>

            {/* Visual card */}
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl border border-cream/[0.08] bg-charcoal/40 p-10 md:p-14">
                <div className="absolute top-0 left-8 w-12 h-[2px] bg-accent" />
                <Sparkles className="w-10 h-10 text-accent/60 mb-6" />
                <p className="font-display text-2xl md:text-3xl text-cream leading-snug">
                  &ldquo;Be part of a movie trailer with your favourite actor&rdquo;
                </p>
                <p className="font-mono text-xs text-warm-gray/60 mt-6 uppercase tracking-wider">
                  Personalisation at scale
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Intelligence Section ─── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="container-content relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual card */}
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl border border-cream/[0.08] bg-ink/40 p-10 md:p-14 order-2 lg:order-1">
                <div className="absolute top-0 right-8 w-12 h-[2px] bg-accent" />
                <Brain className="w-10 h-10 text-accent/60 mb-6" />
                <p className="font-display text-2xl md:text-3xl text-cream leading-snug">
                  &ldquo;Transform data into decisions, and decisions into action&rdquo;
                </p>
                <p className="font-mono text-xs text-warm-gray/60 mt-6 uppercase tracking-wider">
                  Custom language models
                </p>
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <SectionLabel>Custom LLMs</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-section text-cream mt-4 mb-6">
                  Intelligence built{' '}
                  <em className="text-accent">for you</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-body text-silver leading-relaxed">
                  Improve your business&apos;s decision-making, automate content
                  generation or handle customer queries at scale. We integrate
                  seamlessly with your existing tech stack — these LLMs are
                  tailored to meet your specific needs, enabling more effective
                  communication and smarter decision-making processes. Let us
                  help you transform your data into decisions, and decisions
                  into action.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Efficiency Section ─── */}
      <section className="relative section-padding bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,90,63,0.04),transparent_60%)] pointer-events-none" />

        <div className="container-content relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel>Automation</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-section text-cream mt-4 mb-6">
                  Efficiency{' '}
                  <em className="text-accent">maxed</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-body text-silver leading-relaxed">
                  Work with us to identify bottlenecks in your organisation.
                  Automate your day-to-day tasks with our Workflow Automation
                  services. We focus on eliminating manual work wherever
                  possible, from data processing to complex operational tasks,
                  freeing up time to focus on more important things. Ensure that
                  your business runs smoothly and efficiently, with consistent
                  quality and reduced chances for errors.
                </p>
              </ScrollReveal>
            </div>

            {/* Visual card */}
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl border border-cream/[0.08] bg-charcoal/40 p-10 md:p-14">
                <div className="absolute top-0 left-8 w-12 h-[2px] bg-accent" />
                <Workflow className="w-10 h-10 text-accent/60 mb-6" />
                <p className="font-display text-2xl md:text-3xl text-cream leading-snug">
                  &ldquo;Eliminate manual work, focus on what matters&rdquo;
                </p>
                <p className="font-mono text-xs text-warm-gray/60 mt-6 uppercase tracking-wider">
                  End-to-end automation
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Vision Section ─── */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="container-content relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual card */}
            <ScrollReveal delay={0.15}>
              <div className="relative rounded-2xl border border-cream/[0.08] bg-ink/40 p-10 md:p-14 order-2 lg:order-1">
                <div className="absolute top-0 right-8 w-12 h-[2px] bg-accent" />
                <Eye className="w-10 h-10 text-accent/60 mb-6" />
                <p className="font-display text-2xl md:text-3xl text-cream leading-snug">
                  &ldquo;Convert pixels to action&rdquo;
                </p>
                <p className="font-mono text-xs text-warm-gray/60 mt-6 uppercase tracking-wider">
                  Computer vision solutions
                </p>
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <SectionLabel>Vision</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-section text-cream mt-4 mb-6">
                  Convert Pixels to{' '}
                  <em className="text-accent">Action</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-body text-silver leading-relaxed">
                  Use computer vision technology to provide practical,
                  real-world solutions for your business. From recognizing faces
                  and objects in images to analyzing video footage, we can help
                  you automate and refine processes that require visual data
                  interpretation. These applications are ideal for improving
                  security, monitoring, quality control and operational
                  efficiency across various sectors.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI Experiments Gallery ─── */}
      <section className="relative section-padding bg-ink overflow-hidden">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Lab Output</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-section text-cream mt-4 mb-12">
              AI Visual <em className="text-accent">Experiments</em>
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {experiments.map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-cream/[0.06] hover:border-accent/20 transition-colors duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Always-visible bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-mono text-[10px] md:text-xs text-cream/90 tracking-wide uppercase">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
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
