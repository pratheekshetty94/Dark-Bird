'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import { trackCtaClick } from '@/lib/analytics'
import { divisions } from '@/lib/divisions'
import { industries } from '@/lib/industries'

// Department logos mapping
const departmentLogos: Record<string, { logo: string; alt: string }> = {
  '/work/films': { logo: '/images/logo-films.png', alt: 'Dark Bird Films' },
  '/work/socials': { logo: '/images/logo-socials.png', alt: 'Dark Bird Socials' },
  '/work/designs': { logo: '/images/logo-designs.png', alt: 'Dark Bird Designs' },
  '/work/labs': { logo: '/images/logo-labs.png', alt: 'Dark Bird Labs' },
}

// Pages with light backgrounds that need dark header
const lightBackgroundPages = ['/work/designs']

// Work dropdown — the four divisions
const workLinks = [
  { href: '/filmography', label: 'Films', tagline: 'Feature films, ad films & music videos' },
  { href: '/work/socials', label: 'Socials', tagline: 'Performance marketing & content' },
  { href: '/work/designs', label: 'Designs', tagline: 'Brand identity & web design' },
  { href: '/work/labs', label: 'Labs', tagline: 'AI video & experimental craft' },
]

type DropdownKey = 'work' | 'services' | 'industries' | null

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isWindows, setIsWindows] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileOpenSection, setMobileOpenSection] = useState<DropdownKey>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Mount check + Windows detection
  useEffect(() => {
    setIsMounted(true)
    setIsWindows(navigator.userAgent.includes('Windows'))
  }, [])

  // Handle scroll - only on desktop
  useEffect(() => {
    if (!isMounted) return

    const isMobile = window.innerWidth < 1024
    if (isMobile) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
    setMobileOpenSection(null)
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
  const currentLogo = departmentLogos[pathname]?.logo || '/images/logo.png'
  const currentAlt = departmentLogos[pathname]?.alt || 'Dark Bird Films'

  // Hover handlers with small close delay so moving between trigger and panel is forgiving
  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpenDropdown(key)
  }
  const handleMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const isWorkActive = pathname.startsWith('/work')
  const isServicesActive = pathname.startsWith('/services')
  const isIndustriesActive = pathname.startsWith('/industries')

  const triggerClass = (active: boolean) =>
    cn(
      'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-1',
      active ? 'text-accent' : 'text-cream/70 hover:text-cream hover:bg-cream/5'
    )

  const linkClass = (active: boolean) =>
    cn(
      'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg block',
      active ? 'text-accent' : 'text-cream/70 hover:text-cream hover:bg-cream/5'
    )

  const toggleMobileSection = (key: DropdownKey) => {
    setMobileOpenSection((prev) => (prev === key ? null : key))
  }

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
              <Link href="/" className={linkClass(pathname === '/')}>Home</Link>
              <Link href="/about" className={linkClass(pathname === '/about')}>About</Link>

              {/* Work dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('work')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={triggerClass(isWorkActive)}
                  aria-expanded={openDropdown === 'work'}
                  aria-haspopup="true"
                >
                  Work
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', openDropdown === 'work' && 'rotate-180')} />
                </button>
                {openDropdown === 'work' && (
                  <div className="absolute left-0 top-full pt-3">
                    <div className="w-80 rounded-xl border border-stone/15 bg-ink/95 backdrop-blur-xl shadow-2xl p-2">
                      {workLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg p-3 hover:bg-cream/5 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              'text-sm font-medium',
                              pathname === item.href ? 'text-accent' : 'text-cream group-hover:text-accent'
                            )}>
                              {item.label}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-warm-gray opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-xs text-warm-gray mt-0.5">{item.tagline}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Services dropdown — 4-column mega flyout. Trigger itself navigates to /services. */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/services"
                  className={triggerClass(isServicesActive)}
                  aria-expanded={openDropdown === 'services'}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', openDropdown === 'services' && 'rotate-180')} />
                </Link>
                {openDropdown === 'services' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                    <div className="w-[920px] rounded-xl border border-stone/15 bg-ink/95 backdrop-blur-xl shadow-2xl p-6">
                      <div className="grid grid-cols-4 gap-6">
                        {divisions.map((div) => (
                          <div key={div.category}>
                            <Link
                              href={div.href}
                              className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent mb-3 hover:text-accent-hover"
                            >
                              {div.category}
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                            <ul className="space-y-1">
                              {div.services.map((svc) => (
                                <li key={svc.label}>
                                  <Link
                                    href={svc.slug ? `/services/${svc.slug}` : div.href}
                                    className="block text-[11px] text-cream/70 hover:text-accent transition-colors py-0.5 leading-snug"
                                  >
                                    {svc.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-stone/15 mt-5 pt-4 flex items-center justify-between">
                        <p className="text-xs text-warm-gray">One team. Four divisions. Every craft a brand needs.</p>
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium"
                        >
                          View all services
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries dropdown. Trigger itself navigates to /industries. */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('industries')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/industries"
                  className={triggerClass(isIndustriesActive)}
                  aria-expanded={openDropdown === 'industries'}
                  aria-haspopup="true"
                >
                  Industries
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', openDropdown === 'industries' && 'rotate-180')} />
                </Link>
                {openDropdown === 'industries' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                    <div className="w-[520px] rounded-xl border border-stone/15 bg-ink/95 backdrop-blur-xl shadow-2xl p-5">
                      <ul className="grid grid-cols-2 gap-1">
                        {industries.map((ind) => (
                          <li key={ind.slug}>
                            <Link
                              href={`/industries/${ind.slug}`}
                              className="block rounded-lg px-3 py-2 text-xs text-cream/75 hover:text-accent hover:bg-cream/5 transition-colors"
                            >
                              {ind.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-stone/15 mt-4 pt-3">
                        <Link
                          href="/industries"
                          className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium"
                        >
                          All industries we serve
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/contact" className={linkClass(pathname === '/contact')}>Contact</Link>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ink lg:hidden">
          <div className="container-content pt-24 pb-8 flex flex-col h-full overflow-y-auto">
            <div className="flex-1 space-y-1">
              <Link href="/" className={cn('block py-4 text-2xl font-display border-b border-stone/20', pathname === '/' ? 'text-accent' : 'text-cream')}>
                Home
              </Link>
              <Link href="/about" className={cn('block py-4 text-2xl font-display border-b border-stone/20', pathname === '/about' ? 'text-accent' : 'text-cream')}>
                About
              </Link>

              {/* Work accordion */}
              <div className="border-b border-stone/20">
                <button
                  type="button"
                  onClick={() => toggleMobileSection('work')}
                  className={cn('w-full flex items-center justify-between py-4 text-2xl font-display', isWorkActive ? 'text-accent' : 'text-cream')}
                >
                  Work
                  <ChevronDown className={cn('w-5 h-5 transition-transform', mobileOpenSection === 'work' && 'rotate-180')} />
                </button>
                {mobileOpenSection === 'work' && (
                  <div className="pb-4 pl-2 space-y-1">
                    {workLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn('block py-2 text-base', pathname === item.href ? 'text-accent' : 'text-silver')}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services accordion — header navigates to /services; chevron toggles expansion */}
              <div className="border-b border-stone/20">
                <div className="flex items-center justify-between">
                  <Link
                    href="/services"
                    className={cn('flex-1 py-4 text-2xl font-display', isServicesActive ? 'text-accent' : 'text-cream')}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('services')}
                    aria-label="Toggle services menu"
                    className="p-2 text-cream"
                  >
                    <ChevronDown className={cn('w-5 h-5 transition-transform', mobileOpenSection === 'services' && 'rotate-180')} />
                  </button>
                </div>
                {mobileOpenSection === 'services' && (
                  <div className="pb-4 pl-2 space-y-4">
                    {divisions.map((div) => (
                      <div key={div.category}>
                        <Link
                          href={div.href}
                          className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1.5 block"
                        >
                          {div.category}
                        </Link>
                        <ul className="space-y-0.5">
                          {div.services.map((svc) => (
                            <li key={svc.label}>
                              <Link
                                href={svc.slug ? `/services/${svc.slug}` : div.href}
                                className="block py-1 text-sm text-silver hover:text-accent"
                              >
                                {svc.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-accent font-medium pt-2">
                      View all services
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Industries accordion — header navigates to /industries; chevron toggles expansion */}
              <div className="border-b border-stone/20">
                <div className="flex items-center justify-between">
                  <Link
                    href="/industries"
                    className={cn('flex-1 py-4 text-2xl font-display', isIndustriesActive ? 'text-accent' : 'text-cream')}
                  >
                    Industries
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('industries')}
                    aria-label="Toggle industries menu"
                    className="p-2 text-cream"
                  >
                    <ChevronDown className={cn('w-5 h-5 transition-transform', mobileOpenSection === 'industries' && 'rotate-180')} />
                  </button>
                </div>
                {mobileOpenSection === 'industries' && (
                  <div className="pb-4 pl-2 space-y-1">
                    {industries.map((ind) => (
                      <Link key={ind.slug} href={`/industries/${ind.slug}`} className="block py-1.5 text-sm text-silver">
                        {ind.shortName}
                      </Link>
                    ))}
                    <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm text-accent font-medium pt-2">
                      All industries
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className={cn('block py-4 text-2xl font-display border-b border-stone/20', pathname === '/contact' ? 'text-accent' : 'text-cream')}>
                Contact
              </Link>
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
