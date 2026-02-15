'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import {
  Cpu,
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

const deepDive = [
  {
    label: 'What We Build',
    icon: Sparkles,
    title: 'Magical customer experiences',
    body: 'Allow your customers & audience to be part of a movie trailer with their favourite actor or create a custom lullaby for their kids. Create unique marketing experiences & content to maximise reach and engagement.',
    pullQuote: 'This is a level of user personalisation never seen before.',
    accent: 'Personalisation at scale',
  },
  {
    label: 'Custom LLMs',
    icon: Brain,
    title: 'Intelligence built for you',
    body: "Improve your business's decision-making, automate content generation or handle customer queries at scale. We integrate seamlessly with your existing tech stack — these LLMs are tailored to meet your specific needs, enabling more effective communication and smarter decision-making processes. Let us help you transform your data into decisions, and decisions into action.",
    pullQuote: 'Transform data into decisions, and decisions into action.',
    accent: 'Custom language models',
  },
  {
    label: 'Automation',
    icon: Workflow,
    title: 'Efficiency maxed',
    body: 'Work with us to identify bottlenecks in your organisation. Automate your day-to-day tasks with our Workflow Automation services. We focus on eliminating manual work wherever possible, from data processing to complex operational tasks, freeing up time to focus on more important things. Ensure that your business runs smoothly and efficiently, with consistent quality and reduced chances for errors.',
    pullQuote: 'Eliminate manual work, focus on what matters.',
    accent: 'End-to-end automation',
  },
  {
    label: 'Vision',
    icon: Eye,
    title: 'Convert Pixels to Action',
    body: 'Use computer vision technology to provide practical, real-world solutions for your business. From recognizing faces and objects in images to analyzing video footage, we can help you automate and refine processes that require visual data interpretation. These applications are ideal for improving security, monitoring, quality control and operational efficiency across various sectors.',
    pullQuote: 'Convert pixels to action.',
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

        {/* Layered overlays — Aeos-style depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080808_80%)] pointer-events-none" />

        {/* Hero content — bottom-aligned */}
        <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
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
              AI-driven films and brand visuals that feel bold, cinematic, and
              culturally current.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(232,90,63,0.4)]"
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
                  We bring AI, engineering &amp; content{' '}
                  <span className="text-accent italic">expertise</span>
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <ScrollReveal delay={0.2}>
                <p className="text-base text-cream/50 leading-relaxed">
                  Each problem is looked at from a fresh lens to provide you
                  with a solution that solves your specific requirements and
                  integrates with your existing infrastructure.
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

      {/* ━━━ AI EXPERIMENTS GALLERY ━━━ */}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-cream">
                  AI Visual <span className="text-accent italic">Experiments</span>
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {experiments.map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[3/4] rounded-[20px] overflow-hidden
                           border border-white/[0.08] hover:border-accent/25
                           transition-all duration-500"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Persistent bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-[2px] h-3 bg-accent" />
                    <span className="font-mono text-[9px] md:text-[10px] text-cream/80 uppercase tracking-[0.15em]">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

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
                Ready to Explore the{' '}
                <span className="text-accent italic">Future?</span>
              </h2>

              <p className="text-base text-cream/45 max-w-lg mx-auto mb-10 leading-relaxed">
                Let&apos;s push the boundaries of what&apos;s possible with
                AI-powered creativity.
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
