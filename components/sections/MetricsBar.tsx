'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const metrics = [
  { value: 375, suffix: 'M+', label: 'Video Views', description: 'across platforms' },
  { value: 100, suffix: '+', label: 'Brands', description: 'partnered with' },
  { value: 15, suffix: '+', label: 'Feature Films', description: 'edited & shot' },
  { value: 2016, suffix: '', label: 'Founded', description: 'in Bengaluru', isYear: true },
]

export default function MetricsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate each number when section comes into view
      numberRefs.current.forEach((el, index) => {
        if (!el) return

        const metric = metrics[index]
        const endValue = metric.value

        // For year (2016), we don't want to count from 0
        const startValue = metric.isYear ? 2000 : 0

        gsap.fromTo(
          el,
          { innerText: startValue },
          {
            innerText: endValue,
            duration: metric.isYear ? 1.5 : 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              if (el) {
                const currentValue = Math.round(Number(el.innerText))
                el.innerText = String(currentValue)
              }
            },
          }
        )
      })

      // Animate the accent lines
      gsap.fromTo(
        '.metric-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Fade in the labels
      gsap.fromTo(
        '.metric-label',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-light py-16 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/20 to-transparent" />

      <div className="container-content">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="text-center lg:text-left">
              {/* Number with count-up animation */}
              <div className="font-display text-4xl md:text-5xl text-ink whitespace-nowrap">
                <span
                  ref={(el) => {
                    numberRefs.current[index] = el
                  }}
                >
                  {metric.isYear ? '2000' : '0'}
                </span>
                <span>{metric.suffix}</span>
              </div>

              {/* Label */}
              <div className="mt-2 metric-label">
                <span className="font-medium text-sm md:text-base text-ink whitespace-nowrap">
                  {metric.label}
                </span>
                <span className="block text-xs md:text-sm text-warm-gray mt-1">
                  {metric.description}
                </span>
              </div>

              {/* Accent line with animation */}
              <div className="mt-4 mx-auto lg:mx-0 w-8 h-0.5 bg-accent/30 metric-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
