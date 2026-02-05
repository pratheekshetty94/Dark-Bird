'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextSplitProps {
  children: ReactNode
  className?: string
  type?: 'chars' | 'words' | 'lines'
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  once?: boolean
}

export default function TextSplit({
  children,
  className = '',
  type = 'chars',
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  y = 40,
  once = true,
}: TextSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const text = container.innerText
    container.innerHTML = ''

    let elements: HTMLSpanElement[] = []

    if (type === 'chars') {
      // Split by characters
      elements = text.split('').map((char) => {
        const span = document.createElement('span')
        span.innerText = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = `translateY(${y}px)`
        container.appendChild(span)
        return span
      })
    } else if (type === 'words') {
      // Split by words
      elements = text.split(' ').map((word, i, arr) => {
        const span = document.createElement('span')
        span.innerText = word + (i < arr.length - 1 ? '\u00A0' : '')
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = `translateY(${y}px)`
        container.appendChild(span)
        return span
      })
    } else if (type === 'lines') {
      // Wrap in a single span for line animation
      const span = document.createElement('span')
      span.innerText = text
      span.style.display = 'block'
      span.style.opacity = '0'
      span.style.transform = `translateY(${y}px)`
      container.appendChild(span)
      elements = [span]
    }

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: once,
      },
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [children, type, stagger, duration, delay, y, once])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Scramble text effect
export function TextScramble({
  children,
  className = '',
  duration = 1,
}: {
  children: ReactNode
  className?: string
  duration?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const container = containerRef.current
    if (!container) return

    const text = typeof children === 'string' ? children : container.innerText
    if (!text) return

    let iteration = 0
    let rafId: number | null = null

    const scramble = () => {
      if (!container) return

      container.innerText = text
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return char
          }
          if (char === ' ') return ' '
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')

      if (iteration >= text.length) {
        return
      }

      iteration += 1 / 3
      rafId = requestAnimationFrame(scramble)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            iteration = 0
            scramble()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [children, duration, isMounted, chars])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
