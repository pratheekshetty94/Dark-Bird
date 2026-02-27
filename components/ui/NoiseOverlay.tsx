'use client'

import { useEffect, useState } from 'react'

export default function NoiseOverlay() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Hide noise overlay on Windows and touch devices — heavy SVG filter causes scroll jank
    const isWindows = navigator.userAgent.includes('Windows')
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth < 768

    if (!isWindows && !hasTouch && !isSmallScreen) {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return <div className="noise-overlay" aria-hidden="true" />
}
