'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import ScrollReveal, { StaggerReveal } from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'

const websiteScreens = [
  {
    src: '/images/designs/websites/gk-builders/homepage.jpeg',
    alt: 'GK Builders Homepage',
    title: 'Homepage',
    description: 'Clean, modern homepage showcasing premium villa projects',
  },
  {
    src: '/images/designs/websites/gk-builders/hillview-project.png',
    alt: 'GK Hill View Project Page',
    title: 'Hill View Project',
    description: 'Detailed project page with amenities and specifications',
  },
  {
    src: '/images/designs/websites/gk-builders/anjani-project.png',
    alt: 'Anjani Lake Woods Project Page',
    title: 'Anjani Lake Woods Project',
    description: 'Premium villa plots project showcase',
  },
]

export default function GKBuildersWebsitePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev === 0 ? websiteScreens.length - 1 : prev - 1))
      if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev === websiteScreens.length - 1 ? 0 : prev + 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === 0 ? websiteScreens.length - 1 : prev - 1)); }}
            className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={websiteScreens[currentImageIndex].src}
              alt={websiteScreens[currentImageIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === websiteScreens.length - 1 ? 0 : prev + 1)); }}
            className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {currentImageIndex + 1} / {websiteScreens.length}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="section-dark pt-44 pb-16">
        <div className="container-content">
          <ScrollReveal>
            <Link
              href="/work/designs"
              className="inline-flex items-center gap-2 text-warm-gray hover:text-accent transition-all mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Designs</span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                Website Design
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-hero font-bold text-white mb-4">
              GK Builders & Developers
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              A premium real estate website designed to showcase luxury villa projects in Bangalore.
              Clean, modern aesthetics with seamless user experience for property exploration.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href="https://gkbuildersanddevelopers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-red text-white font-semibold rounded-lg hover:bg-primary-red/90 transition-colors"
            >
              Visit Live Website <ExternalLink className="w-4 h-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Website Screens */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              Website Screenshots
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 gap-8">
            {websiteScreens.map((screen, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-charcoal text-lg mb-2">{screen.title}</h3>
                  <p className="text-warm-gray">{screen.description}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Project Info */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="text-center">
                <h3 className="text-primary-red font-mono text-sm uppercase tracking-wider mb-2">Client</h3>
                <p className="text-white text-xl font-semibold">GK Builders & Developers</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <h3 className="text-primary-red font-mono text-sm uppercase tracking-wider mb-2">Industry</h3>
                <p className="text-white text-xl font-semibold">Real Estate</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <h3 className="text-primary-red font-mono text-sm uppercase tracking-wider mb-2">Services</h3>
                <p className="text-white text-xl font-semibold">Web Design & Development</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Need a Website Like This?"
        description="Let us create a stunning website that converts visitors into customers."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </>
  )
}
