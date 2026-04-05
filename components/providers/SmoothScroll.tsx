'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const [shouldDisable, setShouldDisable] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches

      // Detect Windows — Lenis causes jank on Windows browsers
      const isWindows = navigator.userAgent.includes('Windows')

      setShouldDisable(hasTouch || isSmallScreen || hasCoarsePointer || isWindows)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  useEffect(() => {
    // Disable Lenis on mobile and Windows — use native scrolling
    if (shouldDisable) {
      return
    }

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Expose instance so nested scroll containers (e.g. BTSGallery) can hand
    // control back to Lenis when they hit their top/bottom boundary.
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenisRef.current

    // Sync Lenis scroll position with GSAP ScrollTrigger
    let ScrollTriggerModule: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTriggerModule = ScrollTrigger
      lenisRef.current?.on('scroll', () => {
        ScrollTriggerModule?.update()
      })
    })

    let isRunning = true

    function raf(time: number) {
      if (!isRunning) return
      lenisRef.current?.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      isRunning = false
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenisRef.current?.destroy()
      lenisRef.current = null
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [shouldDisable])

  return <>{children}</>
}
