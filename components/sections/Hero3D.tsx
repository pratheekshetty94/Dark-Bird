'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowUpRight, Play } from 'lucide-react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

// Dynamic import for 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/three/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  ),
})

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Animate heading characters
    if (headingRef.current) {
      const text = headingRef.current.innerText
      headingRef.current.innerHTML = ''

      const words = text.split(' ')
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span')
        wordSpan.style.display = 'inline-block'
        wordSpan.style.marginRight = '0.3em'

        word.split('').forEach((char) => {
          const charSpan = document.createElement('span')
          charSpan.innerText = char
          charSpan.style.display = 'inline-block'
          charSpan.style.opacity = '0'
          charSpan.style.transform = 'translateY(100px) rotateX(-90deg)'
          charSpan.className = 'char'
          wordSpan.appendChild(charSpan)
        })

        headingRef.current?.appendChild(wordSpan)
      })

      gsap.to('.char', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.03,
        delay: 0.5,
        ease: 'power4.out',
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* 3D Scene */}
      <Scene3D />

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Low-key backlight glow */}
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] -translate-y-1/2 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232, 90, 63, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {/* Label */}
          <div
            className={cn(
              'flex items-center gap-4 mb-8 transition-all duration-1000',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Award-Winning Production House
            </span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="font-display text-[clamp(3rem,12vw,9rem)] text-white leading-[0.9] tracking-tight mb-8"
            style={{ perspective: '1000px' }}
          >
            Dark Bird Films
          </h1>

          {/* Subheading */}
          <p
            className={cn(
              'text-xl md:text-2xl text-white/60 max-w-xl mb-12 transition-all duration-1000 delay-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            We tell stories that <em className="text-white not-italic">move</em> people
            and <em className="text-accent not-italic">grow</em> brands.
          </p>

          {/* CTAs */}
          <div
            className={cn(
              'flex flex-wrap items-center gap-6 transition-all duration-1000 delay-1000',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-accent hover:text-white transition-all duration-300"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <button
              data-cursor="play"
              className="group flex items-center gap-3 px-6 py-4 border border-white/20 text-white font-medium rounded-full hover:border-white/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Play className="w-4 h-4 text-accent ml-0.5" />
              </div>
              Watch Showreel
            </button>
          </div>
        </div>

        {/* Stats - Bottom right */}
        <div
          className={cn(
            'absolute bottom-12 right-12 hidden lg:flex gap-12 transition-all duration-1000 delay-1200',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-right">
            <span className="block font-display text-4xl text-white">375M+</span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Video Views</span>
          </div>
          <div className="text-right">
            <span className="block font-display text-4xl text-white">2</span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">National Awards</span>
          </div>
          <div className="text-right">
            <span className="block font-display text-4xl text-white">100+</span>
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Brand Films</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={cn(
            'absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-1400',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  )
}
