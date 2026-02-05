'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const curveRef = useRef<SVGPathElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    setDimensions({ width, height })
    // Check for touch device or small screen
    const mobile = width < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsMobile(mobile)

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mobile: Use pure CSS animations
  useEffect(() => {
    if (!isMobile || !dimensions.width) return

    // Simple counter animation using requestAnimationFrame
    let startTime: number | null = null
    const duration = 2500 // 2.5 seconds

    const animateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (counterRef.current) {
        const value = Math.round(progress * 100)
        counterRef.current.textContent = value.toString().padStart(3, '0')
      }

      if (progress < 1) {
        requestAnimationFrame(animateCounter)
      } else {
        // Animation complete, trigger exit
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            onComplete()
          }, 600)
        }, 300)
      }
    }

    requestAnimationFrame(animateCounter)
  }, [isMobile, dimensions.width, onComplete])

  // Desktop: Use GSAP
  const exitAnimation = useCallback(async () => {
    if (isMobile) return // Mobile uses CSS

    const gsapModule = await import('gsap')
    const gsap = gsapModule.default
    const { width, height } = dimensions

    const exitTl = gsap.timeline({
      onComplete: () => {
        onComplete()
      }
    })

    exitTl
      .to('.logo-container', {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in'
      }, 0)
      .to('.preloader-content', {
        opacity: 0,
        duration: 0.4
      }, 0)

    if (curveRef.current) {
      const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width/2} ${height} 0 ${height} L0 0`

      exitTl
        .to(curveRef.current, {
          attr: { d: targetPath },
          duration: 0.7,
          ease: 'power2.inOut'
        }, 0.2)
        .to('.preloader-overlay', {
          y: -height - 100,
          duration: 0.8,
          ease: 'power3.inOut'
        }, 0.4)
    }
  }, [dimensions, onComplete, isMobile])

  // Desktop GSAP animation
  useEffect(() => {
    if (isMobile) return // Mobile uses CSS
    if (!dimensions.width || !dimensions.height) return

    let ctx: { revert: () => void } | null = null

    const runAnimation = async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.default

      ctx = gsap.context(() => {
        const duration = 5

        const master = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => { exitAnimation() }
        })

        master.from('.corner-mark', {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }, 0)

        const counter = { value: 0 }
        master.to(counter, {
          value: 100,
          duration: duration,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counter.value).toString().padStart(3, '0')
            }
          }
        }, 0)

        master
          .fromTo('.logo-glow', {
            opacity: 0,
            scale: 0.5,
          }, {
            opacity: 0.6,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out'
          }, 0.3)

          .fromTo('.logo-main', {
            opacity: 0,
            scale: 0.3,
            filter: 'blur(20px)'
          }, {
            opacity: 1,
            scale: 1.1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out'
          }, 0.5)

          .to('.logo-main', {
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)'
          }, 1.7)

        master.to('.logo-shimmer', {
          x: '300%',
          duration: 1,
          ease: 'power2.inOut'
        }, 2)

        master.from('.tagline-word', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out'
        }, 2.5)

        master.to('.tagline-line', {
          scaleX: 1,
          duration: 0.6,
          ease: 'power3.inOut'
        }, 3)

        master.from('.side-info', {
          opacity: 0,
          x: (i: number) => i === 0 ? -20 : 20,
          duration: 0.5,
          stagger: 0.1
        }, 3.5)

      }, preloaderRef)
    }

    runAnimation()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [dimensions, exitAnimation, isMobile])

  const initialPath = dimensions.width
    ? `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width/2} ${dimensions.height + 300} 0 ${dimensions.height} L0 0`
    : ''

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* SVG Overlay with Curved Bottom */}
      <div className="preloader-overlay absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          <path
            ref={curveRef}
            d={initialPath}
            fill="#1A1818"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="preloader-content absolute inset-0 flex items-center justify-center">
        {/* Film Grain Overlay - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-50 noise-texture" />
        )}

        {/* Corner Registration Marks - Desktop only */}
        {!isMobile && (
          <>
            <div className="corner-mark absolute top-8 left-8">
              <div className="w-6 h-px bg-accent/40" />
              <div className="w-px h-6 bg-accent/40" />
            </div>
            <div className="corner-mark absolute top-8 right-8">
              <div className="w-6 h-px bg-accent/40 ml-auto" />
              <div className="w-px h-6 bg-accent/40 ml-auto" />
            </div>
            <div className="corner-mark absolute bottom-8 left-8">
              <div className="w-px h-6 bg-accent/40" />
              <div className="w-6 h-px bg-accent/40" />
            </div>
            <div className="corner-mark absolute bottom-8 right-8">
              <div className="w-px h-6 bg-accent/40 ml-auto" />
              <div className="w-6 h-px bg-accent/40 ml-auto" />
            </div>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
          <div className="flex items-center gap-1">
            <span
              ref={counterRef}
              className="font-mono text-xl md:text-3xl text-cream/80 tabular-nums font-light"
            >
              000
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-warm-gray">%</span>
          </div>
          <p className="font-mono text-[6px] md:text-[8px] uppercase tracking-widest text-warm-gray/50 mt-1">
            Loading
          </p>
        </div>

        {/* Logo Container */}
        <div className="logo-container relative">
          {/* Glow Effect */}
          <div
            className="logo-glow absolute inset-0 -m-16 md:-m-32 blur-[60px] md:blur-[80px] opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232, 90, 63, 0.4) 0%, transparent 70%)'
            }}
          />

          {/* Main Logo */}
          <div className="logo-main relative">
            <Image
              src="/images/logo.png"
              alt="Dark Bird Films"
              width={800}
              height={300}
              className="h-[25vh] md:h-[35vh] lg:h-[45vh] w-auto object-contain"
              priority
            />

            {/* Shimmer Effect - Desktop only */}
            {!isMobile && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="logo-shimmer absolute inset-0 -translate-x-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                    width: '40%'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 text-center">
          <div className="overflow-hidden">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <span className="tagline-word font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-cream/60">
                Stories
              </span>
              <span className="tagline-word font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-cream/60">
                that
              </span>
              <span className="tagline-word font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
                move.
              </span>
            </div>
          </div>
          <div className="overflow-hidden mt-1">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <span className="tagline-word font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-cream/60">
                Brands
              </span>
              <span className="tagline-word font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-cream/60">
                that
              </span>
              <span className="tagline-word font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
                grow.
              </span>
            </div>
          </div>
          <div className="tagline-line mx-auto mt-4 h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0" />
        </div>

        {/* Side Info - Desktop only */}
        {!isMobile && (
          <>
            <div className="side-info absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent/50" />
              <span className="font-mono text-[10px] text-accent/70 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                Est. 2016
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
            </div>

            <div className="side-info absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent/50" />
              <span className="font-mono text-[10px] text-accent/70 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                Bengaluru
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
