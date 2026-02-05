'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
  subtitle?: string
  type?: 'youtube' | 'local'
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  subtitle,
  type = 'youtube',
}: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Don't render if not open
  if (!isOpen) return null

  // Convert YouTube URL to embed format if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/embed')) {
      return `${url}?autoplay=1&rel=0`
    }
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
    if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
    return url
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Video player'}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/95 backdrop-blur-xl animate-fade-in" />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-10 w-full max-w-7xl mx-4 md:mx-8 lg:mx-12',
          'animate-scale-in'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - top right */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-top-14 md:-right-0 lg:-right-14 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20 group"
          aria-label="Close video"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-cream group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Video container - 16:9 aspect ratio */}
        <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-charcoal shadow-dramatic">
          {type === 'youtube' ? (
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <video
              src={videoUrl}
              autoPlay
              controls
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Title & Subtitle below video */}
        {(title || subtitle) && (
          <div className="text-center mt-6 md:mt-8">
            {title && (
              <h3 className="font-display text-2xl md:text-3xl text-cream">{title}</h3>
            )}
            {subtitle && (
              <p className="text-warm-gray mt-1">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
