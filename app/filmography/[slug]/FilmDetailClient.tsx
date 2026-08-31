'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play, Award, Calendar, Clock, Star, Users, Film as FilmIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'
import VideoModal from '@/components/ui/VideoModal'

import { type FilmData } from '@/lib/films'

export default function FilmDetailClient({ film }: { film: FilmData | undefined }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!film) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-cream mb-4">Film Not Found</h1>
          <Link href="/filmography" className="btn-primary">
            Back to Filmography
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero Section with Poster Background */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={film.poster}
            alt={film.title}
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-content pb-16 pt-32">
          {/* Back link */}
          <Link
            href="/filmography"
            className={cn(
              'inline-flex items-center gap-2 text-warm-gray hover:text-accent transition-all mb-8 group',
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            )}
            style={{ transitionDuration: '500ms', transitionDelay: '100ms' }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Filmography</span>
          </Link>

          <div className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-8 lg:gap-12">
            {/* Poster */}
            <div
              className={cn(
                'transition-all duration-700',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <div
                className="relative aspect-[2/3] w-full max-w-[320px] lg:max-w-none rounded-xl overflow-hidden shadow-dramatic cursor-pointer group mx-auto lg:mx-0"
                onClick={() => setIsTrailerOpen(true)}
              >
                <Image
                  src={film.poster}
                  alt={film.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-cream ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Watch trailer label */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="px-4 py-2 bg-ink/80 backdrop-blur-sm rounded-full text-sm text-cream font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Watch Trailer
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Award badge */}
              {film.award && (
                <div
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/40 rounded-full mb-4 transition-all duration-700',
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: '300ms' }}
                >
                  <Award className="w-4 h-4 text-gold" />
                  <span className="text-sm text-gold font-medium">{film.award}</span>
                </div>
              )}

              {/* Title */}
              <h1
                className={cn(
                  'font-display text-5xl md:text-6xl lg:text-7xl text-cream mb-4 transition-all duration-700',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: '400ms' }}
              >
                {film.title}
              </h1>

              {/* Meta info */}
              <div
                className={cn(
                  'flex flex-wrap items-center gap-4 text-warm-gray mb-6 transition-all duration-700',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: '500ms' }}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {film.year}
                </span>
                {film.runtime && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {film.runtime}
                  </span>
                )}
                {film.language && (
                  <span className="px-3 py-1 bg-charcoal rounded-full text-sm">
                    {film.language}
                  </span>
                )}
              </div>

              {/* Genres */}
              {film.genre && (
                <div
                  className={cn(
                    'flex flex-wrap gap-2 mb-6 transition-all duration-700',
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: '600ms' }}
                >
                  {film.genre.map((g) => (
                    <span key={g} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {/* Role highlight */}
              <div
                className={cn(
                  'inline-flex items-center gap-3 px-5 py-3 bg-charcoal/80 backdrop-blur-sm rounded-xl mb-6 transition-all duration-700',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: '700ms' }}
              >
                <FilmIcon className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-xs text-warm-gray uppercase tracking-wider">Our Role</p>
                  <p className="text-cream font-medium">{film.role}</p>
                </div>
              </div>

              {/* Watch buttons */}
              <div
                className={cn(
                  'flex flex-wrap gap-4 transition-all duration-700',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: '800ms' }}
              >
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </button>
                {film.platform && (
                  <a
                    href={film.imdb || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Watch on {film.platform}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis & Details */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Synopsis */}
            <div>
              <ScrollReveal>
                <h2 className="font-display text-3xl text-cream mb-6">Synopsis</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-silver text-lg leading-relaxed">
                  {film.synopsis}
                </p>
              </ScrollReveal>

              {/* External links */}
              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-4 mt-8">
                  {film.imdb && (
                    <a
                      href={film.imdb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5C518] text-black rounded-lg font-medium hover:bg-[#F5C518]/90 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      IMDb
                    </a>
                  )}
                  {film.wiki && (
                    <a
                      href={film.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-cream rounded-lg font-medium hover:bg-white/20 transition-colors"
                    >
                      Wikipedia
                    </a>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Cast & Crew */}
            <div>
              {/* Dark Bird's Contribution */}
              <ScrollReveal>
                <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-3">Dark Bird Films</h3>
                  <p className="text-cream font-medium text-lg">Pratheek Shetty</p>
                  <p className="text-warm-gray text-sm mt-1">{film.role}</p>
                </div>
              </ScrollReveal>

              {film.director && (
                <ScrollReveal delay={0.1}>
                  <div className="mb-8">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-warm-gray mb-3">Director</h3>
                    <p className="text-cream text-lg">{film.director}</p>
                  </div>
                </ScrollReveal>
              )}

              {film.cast && film.cast.length > 0 && (
                <ScrollReveal delay={0.2}>
                  <div className="mb-8">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-warm-gray mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Cast
                    </h3>
                    <ul className="space-y-2">
                      {film.cast.map((actor) => (
                        <li key={actor} className="text-silver">{actor}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              {film.platform && (
                <ScrollReveal delay={0.3}>
                  <div className="p-4 bg-charcoal rounded-xl">
                    <p className="text-xs text-warm-gray uppercase tracking-wider mb-2">Available on</p>
                    <p className="text-cream font-medium">{film.platform}</p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* More Films CTA */}
      <section className="section-padding border-t border-stone/10">
        <div className="container-content text-center">
          <ScrollReveal>
            <h2 className="font-display text-display text-cream mb-6">
              Explore More <em className="text-accent">Films</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/filmography" className="btn-primary">
              View All Filmography
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Trailer Modal */}
      <VideoModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoUrl={film.trailer || ''}
        title={film.title}
        subtitle={`${film.year} • ${film.role}`}
      />
    </div>
  )
}
