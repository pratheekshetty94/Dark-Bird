'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { trackCtaClick } from '@/lib/analytics'

// Department logos mapping
const departmentLogos: Record<string, { logo: string; alt: string }> = {
  '/work/films': { logo: '/images/logo-films.png', alt: 'Dark Bird Films' },
  '/work/socials': { logo: '/images/logo-socials.png', alt: 'Dark Bird Socials' },
  '/work/designs': { logo: '/images/logo-designs.png', alt: 'Dark Bird Designs' },
  '/work/labs': { logo: '/images/logo-labs.png', alt: 'Dark Bird Labs' },
  '/filmography': { logo: '/images/logo-films.png', alt: 'Dark Bird Films' },
}

// Pages with light backgrounds that need dark header
const lightBackgroundPages = ['/work/designs']

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/filmography', label: 'Films' },
  { href: '/work/socials', label: 'Socials' },
  { href: '/work/designs', label: 'Designs' },
  { href: '/work/labs', label: 'Labs' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isWindows, setIsWindows] = useState(false)
  const pathname = usePathname()

  // Mount check + Windows detection
  useEffect(() => {
    setIsMounted(true)
    setIsWindows(navigator.userAgent.includes('Windows'))
  }, [])

  // Handle scroll - only on desktop
  useEffect(() => {
    if (!isMounted) return

    // Check if mobile
    const isMobile = window.innerWidth < 1024
    if (isMobile) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const hasLightBackground = lightBackgroundPages.includes(pathname)

  // Get current logo
  const currentLogo = departmentLogos[pathname]?.logo || '/images/logo.png'
  const currentAlt = departmentLogos[pathname]?.alt || 'Dark Bird Films'

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? hasLightBackground ? 'py-4 bg-ink' : isWindows ? 'py-4 bg-ink' : 'py-4 backdrop-blur-xl bg-ink/90'
            : hasLightBackground ? 'py-6 bg-ink' : 'py-6 bg-transparent'
        )}
      >
        <div className="container-content">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <Image
                src={currentLogo}
                alt={currentAlt}
                width={160}
                height={60}
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg block',
                    pathname === link.href
                      ? 'text-accent'
                      : 'text-cream/70 hover:text-cream hover:bg-cream/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                onClick={() => trackCtaClick('navbar_desktop', 'lets_talk')}
                className="group flex items-center gap-2 px-5 py-2.5 bg-accent text-cream text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-200"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2 text-cream"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Simplified */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ink lg:hidden">
          <div className="container-content pt-24 pb-8 flex flex-col h-full overflow-y-auto">
            <div className="flex-1 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block py-4 text-2xl font-display border-b border-stone/20',
                    pathname === link.href ? 'text-accent' : 'text-cream'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="pt-6 border-t border-stone/20">
              <Link
                href="/contact"
                onClick={() => trackCtaClick('navbar_mobile', 'lets_talk')}
                className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-cream text-lg font-medium rounded-xl"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-warm-gray text-sm mt-4">
                management@darkbirdfilms.com
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
