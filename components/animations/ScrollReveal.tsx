'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  opacity?: number
  threshold?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.4,
  y = 20,
  x = 0,
  scale = 1,
  opacity = 0,
  threshold = 'top 85%',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      return hasTouch || isSmallScreen
    }

    const mobile = checkMobile()
    setIsMobile(mobile)

    // Mobile: just show content, no animations
    if (mobile) return

    // Desktop: load GSAP
    let cleanup: (() => void) | undefined

    const loadGsap = async () => {
      try {
        const { gsap, ScrollTrigger } = await import('@/lib/gsap')

        if (!ref.current) return

        const element = ref.current

        gsap.set(element, { opacity, y, x, scale })

        const trigger = ScrollTrigger.create({
          trigger: element,
          start: threshold,
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration,
              delay,
              ease: 'power3.out',
            })
          },
          onLeaveBack: once
            ? undefined
            : () => {
                gsap.to(element, {
                  opacity,
                  y,
                  x,
                  scale,
                  duration: duration * 0.5,
                  ease: 'power3.in',
                })
              },
        })

        cleanup = () => {
          trigger.kill()
          gsap.killTweensOf(element)
        }
      } catch (e) {
        // If GSAP fails to load, just show content
        if (ref.current) {
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'none'
        }
      }
    }

    loadGsap()

    return () => {
      if (cleanup) cleanup()
    }
  }, [delay, duration, y, x, scale, opacity, threshold, once])

  // Always render content visible on mobile
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={isMobile || !isMounted ? { opacity: 1, transform: 'none' } : undefined}
    >
      {children}
    </div>
  )
}

// Stagger children animation wrapper
export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  threshold = 'top 85%',
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  threshold?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      return hasTouch || isSmallScreen
    }

    const mobile = checkMobile()
    setIsMobile(mobile)

    // Mobile: no animations
    if (mobile) return

    // Desktop: load GSAP
    let cleanup: (() => void) | undefined

    const loadGsap = async () => {
      try {
        const { gsap, ScrollTrigger } = await import('@/lib/gsap')

        if (!ref.current) return

        const element = ref.current
        const childElements = element.children

        gsap.set(childElements, { opacity: 0, y: 20 })

        const trigger = ScrollTrigger.create({
          trigger: element,
          start: threshold,
          onEnter: () => {
            gsap.to(childElements, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger,
              ease: 'power3.out',
            })
          },
        })

        cleanup = () => {
          trigger.kill()
          gsap.killTweensOf(childElements)
        }
      } catch (e) {
        // If GSAP fails, show content
        if (ref.current) {
          Array.from(ref.current.children).forEach((child) => {
            (child as HTMLElement).style.opacity = '1'
            ;(child as HTMLElement).style.transform = 'none'
          })
        }
      }
    }

    loadGsap()

    return () => {
      if (cleanup) cleanup()
    }
  }, [stagger, threshold])

  // Ensure children are visible on mobile
  useEffect(() => {
    if (isMobile && ref.current) {
      Array.from(ref.current.children).forEach((child) => {
        (child as HTMLElement).style.opacity = '1'
        ;(child as HTMLElement).style.transform = 'none'
      })
    }
  }, [isMobile, children])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
