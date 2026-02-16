'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerReveal } from '@/components/animations/ScrollReveal'
import {
  Sparkles,
  Brain,
  Workflow,
  Eye,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Lightbulb,
  Wrench,
  Plus,
  Minus,
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
    image: '/images/labs/labs-genai-marketing.png',
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
    image: '/images/labs/labs-custom-llm.png',
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
    image: '/images/labs/labs-workflow-automation.png',
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
    image: '/images/labs/labs-vision-applications.png',
  },
]

const projects = [
  {
    title: 'AI Avatar & Digital Twins',
    tag: 'BUILT IN 2025',
    description:
      'Autonomous virtual influencers and founder digital twins that speak, present, and create content across platforms. From personality design to daily posts — consistent brand voice at infinite scale.',
    image: '/images/labs/labs-project-founder-avatar.png',
    color: '#E85A3F',
    category: 'Avatar',
  },
  {
    title: 'AI VFX & Special Effects',
    tag: 'BUILT IN 2025',
    description:
      'Hollywood-grade visual effects without the Hollywood budget. AI-driven compositing, rotoscoping, and particle systems.',
    image: '/images/labs/labs-project-vfx.png',
    color: '#7B68EE',
    category: 'Production',
  },
  {
    title: 'AI Motion Graphics',
    tag: 'BUILT IN 2025',
    description:
      'Kinetic typography, logo animations, and dynamic graphics generated at speed. From brief to render in hours, not weeks.',
    image: '/images/labs/labs-project-motion-graphics.png',
    color: '#4ECDC4',
    category: 'Production',
  },
  {
    title: 'AI Launch Trailers',
    tag: 'BUILT IN 2024',
    description:
      'Cinematic product trailers crafted with AI — storyboarded, scored, and edited to create maximum anticipation.',
    image: '/images/labs/ai-launch-trailers.jpeg',
    color: '#FF6B6B',
    category: 'Content',
  },
  {
    title: 'AI Music Videos',
    tag: 'BUILT IN 2024',
    description:
      'Generative visual storytelling synced to rhythm and emotion. Every frame a painting, every beat a scene change.',
    image: '/images/labs/labs-project-music-videos.png',
    color: '#45B7D1',
    category: 'Content',
  },
  {
    title: 'AI Commercials',
    tag: 'BUILT IN 2024',
    description:
      'From concept to final cut — ads that feel premium but move at startup speed. Hyper-personalised variants at scale.',
    image: '/images/labs/ai-commercials.jpeg',
    color: '#FFA07A',
    category: 'Content',
  },
  {
    title: 'AI Short Films',
    tag: 'BUILT IN 2024',
    description:
      'Narrative-driven short films where AI handles the heavy lifting — world-building, character design, and post-production.',
    image: '/images/labs/labs-project-short-films.png',
    color: '#DDA0DD',
    category: 'Content',
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Understand',
    icon: Search,
    description:
      'We sit with your team, learn the pain points, and figure out where AI actually makes sense — not where it sounds cool.',
    details: [
      'Honest audit of what AI can and can\'t fix for you',
      'Map your content pipeline, production workflow, and bottlenecks',
      'Talk to the people doing the work — not just management',
      'Set clear goals: what does "working" actually look like?',
    ],
  },
  {
    step: 2,
    title: 'Build',
    icon: Lightbulb,
    description:
      'We prototype fast, break things on purpose, and keep iterating until the output is something we\'d stake our name on.',
    details: [
      'Rapid prototyping — working demos in days, not months',
      'Fine-tune models on your brand voice and visual language',
      'Test with real content, real scenarios, real edge cases',
      'Wire it into the tools your team already uses',
    ],
  },
  {
    step: 3,
    title: 'Ship',
    icon: Wrench,
    description:
      'We don\'t hand over a deck and disappear. We deploy, babysit the first run, and stick around until your team owns it.',
    details: [
      'Go live with guardrails and real-time monitoring',
      'Optimise for speed and cost — nobody wants a slow, expensive AI',
      'Train your team to run it without us',
      'Monthly check-ins to iterate based on what\'s actually happening',
    ],
  },
]

/* ─── Vertical Service Cards — Alternating Layout ─── */

function ServiceShowcase() {
  return (
    <section className="relative bg-[#080808]/80 backdrop-blur-sm overflow-hidden border-t border-white/[0.04]">
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
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream mb-6">
            AI, engineering &amp; content —{' '}
            <span className="text-accent italic">we do it all</span>
          </h2>
          <p className="text-base text-cream/40 max-w-2xl leading-relaxed mb-16 md:mb-24">
            Four core capabilities, one unified lab. Each service is built to
            plug into the others — so your AI strategy compounds, not
            fragments.
          </p>
        </ScrollReveal>

        {/* Service cards — alternating left/right with vertical images */}
        <div className="space-y-20 md:space-y-32">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            const isEven = i % 2 === 0

            return (
              <ScrollReveal key={cap.title} delay={0.05}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:direction-rtl'
                  }`}
                >
                  {/* Vertical image */}
                  <div
                    className={`relative ${isEven ? '' : 'lg:order-2'}`}
                  >
                    <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden group">
                      <Image
                        src={cap.image}
                        alt={cap.title}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 550px"
                        unoptimized
                      />
                      {/* Gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />

                      {/* Number watermark */}
                      <div className="absolute top-6 left-6">
                        <span className="font-mono text-[11px] text-cream/20 tracking-wider">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                          <span className="font-mono text-[10px] text-accent/70 uppercase tracking-[0.15em]">
                            {cap.shortTitle}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl text-cream leading-tight">
                          {cap.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="lg:max-w-md">
                      <p className="text-cream/60 text-base md:text-lg leading-[1.8] mb-6">
                        {cap.description}
                      </p>
                      <p className="text-cream/40 text-sm leading-[1.8] mb-8">
                        {cap.longDescription}
                      </p>

                      {/* Pull quote */}
                      <div className="border-l-2 border-accent/40 pl-5 mb-8">
                        <p className="font-display text-base text-cream/70 italic">
                          &ldquo;{cap.pullQuote}&rdquo;
                        </p>
                      </div>

                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-300 hover:gap-3"
                      >
                        Explore this capability
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Full-Screen Banner ─── */

function FullScreenBanner({
  image,
  alt,
  label,
  heading,
  headingAccent,
  description,
  align = 'right',
}: {
  image: string
  alt: string
  label: string
  heading: string
  headingAccent: string
  description: string
  align?: 'left' | 'right'
}) {
  const isLeft = align === 'left'

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[50vh] min-h-[400px] md:h-[60vh]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className={`absolute inset-0 ${isLeft ? 'bg-gradient-to-r from-ink/95 via-ink/70 to-transparent' : 'bg-gradient-to-l from-ink/95 via-ink/70 to-transparent'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />

        <div className="absolute inset-0 flex items-center">
          <div className={`max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xl ${isLeft ? 'lg:text-left' : 'lg:text-right'}`}>
              <ScrollReveal>
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-accent/80 mb-4 block">
                  {label}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] text-cream mb-4">
                  {heading}{' '}
                  <span className="text-accent italic">
                    {headingAccent}
                  </span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className={`text-cream/50 text-sm md:text-base max-w-lg leading-relaxed ${isLeft ? '' : 'lg:ml-auto'}`}>
                  {description}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Process / How We Work ─── */

function ProcessSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <section className="relative bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden border-t border-white/[0.04]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-[2px] h-5 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              How We Work
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream mb-6">
            How we actually{' '}
            <span className="text-accent italic">get it done</span>
          </h2>
          <p className="text-base text-cream/40 max-w-xl leading-relaxed mb-16 md:mb-24">
            No fluff, no 47-slide decks. Three phases that take you from
            &ldquo;we should try AI&rdquo; to &ldquo;this is live and printing money.&rdquo;
          </p>
        </ScrollReveal>

        {/* Process steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {processSteps.map((step, i) => {
            const Icon = step.icon
            const isExpanded = expandedStep === i

            return (
              <ScrollReveal key={step.title} delay={0.1 * i}>
                <div className="relative">
                  {/* Step indicator line — desktop only */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-[1px] bg-gradient-to-r from-stone/30 to-transparent z-0" />
                  )}

                  <div className="relative z-10">
                    {/* Step number */}
                    <span className="font-mono text-[10px] text-accent/50 uppercase tracking-[0.2em] mb-4 block">
                      ( Step {String(step.step).padStart(2, '0')} )
                    </span>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl border border-stone/20 bg-charcoal/50 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-cream/60" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-cream mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-cream/40 text-sm leading-[1.8] mb-6">
                      {step.description}
                    </p>

                    {/* Expandable details */}
                    <button
                      onClick={() =>
                        setExpandedStep(isExpanded ? null : i)
                      }
                      className="group flex items-center gap-2 text-sm font-medium text-cream/50 hover:text-accent transition-colors duration-300 mb-4"
                    >
                      <span className="w-5 h-5 rounded-full border border-stone/30 flex items-center justify-center transition-all duration-300 group-hover:border-accent/50">
                        {isExpanded ? (
                          <Minus className="w-3 h-3" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                      </span>
                      {isExpanded ? 'Less detail' : 'More detail'}
                    </button>

                    {/* Accordion content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'max-h-[300px] opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="space-y-3 pt-2">
                        {step.details.map((detail, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm text-cream/35 leading-relaxed"
                          >
                            <div className="w-1 h-1 rounded-full bg-accent/40 mt-2 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Projects Carousel ─── */

function ProjectsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    const cardWidth = el.querySelector('[data-card]')?.clientWidth ?? 300
    const gap = 20
    const idx = Math.round(el.scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(idx, projects.length - 1))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-card]')?.clientWidth ?? 300
    const gap = 20
    const amount = (cardWidth + gap) * 2
    el.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative bg-[#080808]/80 backdrop-blur-sm overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-40 pb-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[2px] h-5 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              We Ship. All the Time.
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream mb-4">
                AI Visual{' '}
                <span className="text-accent italic">Experiments</span>
              </h2>
              <p className="text-sm md:text-base text-cream/40 max-w-lg leading-relaxed">
                From concept to deployment — every project is a live experiment
                in what AI-powered creative production can become.
              </p>
            </div>

            {/* Desktop nav arrows */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-cream/20 text-cream hover:border-accent hover:text-accent hover:bg-accent/5'
                    : 'border-white/[0.06] text-cream/15 cursor-not-allowed'
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-cream/20 text-cream hover:border-accent hover:text-accent hover:bg-accent/5'
                    : 'border-white/[0.06] text-cream/15 cursor-not-allowed'
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Carousel */}
      <ScrollReveal delay={0.15}>
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-16 md:pb-24 pl-6 md:pl-12 lg:pl-[calc((100vw-1200px)/2+80px)] pr-6 md:pr-12"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              data-card
              className="group shrink-0 w-[280px] md:w-[320px] rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#0f0f0f] transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="320px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />

                {/* Category tag */}
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider backdrop-blur-md"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Number */}
                <div className="absolute bottom-4 left-5">
                  <span className="font-mono text-[11px] text-cream/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="text-cream font-display text-lg md:text-xl leading-tight mb-2">
                  {project.title}
                </h3>

                <p className="text-cream/35 text-sm leading-[1.7] mb-5 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: project.color }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/25">
                    {project.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Ghost card */}
          <div className="shrink-0 w-[280px] md:w-[320px] rounded-[20px] overflow-hidden border border-dashed border-white/[0.08] bg-transparent flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-accent/40" />
            </div>
            <p className="font-display text-cream/30 text-lg mb-2">
              More Shipping Soon
            </p>
            <p className="text-cream/15 text-xs font-mono">
              The lab never sleeps
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 pb-16 md:pb-24">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current
              if (!el) return
              const cardWidth =
                el.querySelector('[data-card]')?.clientWidth ?? 300
              const gap = 20
              el.scrollTo({
                left: i * (cardWidth + gap),
                behavior: 'smooth',
              })
            }}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? 'w-6 h-2 bg-accent'
                : 'w-2 h-2 bg-cream/15 hover:bg-cream/25'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

/* ─── Page ─── */

export default function LabsPage() {
  return (
    <>
      {/* ━━━ FIXED NEBULA BACKGROUND ━━━ */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/labs/labs-bg-nebula.jpg"
          alt=""
          fill
          className="object-cover blur-[2px] scale-110"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-[#080808]/85" />
      </div>

      {/* ━━━ HERO: Spline + Content ━━━ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[#080808]">
        {/* Spline 3D background — positioned left/center */}
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

        {/* Overlays */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none z-[1]" />

        {/* Hero content — centre bottom */}
        <div className="relative z-[2] min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 pointer-events-none">
          <div className="max-w-[1200px] mx-auto w-full text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-[2px] h-5 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Experimental Division
              </span>
              <div className="w-[2px] h-5 bg-accent" />
            </div>

            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.02em] text-cream mb-6">
              We Bend Reality
              <br />
              <span className="text-accent italic">For Brands.</span>
            </h1>

            <p className="text-lg md:text-xl text-cream/60 max-w-xl mx-auto mb-10 leading-relaxed">
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

      {/* ━━━ SERVICES — Vertical Big Images ━━━ */}
      <ServiceShowcase />

      {/* ━━━ BANNER 1 — Hilltop ━━━ */}
      <FullScreenBanner
        image="/images/labs/labs-banner-hilltop.png"
        alt="Boy and robot filming on a hilltop at sunset"
        label="Built Different"
        heading="We don't just use AI —"
        headingAccent="we build with it."
        description="Every tool we ship started as a problem we faced on set or in the edit room. Real solutions, born from real production workflows."
        align="left"
      />

      {/* ━━━ PROCESS — How We Work ━━━ */}
      <ProcessSection />

      {/* ━━━ BANNER 2 — Workshop ━━━ */}
      <FullScreenBanner
        image="/images/labs/labs-banner-workshop.png"
        alt="Boy tinkering with AI-powered film machines in a workshop"
        label="Our Workshop"
        heading="Where craft meets"
        headingAccent="computation."
        description="Part film studio, part engineering lab. We prototype fast, test obsessively, and only ship what actually works in the real world."
      />

      {/* ━━━ AI EXPERIMENTS — Projects Carousel ━━━ */}
      <ProjectsCarousel />

      {/* ━━━ BANNER 3 — Projector ━━━ */}
      <FullScreenBanner
        image="/images/labs/labs-banner-projector.png"
        alt="Boy sitting on a giant projector beaming stories into the night sky"
        label="The Vision"
        heading="Stories told by humans,"
        headingAccent="scaled by machines."
        description="AI handles the heavy lifting so creators can focus on what matters — the story, the emotion, the craft that makes people feel something."
      />

      {/* ━━━ CTA ━━━ */}
      <section className="relative bg-[#080808]/80 backdrop-blur-sm overflow-hidden border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
          <div className="relative rounded-[25px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-md p-12 md:p-20 text-center overflow-hidden">
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
                The future isn&apos;t coming — it&apos;s already here.
                Let&apos;s make something that breaks the internet.
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
