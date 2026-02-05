'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Play, Award } from 'lucide-react'

interface WorkCardProps {
  title: string
  category: string
  tags?: string[]
  image: string
  videoSrc?: string
  href?: string
  metrics?: string
  hasAward?: boolean
  awardText?: string
  className?: string
}

export default function WorkCard({
  title,
  category,
  tags = [],
  image,
  videoSrc,
  href = '#',
  metrics,
  hasAward,
  awardText,
  className,
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
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
        'group relative block overflow-hidden rounded-lg bg-charcoal hover-lift',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail / Video */}
      <div className="relative aspect-video overflow-hidden">
        {videoSrc && isHovered ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent" />

        {/* Play Button */}
        {videoSrc && (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center',
            'transition-opacity duration-300',
            isHovered ? 'opacity-0' : 'opacity-100'
          )}>
            <div className="w-16 h-16 rounded-full bg-primary-red/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Award Badge */}
        {hasAward && (
          <div className="absolute top-4 left-4 z-10">
            <div className="award-badge">
              <Award className="w-4 h-4" />
              <span>{awardText || 'Award Winner'}</span>
            </div>
          </div>
        )}

        {/* Metrics Badge */}
        {metrics && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 bg-deep-black/80 text-white rounded-full text-sm font-medium">
              {metrics}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-primary-red text-caption font-medium mb-1">
          {category}
        </p>
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-red transition-colors">
          {title}
        </h3>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
