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

/**
 * Detect if we should use the lightweight CSS-only path
 * (mobile, touch devices, or Windows — where GSAP ScrollTrigger causes jank)
 */
function shouldUseLightPath(): boolean {
  if (typeof window === 'undefined') return true
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const isSmallScreen = window.innerWidth < 768
  const isWindows = navigator.userAgent.includes('Windows')
  return hasTouch || isSmallScreen || isWindows
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
  const [isLightPath, setIsLightPath] = useState(true)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const lightPath = shouldUseLightPath()
    setIsLightPath(lightPath)

    // Mobile: just show content immediately, no animations
    if (lightPath && (('ontouchstart' in window || navigator.maxTouchPoints > 0) || window.innerWidth < 768)) {
      setIsRevealed(true)
      return
    }

    // Windows: use lightweight IntersectionObserver + CSS transitions (no GSAP)
    if (lightPath) {
      const el = ref.current
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Delay the reveal using setTimeout to match the delay prop
            if (delay > 0) {
              setTimeout(() => setIsRevealed(true), delay * 1000)
            } else {
              setIsRevealed(true)
            }
            if (once) observer.disconnect()
          } else if (!once) {
            setIsRevealed(false)
          }
        },
        { threshold: 0.15 }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }

    // macOS/Linux desktop: use GSAP for premium animations
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

  // Determine inline styles
  const getStyle = (): React.CSSProperties | undefined => {
    if (!isMounted || (isLightPath && isRevealed)) {
      return { opacity: 1, transform: 'none' }
    }
    if (isLightPath && !isRevealed) {
      // CSS transition: start hidden, transition to visible
      return {
        opacity: 0,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transition: `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1), transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`,
        willChange: 'opacity, transform',
      }
    }
    // GSAP path — style is managed by GSAP
    return undefined
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={getStyle()}
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
  const [isLightPath, setIsLightPath] = useState(true)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const lightPath = shouldUseLightPath()
    setIsLightPath(lightPath)

    // Mobile: show immediately
    if (lightPath && (('ontouchstart' in window || navigator.maxTouchPoints > 0) || window.innerWidth < 768)) {
      setIsRevealed(true)
      return
    }

    // Windows: lightweight IntersectionObserver
    if (lightPath) {
      const el = ref.current
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            observer.disconnect()
          }
        },
        { threshold: 0.15 }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }

    // macOS/Linux: GSAP
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

  // On Windows/mobile, apply CSS transition to children via a class or inline styles
  useEffect(() => {
    if (!isLightPath || !ref.current) return
    const children = Array.from(ref.current.children) as HTMLElement[]
    children.forEach((child, i) => {
      if (isRevealed) {
        child.style.opacity = '1'
        child.style.transform = 'none'
        child.style.transition = `opacity 0.4s cubic-bezier(0.25,1,0.5,1) ${i * stagger}s, transform 0.4s cubic-bezier(0.25,1,0.5,1) ${i * stagger}s`
      } else {
        child.style.opacity = '0'
        child.style.transform = 'translateY(20px)'
        child.style.transition = `opacity 0.4s cubic-bezier(0.25,1,0.5,1) ${i * stagger}s, transform 0.4s cubic-bezier(0.25,1,0.5,1) ${i * stagger}s`
      }
    })
  }, [isLightPath, isRevealed, stagger, children])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
