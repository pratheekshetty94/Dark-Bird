'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const featuredProjects = [
  {
    id: 'kantara',
    title: 'Kantara',
    client: 'Hombale Films',
    year: '2022',
    tags: ['Editing', 'Post-Production'],
    highlight: '2 National Awards + 21 more. 100M+ views.',
    poster: '/images/posters/kantara.jpg',
    href: '/filmography/kantara',
  },
  {
    id: '777-charlie',
    title: '777 Charlie',
    client: 'Paramvah Studios',
    year: '2022',
    tags: ['Editing', 'Cinematography', 'Post-Production'],
    highlight: 'National Award + State Award',
    poster: '/images/posters/777-charlie.jpg',
    href: '/filmography/777-charlie',
  },
  {
    id: 'flipkart',
    title: 'Flipkart #FindYourMatch',
    client: 'Flipkart × Sima Taparia',
    year: '2023',
    tags: ['Production', 'Direction'],
    highlight: 'Full-scale brand campaign',
    poster: '/images/posters/flipkart.jpg',
    href: '/work/films',
  },
  {
    id: 'danks-anthem',
    title: 'DANKS ANTHEM',
    client: 'Su From So',
    year: '2025',
    tags: ['Direction', 'Cinematography', 'Editing'],
    highlight: '29M+ views',
    poster: '/images/posters/su-from-so.jpg',
    href: '/filmography/su-from-so',
  },
]

export default function FeaturedWork() {
  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container-content">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent">
              ( Featured Work )
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-cream mt-2 md:mt-4">
              Award-Winning <em className="text-accent">Projects</em>
            </h2>
          </div>

          <Link
            href="/work/films"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs md:text-sm font-medium text-cream hover:text-accent transition-colors"
          >
            View All Work
            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group block relative overflow-hidden rounded-xl md:rounded-2xl border border-stone/20 bg-charcoal/50 hover:border-stone/40 transition-all duration-300"
            >
              {/* Poster Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={project.poster}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                {/* Year & Client */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[9px] md:text-[10px] text-accent">
                    {project.year}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone/50" />
                  <span className="font-mono text-[9px] md:text-[10px] text-warm-gray truncate">
                    {project.client}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-cream text-base md:text-lg font-semibold mb-2 line-clamp-1">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[8px] md:text-[9px] font-mono uppercase tracking-wider text-warm-gray bg-ink/60 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlight */}
                <p className="text-[10px] md:text-xs text-accent font-medium">
                  {project.highlight}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
