'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePreloader } from '@/components/preloader/PreloaderWrapper'
import { ArrowUpRight } from 'lucide-react'

export default function SplineHero() {
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [showSpline, setShowSpline] = useState(false)
  const { isComplete: preloaderComplete } = usePreloader()

  // Delay loading Spline until after preloader
  useEffect(() => {
    if (preloaderComplete) {
      const timer = setTimeout(() => {
        setShowSpline(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [preloaderComplete])

  return (
    <section className="relative h-screen overflow-hidden bg-ink">
      {/* Loading skeleton */}
      {!splineLoaded && (
        <div className="absolute inset-0 z-5 flex items-center justify-center bg-ink">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span className="text-warm-gray text-sm">Loading Experience...</span>
          </div>
        </div>
      )}

      {/* Spline 3D Background - Full Interactive */}
      <div className={cn(
        "absolute inset-0 z-10 transition-opacity duration-1000",
        splineLoaded ? "opacity-100" : "opacity-0"
      )}>
        {showSpline && (
          <iframe
            src='https://my.spline.design/kingfisherinmotion-5yhKkvqpaQHj7H2EDnE8Vzd8/'
            frameBorder='0'
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            allow="autoplay"
            loading="eager"
            onLoad={() => setSplineLoaded(true)}
          />
        )}
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent z-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent z-15 pointer-events-none" />

      {/* Hero Content - Bottom Left */}
      <div className="absolute bottom-0 left-0 z-20 px-6 md:px-12 lg:px-20 pb-20 md:pb-28 pointer-events-none">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-medium tracking-wider uppercase">
              Film Production & Creative Studio
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-6">
            We Tell Stories
            <br />
            <span className="text-accent">That Move.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-warm-gray max-w-xl leading-relaxed mb-8">
            Award-winning films, compelling brand stories, and cutting-edge AI content creation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pointer-events-auto">
            <Link
              href="/filmography"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-ink font-semibold rounded-full hover:bg-cream transition-colors"
            >
              View Our Work
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-cream/30 text-cream font-medium rounded-full hover:bg-cream/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-warm-gray text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-warm-gray to-transparent" />
        </div>
      </div>
    </section>
  )
}
