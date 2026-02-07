import { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import VideoGrid from '@/components/ui/VideoGrid'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTABand from '@/components/sections/CTABand'
import { VideoItem } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'Dark Bird Films | Film Production & Cinematography',
  description: 'Award-winning film production including Kantara, 777 Charlie. We create feature films, ad films, commercials, and music videos with cinematic excellence.',
}

// Feature Films - Correctly mapped from darkbirdfilms.com
const featureFilms: VideoItem[] = [
  {
    id: 'kantara-2-trailer',
    youtubeId: '0_W_PhKaQaY',
    title: 'Kantara: Chapter 1 - Official Trailer',
    category: 'feature-film',
    client: 'Hombale Films',
    year: '2025',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: 'kantara-trailer',
    youtubeId: '8mrVmf239GU',
    title: 'Kantara - Official Trailer',
    category: 'feature-film',
    client: 'Hombale Films',
    views: '100M+',
    year: '2022',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: '777-charlie-trailer',
    youtubeId: 'REqFOV2A7sI',
    title: '777 Charlie - Official Trailer',
    category: 'feature-film',
    client: 'Paramvah Studios',
    views: '26M+',
    year: '2022',
    services: ['Editing', 'Cinematography', 'Post-Production'],
  },
  {
    id: 'gandhada-gudi-trailer',
    youtubeId: 'UdPisHeGMQM',
    title: 'Gandhada Gudi - Official Trailer',
    category: 'documentary',
    client: 'PRK Productions',
    views: '13M+',
    year: '2022',
    services: ['Cinematography', 'Documentary'],
  },
  {
    id: 'gandhada-gudi-teaser',
    youtubeId: '742iuFwfz3k',
    title: 'Gandhada Gudi - Official Teaser',
    category: 'documentary',
    client: 'PRK Productions',
    services: ['Cinematography', 'Documentary'],
  },
  {
    id: 'su-from-so',
    youtubeId: 'Fe11GLdTL5k',
    title: 'Su From So - Official Trailer',
    category: 'feature-film',
    client: 'Lighter Buddha Films',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: 'shpsk',
    youtubeId: 'oA-U1rR3pNc',
    title: 'Sarkari Hi. Pra. Shaale, Kasaragodu - Trailer',
    category: 'feature-film',
    client: 'Rishab Shetty Films',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: 'toby',
    youtubeId: '3TM85uXST6A',
    title: 'Toby - Official Trailer',
    category: 'feature-film',
    client: 'Lighter Buddha Films',
    services: ['Production Support'],
  },
  {
    id: 'hero-trailer',
    youtubeId: 'MiJPnyCOoUc',
    title: 'HERO - Official Trailer',
    category: 'feature-film',
    client: 'Rishab Shetty Films',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: 'katha-sangama',
    youtubeId: '2a8hE5Y9pH4',
    title: 'Katha Sangama - Official Trailer',
    category: 'feature-film',
    client: 'Rishab Shetty Films',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: 'anukta',
    youtubeId: '4RksJ7IAcVY',
    title: 'Anukta - Official Trailer',
    category: 'feature-film',
    services: ['Editing', 'Post-Production'],
  },
  {
    id: 'madharaasi',
    youtubeId: 'Hgw4S7SDo3U',
    title: 'Madharaasi - Official Trailer',
    category: 'feature-film',
    services: ['Post-Production'],
  },
]

// Ad Films & Commercials - Correctly mapped from darkbirdfilms.com
const commercials: VideoItem[] = [
  {
    id: 'flipkart-findyourmatch',
    youtubeId: 'a1P87WpuCM4',
    title: '#FindYourMatch - Flipkart x Sima Taparia',
    category: 'commercial',
    client: 'Flipkart',
    services: ['Production', 'Direction'],
  },
  {
    id: 'yo-fruits-festive',
    youtubeId: 'AsuTrS1WX-M',
    title: 'YO Fruits - Gift Your Loved Ones Good Health',
    category: 'commercial',
    client: 'YO Fruits',
    services: ['Production', 'Direction'],
  },
  {
    id: 'yo-fruits-aap-jahan',
    youtubeId: 'fYH8UgqPaQQ',
    title: 'YO Fruits - Aap Jahan Phal Wahan',
    category: 'commercial',
    client: 'YO Fruits',
    services: ['Production', 'Direction'],
  },
  {
    id: 'hangyo-icecream',
    youtubeId: 'fBkKkgfa5-0',
    title: 'Hangyo Ice Cream - TVC',
    category: 'commercial',
    client: 'Hangyo',
    services: ['Production', 'Direction'],
  },
  {
    id: 'gk-hillview',
    youtubeId: 'AvUbojIz-f8',
    title: 'GK Hill View Villa - Walkthrough Film',
    category: 'commercial',
    client: 'GK Builders',
    services: ['Production', 'Direction', 'Cinematography'],
  },
  {
    id: 'anjani-lake',
    youtubeId: '6Eq7L1wl1U8',
    title: 'Anjani Lake Woods - GK Builders Walkthrough',
    category: 'commercial',
    client: 'GK Builders',
    services: ['Production', 'Direction', 'Cinematography'],
  },
  {
    id: 'dogs-hope',
    youtubeId: 'MaAUPpTXbNs',
    title: "A Dog's Hope - GK Builders 2020",
    category: 'commercial',
    client: 'GK Builders',
    year: '2020',
    services: ['Production', 'Direction'],
  },
]
// Note: Shopsy videos (Guruji, Astrologer) can be added when YouTube IDs are available

// Music Videos - Correctly mapped from darkbirdfilms.com
const musicVideos: VideoItem[] = [
  {
    id: 'danks-anthem',
    youtubeId: 'RldAVzPGMuA',
    title: 'DANKS ANTHEM - Su From So',
    category: 'music-video',
    views: '29M+',
    services: ['Direction', 'Cinematography', 'Editing'],
  },
  {
    id: 'alemaari',
    youtubeId: 'RqLSlcm32WI',
    title: 'Alemaari - Raghu Dixit | Shakkar',
    category: 'music-video',
    views: '600K+',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'harivaa-jhari',
    youtubeId: 'g6Q2yMu8C3s',
    title: 'Harivaa Jhari - Varijashree Venugopal',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'demon-in-me',
    youtubeId: 'MjZBup8ELR4',
    title: 'Demon in Me - Garuda Gamana Vrishabha Vahana',
    category: 'music-video',
    views: '1M+',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'mother-earth',
    youtubeId: 'QR56NkP3yaU',
    title: 'Mother Earth - Ricky Kej | Divine Tides',
    category: 'music-video',
    client: 'Ricky Kej',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'bengaluru-song',
    youtubeId: 'mH7aOwbGo78',
    title: 'The Bengaluru Song - French Biriyani',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'hang-massive-1',
    youtubeId: 'oEJk3Vjii74',
    title: 'Hang Massive - End of Sky',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'karavali',
    youtubeId: '-mrwSO5yo4Y',
    title: 'Karavali Song - SHPSK',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'hang-massive-2',
    youtubeId: 'EXnGu9RA_OQ',
    title: 'Hang Massive - Warmth of the Sun\'s Rays',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'hang-massive-3',
    youtubeId: 'nvmOoSFhhJ4',
    title: 'Hang Massive - Secret Kissing of the Sun and Moon',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'aigiri-nandini',
    youtubeId: 'EbcdDXEPukk',
    title: 'Aigiri Nandini - Rock Version',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'hero-song',
    youtubeId: '_HwPGXsklyY',
    title: 'HERO - Baananchige Oduva Baara',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'sojugada-sooju',
    youtubeId: '_WQ1t5N1I7U',
    title: 'Sojugada Sooju Mallige',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'he-sharade',
    youtubeId: 'pd7cp6gQKac',
    title: 'He Sharade - SHPSK',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'nooraaru-bannagalu',
    youtubeId: 'uAEWvebVTLM',
    title: 'Nooraaru Bannagalu - SHPSK',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'arere-avala',
    youtubeId: 'lur8LpJ785I',
    title: 'Arere Avala Naguva - SHPSK',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'dadda-song',
    youtubeId: 'VBwqRNqeAPg',
    title: 'Dadda Song - SHPSK',
    category: 'music-video',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'samsara',
    youtubeId: '8kvsr7AV_Nc',
    title: 'Samsara - Ricky Kej ft. Amitabh Bachchan',
    category: 'music-video',
    client: 'Ricky Kej',
    services: ['Direction', 'Cinematography'],
  },
  {
    id: 'jana-gana-mana',
    youtubeId: 'S0hzXSx84Yo',
    title: 'Jana Gana Mana - Ricky Kej',
    category: 'music-video',
    client: 'Ricky Kej',
    services: ['Direction', 'Cinematography'],
  },
]

export default function FilmsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-section">
        <div className="container-content">
          <ScrollReveal>
            <h1 className="text-hero font-bold text-white mb-6">
              Cinematic Excellence
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-warm-gray max-w-3xl mb-8">
              We craft films, commercials, and music videos with a filmmaker's eye
              and a brand strategist's brain. Every project is built to resonate
              emotionally and deliver results.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">
                Let's Break the Internet
              </Button>
              <p className="text-warm-gray italic self-center">
                *And then your revenue records.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Films */}
      <section className="section-light section-padding">
        <div className="container-content">
          <ScrollReveal>
            <SectionLabel>Feature Films</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              Our Work Lives on Screens Across India
            </h2>
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
            <h2 className="text-section font-bold text-white mt-4 mb-4">
              Brand Campaigns
            </h2>
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
            <h2 className="text-section font-bold text-charcoal mt-4 mb-12">
              The Sounds We've Turned Into Visuals
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <VideoGrid videos={musicVideos} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Have a Film Project in Mind?"
        description="From feature films to brand campaigns, we bring cinematic craft to every frame."
        buttonText="Start Your Project"
        buttonHref="/contact"
      />
    </>
  )
}
