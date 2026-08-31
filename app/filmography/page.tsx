'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Award, Film } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'
import FilmographyVideoHero from '@/components/sections/FilmographyVideoHero'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import VideoGrid from '@/components/ui/VideoGrid'
import CTABand from '@/components/sections/CTABand'
import { featureFilms, commercials, musicVideos } from '@/lib/videos'

interface FilmItem {
  id: string
  title: string
  year: string
  poster: string
  role: string
  category: 'feature' | 'documentary' | 'short'
  award?: string
  description?: string
  platform?: string
  wikiUrl?: string
  imdbUrl?: string
}

const films: FilmItem[] = [
  {
    id: 'kantara',
    title: 'Kantara',
    year: '2022',
    poster: '/images/posters/01 KANTHARA.jpg',
    role: 'Editor',
    category: 'feature',
    award: '2 National Awards + 21 more',
    description: 'A blockbuster that captivated India with its raw portrayal of man vs nature.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Kantara_(2022_film)',
    imdbUrl: 'https://www.imdb.com/title/tt15327088/',
  },
  {
    id: '777-charlie',
    title: '777 Charlie',
    year: '2022',
    poster: '/images/posters/02 777 charlie.jpg',
    role: 'Editor',
    category: 'feature',
    award: 'National Award + State Award Best Editor',
    description: 'A heartwarming tale of a man and his dog that touched millions.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/777_Charlie',
    imdbUrl: 'https://www.imdb.com/title/tt7466810/',
  },
  {
    id: 'gandhada-gudi',
    title: 'Gandhada Gudi',
    year: '2022',
    poster: '/images/posters/03 gandhadagudi.jpeg',
    role: 'DOP & Editor',
    category: 'documentary',
    description: 'Puneeth Rajkumar\'s final film - a tribute to Karnataka\'s wildlife.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Gandhada_Gudi_(2022_film)',
    imdbUrl: 'https://www.imdb.com/title/tt21288778/',
  },
  {
    id: 'madharaasi',
    title: 'Madharaasi',
    year: '2025',
    poster: '/images/posters/madharaasi-poster.jpg',
    role: '2nd Unit Cinematographer',
    category: 'feature',
    description: 'A psychological action thriller.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Madharaasi',
    imdbUrl: 'https://www.imdb.com/title/tt28252563/',
  },
  {
    id: 'su-from-so',
    title: 'Su From So',
    year: '2025',
    poster: '/images/posters/04 SU From So.jpeg',
    role: 'Trailer & Song Editor',
    category: 'feature',
    description: 'A horror-comedy blockbuster set in coastal Karnataka.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Su_From_So',
    imdbUrl: 'https://www.imdb.com/title/tt28768642/',
  },
  {
    id: 'toby',
    title: 'Toby',
    year: '2023',
    poster: '/images/posters/toby-poster.jpg',
    role: 'Trailer Editor',
    category: 'feature',
    description: 'A gripping crime thriller set in coastal Karnataka.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Toby_(film)',
    imdbUrl: 'https://www.imdb.com/title/tt28075055/',
  },
  {
    id: 'garudagamana',
    title: 'Garuda Gamana Vrishabha Vahana',
    year: '2021',
    poster: '/images/posters/06 garudagamana vrishabha vahana.jpg',
    role: 'Filmed & Edited Intro Song',
    category: 'feature',
    award: 'Filmfare + 2 SIIMA Awards',
    description: 'An underworld drama exploring friendship and betrayal.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Garuda_Gamana_Vrishabha_Vahana',
    imdbUrl: 'https://www.imdb.com/title/tt11953248/',
  },
  {
    id: 'kotee',
    title: 'Kotee',
    year: '2024',
    poster: '/images/posters/10 kotee.webp',
    role: 'Editor',
    category: 'feature',
    description: 'A powerful story of ambition and struggle in a corrupt city.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Kotee',
    imdbUrl: 'https://www.imdb.com/title/tt27494630/',
  },
  {
    id: 'shpsk',
    title: 'Sarkari Hi. Pra. Shale, Kasargodu',
    year: '2018',
    poster: '/images/posters/05 sarkari hi pra shale kasargodu.jpeg',
    role: 'Editor & Song Cinematographer',
    category: 'feature',
    award: 'National Award + 2 State Awards',
    description: 'A story of a teacher\'s fight to save a government school.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Sarkari_Hi._Pra._Shaale,_Kasaragodu,_Koduge:_Ramanna_Rai',
    imdbUrl: 'https://www.imdb.com/title/tt8602654/',
  },
  {
    id: 'karavali',
    title: 'Karavali',
    year: '2026',
    poster: '/images/posters/karavali.jpg',
    role: 'Editor',
    category: 'feature',
    description: 'Animal vs Human — Gurudatha Ganiga\'s coastal Karnataka action drama, led by Prajwal Devaraj.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Karavali_(film)',
    imdbUrl: 'https://www.imdb.com/title/tt29521397/',
  },
  {
    id: 'ondu-motteya-kathe',
    title: 'Ondu Motteya Kathe',
    year: '2017',
    poster: '/images/posters/08 ondu motteya kathe.jpg',
    role: 'VFX & 2nd Unit Cinematographer',
    category: 'feature',
    award: 'Filmfare Best Film',
    description: 'A quirky comedy about a bald man\'s journey to find love.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Ondu_Motteya_Kathe',
    imdbUrl: 'https://www.imdb.com/title/tt6620238/',
  },
  {
    id: 'katha-sangama',
    title: 'Katha Sangama',
    year: '2019',
    poster: '/images/posters/katha-sangama-poster.jpg',
    role: 'Colourist (D.I)',
    category: 'feature',
    description: 'An anthology tribute to filmmaker Puttanna Kanagal.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Katha_Sangama_(2019_film)',
    imdbUrl: 'https://www.imdb.com/title/tt7315232/',
  },
  {
    id: 'hero',
    title: 'Hero',
    year: '2021',
    poster: '/images/posters/07 hero.jpeg',
    role: 'Editor',
    category: 'feature',
    description: 'An action-packed entertainer with a unique storyline.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Hero_(2021_film)',
    imdbUrl: 'https://www.imdb.com/title/tt13986904/',
  },
  {
    id: 'maarnami',
    title: 'Maarnami',
    year: '2025',
    poster: '/images/posters/09 maarnami.jpeg',
    role: 'Editor',
    category: 'feature',
    description: 'A coastal love story exploring tradition and tragedy.',
    imdbUrl: 'https://www.imdb.com/title/tt33476537/',
  },
  {
    id: 'anukta',
    title: 'Anukta',
    year: '2018',
    poster: '/images/posters/anukta-poster.jpg',
    role: 'Colourist',
    category: 'feature',
    description: 'A psychological mystery thriller set in coastal Karnataka.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Anukta',
    imdbUrl: 'https://www.imdb.com/title/tt8426772/',
  },
  {
    id: 'who-is-baul',
    title: 'Who Is Baul',
    year: '2021',
    poster: '/images/posters/who-is-baul.jpg',
    role: 'DOP & Editor',
    category: 'documentary',
    description: 'An epic documentary on the mystic music traditions of the Bauls of Bengal.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Baul',
    imdbUrl: 'https://www.imdb.com/title/tt14273058/',
  },
]

const categories = [
  { id: 'all', label: 'All Films' },
  { id: 'feature', label: 'Feature Films' },
  { id: 'documentary', label: 'Documentary' },
]




export default function FilmographyPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredFilms = activeCategory === 'all'
    ? films
    : films.filter(film => film.category === activeCategory)

  return (
    <div className="min-h-screen bg-ink">
      {/* Video Hero Banner */}
      <FilmographyVideoHero />

      {/* Posters Section */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(232, 90, 63, 0.15) 0%, transparent 50%)',
          }}
        />

        <div className="container-content relative z-10">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-warm-gray hover:text-accent transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Home</span>
            </Link>
          </ScrollReveal>

          <div className="max-w-4xl">
            <ScrollReveal delay={0.1}>
              <span className="label-parenthetical">Our Work</span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-hero text-cream mt-6 mb-6">
                Films
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-body-lg text-silver max-w-2xl">
                From national award winners to blockbusters, here are the films we've had the
                privilege to be a part of. Each frame crafted with passion, each story told with heart.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-stone/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Film className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-display text-2xl text-cream">{films.length}+</span>
                    <p className="text-xs text-warm-gray uppercase tracking-wider">Films</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="font-display text-2xl text-cream">45+</span>
                    <p className="text-xs text-warm-gray uppercase tracking-wider">Awards Won</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-display text-2xl text-cream">4</span>
                    <p className="text-xs text-warm-gray uppercase tracking-wider">National Awards</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-ink border-y border-stone/10">
        <div className="container-content">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
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
        </div>
      </section>

      {/* Films Poster Grid */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredFilms.map((film, index) => (
              <ScrollReveal key={film.id} delay={index * 0.05}>
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
                      {/* Year */}
                      <span className="font-mono text-[10px] text-accent uppercase tracking-wider mb-2">
                        {film.year}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-lg text-cream leading-tight group-hover:text-accent transition-colors">
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

                  {/* Mobile title (visible on small screens) */}
                  <div className="mt-3 md:hidden">
                    <h3 className="font-display text-sm text-cream">{film.title}</h3>
                    <p className="text-xs text-warm-gray">{film.year}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Films & Trailers */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Feature Films & Trailers</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/filmography" className="group flex items-center gap-4 mt-4 mb-12">
              <h2 className="text-section font-bold text-charcoal group-hover:text-accent transition-colors">
                Our Work Lives on Screens Across India
              </h2>
              <ArrowUpRight className="w-6 h-6 text-charcoal/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <VideoGrid videos={featureFilms} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* Ad Films & Commercials */}
      <section className="section-dark section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Ad Films & Commercials</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/services/ad-film-production-bangalore" className="group flex items-center gap-4 mt-4 mb-4">
              <h2 className="text-section font-bold text-white group-hover:text-accent transition-colors">
                Brand Campaigns
              </h2>
              <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-warm-gray mb-12">
              Flipkart • Shopsy • YO Fruits • Hangyo • GK Builders
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <VideoGrid videos={commercials} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* Music Videos */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Music Videos</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/filmography" className="group flex items-center gap-4 mt-4 mb-12">
              <h2 className="text-section font-bold text-charcoal group-hover:text-accent transition-colors">
                The Sounds We&apos;ve Turned Into Visuals
              </h2>
              <ArrowUpRight className="w-6 h-6 text-charcoal/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <VideoGrid videos={musicVideos} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <CTABand
        headline="Have a Film Project in Mind?"
        description="From feature films to brand campaigns, we bring cinematic craft to every frame."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </div>
  )
}
