'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { Award, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilmItem {
  id: string
  title: string
  year: string
  poster: string
  role: string
  category: 'feature' | 'documentary' | 'short'
  award?: string
}

const filmography: FilmItem[] = [
  // 2025
  { id: 'su-from-so', title: 'Su From So', year: '2025', poster: '/images/posters/04 SU From So.jpeg', role: 'Trailer & Song Editor', category: 'feature' },
  { id: 'maarnami', title: 'Maarnami', year: '2025', poster: '/images/posters/09 maarnami.jpeg', role: 'Editor', category: 'feature' },
  { id: 'madharaasi', title: 'Madharaasi', year: '2025', poster: '/images/posters/madharaasi-poster.jpg', role: '2nd Unit Cinematographer', category: 'feature' },
  // 2024
  { id: 'kotee', title: 'Kotee', year: '2024', poster: '/images/posters/10 kotee.webp', role: 'Editor', category: 'feature' },
  // 2023
  { id: 'toby', title: 'Toby', year: '2023', poster: '/images/posters/toby-poster.jpg', role: 'Trailer Editor', category: 'feature' },
  // 2022
  { id: 'kantara', title: 'Kantara', year: '2022', poster: '/images/posters/01 KANTHARA.jpg', role: 'Editor', category: 'feature', award: '2 National Awards + 21 more' },
  { id: '777-charlie', title: '777 Charlie', year: '2022', poster: '/images/posters/02 777 charlie.jpg', role: 'Editor', category: 'feature', award: 'National Award + State Award' },
  { id: 'gandhada-gudi', title: 'Gandhada Gudi', year: '2022', poster: '/images/posters/03 gandhadagudi.jpeg', role: 'DOP & Editor', category: 'documentary' },
  // 2021
  { id: 'garudagamana', title: 'Garuda Gamana Vrishabha Vahana', year: '2021', poster: '/images/posters/06 garudagamana vrishabha vahana.png', role: 'Filmed & Edited Intro Song', category: 'feature', award: 'Filmfare + 2 SIIMA Awards' },
  { id: 'hero', title: 'Hero', year: '2021', poster: '/images/posters/07 hero.jpeg', role: 'Editor', category: 'feature' },
  // 2020
  { id: 'who-is-baul', title: 'Who Is Baul', year: '2020', poster: '/images/posters/who-is-baul.jpg', role: 'DOP & Editor', category: 'documentary' },
  // 2019
  { id: 'katha-sangama', title: 'Katha Sangama', year: '2019', poster: '/images/posters/katha-sangama-poster.jpg', role: 'Colourist (D.I)', category: 'feature' },
  // 2018
  { id: 'shpsk', title: 'Sarkari Hi. Pra. Shale, Kasargodu', year: '2018', poster: '/images/posters/05 sarkari hi pra shale kasargodu.jpeg', role: 'Editor & Song Cinematographer', category: 'feature', award: 'National Award + 2 State Awards' },
  { id: 'anukta', title: 'Anukta', year: '2018', poster: '/images/posters/anukta-poster.jpg', role: 'Colourist', category: 'feature' },
  // 2017
  { id: 'ondu-motteya-kathe', title: 'Ondu Motteya Kathe', year: '2017', poster: '/images/posters/08 ondu motteya kathe.jpg', role: 'VFX & 2nd Unit Cinematographer', category: 'feature', award: 'Filmfare Best Film' },
]

const categories = [
  { id: 'all', label: 'All Films' },
  { id: 'feature', label: 'Feature Films' },
  { id: 'documentary', label: 'Documentary' },
]

export default function FilmographyGrid() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredFilms = activeCategory === 'all'
    ? filmography
    : filmography.filter(film => film.category === activeCategory)

  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container-content">
        <ScrollReveal>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
            ( Filmography )
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-cream mt-2 mb-8">
            Films We've Worked On
          </h2>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-5 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 whitespace-nowrap',
                  activeCategory === category.id
                    ? 'bg-accent text-cream'
                    : 'bg-charcoal text-warm-gray hover:text-cream hover:bg-charcoal/80'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Films Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredFilms.map((film, index) => (
            <ScrollReveal key={film.id} delay={index * 0.03}>
              <Link
                href={`/filmography/${film.id}`}
                className="group relative block"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-charcoal">
                  <Image
                    src={film.poster}
                    alt={film.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Award badge */}
                  {film.award && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gold rounded-full">
                        <Award className="w-3 h-3 text-ink" />
                        <span className="text-[10px] font-bold text-ink uppercase tracking-wider">Award</span>
                      </div>
                    </div>
                  )}

                  {/* View button on hover */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    {/* Year & Role */}
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1">
                      {film.year} · {film.role}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-base md:text-lg text-cream leading-tight group-hover:text-accent transition-colors line-clamp-2">
                      {film.title}
                    </h3>

                    {/* Award info on hover */}
                    {film.award && (
                      <p className="mt-2 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                        {film.award}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
