'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LogoHero() {
  const [phase, setPhase] = useState(0)
  // Phase 0: Initial state (hidden)
  // Phase 1: Logo scales up dramatically
  // Phase 2: Logo settles, glow appears
  // Phase 3: Tagline fades in
  // Phase 4: Buttons and scroll indicator appear

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),    // Start animation
      setTimeout(() => setPhase(2), 1200),   // Logo settles
      setTimeout(() => setPhase(3), 2000),   // Tagline appears
      setTimeout(() => setPhase(4), 2800),   // Buttons appear
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink flex items-center justify-center">
      {/* Animated Background Glow */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-[2000ms] ease-out",
          phase >= 2 ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(232, 90, 63, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Animated Lines - Left */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent transition-all duration-1000",
          phase >= 2 ? "opacity-100 left-[10%]" : "opacity-0 left-0"
        )}
        style={{ transitionDelay: '0.3s' }}
      />
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent transition-all duration-1000",
          phase >= 2 ? "opacity-100 left-[5%]" : "opacity-0 left-0"
        )}
        style={{ transitionDelay: '0.5s' }}
      />

      {/* Animated Lines - Right */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent transition-all duration-1000",
          phase >= 2 ? "opacity-100 right-[10%]" : "opacity-0 right-0"
        )}
        style={{ transitionDelay: '0.3s' }}
      />
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent transition-all duration-1000",
          phase >= 2 ? "opacity-100 right-[5%]" : "opacity-0 right-0"
        )}
        style={{ transitionDelay: '0.5s' }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo Container with Dramatic Animation */}
        <div className="relative">
          {/* Glow Effect Behind Logo */}
          <div
            className={cn(
              "absolute inset-0 blur-3xl transition-all duration-[2000ms]",
              phase >= 2 ? "opacity-60 scale-100" : "opacity-0 scale-50"
            )}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232, 90, 63, 0.4) 0%, transparent 70%)',
            }}
          />

          {/* Logo with Cinematic Scale Animation */}
          <div
            className={cn(
              "relative transition-all ease-[cubic-bezier(0.16,1,0.3,1)]",
              phase === 0 && "opacity-0 scale-[0.3] blur-sm",
              phase === 1 && "opacity-100 scale-[1.15] blur-0 duration-[1200ms]",
              phase >= 2 && "opacity-100 scale-100 blur-0 duration-[800ms]"
            )}
          >
            <Image
              src="/images/logo.png"
              alt="Dark Bird Films"
              width={800}
              height={300}
              className="h-48 md:h-64 lg:h-80 xl:h-96 w-auto mx-auto object-contain"
              priority
            />
          </div>

          {/* Shimmer Effect on Logo */}
          <div
            className={cn(
              "absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500",
              phase >= 2 ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className="absolute inset-0 -translate-x-full animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Tagline with Typing/Reveal Effect */}
        <div className="mt-12 overflow-hidden">
          <p
            className={cn(
              'font-mono text-base md:text-lg uppercase tracking-[0.4em] text-cream/70 transition-all duration-1000 ease-out',
              phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Stories that move. Brands that grow.
          </p>
        </div>

        {/* Accent Line Below Tagline */}
        <div
          className={cn(
            "mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1000 ease-out",
            phase >= 3 ? "w-48 md:w-64 opacity-100" : "w-0 opacity-0"
          )}
          style={{ transitionDelay: '0.3s' }}
        />

        {/* CTA Buttons */}
        <div
          className={cn(
            'mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out',
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Link href="/work" className="btn-primary group">
            View Our Work
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <Link href="/contact" className="btn-ghost">
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-gray hover:text-cream transition-all duration-1000',
          phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        aria-label="Scroll to content"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-warm-gray to-transparent animate-bounce-slow" />
      </button>

      {/* Corner Accents */}
      <div
        className={cn(
          "absolute top-8 left-8 transition-all duration-1000",
          phase >= 3 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-12 h-px bg-accent/40" />
        <div className="w-px h-12 bg-accent/40" />
      </div>
      <div
        className={cn(
          "absolute top-8 right-8 transition-all duration-1000",
          phase >= 3 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-12 h-px bg-accent/40 ml-auto" />
        <div className="w-px h-12 bg-accent/40 ml-auto" />
      </div>
      <div
        className={cn(
          "absolute bottom-8 left-8 transition-all duration-1000",
          phase >= 3 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-px h-12 bg-accent/40" />
        <div className="w-12 h-px bg-accent/40" />
      </div>
      <div
        className={cn(
          "absolute bottom-8 right-8 transition-all duration-1000",
          phase >= 3 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-px h-12 bg-accent/40 ml-auto" />
        <div className="w-12 h-px bg-accent/40 ml-auto" />
      </div>

      {/* Side Info */}
      <div
        className={cn(
          "absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-all duration-1000",
          phase >= 4 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent/50" />
        <span className="font-mono text-[10px] text-accent/70 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          Est. 2016
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>

      <div
        className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-all duration-1000",
          phase >= 4 ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent/50" />
        <span className="font-mono text-[10px] text-accent/70 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          Bengaluru
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  )
}
