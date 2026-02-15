'use client'

import React from 'react'
import { Trophy } from 'lucide-react'

const topAwards = [
  {
    id: 'kantara-national',
    award: 'National Film Award',
    film: 'Kantara',
    category: 'Best Editing',
    year: '2023',
  },
  {
    id: '777charlie-national',
    award: 'National Film Award',
    film: '777 Charlie',
    category: 'Best Editing',
    year: '2023',
  },
  {
    id: 'shpsk-national',
    award: 'National Film Award',
    film: "Sarkari Hi. Pra. Shale",
    category: "Best Children's Film",
    year: '2019',
  },
  {
    id: 'ricky-grammy',
    award: 'Grammy Winning Album',
    film: 'Ricky Kej Divine Tides',
    category: 'Music Video Production',
    year: '2022',
  },
  {
    id: 'karnataka-state',
    award: 'Karnataka State Film Award',
    film: '777 Charlie',
    category: 'Best Editor',
    year: '2023',
  },
]

export default function AwardsHighlight() {
  return (
    <section className="section-charcoal py-12 md:py-20 overflow-hidden">
      <div className="container-content mb-6 md:mb-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-px w-8 md:w-12 bg-stone/50" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
            ( Recognition )
          </span>
        </div>
      </div>

      {/* Horizontal scrolling awards */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 px-6 md:px-12" style={{ width: 'max-content' }}>
            {topAwards.map((award) => (
              <div
                key={award.id}
                className="flex-shrink-0 w-[260px] md:w-[300px] p-4 md:p-5 rounded-xl md:rounded-2xl border border-stone/20 bg-ink/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] md:text-[10px] text-accent uppercase tracking-wider">
                      {award.year}
                    </span>
                    <h3 className="text-cream text-sm md:text-base font-semibold mt-0.5">
                      {award.award}
                    </h3>
                  </div>
                </div>
                <p className="text-warm-gray text-xs md:text-sm mb-1">
                  {award.film}
                </p>
                <p className="text-silver text-[10px] md:text-xs">
                  {award.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
