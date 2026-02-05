'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowUpRight, Play, ArrowDown } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import TextSplit, { TextScramble } from '@/components/animations/TextSplit'
import InfiniteMarquee from '@/components/sections/InfiniteMarquee'

gsap.registerPlugin(ScrollTrigger)

// Dynamic import for 3D scene
const Scene3D = dynamic(() => import('@/components/three/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  ),
})

const clients = [
  'Google', 'Flipkart', 'Netflix', 'Zomato', 'Disney+',
  'Amazon', 'Hombale', 'Jio Studios', 'Shopsy', 'Delhivery',
]

const projects = [
  {
    id: 'kantara',
    title: 'Kantara',
    category: 'Feature Film',
    year: '2022',
    image: '/images/work/kantara.jpg',
    video: '/videos/kantara-banner.mp4',
  },
  {
    id: '777-charlie',
    title: '777 Charlie',
    category: 'Feature Film',
    year: '2022',
    image: '/images/work/777-charlie.jpg',
    video: '/videos/777-charlie-banner.mp4',
  },
  {
    id: 'flipkart',
    title: 'Flipkart Campaign',
    category: 'Brand Film',
    year: '2023',
    image: '/images/work/flipkart.jpg',
    video: '/videos/flipkart-banner.mp4',
  },
]

export default function ExperimentalPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Animate heading with character split
    if (headingRef.current) {
      const text = headingRef.current.innerText
      headingRef.current.innerHTML = ''

      const lines = text.split('\n')
      lines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div')
        lineDiv.className = 'overflow-hidden'

        const words = line.split(' ')
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'inline-block mr-[0.3em]'

          word.split('').forEach((char) => {
            const charSpan = document.createElement('span')
            charSpan.innerText = char
            charSpan.className = 'inline-block char'
            charSpan.style.opacity = '0'
            charSpan.style.transform = 'translateY(100%)'
            wordSpan.appendChild(charSpan)
          })

          lineDiv.appendChild(wordSpan)
        })

        headingRef.current?.appendChild(lineDiv)
      })

      gsap.to('.char', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        delay: 0.3,
        ease: 'power4.out',
      })
    }

    // Parallax effect on scroll
    gsap.to('.hero-content', {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <div className="bg-black text-white">
      {/* Hero Section with 3D */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* 3D Background */}
        <Scene3D />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        {/* Backlight glow */}
        <div
          className="absolute top-1/2 right-1/4 w-[800px] h-[800px] -translate-y-1/2 z-5 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232, 90, 63, 0.12) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Content */}
        <div className="hero-content relative z-20 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl">
            {/* Tag */}
            <div
              className={cn(
                'flex items-center gap-4 mb-8 transition-all duration-1000',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
            >
              <span className="w-16 h-px bg-white/30" />
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">
                Cinematic Storytelling
              </span>
            </div>

            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-[0.95] tracking-tight mb-8"
            >
              Dark Bird Films
            </h1>

            {/* Subtitle with scramble effect */}
            <div className={cn(
              'transition-all duration-1000 delay-500',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}>
              <TextScramble
                className="text-xl md:text-2xl text-white/40 max-w-xl font-light"
              >
                Stories that move people. Films that grow brands.
              </TextScramble>
            </div>

            {/* CTA */}
            <div
              className={cn(
                'flex items-center gap-6 mt-12 transition-all duration-1000 delay-700',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
            >
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-medium hover:bg-accent hover:text-white transition-all duration-300"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <button
                data-cursor="play"
                className="group flex items-center gap-3 px-6 py-4 border border-white/20 text-white/80 hover:border-white/50 hover:text-white transition-all"
              >
                <Play className="w-4 h-4" />
                Showreel
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={cn(
            'absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-white/30 animate-bounce" />
        </div>

        {/* Side stats */}
        <div
          className={cn(
            'absolute bottom-12 right-12 hidden lg:block z-20 transition-all duration-1000 delay-900',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex flex-col gap-8 text-right">
            <div>
              <span className="block font-display text-5xl text-white">375M</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Views</span>
            </div>
            <div>
              <span className="block font-display text-5xl text-white">2</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
        <InfiniteMarquee
          items={clients.map(c => ({ type: 'text', content: c }))}
          speed={35}
          separator={<span className="mx-12 text-white/10">•</span>}
        />
      </section>

      {/* Featured Work with Video Hover */}
      <section className="py-32 bg-black">
        <div className="px-6 md:px-12 lg:px-20 mb-16">
          <TextSplit type="words" className="font-display text-6xl md:text-7xl text-white mb-4">
            Selected Work
          </TextSplit>
          <p className="text-white/40 text-lg max-w-lg">
            Award-winning films and campaigns that captivated millions.
          </p>
        </div>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              data-cursor="view"
              className="group block border-t border-white/10 hover:bg-white/5 transition-colors duration-500"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="px-6 md:px-12 lg:px-20 py-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <span className="font-mono text-sm text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-12">
                  <span className="hidden md:block font-mono text-sm text-white/30 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="font-mono text-sm text-white/30">
                    {project.year}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>

              {/* Video preview */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-500',
                  activeProject === project.id ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-6 md:px-12 lg:px-20 pb-8">
                  <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative">
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="px-6 md:px-12 lg:px-20 mt-12">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors"
          >
            <span className="font-mono text-sm uppercase tracking-wider">View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Text Section with Split Animation */}
      <section className="py-32 bg-black">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                About Us
              </span>
            </div>

            <TextSplit
              type="words"
              stagger={0.03}
              className="font-display text-4xl md:text-6xl text-white leading-[1.1] mb-8"
            >
              We approach every project like a film — with emotion, detail, and purpose.
            </TextSplit>

            <TextSplit
              type="lines"
              delay={0.5}
              className="text-xl text-white/40 max-w-2xl"
            >
              From the first idea to the final cut, we make sure your story doesn't just look good — it leaves an impact.
            </TextSplit>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Backlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232, 90, 63, 0.1) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />

        <div className="relative z-10 text-center px-6 md:px-12 lg:px-20">
          <TextSplit
            type="chars"
            stagger={0.015}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8"
          >
            Let's Create Something
          </TextSplit>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-medium hover:bg-accent hover:text-white transition-all duration-300 mt-8"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
