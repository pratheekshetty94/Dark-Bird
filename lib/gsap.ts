'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Export GSAP and plugins
export { gsap, ScrollTrigger }

// Default animation configurations
export const defaultAnimationConfig = {
  duration: 0.4,
  ease: 'power3.out',
}

// Scroll reveal animation preset
export const scrollRevealConfig = {
  y: 20,
  opacity: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: 'power3.out',
}

// Counter animation configuration
export const counterConfig = {
  duration: 1.5,
  ease: 'power3.out',
}

// Hero video transition configuration
export const heroTransitionConfig = {
  duration: 0.8,
  ease: 'power2.inOut',
  clipDuration: 4, // seconds per clip
}

// Navigation scroll trigger configuration
export const navScrollConfig = {
  start: 'top -100',
  toggleClass: {
    targets: '.navbar',
    className: 'nav-solid',
  },
}

// Parallax configuration
export const parallaxConfig = {
  speed: 0.5,
  ease: 'none',
}

// Animation utilities
export const animations = {
  // Fade in from bottom
  fadeInUp: (element: Element | string, delay = 0) => {
    return gsap.from(element, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      delay,
      ease: 'power3.out',
    })
  },

  // Fade in with stagger
  staggerFadeIn: (elements: Element[] | string, staggerAmount = 0.1) => {
    return gsap.from(elements, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: staggerAmount,
      ease: 'power3.out',
    })
  },

  // Count up animation for metrics
  countUp: (element: Element, targetValue: number, duration = 1.5) => {
    const obj = { value: 0 }
    return gsap.to(obj, {
      value: targetValue,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        if (element instanceof HTMLElement) {
          element.textContent = Math.round(obj.value).toLocaleString()
        }
      },
    })
  },

  // Crossfade between elements
  crossfade: (outElement: Element, inElement: Element, duration = 0.8) => {
    const tl = gsap.timeline()
    tl.to(outElement, { opacity: 0, duration })
      .to(inElement, { opacity: 1, duration }, '<')
    return tl
  },

  // Scale up on hover
  hoverScale: (element: Element, scale = 1.02) => {
    return gsap.to(element, {
      scale,
      duration: 0.2,
      ease: 'power2.out',
    })
  },

  // Reset hover scale
  hoverScaleReset: (element: Element) => {
    return gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  },

  // Parallax scroll effect
  parallax: (element: Element, speed = 0.5) => {
    return gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  },

  // Reveal from clip-path
  clipReveal: (element: Element, direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom') => {
    const clipPaths = {
      left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
      right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
      top: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
      bottom: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
    }

    return gsap.fromTo(
      element,
      { clipPath: clipPaths[direction].from },
      {
        clipPath: clipPaths[direction].to,
        duration: 0.8,
        ease: 'power3.inOut',
      }
    )
  },

  // Text split animation (word by word)
  textReveal: (element: Element, stagger = 0.05) => {
    if (!(element instanceof HTMLElement)) return

    const text = element.textContent || ''
    const words = text.split(' ')
    element.innerHTML = words
      .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(' ')

    const spans = element.querySelectorAll('span > span')
    return gsap.from(spans, {
      y: '100%',
      opacity: 0,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
    })
  },
}

// Create scroll trigger helper
export function createScrollTrigger(
  element: Element | string,
  animation: gsap.core.Animation | gsap.core.Timeline,
  options?: ScrollTrigger.Vars
) {
  return ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    animation,
    toggleActions: 'play none none none',
    ...options,
  })
}

// Batch scroll trigger for multiple elements
export function batchScrollTrigger(
  elements: Element[] | NodeListOf<Element> | string,
  animationConfig = scrollRevealConfig
) {
  return ScrollTrigger.batch(elements, {
    onEnter: (batch) => {
      gsap.from(batch, {
        ...animationConfig,
        stagger: 0.1,
      })
    },
    start: 'top 85%',
  })
}

// Cleanup function for components
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Refresh ScrollTrigger (call after DOM changes)
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
