'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Linkedin, Facebook, ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/filmography', label: 'Filmography' },
  { href: '/contact', label: 'Contact' },
]

const services = [
  { href: '/work/films', label: 'Films' },
  { href: '/work/socials', label: 'Socials' },
  { href: '/work/designs', label: 'Designs' },
  { href: '/work/labs', label: 'Labs' },
]

const socialLinks = [
  { href: 'https://instagram.com/darkbirdsocials', icon: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com/@darkbirdfilms', icon: Youtube, label: 'YouTube' },
  { href: 'https://linkedin.com/company/darkbirdfilms', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.facebook.com/Darkbirdfilms/', icon: Facebook, label: 'Facebook' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink border-t border-stone/10">
      {/* Compact Footer */}
      <div className="container-content py-6 md:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Brand - Logo and tagline inline */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Dark Bird Films"
                width={320}
                height={120}
                className="h-16 md:h-20 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-silver text-sm whitespace-nowrap hidden md:block">
              Stories that move. Brands that grow.
            </p>
          </div>

          {/* Navigation Links - Horizontal on desktop */}
          <div className="flex flex-wrap items-start justify-between lg:justify-center gap-x-8 gap-y-4 lg:gap-x-12">
            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-wider text-warm-gray mb-2">
                Navigate
              </h4>
              <ul className="flex flex-col gap-1">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-silver hover:text-accent transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-wider text-warm-gray mb-2">
                Services
              </h4>
              <ul className="flex flex-col gap-1">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-silver hover:text-accent transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-wider text-warm-gray mb-2">
                Connect
              </h4>
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href="mailto:management@darkbirdfilms.com"
                    className="text-silver hover:text-accent transition-colors text-xs"
                  >
                    Email Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-silver hover:text-accent transition-colors text-xs"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-accent hover:text-accent-hover transition-colors text-xs"
                  >
                    Start Project
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-wider text-warm-gray mb-2">
                Follow
              </h4>
              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-md bg-charcoal flex items-center justify-center text-warm-gray hover:text-accent hover:bg-charcoal/80 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Thin */}
      <div className="border-t border-stone/10">
        <div className="container-content py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] text-warm-gray">
            <p className="font-mono">© {currentYear} Dark Bird Films • Bengaluru</p>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="/careers" className="hover:text-accent transition-colors">Careers</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
