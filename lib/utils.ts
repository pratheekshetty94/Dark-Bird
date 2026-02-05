import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers with suffixes (1000 -> 1K, 1000000 -> 1M)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

// Debounce function for scroll/resize handlers
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll handlers
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Check if we're on the client side
export const isClient = typeof window !== 'undefined'

// Get viewport dimensions
export function getViewportDimensions() {
  if (!isClient) return { width: 0, height: 0 }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

// Check if element is in viewport
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  if (!isClient) return false
  const rect = element.getBoundingClientRect()
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0
  )
}

// Smooth scroll to element
export function scrollToElement(elementId: string, offset = 0): void {
  if (!isClient) return
  const element = document.getElementById(elementId)
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// Parse video views string (e.g., "26M+" -> 26000000)
export function parseViewCount(viewString: string): number {
  const cleaned = viewString.replace(/[^0-9.KMB+]/gi, '').toUpperCase()
  const num = parseFloat(cleaned)

  if (cleaned.includes('B')) return num * 1000000000
  if (cleaned.includes('M')) return num * 1000000
  if (cleaned.includes('K')) return num * 1000
  return num
}

// Animation easing functions
export const easings = {
  easeOutExpo: 'power3.out',
  easeInOutExpo: 'power3.inOut',
  easeOutQuart: 'power2.out',
  easeInOutQuart: 'power2.inOut',
  easeOutBack: 'back.out(1.7)',
  easeInOutBack: 'back.inOut(1.7)',
}
