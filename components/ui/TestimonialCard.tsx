'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  company?: string
  image?: string
  variant?: 'light' | 'dark'
  className?: string
}

export default function TestimonialCard({
  quote,
  author,
  title,
  company,
  image,
  variant = 'light',
  className,
}: TestimonialCardProps) {
  const bgClass = variant === 'light' ? 'bg-warm-beige' : 'bg-charcoal'
  const textClass = variant === 'light' ? 'text-charcoal' : 'text-white'

  return (
    <div className={cn('relative p-8 md:p-10 rounded-lg', bgClass, className)}>
      {/* Quote Mark */}
      <span className="quote-mark font-display">"</span>

      {/* Quote */}
      <blockquote className={cn('relative z-10 text-lg md:text-xl italic leading-relaxed mb-8 pt-8', textClass)}>
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {image ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-primary-red/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-red font-bold text-xl">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className={cn('font-bold', textClass)}>{author}</p>
          <p className={cn('text-sm', variant === 'light' ? 'text-warm-gray' : 'text-white/70')}>
            {title}
          </p>
          {company && (
            <p className="text-sm text-primary-red font-medium">{company}</p>
          )}
        </div>
      </div>
    </div>
  )
}
