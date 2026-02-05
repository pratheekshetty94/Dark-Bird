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
  const [isMobile, setIsMobile] = useState(true) // Default to mobile (no animation)

  useEffect(() => {
    // Check if mobile on client
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      return hasTouch || isSmallScreen
    }

    const mobile = checkMobile()
    setIsMobile(mobile)

    // If mobile, just ensure content is visible and return early
    if (mobile) {
      if (ref.current) {
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'none'
      }
      return
    }

    // Only load GSAP on desktop
    const loadGsap = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap')

      if (!ref.current) return
      const element = ref.current

      gsap.set(element, {
        opacity,
        y,
        x,
        scale,
      })

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

      return () => {
        trigger.kill()
        gsap.killTweensOf(element)
      }
    }

    loadGsap()
  }, [delay, duration, y, x, scale, opacity, threshold, once])

  return (
    <div ref={ref} className={cn(className)} style={isMobile ? { opacity: 1 } : undefined}>
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
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      return hasTouch || isSmallScreen
    }

    const mobile = checkMobile()
    setIsMobile(mobile)

    if (mobile) {
      if (ref.current) {
        Array.from(ref.current.children).forEach((child) => {
          (child as HTMLElement).style.opacity = '1'
          ;(child as HTMLElement).style.transform = 'none'
        })
      }
      return
    }

    const loadGsap = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap')

      if (!ref.current) return
      const element = ref.current
      const childElements = element.children

      gsap.set(childElements, {
        opacity: 0,
        y: 20,
      })

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

      return () => {
        trigger.kill()
        gsap.killTweensOf(childElements)
      }
    }

    loadGsap()
  }, [stagger, threshold])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
