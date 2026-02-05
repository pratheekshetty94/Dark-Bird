'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface DepartmentCardProps {
  number: string
  title: string
  description: string
  href: string
  videoSrc?: string
  posterSrc?: string
  logoSrc?: string
  className?: string
}

export default function DepartmentCard({
  number,
  title,
  description,
  href,
  videoSrc,
  posterSrc,
  logoSrc,
  className,
}: DepartmentCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay prevented, ignore
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-lg aspect-video bg-charcoal',
        'transition-all duration-400 hover:shadow-2xl',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Video */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-charcoal to-deep-black transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: posterSrc ? `url(${posterSrc})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className={cn(
          'absolute inset-0 z-10 transition-all duration-400',
          'bg-gradient-to-t from-deep-black via-deep-black/60 to-deep-black/30',
          isHovered && 'from-deep-black via-deep-black/70 to-deep-black/40'
        )}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col">
        {/* Center: Logo */}
        {logoSrc && (
          <div className="flex-1 flex items-center justify-center">
            <div
              className={cn(
                "relative w-48 h-20 md:w-64 md:h-24 lg:w-72 lg:h-28 transition-transform duration-500",
                isHovered ? "scale-110" : "scale-100"
              )}
            >
              <Image
                src={logoSrc}
                alt={title}
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Fallback: Number (if no logo) */}
        {!logoSrc && (
          <div className="flex-1 flex items-center justify-center">
            <span className="font-display text-7xl md:text-8xl lg:text-9xl text-primary-red opacity-80">
              {number}
            </span>
          </div>
        )}

        {/* Bottom Content */}
        <div className="mt-auto">
          <p className="text-white/80 text-sm md:text-base mb-3 line-clamp-2">
            {description}
          </p>

          {/* CTA */}
          <div
            className={cn(
              'flex items-center gap-2 text-primary-red font-semibold',
              'transform transition-all duration-300',
              isHovered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
            )}
          >
            <span>View Work</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
