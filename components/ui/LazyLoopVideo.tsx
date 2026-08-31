'use client'

import { useEffect, useRef, useState } from 'react'

// Background loop that only starts downloading when it approaches the
// viewport, so below-the-fold sections stop costing mobile visitors
// megabytes they may never scroll to.
export default function LazyLoopVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={className}
      src={visible ? src : undefined}
    />
  )
}
