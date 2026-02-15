'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface GalleryImage {
  src: string
  caption: string
}

interface GalleryStripProps {
  images: GalleryImage[]
}

export default function GalleryStrip({ images }: GalleryStripProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % images.length)
  }, [lightboxIndex, images.length])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
  }, [lightboxIndex, images.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, goNext, goPrev])

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-gutter px-gutter">
        {images.map((img, index) => (
          <ScrollReveal key={img.src} delay={index * 0.04}>
            <div
              className="group relative flex-shrink-0 w-[280px] md:w-[360px] overflow-hidden rounded-xl bg-ink cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="360px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-cream text-xs font-medium">{img.caption}</p>
                  <p className="font-mono text-[8px] text-accent/70 uppercase tracking-wider mt-0.5">
                    Shot by Pratheek Shetty
                  </p>
                </div>
                <span className="absolute top-3 right-3 font-mono text-[8px] text-white/15 tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors duration-300"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            className="relative w-[90vw] h-[80vh] max-w-[1400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].caption}
              fill
              className="object-contain"
              sizes="90vw"
              unoptimized
              priority
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-cream text-sm md:text-base font-medium">
              {images[lightboxIndex].caption}
            </p>
            <p className="font-mono text-[10px] text-accent/70 uppercase tracking-wider mt-1">
              Shot by Pratheek Shetty
            </p>
            <p className="font-mono text-[10px] text-cream/30 mt-2">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
