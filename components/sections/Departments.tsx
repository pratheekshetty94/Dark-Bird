'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const departments = [
  {
    number: '01',
    title: 'Films',
    subtitle: 'Dark Bird Films',
    description: 'Production with a filmmaker\'s eye and a marketer\'s brain.',
    href: '/work/films',
    logoSrc: '/images/departments/Dark_Bird_Films_Logo_White_T.png',
    services: ['Feature Films', 'Commercials'],
  },
  {
    number: '02',
    title: 'Socials',
    subtitle: 'Dark Bird Socials',
    description: 'Content that converts, not just collects likes.',
    href: '/work/socials',
    logoSrc: '/images/departments/Dark_Bird_Socials_Logo_White_T.png',
    services: ['Social Media', 'Content Strategy'],
  },
  {
    number: '03',
    title: 'Designs',
    subtitle: 'Dark Bird Designs',
    description: 'Design that looks cinematic and performs commercially.',
    href: '/work/designs',
    logoSrc: '/images/departments/Dark_Bird_Designs_Logo_White_T.png',
    services: ['Brand Identity', 'Motion Graphics'],
  },
  {
    number: '04',
    title: 'Labs',
    subtitle: 'Dark Bird Labs',
    description: 'Future-ready storytelling powered by AI and human direction.',
    href: '/work/labs',
    logoSrc: '/images/departments/Dark_Bird_Labs_Logo_White_T.png',
    services: ['AI Content', 'VFX & CGI'],
  },
]

export default function Departments() {
  return (
    <section className="section-dark py-12 md:py-24">
      <div className="container-content">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-16">
          <div>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( Our Services )
            </span>
            <h2 className="font-display text-2xl md:text-5xl text-cream mt-2 md:mt-4">
              What We <em className="text-accent">Offer</em>
            </h2>
          </div>

          <Link
            href="/work"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs md:text-sm font-medium text-cream"
          >
            View All Services
            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {departments.map((dept) => (
            <Link
              key={dept.number}
              href={dept.href}
              className={cn(
                "block relative overflow-hidden",
                "rounded-xl md:rounded-2xl border border-stone/20",
                "bg-charcoal/50 p-4 md:p-6",
                "transition-all duration-300 hover:border-stone/40 hover:bg-charcoal/70"
              )}
            >
              {/* Number and Arrow */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] md:text-sm text-accent/60">{dept.number}</span>
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-warm-gray" />
              </div>

              {/* Logo - Hidden on mobile, visible on desktop */}
              <div className="hidden md:flex items-center justify-center py-6 mb-4">
                <div className="relative w-full h-32">
                  <Image
                    src={dept.logoSrc}
                    alt={dept.subtitle}
                    fill
                    sizes="200px"
                    className="object-contain opacity-85"
                    priority
                  />
                </div>
              </div>

              {/* Title - Visible on mobile only */}
              <h3 className="md:hidden text-cream text-sm font-medium mb-1">{dept.title}</h3>

              {/* Description */}
              <p className="text-silver text-[10px] md:text-sm md:text-center mb-3 md:mb-5 line-clamp-2">
                {dept.description}
              </p>

              {/* Service Tags - Hidden on mobile */}
              <div className="hidden md:flex flex-wrap justify-center gap-1">
                {dept.services.map((service) => (
                  <span
                    key={service}
                    className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-warm-gray bg-ink/60 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
