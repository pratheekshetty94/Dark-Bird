'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MarqueeItem {
  type: 'text' | 'image'
  content: string
  alt?: string
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
  separator?: React.ReactNode
}

export default function InfiniteMarquee({
  items,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  itemClassName = '',
  separator = <span className="mx-8 text-accent/40">•</span>,
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const container = containerRef.current
    const track1 = track1Ref.current
    const track2 = track2Ref.current
    if (!container || !track1 || !track2) return

    const trackWidth = track1.offsetWidth
    if (trackWidth === 0) return // Don't animate if no width yet

    const duration = trackWidth / speed

    // Set initial positions
    gsap.set(track1, { x: 0 })
    gsap.set(track2, { x: trackWidth })

    // Create infinite loop
    const tl = gsap.timeline({ repeat: -1 })

    const xEnd = direction === 'left' ? -trackWidth : trackWidth

    tl.to([track1, track2], {
      x: `+=${xEnd}`,
      duration: duration,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const num = parseFloat(x)
          if (direction === 'left') {
            return num < -trackWidth ? num + trackWidth * 2 : num
          } else {
            return num > trackWidth ? num - trackWidth * 2 : num
          }
        }),
      },
    })

    // Pause on hover
    const handleMouseEnter = () => tl.pause()
    const handleMouseLeave = () => tl.resume()

    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      tl.kill()
      if (pauseOnHover && container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [items, speed, direction, pauseOnHover, isMounted])

  const renderItem = (item: MarqueeItem, index: number) => {
    if (item.type === 'image') {
      return (
        <div key={index} className={cn('relative h-8 w-24 grayscale hover:grayscale-0 transition-all duration-500', itemClassName)}>
          <Image
            src={item.content}
            alt={item.alt || ''}
            fill
            className="object-contain"
          />
        </div>
      )
    }
    return (
      <span key={index} className={cn('text-2xl md:text-4xl font-display text-cream/20 hover:text-accent transition-colors', itemClassName)}>
        {item.content}
      </span>
    )
  }

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <div className="flex">
        <div ref={track1Ref} className="flex items-center gap-0 flex-shrink-0">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {renderItem(item, index)}
              {separator}
            </div>
          ))}
        </div>
        <div ref={track2Ref} className="flex items-center gap-0 flex-shrink-0">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {renderItem(item, index)}
              {separator}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Simple text marquee for client names
export function ClientMarqueeV2() {
  const clients = [
    'Google', 'Flipkart', 'Netflix', 'Zomato', 'Disney+',
    'Amazon', 'Hombale', 'Jio Studios', 'Shopsy', 'Delhivery',
    'Ricky Kej', 'GK Builders', 'Paramvah', 'Daali Pictures',
  ]

  return (
    <section className="py-16 bg-ink border-y border-stone/10 overflow-hidden">
      <InfiniteMarquee
        items={clients.map(c => ({ type: 'text', content: c }))}
        speed={40}
        className="py-4"
      />
      <InfiniteMarquee
        items={clients.slice().reverse().map(c => ({ type: 'text', content: c }))}
        speed={30}
        direction="right"
        className="py-4 mt-4"
      />
    </section>
  )
}
