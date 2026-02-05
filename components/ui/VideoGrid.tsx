'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Play, Award, Eye, X } from 'lucide-react'
import { VideoItem, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/videos'

interface VideoCardProps {
  video: VideoItem
  isPlaying: boolean
  onPlay: () => void
  onClose: () => void
  className?: string
}

export function VideoCard({ video, isPlaying, onPlay, onClose, className }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Determine thumbnail source
  const thumbnailSrc = video.youtubeId
    ? getYouTubeThumbnail(video.youtubeId, 'hq')
    : video.thumbnail || '/images/video-placeholder.jpg'

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-charcoal',
        !isPlaying && 'cursor-pointer hover-lift',
        className
      )}
    >
      {/* Thumbnail / Video Player Container */}
      <div className="relative aspect-video">
        {isPlaying ? (
          // Video Player - appears in place of thumbnail
          <>
            {video.youtubeId ? (
              <iframe
                src={getYouTubeEmbedUrl(video.youtubeId, true)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : video.localVideoSrc ? (
              <video
                src={video.localVideoSrc}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay
              />
            ) : null}

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute top-2 right-2 z-20 w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white hover:text-primary-red transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          // Thumbnail View
          <>
            {video.localVideoSrc ? (
              <video
                ref={videoRef}
                src={video.localVideoSrc}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                onMouseEnter={() => videoRef.current?.play()}
                onMouseLeave={() => {
                  if (videoRef.current) {
                    videoRef.current.pause()
                    videoRef.current.currentTime = 0
                  }
                }}
              />
            ) : (
              <Image
                src={thumbnailSrc}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent"
              onClick={onPlay}
            />

            {/* Play Button */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onPlay}
            >
              <div className="w-16 h-16 rounded-full bg-primary-red/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Award Badge */}
            {(video.id === 'kantara-trailer' || video.id === '777-charlie-trailer') && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/90 text-deep-black rounded-full text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  State Award
                </div>
              </div>
            )}

            {/* Views Badge */}
            {video.views && (
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-deep-black/80 text-white rounded-full text-xs font-medium">
                  <Eye className="w-3.5 h-3.5" />
                  {video.views}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {video.client && (
          <p className="text-primary-red text-xs font-medium uppercase tracking-wider mb-1">
            {video.client}
          </p>
        )}
        <h3 className={cn(
          "font-semibold text-sm md:text-base mb-2 line-clamp-2 transition-colors",
          isPlaying ? "text-primary-red" : "text-white group-hover:text-primary-red"
        )}>
          {video.title}
        </h3>
        {video.services && video.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {video.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="px-2 py-0.5 bg-white/5 text-warm-gray rounded text-xs"
              >
                {service}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface VideoGridProps {
  videos: VideoItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export default function VideoGrid({ videos, columns = 3, className }: VideoGridProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isPlaying={playingVideoId === video.id}
          onPlay={() => setPlayingVideoId(video.id)}
          onClose={() => setPlayingVideoId(null)}
        />
      ))}
    </div>
  )
}
