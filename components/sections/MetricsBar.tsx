'use client'

import React, { useEffect, useRef, useState } from 'react'

const metrics = [
  { value: 375, suffix: 'M+', label: 'Video Views', description: 'across platforms' },
  { value: 100, suffix: '+', label: 'Brands', description: 'partnered with' },
  { value: 15, suffix: '+', label: 'Feature Films', description: 'edited & shot' },
  { value: 2016, suffix: '', label: 'Founded', description: 'in Bengaluru', isYear: true },
]

function isWindowsDevice(): boolean {
  if (typeof window === 'undefined') return false
  return navigator.userAgent.includes('Windows')
}

export default function MetricsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const isWindows = isWindowsDevice()

    // Windows path: use IntersectionObserver + requestAnimationFrame counter
    if (isWindows) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // Animate counters with RAF
            numberRefs.current.forEach((el, index) => {
              if (!el) return
              const metric = metrics[index]
              const startValue = metric.isYear ? 2000 : 0
              const endValue = metric.value
              const duration = metric.isYear ? 1500 : 2000
              const startTime = performance.now()

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3)
                const currentValue = Math.round(startValue + (endValue - startValue) * eased)
                if (el) el.innerText = String(currentValue)
                if (progress < 1) requestAnimationFrame(animate)
              }
              requestAnimationFrame(animate)
            })
            observer.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(sectionRef.current)
      return () => observer.disconnect()
    }

    // macOS/Linux: use GSAP
    let ctx: { revert: () => void } | undefined

    const loadGsap = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current) return

        ctx = gsap.context(() => {
          numberRefs.current.forEach((el, index) => {
            if (!el) return
            const metric = metrics[index]
            const startValue = metric.isYear ? 2000 : 0

            gsap.fromTo(
              el,
              { innerText: startValue },
              {
                innerText: metric.value,
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
                    el.innerText = String(Math.round(Number(el.innerText)))
                  }
                },
              }
            )
          })

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
      } catch (e) {
        // Fallback: just show content
        numberRefs.current.forEach((el, index) => {
          if (el) el.innerText = String(metrics[index].value)
        })
      }
    }

    loadGsap()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [hasAnimated])

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
              <div className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-ink whitespace-nowrap">
                <span
                  ref={(el) => {
                    numberRefs.current[index] = el
                  }}
                >
                  {metric.isYear ? '2000' : '0'}
                </span>
                <span className="text-accent">{metric.suffix}</span>
              </div>

              {/* Label */}
              <div className="mt-3 metric-label">
                <span className="font-bold text-base md:text-lg text-ink uppercase tracking-wide">
                  {metric.label}
                </span>
                <span className="block text-sm text-warm-gray mt-1">
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
