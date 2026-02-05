'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const SLIDE_DURATION = 20000
  const PROGRESS_INTERVAL = 50

  useEffect(() => {
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
  }, [currentSlide])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [currentSlide])

  const handleSlideClick = (index: number) => {
    if (index === currentSlide) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 500)

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 500)
    }, SLIDE_DURATION)
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-ink">
      {/* Background Videos */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-all duration-1000 ease-smooth',
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        >
          <video
            ref={(el) => { videoRefs.current[index] = el }}
            src={slide.videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload={index === 0 ? "auto" : "none"}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/40" />

      {/* Main Content - Positioned at bottom */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        {/* Content positioned above navigation */}
        <div className="px-6 mb-24 md:mb-32">
          <div className="container-content">
            <div className="max-w-xl">
              {/* Label */}
              <span
                className={cn(
                  "font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-accent/80 mb-2 block transition-all duration-500",
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {heroSlides[currentSlide].subtitle}
              </span>

              {/* Title - Minimalistic */}
              <Link
                href={heroSlides[currentSlide].href}
                className={cn(
                  'font-sans text-2xl md:text-4xl lg:text-5xl text-cream font-light tracking-tight block hover:text-accent transition-colors',
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {heroSlides[currentSlide].title}
              </Link>

              {/* Year */}
              <span
                className={cn(
                  "font-mono text-[10px] text-warm-gray/70 mt-2 block transition-all duration-500",
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                )}
              >
                {heroSlides[currentSlide].year}
              </span>

              {/* View Film */}
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
                      'relative pb-3 font-mono text-sm uppercase tracking-wider transition-all duration-300',
                      index === currentSlide ? 'text-cream' : 'text-warm-gray hover:text-cream'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
                      <span>{slide.title}</span>
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone/30">
                      <div
                        className={cn(
                          "h-full bg-accent transition-all duration-100",
                          index === currentSlide ? 'opacity-100' : 'opacity-0'
                        )}
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
                      'h-1.5 rounded-full transition-all duration-300',
                      index === currentSlide ? 'w-6 bg-accent' : 'w-1.5 bg-cream/40'
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Scroll Indicator */}
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
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
    </section>
  )
}
