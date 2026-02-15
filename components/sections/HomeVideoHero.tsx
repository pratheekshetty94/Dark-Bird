'use client'

import { useRef, useEffect } from 'react'

export default function HomeVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      // Pause on last frame for 5 seconds, then restart
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
      }, 5000)
    }

    video.addEventListener('ended', handleEnded)
    video.play().catch(() => {})

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/home-hero.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
        />
        {/* Top gradient for navbar visibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/50 to-transparent" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center gap-2 text-warm-gray hover:text-cream transition-colors"
          aria-label="Scroll to content"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-warm-gray to-transparent animate-pulse" />
        </button>
      </div>
    </section>
  )
}
