'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// All client logos
const clients = [
  { name: 'Google', logo: '/images/clients/Goog;e.png' },
  { name: 'Flipkart', logo: '/images/clients/FlipKart.png' },
  { name: 'Netflix', logo: '/images/clients/Netflix.png' },
  { name: 'Prime Video', logo: '/images/clients/Prime.png' },
  { name: 'Jio Studios', logo: '/images/clients/Jio Studios.png' },
  { name: 'Viacom', logo: '/images/clients/Viacom.png' },
  { name: 'Zomato', logo: '/images/clients/Zomato.png' },
  { name: 'Shopsy', logo: '/images/clients/Shopsy.png' },
  { name: 'Delhivery', logo: '/images/clients/DELHIVERY.png' },
  { name: 'HP', logo: '/images/clients/HP.png' },
  { name: 'Colors', logo: '/images/clients/colors.png' },
  { name: 'Hombale Films', logo: '/images/clients/HombaleFilms.png' },
  { name: 'Paramvah Studios', logo: '/images/clients/ParamvahStudio.png' },
  { name: 'PRK Productions', logo: '/images/clients/PRK.png' },
  { name: 'Rishab Shetty Films', logo: '/images/clients/RSF.png' },
  { name: 'GK Builders', logo: '/images/clients/GK.png' },
  { name: 'Mudskipper', logo: '/images/clients/MUDSKIPPER.png' },
  { name: 'Jungle', logo: '/images/clients/Jungle.png' },
  { name: 'Ricky Kej', logo: '/images/clients/RickyKej.png' },
  { name: 'Raghu Dixit', logo: '/images/clients/RaghuDixit.png' },
  { name: 'Hang Massive', logo: '/images/clients/HangMassive.png' },
  { name: 'Lighter Buddha', logo: '/images/clients/LighterBuddha.png' },
  { name: 'Daali', logo: '/images/clients/Daali.png' },
  { name: 'Hangyo', logo: '/images/clients/Hangyo.png' },
  { name: 'YO Fruits', logo: '/images/clients/YO Fruits.png' },
]

interface ClientMarqueeProps {
  className?: string
  showSecondRow?: boolean
}

export default function ClientMarquee({ className, showSecondRow = true }: ClientMarqueeProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkMobile()
  }, [])

  const firstRowClients = clients.slice(0, 13)
  const secondRowClients = clients.slice(13)

  // Mobile: Two rows with auto-scroll, pause on touch
  if (isMobile) {
    return (
      <section className={cn('section-dark py-6', className)}>
        <div
          className="overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
        >
          {/* First Row */}
          <div className="mb-4">
            <div
              className={cn(
                "flex animate-marquee",
                isPaused && "[animation-play-state:paused]"
              )}
              style={{ width: 'max-content' }}
            >
              {[...firstRowClients, ...firstRowClients].map((client, index) => (
                <div key={`mobile-row1-${index}`} className="flex items-center justify-center flex-shrink-0 mx-2">
                  <div className="relative h-16 w-40 opacity-50">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="160px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Second Row - Reverse direction */}
          <div>
            <div
              className={cn(
                "flex animate-marquee-reverse",
                isPaused && "[animation-play-state:paused]"
              )}
              style={{ width: 'max-content' }}
            >
              {[...secondRowClients, ...secondRowClients].map((client, index) => (
                <div key={`mobile-row2-${index}`} className="flex items-center justify-center flex-shrink-0 mx-2">
                  <div className="relative h-16 w-40 opacity-50">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="160px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop: Marquee animation with hover pause
  return (
    <section className={cn('section-dark py-8 md:py-16', className)}>
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First Row - Marquee Animation */}
        <div className="mb-4 md:mb-6">
          <div
            className={cn(
              "flex animate-marquee",
              isPaused && "[animation-play-state:paused]"
            )}
            style={{ width: 'max-content' }}
          >
            {[...firstRowClients, ...firstRowClients].map((client, index) => (
              <div key={`row1-${index}`} className="flex items-center mx-4 md:mx-6 flex-shrink-0">
                <div className="relative h-20 md:h-28 lg:h-32 w-48 md:w-56 lg:w-64 opacity-50 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 192px, 256px"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Reverse Marquee Animation */}
        {showSecondRow && (
          <div>
            <div
              className={cn(
                "flex animate-marquee-reverse",
                isPaused && "[animation-play-state:paused]"
              )}
              style={{ width: 'max-content' }}
            >
              {[...secondRowClients, ...secondRowClients].map((client, index) => (
                <div key={`row2-${index}`} className="flex items-center mx-4 md:mx-6 flex-shrink-0">
                  <div className="relative h-20 md:h-28 lg:h-32 w-48 md:w-56 lg:w-64 opacity-50 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 192px, 256px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
