'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  buttonText = 'Get in Touch',
  buttonHref = '/contact',
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

          <Link
            href={buttonHref}
            className={cn(
              'group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium transition-all duration-300',
              isAccent && 'bg-cream text-ink',
              variant === 'dark' && 'bg-accent text-cream',
              isLight && 'bg-ink text-cream'
            )}
          >
            {buttonText}
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>

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
