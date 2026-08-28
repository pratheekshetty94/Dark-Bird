'use client'

import { useEffect } from 'react'

// iOS Safari blocks video autoplay under Low Power Mode or the per-site
// "Never Auto-Play" setting, leaving background videos frozen behind the
// native play overlay. A user gesture lifts the block, so retry every
// paused muted background video on load, on the first touches, and when
// the tab becomes visible again. Videos with controls (e.g. the video
// modal, which plays with sound) are never touched.
export default function AutoplayRescue() {
  useEffect(() => {
    const resume = () => {
      document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach(video => {
        if (video.paused && !video.controls && (video.muted || video.defaultMuted)) {
          video.muted = true
          video.play().catch(() => {})
        }
      })
    }

    resume()
    const timer = setTimeout(resume, 1500) // retry after slow-network buffering

    const opts: AddEventListenerOptions = { passive: true }
    window.addEventListener('touchstart', resume, opts)
    window.addEventListener('pointerdown', resume, opts)
    document.addEventListener('visibilitychange', resume)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('touchstart', resume)
      window.removeEventListener('pointerdown', resume)
      document.removeEventListener('visibilitychange', resume)
    }
  }, [])

  return null
}
