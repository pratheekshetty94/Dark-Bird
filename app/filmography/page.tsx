'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Award, Film } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'
import FilmographyVideoHero from '@/components/sections/FilmographyVideoHero'

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
    id: 'su-from-so',
    title: 'SU From SO',
    year: '2024',
    poster: '/images/posters/04 SU From So.jpeg',
    role: 'Trailer & Song Editor',
    category: 'feature',
    description: 'A coming-of-age story exploring modern relationships.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Su_From_So',
    imdbUrl: 'https://www.imdb.com/title/tt37629310/',
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
    id: 'garudagamana',
    title: 'Garuda Gamana Vrishabha Vahana',
    year: '2021',
    poster: '/images/posters/06 garudagamana vrishabha vahana.png',
    role: 'Filmed & Edited Intro Song',
    category: 'feature',
    award: 'Filmfare + 2 SIIMA Awards',
    description: 'An underworld drama exploring friendship and betrayal.',
    platform: 'Amazon Prime Video',
    wikiUrl: 'https://en.wikipedia.org/wiki/Garuda_Gamana_Vrishabha_Vahana',
    imdbUrl: 'https://www.imdb.com/title/tt11953248/',
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
    id: 'maarnami',
    title: 'Maarnami',
    year: '2023',
    poster: '/images/posters/09 maarnami.jpeg',
    role: 'Editor',
    category: 'feature',
    description: 'A gripping thriller set in rural Karnataka.',
    imdbUrl: 'https://www.imdb.com/title/tt33476537/',
  },
  {
    id: 'kotee',
    title: 'Kotee',
    year: '2023',
    poster: '/images/posters/10 kotee.webp',
    role: 'Editor',
    category: 'feature',
    description: 'A powerful story of ambition and struggle.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Kotee',
    imdbUrl: 'https://www.imdb.com/title/tt27494630/',
  },
  {
    id: 'toby',
    title: 'Toby',
    year: '2023',
    poster: '/images/posters/10 kotee.webp', // Placeholder - needs poster
    role: 'Editor',
    category: 'feature',
    description: 'A gripping crime thriller.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Toby_(film)',
    imdbUrl: 'https://www.imdb.com/title/tt28075055/',
  },
  {
    id: 'katha-sangama',
    title: 'Katha Sangama',
    year: '2019',
    poster: '/images/posters/10 kotee.webp', // Placeholder - needs poster
    role: 'Editor',
    category: 'feature',
    description: 'An anthology film with interconnected stories.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Katha_Sangama_(2019_film)',
    imdbUrl: 'https://www.imdb.com/title/tt7315232/',
  },
  {
    id: 'anukta',
    title: 'Anukta',
    year: '2019',
    poster: '/images/posters/10 kotee.webp', // Placeholder - needs poster
    role: 'Editor',
    category: 'feature',
    description: 'A thought-provoking drama.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Anukta',
    imdbUrl: 'https://www.imdb.com/title/tt8426772/',
  },
  {
    id: 'madharaasi',
    title: 'Madharaasi',
    year: '2024',
    poster: '/images/posters/10 kotee.webp', // Placeholder - needs poster
    role: 'Editor',
    category: 'feature',
    description: 'A compelling regional drama.',
    wikiUrl: 'https://en.wikipedia.org/wiki/Madharaasi',
    imdbUrl: 'https://www.imdb.com/title/tt28252563/',
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

      {/* Hero Section */}
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
                Filmography
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

      {/* Films Grid */}
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

      {/* CTA Section */}
      <section className="section-padding border-t border-stone/10">
        <div className="container-content text-center">
          <ScrollReveal>
            <h2 className="font-display text-display text-cream mb-6">
              Want to Create the <em className="text-accent">Next</em> Hit?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-silver text-lg max-w-xl mx-auto mb-8">
              Whether you're a production house or a brand, we bring the same cinematic
              excellence to every project.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start a Conversation
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
