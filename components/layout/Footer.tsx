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
      {/* Main Footer - Evenly distributed on desktop */}
      <div className="container-content py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand Column */}
          <div className="flex-shrink-0 md:flex-1">
            <Link href="/" className="group inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Dark Bird Films"
                width={400}
                height={150}
                className="h-24 md:h-32 lg:h-40 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-silver text-sm md:text-base whitespace-nowrap">
              Stories that move. Brands that grow.
            </p>
          </div>

          {/* Links Row - Evenly distributed in center */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-6 md:gap-x-12 lg:gap-x-16 md:flex-[2]">
            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-3">
                Navigate
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-silver hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-3">
                Services
              </h4>
              <ul className="space-y-2">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-silver hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-3">
                Connect
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:management@darkbirdfilms.com"
                    className="text-silver hover:text-accent transition-colors text-sm"
                  >
                    Email Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-silver hover:text-accent transition-colors text-sm"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-accent hover:text-accent-hover transition-colors text-sm"
                  >
                    Start Project
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-warm-gray mb-3">
                Follow
              </h4>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-charcoal flex items-center justify-center text-warm-gray hover:text-accent hover:bg-charcoal/80 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone/10">
        <div className="container-content py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-warm-gray">
            <p className="font-mono">© {currentYear} Dark Bird Films • Bengaluru</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="/careers" className="hover:text-accent transition-colors">Careers</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
