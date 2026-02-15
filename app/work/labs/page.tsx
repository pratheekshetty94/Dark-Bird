'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import {
  Sparkles,
  Brain,
  Workflow,
  Eye,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'

/* ─── Data ─── */

const capabilities = [
  {
    icon: Sparkles,
    title: 'GenAI Marketing & Content',
    shortTitle: 'GenAI Content',
    description:
      'Content that hits different. We use AI to create marketing that actually stops the scroll — cinematic, on-trend, and absurdly fast to produce.',
    longDescription:
      "Imagine your audience starring in a movie trailer with their favourite actor. Or getting a custom lullaby generated for their kid. We're building the kind of hyper-personalised experiences that make people screenshot and share — not skip. This is a level of user personalisation never seen before.",
    pullQuote: 'Personalisation so good it feels like main character energy.',
    image: '/images/labs/ai-commercials.jpeg',
  },
  {
    icon: Brain,
    title: 'Custom LLM Deployments',
    shortTitle: 'Custom LLMs',
    description:
      'Your own AI brain, trained on your data. Not some generic chatbot — a language model that actually gets your business and plugs right into your stack.',
    longDescription:
      "Generic AI is mid. We build custom language models that live inside your tech stack and actually understand your business. Need smarter customer support? Automated content that sounds like your brand? Decisions backed by real data? We got you. Your data becomes your superpower.",
    pullQuote: 'From raw data to big moves — no middleman.',
    image: '/images/labs/ai-visual-experiments.jpeg',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    shortTitle: 'Automation',
    description:
      'We find the boring stuff in your workflow and delete it. AI agents that handle the grind so your team can focus on work that actually matters.',
    longDescription:
      "Let's be real — half your team's day is spent on tasks a robot could handle better. We identify the bottlenecks, build the automations, and give your people their time back. Less busywork, fewer errors, and your operations running like clockwork while you focus on the stuff that actually moves the needle.",
    pullQuote: 'Delete the busywork. Keep the brilliance.',
    image: '/images/labs/ai-launch-trailers.jpeg',
  },
  {
    icon: Eye,
    title: 'Vision Applications',
    shortTitle: 'Vision AI',
    description:
      'Teaching machines to see. From spotting defects on a factory line to generating wild visuals — if it involves pixels, we can make AI do something useful with them.',
    longDescription:
      "Computer vision that does real things — not just tech demos. We build solutions that recognize, analyse, and act on visual data. Quality control on production lines, security monitoring that never sleeps, video analysis at scale. If your business deals with images or footage, we can make that data work harder than it ever has.",
    pullQuote: 'Every pixel earns its keep.',
    image: '/images/labs/ai-music-videos.jpeg',
  },
]

const experiments = [
  { src: '/images/labs/ai-launch-trailers.jpeg', title: 'AI Launch Trailers' },
  { src: '/images/labs/ai-visual-experiments.jpeg', title: 'AI Visual Experiments' },
  { src: '/images/labs/ai-music-videos.jpeg', title: 'AI Music Videos' },
  { src: '/images/labs/ai-commercials.jpeg', title: 'AI Commercials' },
  { src: '/images/labs/ai-short-films.jpeg', title: 'AI Short Films' },
]

/* ─── What We Do — Interactive Section (Aeos-inspired) ─── */

function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = capabilities[activeIndex]
  const Icon = active.icon

  return (
    <section className="relative bg-[#080808] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-[2px] h-5 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              What We Do
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream mb-16 md:mb-20">
            AI, engineering &amp; content —{' '}
            <span className="text-accent italic">we do it all</span>
          </h2>
        </ScrollReveal>

        {/* Interactive card — cream/light background like Aeos */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-[25px] bg-cream/[0.04] border border-white/[0.1] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left nav — service list */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/[0.06] p-6 md:p-10">
                <div className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible">
                  {capabilities.map((cap, i) => (
                    <button
                      key={cap.title}
                      onClick={() => setActiveIndex(i)}
                      className={`group flex items-center gap-4 text-left w-full py-3 lg:py-5 px-4 lg:px-0 rounded-xl lg:rounded-none whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${
                        i !== capabilities.length - 1
                          ? 'lg:border-b lg:border-white/[0.06]'
                          : ''
                      } ${
                        i === activeIndex
                          ? 'bg-white/[0.06] lg:bg-transparent'
                          : ''
                      }`}
                    >
                      {/* Number */}
                      <span
                        className={`hidden lg:block font-mono text-[11px] transition-colors duration-300 shrink-0 ${
                          i === activeIndex
                            ? 'text-accent'
                            : 'text-cream/20'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Title + accent underline */}
                      <div className="relative">
                        <span
                          className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
                            i === activeIndex
                              ? 'text-cream'
                              : 'text-cream/40 group-hover:text-cream/60'
                          }`}
                        >
                          <span className="hidden lg:inline">{cap.title}</span>
                          <span className="lg:hidden">{cap.shortTitle}</span>
                        </span>
                        {/* Active underline */}
                        <div
                          className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${
                            i === activeIndex ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>

                      {/* Arrow on active */}
                      <ArrowRight
                        className={`hidden lg:block w-4 h-4 ml-auto shrink-0 transition-all duration-300 ${
                          i === activeIndex
                            ? 'text-accent opacity-100 translate-x-0'
                            : 'text-cream/20 opacity-0 -translate-x-2'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right content — image + description */}
              <div className="lg:col-span-8 p-6 md:p-10">
                {/* Image */}
                <div className="relative aspect-[16/9] rounded-[18px] overflow-hidden mb-8 border border-white/[0.06]">
                  {capabilities.map((cap, i) => (
                    <Image
                      key={cap.title}
                      src={cap.image}
                      alt={cap.title}
                      fill
                      className={`object-cover transition-all duration-700 ease-out ${
                        i === activeIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-[1.03]'
                      }`}
                      sizes="(max-width: 1024px) 100vw, 800px"
                      priority={i === 0}
                    />
                  ))}
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text content */}
                <div className="flex items-start gap-4 mb-6">
                  <Icon className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="text-cream text-xl md:text-2xl font-display mb-1">
                      {active.title}
                    </h3>
                    <span className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.15em]">
                      {active.shortTitle}
                    </span>
                  </div>
                </div>

                <p className="text-cream/50 text-sm md:text-base leading-[1.8] mb-6">
                  {active.longDescription}
                </p>

                {/* Pull quote */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-accent/40" />
                  <p className="font-display text-sm text-cream/70 italic">
                    {active.pullQuote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

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

      {/* ━━━ WHAT WE DO — Interactive (Aeos-inspired) ━━━ */}
      <WhatWeDo />

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
