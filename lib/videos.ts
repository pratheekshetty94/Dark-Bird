// Dark Bird Films - Video Data
// Extracted from darkbirdfilms.com/copy-of-showreel-1

export interface VideoItem {
  id: string
  youtubeId?: string
  localVideoSrc?: string  // For local video files
  title: string
  category: 'feature-film' | 'music-video' | 'commercial' | 'documentary' | 'showreel'
  client?: string
  views?: string
  year?: string
  thumbnail?: string
  services?: string[]
}

// Helper function to get YouTube thumbnail
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  }
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

// Helper function to get YouTube embed URL
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    ...(autoplay && { autoplay: '1', mute: '1' }),
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

// Helper function to get YouTube watch URL
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}

// ─── Portfolio lists ───
// Single source of truth for the video cards on /work/films and
// /filmography. Add new releases here once; both pages render them.

export const featureFilms: VideoItem[] = [
  {
    id: 'karavali-trailer',
    youtubeId: 'DxZ2RuvRrbs',
    title: 'Karavali - Official Trailer',
    category: 'feature-film',
    year: '2026',
    services: ['Editing'],
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

export const commercials: VideoItem[] = [
  {
    id: 'flipkart-findyourmatch',
    youtubeId: 'a1P87WpuCM4',
    title: '#FindYourMatch - Flipkart x Sima Taparia',
    category: 'commercial',
    client: 'Flipkart',
    services: ['Production', 'Direction'],
  },
  {
    id: 'zomato-delivery-partner',
    youtubeId: '7zZmaO7s7oI',
    title: 'Delivery Partner for a Day ft. Danish Sait - Zomato',
    category: 'commercial',
    client: 'Zomato',
  },
  {
    id: 'shopsy-guruji',
    localVideoSrc: '/videos/commercials/shopsy-guruji.mp4',
    title: 'Guruji - Shopsy by Flipkart',
    category: 'commercial',
    client: 'Shopsy by Flipkart',
  },
  {
    id: 'shopsy-astrologer',
    localVideoSrc: '/videos/commercials/shopsy-astrologer.mp4',
    title: 'Astrologer - Shopsy by Flipkart',
    category: 'commercial',
    client: 'Shopsy by Flipkart',
  },
  {
    id: 'jlr-walkthrough',
    youtubeId: 'SxdaspulBqI',
    title: 'JLR Walkthrough - Jungle Lodges & Resorts',
    category: 'commercial',
    client: 'Jungle Lodges & Resorts',
  },
  {
    id: 'jlr-bheemeshwari',
    youtubeId: 'ZJEFXz6j3qw',
    title: 'Bheemeshwari Adventure Camp - Jungle Lodges & Resorts',
    category: 'commercial',
    client: 'Jungle Lodges & Resorts',
  },
  {
    id: 'jlr-hampi',
    youtubeId: 'BEsP-3N6yyU',
    title: 'Hampi Heritage & Wilderness Resort - Jungle Lodges & Resorts',
    category: 'commercial',
    client: 'Jungle Lodges & Resorts',
  },
  {
    id: 'jlr-sharavathi',
    youtubeId: 'VX0RC288Fhs',
    title: 'Sharavathi Adventure Camp - Jungle Lodges & Resorts',
    category: 'commercial',
    client: 'Jungle Lodges & Resorts',
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

export const musicVideos: VideoItem[] = [
  {
    id: 'fire',
    youtubeId: 'Vsu5n0K0Z84',
    title: 'Fire - Shine Shetty, Yashashree Rao',
    category: 'music-video',
    year: '2026',
    services: ['Direction', 'Cinematography', 'Editing', 'DI'],
  },
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

