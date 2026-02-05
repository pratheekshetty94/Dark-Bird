'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  number: string
  label: string
  className?: string
}

export default function MetricCard({ number, label, className }: MetricCardProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!numberRef.current || hasAnimated.current) return

    // Parse the number (handles formats like "375M+", "100+", "15+", "2016")
    const text = number.replace(/[^0-9.]/g, '')
    const targetValue = parseFloat(text)
    const suffix = number.replace(/[0-9.]/g, '')

    // Don't animate years or already formatted numbers
    if (targetValue >= 1900 && targetValue <= 2100) {
      numberRef.current.textContent = number
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: numberRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const obj = { value: 0 }
        gsap.to(obj, {
          value: targetValue,
          duration: 1.5,
          ease: 'power3.out',
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = Math.round(obj.value) + suffix
            }
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [number])

  return (
    <div className={cn('text-center', className)}>
      <span
        ref={numberRef}
        className="block font-display text-metric text-primary-red"
      >
        0
      </span>
      <span className="block text-caption text-white/70 mt-2">
        {label}
      </span>
    </div>
  )
}
