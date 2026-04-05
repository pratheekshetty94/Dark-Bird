'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Target, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'

const performanceAds = [
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods — Why Drive to a Hill Station?', src: '/images/socials/performance-ads/SP_1.png' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods — Live Between the Lake & Hills', src: '/images/socials/performance-ads/SP_2.png' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods — Your Kids Don\u2019t Need a Phone', src: '/images/socials/performance-ads/SP_3.png' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods — The Gateway to Premium Living', src: '/images/socials/performance-ads/SP_4.png' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods — Slow Down. Breathe. You Are Home.', src: '/images/socials/performance-ads/SP_5.png' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods — Lead Gen Ad', src: '/images/socials/performance-ads/ad-creative-1.jpg' },
  { client: 'GK Builders & Developers', title: 'Property Features Ad', src: '/images/socials/performance-ads/ad-creative-2.jpg' },
  { client: 'GK Builders & Developers', title: 'Investment Opportunity Ad', src: '/images/socials/performance-ads/ad-creative-6.jpg' },
  { client: 'GK Builders & Developers', title: 'GK Takeoff Campaign', src: '/images/socials/performance-ads/gk-takeoff.png' },
  { client: 'GK Builders & Developers', title: 'Social Post 1', src: '/images/socials/gk-ads/post-1.jpg' },
  { client: 'GK Builders & Developers', title: 'Social Post 2', src: '/images/socials/gk-ads/post-2.jpg' },
]

const videoAds = [
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods - Kids to Old Age', src: '/images/socials/performance-ads/videos/anjani-kids-oldage.mp4' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods - Amenities', src: '/images/socials/performance-ads/videos/anjani-amenities.mp4' },
  { client: 'GK Builders & Developers', title: 'Anjani Lake Woods - Sundowner', src: '/images/socials/performance-ads/videos/anjani-sundowner.mp4' },
]

export default function PerformanceAdsSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? performanceAds.length - 1 : prev - 1))
  const goToNext = () => setCurrentIndex((prev) => (prev === performanceAds.length - 1 ? 0 : prev + 1))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <>
      {/* Ads Grid */}
      <section id="performance-ads" className="section-light section-padding scroll-mt-24">
        <div className="container-content">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="px-4 py-1 bg-red-600/20 text-red-600 rounded-full text-sm font-medium">
                Performance Ads
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mb-4">Ad Creatives</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-warm-gray max-w-2xl mb-10">
              ROI-focused ad creatives designed to drive engagement and conversions
              across Meta and Google platforms. We create ads that perform.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {performanceAds.map((ad, index) => (
              <button
                key={ad.src}
                onClick={() => openLightbox(index)}
                className="group relative rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer text-left"
              >
                <div className="relative">
                  <Image
                    src={ad.src}
                    alt={ad.title}
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {ad.client}
                  </span>
                  <span className="text-white font-medium text-sm">{ad.title}</span>
                  <span className="text-white/60 text-xs mt-1">Click to view fullscreen</span>
                </div>
              </button>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Video Ads */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8">Video Ad Creatives</h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoAds.map((video) => (
              <div key={video.src} className="rounded-xl overflow-hidden shadow-lg bg-charcoal">
                <video
                  src={`${video.src}#t=0.5`}
                  controls
                  preload="metadata"
                  className="w-full aspect-[9/16] object-cover"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <span className="text-xs text-primary-red font-medium uppercase tracking-wider">
                    {video.client}
                  </span>
                  <h3 className="text-white font-medium mt-1">{video.title}</h3>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-deep-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10 bg-white/10 rounded-full hover:bg-white/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10 bg-white/10 rounded-full hover:bg-white/20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div
            className="max-w-[90vw] max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={performanceAds[currentIndex].src}
              alt={performanceAds[currentIndex].title}
              width={1200}
              height={1200}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-black/90 to-transparent p-4 text-center">
              <span className="text-xs text-primary-red font-medium uppercase tracking-wider block">
                {performanceAds[currentIndex].client}
              </span>
              <span className="text-white font-medium">
                {performanceAds[currentIndex].title}
              </span>
              <span className="text-white/60 text-sm block mt-1">
                {currentIndex + 1} / {performanceAds.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
