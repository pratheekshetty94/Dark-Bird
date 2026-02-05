'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'play' | 'drag' | 'view'>('default')
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to avoid flash
  const animationFrameRef = useRef<number | null>(null)

  // Check for touch device on mount
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      setIsTouchDevice(hasTouch || hasCoarsePointer)
    }

    checkTouch()
  }, [])

  useEffect(() => {
    // Don't run on touch devices
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0
    let isRunning = true

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Animate cursor with easing
    const animate = () => {
      if (!isRunning) return

      // Outer cursor - slower, more lag
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      }

      // Inner dot - faster, less lag
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Handle hover states
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check for data attributes
      if (target.closest('[data-cursor="play"]')) {
        setCursorState('play')
        setCursorText('Play')
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorState('view')
        setCursorText('View')
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorState('drag')
        setCursorText('Drag')
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorState('hover')
        setCursorText('')
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, span, li')) {
        setCursorState('text')
        setCursorText('')
      } else {
        setCursorState('default')
        setCursorText('')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleElementHover)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      isRunning = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouchDevice])

  // Don't render anything on touch devices
  if (isTouchDevice) {
    return null
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference',
          isVisible ? 'opacity-100' : 'opacity-0',
          cursorState === 'default' && 'w-10 h-10',
          cursorState === 'hover' && 'w-16 h-16',
          cursorState === 'text' && 'w-2 h-8',
          (cursorState === 'play' || cursorState === 'view' || cursorState === 'drag') && 'w-24 h-24'
        )}
      >
        <div
          className={cn(
            'w-full h-full rounded-full border border-white flex items-center justify-center transition-all duration-300',
            cursorState === 'hover' && 'bg-white/10 scale-100',
            cursorState === 'text' && 'rounded-sm bg-white',
            (cursorState === 'play' || cursorState === 'view' || cursorState === 'drag') && 'bg-white'
          )}
        >
          {cursorText && (
            <span className="text-black text-xs font-mono uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
          (cursorState === 'play' || cursorState === 'view' || cursorState === 'drag' || cursorState === 'text') && 'opacity-0'
        )}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Hide default cursor - only on non-touch devices */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
