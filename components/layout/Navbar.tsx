'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown, Film, Share2, Palette, Cpu, ArrowUpRight } from 'lucide-react'

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
  { href: '/filmography', label: 'Filmography' },
  {
    href: '/work',
    label: 'Work',
    hasDropdown: true,
    dropdownItems: [
      {
        href: '/work',
        label: 'All Services',
        description: 'Everything we offer',
        icon: Film,
      },
      {
        href: '/work/films',
        label: 'Films',
        description: 'Feature films, ads & music videos',
        icon: Film,
      },
      {
        href: '/work/socials',
        label: 'Socials',
        description: 'Digital & real estate marketing',
        icon: Share2,
      },
      {
        href: '/work/designs',
        label: 'Designs',
        description: 'Brand identity & motion graphics',
        icon: Palette,
      },
      {
        href: '/work/labs',
        label: 'Labs',
        description: 'AI-powered creative experiments',
        icon: Cpu,
      },
    ],
  },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
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

  // Check if current page has light background
  const hasLightBackground = lightBackgroundPages.includes(pathname)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? hasLightBackground
              ? 'py-4 bg-ink'
              : 'py-4 backdrop-blur-xl bg-ink/80'
            : hasLightBackground
              ? 'py-6 bg-ink'
              : 'py-6 bg-transparent'
        )}
      >
        <div className="container-content">
          <div className="flex items-center justify-between">
            {/* Logo - Shows department logo on department pages */}
            <Link
              href="/"
              className="relative z-10 group"
            >
              <Image
                src={departmentLogos[pathname]?.logo || '/images/logo.png'}
                alt={departmentLogos[pathname]?.alt || 'Dark Bird Films'}
                width={320}
                height={120}
                className="h-20 md:h-24 lg:h-32 w-auto object-contain transition-opacity group-hover:opacity-80"
                priority
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() =>
                    link.hasDropdown && setActiveDropdown(link.href)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.hasDropdown ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
                        pathname.startsWith(link.href)
                          ? 'text-accent'
                          : 'text-cream/70 hover:text-cream hover:bg-cream/5'
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          activeDropdown === link.href && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
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
                  )}

                  {/* Dropdown Menu */}
                  {link.hasDropdown && (
                    <div
                      className={cn(
                        'absolute top-full left-0 pt-2',
                        activeDropdown === link.href ? 'opacity-100 visible' : 'opacity-0 invisible'
                      )}
                    >
                      <div className={cn(
                        'min-w-[280px] p-2 rounded-xl border border-stone/20 backdrop-blur-xl transition-all duration-300',
                        'bg-ink/95 shadow-dramatic',
                        activeDropdown === link.href ? 'translate-y-0' : 'translate-y-2'
                      )}>
                        {link.dropdownItems?.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream/5 transition-colors group"
                            >
                              <div className="w-9 h-9 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                                <Icon className="w-4 h-4 text-accent" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-cream text-sm">
                                  {item.label}
                                </p>
                                <p className="text-xs text-warm-gray truncate">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-5 py-2.5 bg-accent text-cream text-sm font-medium rounded-lg hover:bg-accent-hover transition-all duration-200"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2 text-cream hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink transition-all duration-500 lg:hidden',
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="container-content pt-28 pb-8 flex flex-col h-full">
          <div className="flex-1 space-y-2">
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className={cn(
                  'transition-all duration-500',
                  isMobileMenuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
              >
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.href ? null : link.href
                        )
                      }
                      className="flex items-center justify-between w-full py-4 text-3xl font-display text-cream border-b border-stone/20"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'w-6 h-6 text-warm-gray transition-transform duration-300',
                          activeDropdown === link.href && 'rotate-180 text-accent'
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        activeDropdown === link.href
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="py-4 space-y-1">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 py-3 pl-4 text-lg text-warm-gray hover:text-accent transition-colors border-l-2 border-stone/30 hover:border-accent"
                          >
                            <span className="font-mono text-xs text-accent">→</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-4 text-3xl font-display transition-colors border-b border-stone/20',
                      pathname === link.href
                        ? 'text-accent'
                        : 'text-cream hover:text-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div
            className={cn(
              'pt-8 border-t border-stone/20 transition-all duration-500',
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
          >
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-cream text-lg font-medium rounded-xl hover:bg-accent-hover transition-colors"
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
    </>
  )
}
