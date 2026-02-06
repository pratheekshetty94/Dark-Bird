'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Play, Award, Calendar, Clock, Star, Users, Film as FilmIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'
import VideoModal from '@/components/ui/VideoModal'

interface FilmData {
  id: string
  title: string
  year: string
  poster: string
  role: string
  category: 'feature' | 'documentary' | 'short'
  award?: string
  description: string
  platform?: string
  trailer?: string
  director?: string
  cast?: string[]
  genre?: string[]
  runtime?: string
  language?: string
  synopsis?: string
  imdb?: string
  wiki?: string
}

const filmsData: Record<string, FilmData> = {
  'kantara': {
    id: 'kantara',
    title: 'Kantara',
    year: '2022',
    poster: '/images/posters/01 KANTHARA.jpg',
    role: 'Editor',
    category: 'feature',
    award: '2 National Awards, Prajavani Cine Sammana 2024, IFFI Silver Peacock, 11 SIIMA, 5+ Filmfare',
    description: 'A blockbuster that captivated India with its raw portrayal of man vs nature. ~21 wins & 14 nominations.',
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/8mrVmf239GU',
    director: 'Rishab Shetty',
    cast: ['Rishab Shetty', 'Sapthami Gowda', 'Kishore', 'Achyuth Kumar'],
    genre: ['Action', 'Drama', 'Thriller'],
    runtime: '148 min',
    language: 'Kannada',
    synopsis: 'Kantara is a visual grandeur set in the fictional village of Dakshina Kannada that brings alive the traditional culture of Kambala and Bhoota Kola. The story revolves around a demigod who serves as the guardian spirit of the village and the conflict between villagers and forest officials regarding land rights. The protagonist Shiva, a rebellious young man, must confront his destiny and embrace his role as the vessel for the divine spirit to protect his people and their way of life. The film won 2 National Film Awards (Best Actor for Rishab Shetty, Best Popular Film), Prajavani Cine Sammana 2024, IFFI Silver Peacock Special Jury Award, 11 SIIMA awards, multiple Filmfare Awards South, and numerous other accolades totaling approximately 21 wins.',
    imdb: 'https://www.imdb.com/title/tt15077208/',
    wiki: 'https://en.wikipedia.org/wiki/Kantara_(film)',
  },
  '777-charlie': {
    id: '777-charlie',
    title: '777 Charlie',
    year: '2022',
    poster: '/images/posters/02 777 charlie.jpg',
    role: 'Editor',
    category: 'feature',
    award: 'National Award - Best Kannada Film, Karnataka State Film Award for Best Editor (2021)',
    description: 'A heartwarming tale of a man and his dog that touched millions. National Award + State Award for Best Editing.',
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/REqFOV2A7sI',
    director: 'Kiranraj K',
    cast: ['Rakshit Shetty', 'Charlie (Dog)', 'Sangeetha Sringeri', 'Raj B. Shetty'],
    genre: ['Drama', 'Adventure', 'Comedy'],
    runtime: '169 min',
    language: 'Kannada',
    synopsis: '777 Charlie follows the life of Dharma, a lonely, grumpy factory worker who lives a monotonous life devoid of any love or joy. His life takes an unexpected turn when a playful stray Labrador named Charlie enters his world. Despite his initial resistance, Dharma gradually forms an unbreakable bond with Charlie, who teaches him the true meaning of love, friendship, and living life to the fullest. Together, they embark on a road trip that transforms both their lives forever. The film won the National Film Award for Best Feature Film in Kannada, and the Karnataka State Film Award for Best Editor (2021) for Pratheek Shetty.',
    imdb: 'https://www.imdb.com/title/tt11366302/',
    wiki: 'https://en.wikipedia.org/wiki/777_Charlie',
  },
  'gandhada-gudi': {
    id: 'gandhada-gudi',
    title: 'Gandhada Gudi',
    year: '2022',
    poster: '/images/posters/03 gandhadagudi.jpeg',
    role: 'DOP & Editor',
    category: 'documentary',
    description: "Puneeth Rajkumar's final film - a tribute to Karnataka's wildlife.",
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/UdPisHeGMQM',
    director: 'Amoghavarsha J.S.',
    cast: ['Puneeth Rajkumar'],
    genre: ['Documentary', 'Nature'],
    runtime: '100 min',
    language: 'Kannada',
    synopsis: "Gandhada Gudi is a documentary film that takes viewers on a breathtaking journey through Karnataka's diverse wildlife and natural heritage. The late Puneeth Rajkumar, in his final screen appearance, explores the state's forests, wildlife sanctuaries, and conservation efforts. The film showcases the rich biodiversity of Karnataka, from the Western Ghats to the Deccan Plateau, highlighting the importance of preserving nature for future generations. It serves as both a visual spectacle and a heartfelt tribute to the Power Star's love for his homeland.",
    imdb: 'https://www.imdb.com/title/tt21374712/',
    wiki: 'https://en.wikipedia.org/wiki/Gandhada_Gudi_(2022_film)',
  },
  'su-from-so': {
    id: 'su-from-so',
    title: 'SU From SO',
    year: '2024',
    poster: '/images/posters/04 SU From So.jpeg',
    role: 'Trailer & Song Editor',
    category: 'feature',
    description: 'A coming-of-age story exploring modern relationships.',
    trailer: 'https://www.youtube.com/embed/Fe11GLdTL5k',
    director: 'Chandrajith Belliappa',
    cast: ['Prajwal Devaraj', 'Aditi Prabhudeva'],
    genre: ['Drama', 'Romance'],
    runtime: '135 min',
    language: 'Kannada',
    synopsis: 'SU From SO is a contemporary drama that delves into the complexities of modern relationships and the journey of self-discovery. The film explores themes of love, identity, and the challenges faced by today\'s youth in navigating personal and professional aspirations.',
    imdb: 'https://www.imdb.com/title/tt28768642/',
  },
  'shpsk': {
    id: 'shpsk',
    title: 'Sarkari Hi. Pra. Shale, Kasargodu',
    year: '2018',
    poster: '/images/posters/05 sarkari hi pra shale kasargodu.jpeg',
    role: 'Editor & Song Cinematographer',
    category: 'feature',
    award: 'National Award - Best Children\'s Film (Golden Lotus), 2 State Awards',
    description: "A story of a teacher's fight to save a government school. 3 major awards.",
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/oA-U1rR3pNc',
    director: 'Rishab Shetty',
    cast: ['Anant Nag', 'Rishab Shetty', 'Sampath', 'Pramod Shetty'],
    genre: ['Drama', 'Comedy'],
    runtime: '145 min',
    language: 'Kannada',
    synopsis: 'Set in a small village in Kasargod, this heartwarming film tells the story of a dedicated teacher who fights against all odds to save his beloved government primary school from closure. When the education department decides to shut down schools with fewer than 10 students, the teacher embarks on a mission to increase enrollment by any means necessary. The film beautifully captures the importance of education in rural India and the unsung heroes who dedicate their lives to teaching. The film won the prestigious National Film Award for Best Children\'s Film (Swarna Kamal/Golden Lotus) and 2 Karnataka State Film Awards including Best Director and Best Entertaining Film.',
    imdb: 'https://www.imdb.com/title/tt8224378/',
    wiki: 'https://en.wikipedia.org/wiki/Sarkari_Hi._Pra._Shale,_Kasaragodu',
  },
  'garudagamana': {
    id: 'garudagamana',
    title: 'Garudagamana Vrishabha Vahana',
    year: '2021',
    poster: '/images/posters/06 garudagamana vrishabha vahana.png',
    role: 'Filmed & Edited "Demon In Me" Intro Song',
    category: 'feature',
    award: 'Filmfare Best Director, SIIMA Best Film & Best Playback Singer',
    description: 'An underworld drama exploring friendship and betrayal. 3 major awards.',
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/MjZBup8ELR4',
    director: 'Raj B. Shetty',
    cast: ['Raj B. Shetty', 'Rishab Shetty', 'Gopalakrishna Deshpande', 'Pushpa Belawadi'],
    genre: ['Crime', 'Drama', 'Thriller'],
    runtime: '155 min',
    language: 'Kannada',
    synopsis: 'Garudagamana Vrishabha Vahana is a gripping crime drama that explores the deep bond between two childhood friends, Hari and Shiva, whose lives take dramatically different paths. Set against the backdrop of Mangalore\'s underworld, the film chronicles their journey from innocent boys to men caught in the web of crime, power, and moral ambiguity. The narrative beautifully interweaves themes of friendship, loyalty, and the inevitable consequences of choices made in the pursuit of power. The film won Filmfare Award for Best Director - Kannada (Raj B. Shetty), SIIMA Best Film (Kannada), and SIIMA Best Playback Singer - Female.',
    imdb: 'https://www.imdb.com/title/tt13923126/',
    wiki: 'https://en.wikipedia.org/wiki/Garuda_Gamana_Vrishabha_Vahana',
  },
  'hero': {
    id: 'hero',
    title: 'Hero',
    year: '2021',
    poster: '/images/posters/07 hero.jpeg',
    role: 'Editor',
    category: 'feature',
    description: 'An action comedy entertainer shot during the pandemic lockdown.',
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/MiJPnyCOoUc',
    director: 'M. Bharath Raj',
    cast: ['Rishab Shetty', 'Ganavi Laxman', 'Pramod Shetty', 'Ugrram Manju'],
    genre: ['Action', 'Comedy'],
    runtime: '140 min',
    language: 'Kannada',
    synopsis: 'Hero is an action comedy film written and directed by debutant M. Bharath Raj. The film stars Rishab Shetty in the lead role alongside Ganavi Laxman, Pramod Shetty, and Ugrram Manju. Produced by Rishab Shetty under the banner Rishab Shetty Films, the entire film was shot in Chikkamagaluru during the COVID-19 pandemic lockdown. The soundtrack was composed by B. Ajaneesh Loknath. The film was released on 5 March 2021 across Karnataka.',
    imdb: 'https://www.imdb.com/title/tt13986904/',
    wiki: 'https://en.wikipedia.org/wiki/Hero_(2021_film)',
  },
  'ondu-motteya-kathe': {
    id: 'ondu-motteya-kathe',
    title: 'Ondu Motteya Kathe',
    year: '2017',
    poster: '/images/posters/08 ondu motteya kathe.jpg',
    role: 'VFX & Second Unit Cinematographer',
    category: 'feature',
    award: 'Filmfare Award - Best Film (Kannada)',
    description: "A quirky comedy about a bald man's journey to find love. Filmfare winner.",
    platform: 'Amazon Prime Video',
    trailer: 'https://www.youtube.com/embed/aZfVyITevjI',
    director: 'Raj B. Shetty',
    cast: ['Raj B. Shetty', 'Amrutha Iyengar', 'Prakash Tuminad'],
    genre: ['Comedy', 'Romance', 'Drama'],
    runtime: '125 min',
    language: 'Kannada',
    synopsis: 'Ondu Motteya Kathe (Story of an Egg/Bald Man) is a delightful comedy that tells the story of Janardhan, a bald man in his thirties who struggles to find a life partner due to his baldness. Set in a small town in Karnataka, the film explores themes of self-acceptance, societal beauty standards, and the quest for love. With its witty humor and relatable protagonist, the film became a surprise hit and marked the directorial debut of Raj B. Shetty. The film won the Filmfare Award for Best Film - Kannada.',
    imdb: 'https://www.imdb.com/title/tt7288300/',
    wiki: 'https://en.wikipedia.org/wiki/Ondu_Motteya_Kathe',
  },
  'maarnami': {
    id: 'maarnami',
    title: 'Maarnami',
    year: '2025',
    poster: '/images/posters/09 maarnami.jpeg',
    role: 'Editor',
    category: 'feature',
    description: 'A coastal love story exploring tradition and tragedy through Hulivesha.',
    platform: 'Coming Soon',
    trailer: 'https://www.youtube.com/embed/Csp2p0qLB5g',
    director: 'Rishith Shetty',
    cast: ['Ritvvikk', 'Chaithra Achar', 'Prakash Tuminad', 'Sonu Gowda', 'Swaraj Shetty', 'Chandrahas Ullal'],
    genre: ['Drama', 'Romance'],
    runtime: '130 min',
    language: 'Kannada',
    synopsis: "Maarnami is a poignant coastal love story directed by debutant Rishith Shetty. The film follows Chetu's life, a poignant dance between tradition and tragedy, as Hulivesha becomes his solace and legacy. Amidst turmoil and loss, his story unfolds into a mysterious and emotionally captivating narrative. With music by Charan Raj and produced by Gunadhya Productions, the film captures the essence of coastal Karnataka's culture and traditions.",
    imdb: 'https://www.imdb.com/title/tt33476537/',
  },
  'kotee': {
    id: 'kotee',
    title: 'Kotee',
    year: '2023',
    poster: '/images/posters/10 kotee.webp',
    role: 'Editor',
    category: 'feature',
    description: 'A powerful story of ambition and struggle.',
    trailer: 'https://www.youtube.com/embed/aO4RUaXnEYw',
    director: 'T.N. Nagesh',
    cast: ['Dhruva Sarja', 'Nayanthara'],
    genre: ['Action', 'Drama'],
    runtime: '150 min',
    language: 'Kannada',
    synopsis: 'Kotee is a mass action entertainer that tells the story of a man driven by ambition and the desire to rise above his circumstances. The film features high-octane action sequences and an emotional core that resonates with audiences.',
    imdb: 'https://www.imdb.com/title/tt27494630/',
    wiki: 'https://en.wikipedia.org/wiki/Kotee',
  },
  'toby': {
    id: 'toby',
    title: 'Toby',
    year: '2023',
    poster: '/images/posters/toby-poster.jpg',
    role: 'Trailer Editor',
    category: 'feature',
    description: 'A gripping crime thriller.',
    director: 'Basil Alchakkal',
    cast: ['Raj B. Shetty', 'Samyukta Hornad'],
    genre: ['Crime', 'Thriller'],
    runtime: '145 min',
    language: 'Kannada',
    synopsis: 'Toby is a gripping crime thriller that follows the dark underbelly of society. The film explores themes of power, corruption, and redemption through its compelling narrative and strong performances.',
    imdb: 'https://www.imdb.com/title/tt28075055/',
    wiki: 'https://en.wikipedia.org/wiki/Toby_(film)',
  },
  'katha-sangama': {
    id: 'katha-sangama',
    title: 'Katha Sangama',
    year: '2019',
    poster: '/images/posters/katha-sangama-poster.jpg',
    role: 'Colourist (D.I)',
    category: 'feature',
    description: 'An anthology film with interconnected stories.',
    director: 'Various Directors',
    genre: ['Drama', 'Anthology'],
    runtime: '140 min',
    language: 'Kannada',
    synopsis: 'Katha Sangama is an anthology film that weaves together multiple stories, each exploring different facets of human emotions and relationships. The film showcases the versatility of Kannada cinema through its varied narratives.',
    imdb: 'https://www.imdb.com/title/tt7315232/',
    wiki: 'https://en.wikipedia.org/wiki/Katha_Sangama_(2019_film)',
  },
  'anukta': {
    id: 'anukta',
    title: 'Anukta',
    year: '2019',
    poster: '/images/posters/anukta-poster.jpg',
    role: 'Colourist',
    category: 'feature',
    description: 'A thought-provoking drama.',
    director: 'Navaneeth',
    genre: ['Drama'],
    runtime: '120 min',
    language: 'Kannada',
    synopsis: 'Anukta is a thought-provoking drama that delves into the complexities of human relationships and societal expectations. The film presents a nuanced narrative that challenges conventional thinking.',
    imdb: 'https://www.imdb.com/title/tt8426772/',
    wiki: 'https://en.wikipedia.org/wiki/Anukta',
  },
  'madharaasi': {
    id: 'madharaasi',
    title: 'Madharaasi',
    year: '2024',
    poster: '/images/posters/madharaasi-poster.jpg',
    role: '2nd Unit Cinematographer',
    category: 'feature',
    description: 'A compelling regional drama.',
    director: 'Raj Shetty',
    genre: ['Drama'],
    runtime: '135 min',
    language: 'Kannada',
    synopsis: 'Madharaasi is a compelling regional drama that explores the cultural landscape of coastal Karnataka. The film presents authentic storytelling rooted in local traditions and contemporary themes.',
    imdb: 'https://www.imdb.com/title/tt28252563/',
    wiki: 'https://en.wikipedia.org/wiki/Madharaasi',
  },
}

export default function FilmDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const film = filmsData[slug]

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

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Poster */}
            <div
              className={cn(
                'lg:col-span-2 transition-all duration-700',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <div
                className="relative aspect-[2/3] w-full max-w-[320px] md:max-w-[400px] mx-auto rounded-xl overflow-hidden shadow-dramatic cursor-pointer group"
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
            <div className="lg:col-span-3">
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
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Synopsis */}
            <div className="lg:col-span-2">
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
            <div className="lg:col-span-1">
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
