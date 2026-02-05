'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      setIsMobile(hasTouch || isSmallScreen || hasCoarsePointer)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    // Don't use Lenis on mobile - use native scrolling
    if (isMobile) {
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
    }
  }, [isMobile])

  return <>{children}</>
}
