'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

const promos = [
  { src: '/videos/promo-commercial.mp4', label: 'Ad Films', href: '/services/ad-film-production-bangalore' },
  { src: '/videos/promo-music-video.mp4', label: 'Music Videos', href: '/services/music-video-production-bangalore' },
  { src: '/videos/promo-trailer.mp4', label: 'Trailers', href: '/filmography' },
]

export default function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const wheelAccumulator = useRef(0)
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isWheelLocked = useRef(false)

  // IntersectionObserver — only play videos when section is in viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Play/pause based on visibility + active index
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === activeIndex && isVisible) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeIndex, isVisible])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % promos.length)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + promos.length) % promos.length)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) goNext()
    else if (diff < -50) goPrev()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  // Apple Magic Mouse / trackpad horizontal scroll support
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      if (Math.abs(e.deltaX) < 5) return

      e.preventDefault()

      if (isWheelLocked.current) return

      const clampedDelta = Math.max(-30, Math.min(30, e.deltaX))
      wheelAccumulator.current += clampedDelta

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current)
      wheelTimeout.current = setTimeout(() => {
        wheelAccumulator.current = 0
      }, 200)

      const threshold = 60
      if (wheelAccumulator.current > threshold) {
        goNext()
        wheelAccumulator.current = 0
        isWheelLocked.current = true
        setTimeout(() => { isWheelLocked.current = false }, 700)
      } else if (wheelAccumulator.current < -threshold) {
        goPrev()
        wheelAccumulator.current = 0
        isWheelLocked.current = true
        setTimeout(() => { isWheelLocked.current = false }, 700)
      }
    }

    section.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      section.removeEventListener('wheel', handleWheel)
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current)
    }
  }, [goNext, goPrev])

  // Cards always render in DOM order 0, 1, 2.
  // The active card grows wide; non-active cards stay narrow.
  // No CSS `order` changes — pure flex-grow + transform animation.
  const getCardStyle = (index: number): React.CSSProperties => {
    const isActive = index === activeIndex

    return {
      flex: isActive ? '4 1 0%' : '1 1 0%',
      transform: isActive ? 'scale(1)' : 'scale(0.92)',
      opacity: isActive ? 1 : 0.4,
      filter: isActive ? 'none' : 'brightness(0.45) saturate(0.7)',
      transition: 'flex 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1), opacity 0.5s ease, filter 0.5s ease',
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink py-8 md:py-16 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 hover:border-white/20 flex items-center justify-center text-cream transition-all duration-300 backdrop-blur-md"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 hover:border-white/20 flex items-center justify-center text-cream transition-all duration-300 backdrop-blur-md"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Cards row — fixed DOM order 0,1,2. Active card grows via flex. */}
          <div className="flex items-center gap-2 md:gap-3">
            {promos.map((promo, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  key={promo.label}
                  className="relative overflow-hidden rounded-xl md:rounded-2xl will-change-[flex,transform,opacity] cursor-pointer"
                  style={getCardStyle(index)}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index)
                    } else {
                      window.location.href = promo.href
                    }
                  }}
                >
                  {/* Border glow for active */}
                  <div
                    className="absolute inset-0 z-10 rounded-xl md:rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: isActive
                        ? 'inset 0 0 0 1.5px rgba(232, 90, 63, 0.35), 0 0 40px rgba(232, 90, 63, 0.08)'
                        : 'inset 0 0 0 1px rgba(250, 246, 239, 0.06)',
                      transition: 'box-shadow 0.7s ease',
                    }}
                  />

                  {/* Video */}
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={promo.src}
                    autoPlay={false}
                    loop
                    muted
                    playsInline
                    preload={isActive ? 'metadata' : 'none'}
                    className="w-full aspect-video object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 z-10">
                    <span className="font-mono uppercase tracking-wider block">
                      <span className={isActive
                        ? 'text-[10px] md:text-sm text-cream'
                        : 'text-[8px] md:text-[10px] text-cream/60'
                      }>
                        {promo.label}
                      </span>
                    </span>

                    {/* View Work link — only on active */}
                    {isActive && (
                      <div className="mt-2 md:mt-3">
                        <Link
                          href={promo.href}
                          className="inline-flex items-center gap-2 text-accent text-xs md:text-sm font-medium group/link hover:gap-3 transition-all duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Work
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Corner index */}
                  <span className="absolute top-2 right-3 md:top-4 md:right-5 font-mono text-[7px] md:text-[9px] text-white/15 tracking-wider z-10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5 md:mt-8">
          {promos.map((p, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'w-7 md:w-10 bg-accent'
                  : 'w-1.5 md:w-2 bg-cream/20 hover:bg-cream/40'
              }`}
              aria-label={`Go to ${p.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
