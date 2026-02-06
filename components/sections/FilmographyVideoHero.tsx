'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  videoSrc: string
  href: string
  year?: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 'kantara',
    title: 'Kantara',
    subtitle: 'National Award Winner',
    videoSrc: '/videos/kantara-banner.mp4',
    href: '/filmography/kantara',
    year: '2022',
  },
  {
    id: '777-charlie',
    title: '777 Charlie',
    subtitle: 'State Award for Best Editing',
    videoSrc: '/videos/777-charlie-banner.mp4',
    href: '/filmography/777-charlie',
    year: '2022',
  },
  {
    id: 'gandhada-gudi',
    title: 'Gandhada Gudi',
    subtitle: 'A Tribute to Karnataka',
    videoSrc: '/videos/gandhada-gudi-banner.mp4',
    href: '/filmography/gandhada-gudi',
    year: '2022',
  },
]

export default function FilmographyVideoHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const SLIDE_DURATION = 20000

  // Clear timers
  const clearAllTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (progressRef.current) {
      clearInterval(progressRef.current)
      progressRef.current = null
    }
  }

  // Go to slide
  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return

    clearAllTimers()
    setIsTransitioning(true)

    if (videoRef.current) {
      videoRef.current.pause()
    }

    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
      setProgress(0)
    }, 400)
  }

  // Next slide
  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }

  // Previous slide
  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }

  // Mount
  useEffect(() => {
    setIsMounted(true)
    return () => clearAllTimers()
  }, [])

  // Auto advance and progress
  useEffect(() => {
    if (!isMounted) return

    setProgress(0)

    // Progress bar
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + 0.5, 100))
    }, SLIDE_DURATION / 200)

    // Auto advance
    timerRef.current = setTimeout(() => {
      setIsTransitioning(true)
      if (videoRef.current) videoRef.current.pause()

      setTimeout(() => {
        setCurrentSlide(s => (s + 1) % heroSlides.length)
        setIsTransitioning(false)
        setProgress(0)
      }, 400)
    }, SLIDE_DURATION)

    return () => clearAllTimers()
  }, [isMounted, currentSlide])

  // Load video
  useEffect(() => {
    if (!isMounted || !videoRef.current) return

    const video = videoRef.current
    video.src = heroSlides[currentSlide].videoSrc
    video.load()
    video.play().catch(() => {})
  }, [currentSlide, isMounted])

  if (!isMounted) {
    return (
      <section className="relative h-[70vh] md:h-[80vh] w-full bg-ink">
        <div className="absolute inset-0 bg-charcoal" />
      </section>
    )
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-ink">
      {/* Video */}
      <div className={cn(
        'absolute inset-0 transition-opacity duration-400',
        isTransitioning ? 'opacity-0' : 'opacity-100'
      )}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/40" />

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-ink/40 flex items-center justify-center text-cream/80"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-ink/40 flex items-center justify-center text-cream/80"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        <div className="px-6 mb-20 md:mb-28">
          <div className="container-content">
            <div className="max-w-xl">
              <span className={cn(
                "font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-accent/80 mb-2 block transition-opacity duration-400",
                isTransitioning ? 'opacity-0' : 'opacity-100'
              )}>
                {heroSlides[currentSlide].subtitle}
              </span>

              <Link
                href={heroSlides[currentSlide].href}
                className={cn(
                  'font-sans text-2xl md:text-4xl lg:text-5xl text-cream font-light tracking-tight block hover:text-accent transition-colors',
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {heroSlides[currentSlide].title}
              </Link>

              <span className={cn(
                "font-mono text-[10px] text-warm-gray/70 mt-2 block transition-opacity duration-400",
                isTransitioning ? 'opacity-0' : 'opacity-100'
              )}>
                {heroSlides[currentSlide].year}
              </span>

              <Link
                href={heroSlides[currentSlide].href}
                className={cn(
                  'mt-4 md:mt-6 inline-flex px-5 py-2 border border-cream/40 text-cream text-xs tracking-wide rounded-full hover:bg-cream/10 transition-all',
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                View Film
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-8 px-6">
          <div className="container-content">
            <div className="flex items-end justify-between">
              {/* Desktop names */}
              <div className="hidden md:flex items-center gap-8">
                {heroSlides.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(i)}
                    className={cn(
                      'relative pb-3 font-mono text-sm uppercase tracking-wider transition-all',
                      i === currentSlide ? 'text-cream' : 'text-warm-gray hover:text-cream'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span>{slide.title}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone/30">
                      <div
                        className={cn("h-full bg-accent", i === currentSlide ? 'opacity-100' : 'opacity-0')}
                        style={{ width: i === currentSlide ? `${progress}%` : '0%' }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile dots */}
              <div className="flex md:hidden items-center gap-3">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      i === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-cream/40'
                    )}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Scroll */}
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
                className="flex flex-col items-center gap-2 text-warm-gray"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-px h-6 md:h-8 bg-gradient-to-b from-warm-gray to-transparent" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
