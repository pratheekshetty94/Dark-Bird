'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePreloader } from '@/components/preloader/PreloaderWrapper'

interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  videoSrc: string
  posterSrc: string
  href: string
  year?: string
}

// Real banner videos from Dark Bird Films portfolio
const heroSlides: HeroSlide[] = [
  {
    id: 'kantara',
    title: 'Kantara',
    subtitle: 'National Award Winner',
    videoSrc: '/videos/kantara-banner.mp4',
    posterSrc: '/images/posters/kantara.jpg',
    href: '/filmography/kantara',
    year: '2022',
  },
  {
    id: '777-charlie',
    title: '777 Charlie',
    subtitle: 'State Award for Best Editing',
    videoSrc: '/videos/777-charlie-banner.mp4',
    posterSrc: '/images/posters/777-charlie.jpg',
    href: '/filmography/777-charlie',
    year: '2022',
  },
  {
    id: 'gandhada-gudi',
    title: 'Gandhada Gudi',
    subtitle: 'A Tribute to Karnataka',
    videoSrc: '/videos/gandhada-gudi-banner.mp4',
    posterSrc: '/images/posters/gandhada-gudi.jpg',
    href: '/filmography/gandhada-gudi',
    year: '2022',
  },
  {
    id: 'shpsk',
    title: 'SHPSK',
    subtitle: 'National Award Winner',
    videoSrc: '/videos/shpsk-banner.mp4',
    posterSrc: '/images/posters/shpsk.jpg',
    href: '/filmography/shpsk',
    year: '2018',
  },
  {
    id: 'flipkart',
    title: 'Flipkart',
    subtitle: 'Brand Campaign',
    videoSrc: '/videos/flipkart-banner.mp4',
    posterSrc: '/images/posters/flipkart.jpg',
    href: '/work/films',
    year: '2023',
  },
  {
    id: 'yo-fruits',
    title: 'YO Fruits',
    subtitle: 'Brand Campaign',
    videoSrc: '/videos/yo-fruits-banner.mp4',
    posterSrc: '/images/posters/yo-fruits.jpg',
    href: '/work/films',
    year: '2024',
  },
]

export default function VideoHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const { isComplete: preloaderComplete } = usePreloader()

  const SLIDE_DURATION = 20000
  const PROGRESS_INTERVAL = 50

  // Start after preloader
  useEffect(() => {
    if (preloaderComplete && !hasStarted) {
      setHasStarted(true)
    }
  }, [preloaderComplete, hasStarted])

  // Progress bar
  useEffect(() => {
    if (!hasStarted) return

    setProgress(0)
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100
        return newProgress >= 100 ? 100 : newProgress
      })
    }, PROGRESS_INTERVAL)

    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [currentSlide, hasStarted])

  // Auto-advance
  useEffect(() => {
    if (!hasStarted) return

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 500)
    }, SLIDE_DURATION)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [hasStarted])

  // Play video
  useEffect(() => {
    if (!hasStarted || !videoRef.current) return

    videoRef.current.src = heroSlides[currentSlide].videoSrc
    videoRef.current.load()
    videoRef.current.play().catch(() => {})
  }, [currentSlide, hasStarted])

  const handleSlideClick = (index: number) => {
    if (index === currentSlide) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 300)

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 500)
    }, SLIDE_DURATION)
  }

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50 // minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        const nextSlide = (currentSlide + 1) % heroSlides.length
        handleSlideClick(nextSlide)
      } else {
        // Swipe right - previous slide
        const prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length
        handleSlideClick(prevSlide)
      }
    }
  }

  const currentHero = heroSlides[currentSlide]

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-ink"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/40" />
      </div>

      {/* Main Content - Positioned at bottom */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        {/* Content positioned above navigation */}
        <div className="px-6 mb-24 md:mb-32">
          <div className="container-content">
            <div className="max-w-xl">
              {/* Label */}
              <span
                className={cn(
                  "font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-accent/80 mb-2 block",
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {currentHero.subtitle}
              </span>

              {/* Title - Minimalistic */}
              <h1
                className={cn(
                  'font-sans text-2xl md:text-4xl lg:text-5xl text-cream font-light tracking-tight',
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {currentHero.title}
              </h1>

              {/* Year */}
              <span
                className={cn(
                  "font-mono text-[10px] text-warm-gray/70 mt-2 block",
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {currentHero.year}
              </span>

              {/* View Project */}
              <Link
                href={currentHero.href}
                className={cn(
                  'mt-4 md:mt-6 inline-flex px-5 py-2 border border-cream/40 text-cream text-xs tracking-wide rounded-full hover:bg-cream/10 transition-colors',
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                View Project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-8 px-6">
          <div className="container-content">
            <div className="flex items-end justify-between">
              {/* Desktop: Project names */}
              <div className="hidden md:flex items-center gap-8">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSlideClick(index)}
                    className={cn(
                      'relative pb-3 font-mono text-sm uppercase tracking-wider',
                      index === currentSlide ? 'text-cream' : 'text-warm-gray'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
                      <span>{slide.title}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone/30">
                      <div
                        className={cn("h-full bg-accent", index === currentSlide ? 'opacity-100' : 'opacity-0')}
                        style={{ width: index === currentSlide ? `${progress}%` : '0%' }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile: Dots */}
              <div className="flex md:hidden items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideClick(index)}
                    className={cn(
                      'h-1.5 rounded-full',
                      index === currentSlide ? 'w-6 bg-accent' : 'w-1.5 bg-cream/40'
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Scroll Indicator */}
              <button
                onClick={scrollToContent}
                className="flex flex-col items-center gap-2 text-warm-gray"
                aria-label="Scroll to content"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-px h-6 md:h-8 bg-gradient-to-b from-warm-gray to-transparent" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Accent - Desktop only */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent" />
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          Featured Work
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
