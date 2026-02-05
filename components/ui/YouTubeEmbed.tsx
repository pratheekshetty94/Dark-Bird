'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/videos'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
  aspectRatio?: 'video' | 'square' | 'portrait'
  autoplay?: boolean
  showTitle?: boolean
}

export default function YouTubeEmbed({
  videoId,
  title = 'Video',
  className,
  aspectRatio = 'video',
  autoplay = false,
  showTitle = false,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[9/16]',
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-charcoal', aspectClasses[aspectRatio], className)}>
      {isPlaying ? (
        <iframe
          src={getYouTubeEmbedUrl(videoId, true)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <>
          {/* Thumbnail */}
          <Image
            src={getYouTubeThumbnail(videoId, 'maxres')}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to hq if maxres doesn't exist
              (e.target as HTMLImageElement).src = getYouTubeThumbnail(videoId, 'hq')
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-deep-black/30 group-hover:bg-deep-black/50 transition-colors" />

          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            aria-label={`Play ${title}`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-red flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
            </div>
          </button>

          {/* Title Overlay */}
          {showTitle && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-deep-black/90 to-transparent">
              <p className="text-white font-semibold truncate">{title}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Lightbox version for gallery view
export function YouTubeLightbox({
  videoId,
  title,
  isOpen,
  onClose,
}: {
  videoId: string
  title: string
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary-red transition-colors"
          aria-label="Close"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="aspect-video">
          <iframe
            src={getYouTubeEmbedUrl(videoId, true)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>

        <p className="text-white text-center mt-4 font-semibold">{title}</p>
      </div>
    </div>
  )
}
