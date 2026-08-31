'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, MessageCircle, ArrowUpRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/contact'
import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics'

export default function HomeVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
      }, 5000)
    }

    // iOS may reject the first play() (still buffering, Low Power Mode);
    // retry once enough data arrives. AutoplayRescue covers the
    // gesture-required case globally.
    const tryPlay = () => {
      video.muted = true
      video.play().catch(() => {})
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('canplay', tryPlay)
    tryPlay()

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('canplay', tryPlay)
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
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
      </div>

      {/* Headline + CTAs */}
      <div className="absolute inset-x-0 bottom-28 md:bottom-32 z-20 flex flex-col items-center gap-5 md:gap-6 px-4">
        <h1 className="max-w-3xl text-center font-display text-xl md:text-3xl text-cream/95 leading-snug [text-wrap:balance]">
          Film Production &amp; Marketing Agency in Bengaluru
          <span className="block mt-1 text-sm md:text-base font-sans font-normal text-cream/60">
            Ad films, brand campaigns, design and AI content.
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          <Link
            href="/contact#book-call"
            onClick={() => trackCtaClick('home_hero', 'book_discovery_call')}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-cream shadow-[0_10px_30px_rgba(232,90,63,0.35)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_12px_40px_rgba(232,90,63,0.55)] md:px-7 md:py-4 md:text-base"
          >
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            Book a Discovery Call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-5 md:w-5" />
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('home_hero')}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-cream/30 bg-ink/40 px-6 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-all duration-300 hover:border-cream/60 hover:bg-ink/60 md:px-7 md:py-4 md:text-base"
          >
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            WhatsApp Us
          </a>
        </div>
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
