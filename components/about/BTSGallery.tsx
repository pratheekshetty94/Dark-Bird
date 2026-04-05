'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface BTSImage {
  src: string
  caption: string
  film?: string
}

interface BTSGalleryProps {
  images: BTSImage[]
}

// Responsive column count breakpoints — mirrors Tailwind sm/md/lg defaults.
function getColumnCount(width: number): number {
  if (width >= 1024) return 5
  if (width >= 768) return 4
  if (width >= 640) return 3
  return 2
}

// First-Fit-Decreasing bin packing. Place the tallest images first into the
// shortest column — minimises the gallery bottom spread much better than
// greedy in-order packing, while still preserving top-to-bottom order within
// each column after assignment.
function distributeIntoColumns(
  ratios: number[],
  columnCount: number
): number[][] {
  const cols: number[][] = Array.from({ length: columnCount }, () => [])
  const totals: number[] = new Array(columnCount).fill(0)
  const order = ratios
    .map((ratio, index) => ({ ratio, index }))
    .sort((a, b) => b.ratio - a.ratio)
  order.forEach(({ ratio, index }) => {
    let minCol = 0
    for (let c = 1; c < columnCount; c++) {
      if (totals[c] < totals[minCol]) minCol = c
    }
    cols[minCol].push(index)
    totals[minCol] += ratio
  })
  // Restore original image order within each column so captions read naturally.
  return cols.map((col) => col.sort((a, b) => a - b))
}

export default function BTSGallery({ images }: BTSGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  // Per-image aspect ratio (height / width). Populated on image load.
  const [ratios, setRatios] = useState<number[]>(() => new Array(images.length).fill(1))
  const [columnCount, setColumnCount] = useState(5)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Manual wheel handler so the inner gallery scrolls while it has room,
  // and scroll naturally chains to the page (Lenis smooth scroll) once the
  // gallery hits its top or bottom edge. `data-lenis-prevent` fully blocks
  // Lenis even at the boundary, which is why we handle it ourselves.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const delta = e.deltaY
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      // At a boundary moving outward → let the event bubble to Lenis/page.
      if ((delta < 0 && atTop) || (delta > 0 && atBottom)) return
      // Otherwise scroll the gallery and stop Lenis from also consuming it.
      e.preventDefault()
      e.stopPropagation()
      el.scrollTop += delta
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Track viewport width → column count.
  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount(window.innerWidth))
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleImgLoad = useCallback(
    (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget
      if (!naturalWidth || !naturalHeight) return
      const ratio = naturalHeight / naturalWidth
      setRatios((prev) => {
        if (prev[index] === ratio) return prev
        const next = prev.slice()
        next[index] = ratio
        return next
      })
    },
    []
  )

  const columns = distributeIntoColumns(ratios, columnCount)

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

  // Keyboard navigation
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
      {/* Scrollable viewport — capped at a fraction of the viewport so the gallery
          doesn't dominate the page. A bottom gradient fades the cut-off edge. */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="bts-gallery-scroll max-h-[70vh] md:max-h-[75vh] overflow-y-auto pr-1"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}
        >
          {/* Masonry collage — flex columns filled by greedy shortest-column
              packing so the gallery bottom stays near flush, no cropping. */}
          <div className="flex gap-2 md:gap-3 items-start pb-16">
            {columns.map((columnIndices, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-2 md:gap-3 min-w-0">
                {columnIndices.map((index) => {
                  const img = images[index]
                  return (
                    <div
                      key={img.src}
                      className="group relative overflow-hidden rounded-xl bg-charcoal cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.caption}
                        loading="lazy"
                        decoding="async"
                        onLoad={(e) => handleImgLoad(index, e)}
                        className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-cream text-xs md:text-sm font-medium leading-snug">{img.caption}</p>
                        {img.film && (
                          <p className="font-mono text-[8px] text-accent uppercase tracking-wider mt-1">
                            {img.film}
                          </p>
                        )}
                      </div>
                      <span className="absolute top-2 right-2 font-mono text-[8px] text-white/20 tracking-wider">
                        BTS.{String(index + 1).padStart(3, '0')}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade — cues the user that more content is scrollable below */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-ink via-ink/80 to-transparent" />

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-warm-gray/80">
            Scroll for more
          </span>
          <div className="w-px h-5 bg-gradient-to-b from-warm-gray/60 to-transparent" />
        </div>
      </div>

      {/* Thin custom scrollbar for WebKit browsers */}
      <style jsx>{`
        .bts-gallery-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .bts-gallery-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .bts-gallery-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 3px;
        }
        .bts-gallery-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors duration-300"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous button */}
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

          {/* Next button */}
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

          {/* Image */}
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

          {/* Caption */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-cream text-sm md:text-base font-medium">
              {images[lightboxIndex].caption}
            </p>
            {images[lightboxIndex].film && (
              <p className="font-mono text-[10px] text-accent uppercase tracking-wider mt-1">
                {images[lightboxIndex].film}
              </p>
            )}
            <p className="font-mono text-[10px] text-cream/30 mt-2">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
