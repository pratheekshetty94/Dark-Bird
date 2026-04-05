'use client'

import { useState, useEffect, useRef } from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'

const heroVideos = [
  {
    src: '/videos/promo-music-video.mp4',
    alt: 'Dark Bird Films promo music video',
  },
  {
    src: '/videos/promo-trailer.mp4',
    alt: 'Dark Bird Films promo trailer',
  },
  {
    src: '/videos/promo-commercial.mp4',
    alt: 'Dark Bird Films promo commercial',
  },
]

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Play only the current video; pause + rewind the others so each plays
  // from the start when it becomes active. Advancement is driven by the
  // `onEnded` handler below, so each video plays through to completion.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === currentIndex) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [currentIndex])

  const handleVideoEnded = (i: number) => {
    if (i !== currentIndex) return
    setCurrentIndex((prev) => (prev + 1) % heroVideos.length)
  }

  return (
    <section className="relative h-[100vh] min-h-[600px] overflow-hidden bg-ink">
      {/* Video layers — stacked absolutely, dissolve transition */}
      {heroVideos.map((vid, i) => (
        <video
          key={vid.src}
          ref={(el) => {
            videoRefs.current[i] = el
          }}
          src={vid.src}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          onEnded={() => handleVideoEnded(i)}
          aria-label={vid.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Multi-layer gradient overlays — above all videos */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent z-[1]" />

      {/* Content positioned at bottom-left — film credits style */}
      <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-16 md:pb-24">
        <div className="container-content">
          <ScrollReveal>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent mb-4 block">
              Est. 2016 &mdash; Bengaluru, India
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-[clamp(3rem,12vw,9rem)] text-cream leading-[0.9] tracking-tight mb-6">
              Dark Bird<br />
              <span className="text-accent">Films</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-body-lg text-silver/90 max-w-lg mb-8">
              An award-winning production house built on one belief &mdash;
              stories should make you feel something real.
            </p>
          </ScrollReveal>

          {/* Floating stats — film-strip style */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-8 md:gap-12">
              {[
                { value: '15+', label: 'Feature Films' },
                { value: '45+', label: 'Awards Won' },
                { value: '100+', label: 'Brand Campaigns' },
                { value: '4', label: 'National Awards' },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <span className="font-display text-3xl md:text-4xl text-cream group-hover:text-accent transition-colors duration-300">
                    {stat.value}
                  </span>
                  <p className="font-mono text-[9px] md:text-[10px] text-warm-gray uppercase tracking-[0.2em] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Progress dots — bottom right */}
      <div className="absolute bottom-8 right-8 z-[3] flex items-center gap-2">
        {heroVideos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentIndex
                ? 'w-6 h-1.5 bg-accent'
                : 'w-1.5 h-1.5 bg-cream/20 hover:bg-cream/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] scroll-indicator">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-accent" />
      </div>
    </section>
  )
}
