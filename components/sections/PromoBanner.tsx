'use client'

import React from 'react'

const promos = [
  { src: '/videos/promo-commercial.mp4', label: 'Ad Films' },
  { src: '/videos/promo-music-video.mp4', label: 'Music Videos' },
  { src: '/videos/promo-trailer.mp4', label: 'Trailers' },
]

export default function PromoBanner() {
  return (
    <section className="relative bg-ink py-12 md:py-20 overflow-hidden">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {promos.map((promo) => (
            <div
              key={promo.label}
              className="group relative rounded-2xl overflow-hidden border border-cream/[0.06] hover:border-accent/20 transition-colors duration-300"
            >
              <video
                src={promo.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
              />
              {/* Bottom label overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent px-4 py-3">
                <span className="font-mono text-[10px] md:text-xs text-cream/80 uppercase tracking-wider">
                  {promo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
