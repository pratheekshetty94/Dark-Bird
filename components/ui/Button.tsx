'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'ghost-dark'
  size?: 'default' | 'sm' | 'lg'
  href?: string
  external?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', href, external, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 focus:ring-offset-deep-black disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-primary-red text-white hover:bg-primary-red-hover hover:scale-[1.02] hover:shadow-lg',
      ghost: 'bg-transparent border border-white text-white hover:bg-white hover:text-charcoal',
      'ghost-dark': 'bg-transparent border border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
    }

    const sizes = {
      sm: 'px-6 py-2 text-sm',
      default: 'px-10 py-4 text-base',
      lg: 'px-12 py-5 text-lg',
    }

    const classes = cn(baseStyles, variants[variant], sizes[size], className)

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
