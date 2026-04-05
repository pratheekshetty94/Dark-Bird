'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackCtaClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'
import { WHATSAPP_URL, PHONE_TEL_URL } from '@/lib/contact'

interface CTABandProps {
  headline?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  variant?: 'accent' | 'dark' | 'light'
  className?: string
}

export default function CTABand({
  headline = "Let's Create Something Powerful",
  description = "Whether it's a film, a campaign, a walkthrough, or a brand story — we'd love to create something meaningful with you.",
  buttonText = 'Book a Discovery Call',
  buttonHref = '/contact#book-call',
  variant = 'accent',
  className,
}: CTABandProps) {
  const isAccent = variant === 'accent'
  const isLight = variant === 'light'

  return (
    <section
      className={cn(
        'py-16 md:py-32 relative overflow-hidden',
        isAccent && 'bg-accent',
        variant === 'dark' && 'bg-ink',
        isLight && 'bg-cream',
        className
      )}
    >
      {/* Background Pattern */}
      <div
        className={cn(
          'hidden md:block absolute inset-0 opacity-10 pointer-events-none',
          isAccent && 'bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]',
          variant === 'dark' && 'bg-[radial-gradient(circle_at_70%_50%,rgba(232,90,63,0.3),transparent_50%)]'
        )}
      />

      <div className="container-content relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className={cn(
              'font-mono text-[10px] md:text-xs uppercase tracking-wider',
              isAccent && 'text-cream/70',
              variant === 'dark' && 'text-warm-gray',
              isLight && 'text-stone'
            )}
          >
            ( Start a Project )
          </span>

          <h2
            className={cn(
              'font-display text-2xl md:text-5xl mt-4 md:mt-6 mb-4 md:mb-8',
              isAccent && 'text-cream',
              variant === 'dark' && 'text-cream',
              isLight && 'text-ink'
            )}
          >
            {headline.split(' ').slice(0, -1).join(' ')}{' '}
            <em className={cn(
              isAccent && 'text-cream',
              variant === 'dark' && 'text-accent',
              isLight && 'text-accent'
            )}>
              {headline.split(' ').slice(-1)}
            </em>
          </h2>

          <p
            className={cn(
              'text-sm md:text-lg max-w-xl mx-auto mb-6 md:mb-10',
              isAccent && 'text-cream/80',
              variant === 'dark' && 'text-silver',
              isLight && 'text-stone'
            )}
          >
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4">
            <Link
              href={buttonHref}
              onClick={() => trackCtaClick('cta_band', buttonText)}
              className={cn(
                'group inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-4 rounded-lg font-medium transition-all duration-300',
                isAccent && 'bg-cream text-ink hover:bg-cream/90',
                variant === 'dark' && 'bg-accent text-cream hover:bg-accent-hover',
                isLight && 'bg-ink text-cream hover:bg-ink/90'
              )}
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              Book a Discovery Call
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('cta_band')}
              className="group inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-4 rounded-lg font-medium bg-green-600 text-cream hover:bg-green-700 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              WhatsApp Us
            </a>

            <a
              href={PHONE_TEL_URL}
              onClick={() => trackPhoneClick('cta_band')}
              className={cn(
                'group inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-4 rounded-lg font-medium border-2 transition-all duration-300',
                isAccent && 'border-cream text-cream hover:bg-cream hover:text-ink',
                variant === 'dark' && 'border-accent text-accent hover:bg-accent hover:text-cream',
                isLight && 'border-ink text-ink hover:bg-ink hover:text-cream'
              )}
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Call Us
            </a>
          </div>

          {/* Email */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-16">
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-16 h-px',
                isAccent && 'bg-cream/30',
                variant === 'dark' && 'bg-stone/30',
                isLight && 'bg-stone/30'
              )} />
              <span className={cn(
                'font-mono text-xs',
                isAccent && 'text-cream/50',
                variant === 'dark' && 'text-warm-gray',
                isLight && 'text-warm-gray'
              )}>
                management@darkbirdfilms.com
              </span>
              <div className={cn(
                'w-16 h-px',
                isAccent && 'bg-cream/30',
                variant === 'dark' && 'bg-stone/30',
                isLight && 'bg-stone/30'
              )} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
