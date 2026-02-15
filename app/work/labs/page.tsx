'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import {
  Sparkles,
  Brain,
  Workflow,
  Eye,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react'

/* ─── Data ─── */

const services = [
  {
    icon: Sparkles,
    title: 'GenAI Marketing & Content',
    description:
      'Content that hits different. We use AI to create marketing that actually stops the scroll — cinematic, on-trend, and absurdly fast to produce.',
  },
  {
    icon: Brain,
    title: 'Custom LLM Deployments',
    description:
      'Your own AI brain, trained on your data. Not some generic chatbot — a language model that actually gets your business and plugs right into your stack.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'We find the boring stuff in your workflow and delete it. AI agents that handle the grind so your team can focus on work that actually matters.',
  },
  {
    icon: Eye,
    title: 'Vision Applications',
    description:
      'Teaching machines to see. From spotting defects on a factory line to generating wild visuals — if it involves pixels, we can make AI do something useful with them.',
  },
]

const deepDive = [
  {
    label: 'What We Build',
    icon: Sparkles,
    title: 'Experiences that slap',
    body: "Imagine your audience starring in a movie trailer with their favourite actor. Or getting a custom lullaby generated for their kid. We're building the kind of hyper-personalised experiences that make people screenshot and share — not skip.",
    pullQuote: 'Personalisation so good it feels like main character energy.',
    accent: 'Personalisation at scale',
  },
  {
    label: 'Custom LLMs',
    icon: Brain,
    title: 'Your AI, your rules',
    body: "Generic AI is mid. We build custom language models that live inside your tech stack and actually understand your business. Need smarter customer support? Automated content that sounds like your brand? Decisions backed by real data? We got you. Your data becomes your superpower.",
    pullQuote: 'From raw data to big moves — no middleman.',
    accent: 'Custom language models',
  },
  {
    label: 'Automation',
    icon: Workflow,
    title: 'Efficiency on steroids',
    body: "Let's be real — half your team's day is spent on tasks a robot could handle better. We identify the bottlenecks, build the automations, and give your people their time back. Less busywork, fewer errors, and your operations running like clockwork while you focus on the stuff that actually moves the needle.",
    pullQuote: 'Delete the busywork. Keep the brilliance.',
    accent: 'End-to-end automation',
  },
  {
    label: 'Vision',
    icon: Eye,
    title: 'Pixels with purpose',
    body: "Computer vision that does real things — not just tech demos. We build solutions that recognize, analyse, and act on visual data. Quality control on production lines, security monitoring that never sleeps, video analysis at scale. If your business deals with images or footage, we can make that data work harder than it ever has.",
    pullQuote: 'Every pixel earns its keep.',
    accent: 'Computer vision solutions',
  },
]

const experiments = [
  { src: '/images/labs/ai-launch-trailers.jpeg', title: 'AI Launch Trailers' },
  { src: '/images/labs/ai-visual-experiments.jpeg', title: 'AI Visual Experiments' },
  { src: '/images/labs/ai-music-videos.jpeg', title: 'AI Music Videos' },
  { src: '/images/labs/ai-commercials.jpeg', title: 'AI Commercials' },
  { src: '/images/labs/ai-short-films.jpeg', title: 'AI Short Films' },
]

/* ─── Experiments Banner ─── */

function ExperimentsBanner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = experiments[activeIndex]

  return (
    <section className="relative bg-[#080808] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-[2px] h-5 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Lab Output
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream mb-12">
            AI Visual <span className="text-accent italic">Experiments</span>
          </h2>
        </ScrollReveal>

        {/* Big banner image */}
        <ScrollReveal delay={0.15}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[25px] overflow-hidden border border-white/[0.08] mb-6">
            {experiments.map((item, i) => (
              <Image
                key={item.title}
                src={item.src}
                alt={item.title}
                fill
                className={`object-cover transition-all duration-700 ease-out ${
                  i === activeIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-[1.02]'
                }`}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority={i === 0}
              />
            ))}
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent pointer-events-none" />
            {/* Active label */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center gap-3">
              <div className="w-[2px] h-4 bg-accent" />
              <span className="font-mono text-xs md:text-sm text-cream/80 uppercase tracking-[0.15em]">
                {active.title}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Service buttons */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {experiments.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setActiveIndex(i)}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full font-mono text-[10px] md:text-xs uppercase tracking-[0.12em] transition-all duration-300 border ${
                  i === activeIndex
                    ? 'bg-accent text-cream border-accent shadow-[0_0_25px_rgba(232,90,63,0.3)]'
                    : 'bg-transparent text-cream/50 border-white/[0.12] hover:border-accent/40 hover:text-cream/80'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─── Page ─── */

export default function LabsPage() {
  return (
    <>
      {/* ━━━ HERO: Spline + Content ━━━ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[#080808]">
        {/* Spline 3D background */}
        <div className="absolute inset-0">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-4WsTjTGsSlJH27BcJUDBbHnQ/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            allow="autoplay"
          />
        </div>

        {/* Overlays — only at bottom so Spline stays interactive */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none z-[1]" />

        {/* Hero content — bottom-aligned, above gradient */}
        <div className="relative z-[2] min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 pointer-events-none">
          <div className="max-w-[1200px] mx-auto w-full">
            {/* Accent divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[2px] h-5 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Experimental Division
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.02em] text-cream mb-6">
              We Bend Reality
              <br />
              <span className="text-accent italic">For Brands.</span>
            </h1>

            <p className="text-lg md:text-xl text-cream/60 max-w-xl mb-10 leading-relaxed">
              Where AI meets audacity. We build things that shouldn&apos;t be
              possible yet — and make them look effortless.
            </p>

            <Link
              href="/contact"
              className="group pointer-events-auto inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(232,90,63,0.4)]"
            >
              Step Inside the Lab
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-5 h-5 text-cream/25 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ━━━ CAPABILITIES ━━━ */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
          {/* Section header */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-[2px] h-5 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Capabilities
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream">
                  AI, engineering &amp; content —{' '}
                  <span className="text-accent italic">we do it all</span>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <ScrollReveal delay={0.2}>
                <p className="text-base text-cream/50 leading-relaxed">
                  No cookie-cutter solutions. We look at your problem fresh,
                  build something that actually fits, and plug it straight into
                  your existing setup.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Service cards — Aeos glassmorphic style */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="group relative rounded-[25px] border border-white/[0.12] bg-white/[0.03]
                             backdrop-blur-sm p-8 md:p-10
                             hover:border-accent/40 hover:bg-white/[0.05]
                             transition-all duration-500 ease-out"
                >
                  {/* Number */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-[2px] h-4 bg-accent/50" />
                      <span className="font-mono text-[11px] text-cream/25 group-hover:text-accent/60 transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <Icon className="w-5 h-5 text-cream/20 group-hover:text-accent transition-colors duration-300" />
                  </div>

                  <h3 className="text-cream text-xl font-semibold mb-3 tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="text-cream/45 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ━━━ DEEP DIVE SECTIONS ━━━ */}
      {deepDive.map((section, i) => {
        const Icon = section.icon
        const isReversed = i % 2 !== 0

        return (
          <section
            key={section.title}
            className={`relative overflow-hidden ${
              i % 2 === 0 ? 'bg-[#080808]' : 'bg-[#0d0d0d]'
            }`}
          >
            {/* Subtle glow */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isReversed
                  ? 'bg-[radial-gradient(ellipse_at_20%_50%,rgba(232,90,63,0.04),transparent_60%)]'
                  : 'bg-[radial-gradient(ellipse_at_80%_50%,rgba(232,90,63,0.04),transparent_60%)]'
              }`}
            />

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isReversed ? '' : ''
                }`}
              >
                {/* Text side */}
                <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
                  <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-[2px] h-5 bg-accent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                        {section.label}
                      </span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.1}>
                    <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream mb-8">
                      {section.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="text-accent italic">
                        {section.title.split(' ').slice(-1)}
                      </span>
                    </h2>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <p className="text-base text-cream/50 leading-[1.8] mb-6">
                      {section.body}
                    </p>
                  </ScrollReveal>

                  {section === deepDive[0] && (
                    <ScrollReveal delay={0.25}>
                      <p className="text-sm text-cream/35 italic">
                        {section.pullQuote}
                      </p>
                    </ScrollReveal>
                  )}
                </div>

                {/* Quote card — Aeos glassmorphic */}
                <div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>
                  <ScrollReveal delay={0.15}>
                    <div className="relative rounded-[25px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm p-10 md:p-14">
                      {/* Accent marker */}
                      <div
                        className={`absolute top-0 ${
                          isReversed ? 'right-10' : 'left-10'
                        } w-10 h-[2px] bg-accent`}
                      />

                      <Icon className="w-8 h-8 text-accent/40 mb-8" />

                      <p className="font-display text-xl md:text-2xl text-cream/90 leading-snug italic">
                        &ldquo;{section.pullQuote}&rdquo;
                      </p>

                      <div className="flex items-center gap-3 mt-8">
                        <div className="w-8 h-[1px] bg-cream/15" />
                        <span className="font-mono text-[10px] text-cream/30 uppercase tracking-[0.15em]">
                          {section.accent}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ━━━ AI EXPERIMENTS — Interactive Banner ━━━ */}
      <ExperimentsBanner />

      {/* ━━━ CTA ━━━ */}
      <section className="relative bg-[#080808] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
          <div className="relative rounded-[25px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm p-12 md:p-20 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,90,63,0.08),transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-cream/15" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">
                  Start a Project
                </span>
                <div className="w-8 h-[1px] bg-cream/15" />
              </div>

              <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] text-cream mb-6">
                Ready to build something{' '}
                <span className="text-accent italic">unhinged?</span>
              </h2>

              <p className="text-base text-cream/45 max-w-lg mx-auto mb-10 leading-relaxed">
                The future isn&apos;t coming — it&apos;s already here. Let&apos;s
                make something that breaks the internet.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(232,90,63,0.4)]"
              >
                Enter the Lab
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <div className="flex items-center justify-center gap-4 mt-14">
                <div className="w-12 h-[1px] bg-cream/10" />
                <span className="font-mono text-[10px] text-cream/25 tracking-wider">
                  management@darkbirdfilms.com
                </span>
                <div className="w-12 h-[1px] bg-cream/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
