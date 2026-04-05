import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dark Bird Films | #1 Film Production House in India · Kantara, 777 Charlie',
  description: 'Dark Bird Films — India\'s leading film production house. Behind Kantara, 777 Charlie, Gandhada Gudi, Su From So and 100+ feature credits. Feature films, ad films, music videos, brand films, documentaries & founder stories. Based in Bengaluru.',
  keywords: [
    // High-intent #1 / best queries
    'no 1 film production house in india', 'no 1 film production house bangalore',
    'best film production house in india', 'best film production house bangalore',
    'top film production company india', 'top production house bengaluru',
    'best ad film production house bangalore', 'best feature film production india',
    // Notable works (brand anchor)
    'kantara production', 'kantara editing', '777 charlie cinematography',
    'gandhada gudi documentary', 'su from so film', 'pratheek shetty films',
    // Service categories
    'feature film production bangalore', 'ad film production agency india',
    'music video production bangalore', 'brand film production india',
    'documentary production house india', 'founder story video production',
    'product launch video production', 'property walkthrough film production',
    'cinematography services bangalore', 'film editing di colour grading india',
    'vfx services bangalore',
    // Brand + location
    'dark bird films', 'dark bird films filmography', 'indian film production house',
    'kannada film production', 'south indian cinema production', 'bengaluru film studio',
    'award winning film editor india',
  ],
  openGraph: {
    title: 'Dark Bird Films | #1 Film Production House in India',
    description: 'From Kantara to 777 Charlie — India\'s leading film production house. Feature films, ad films, music videos & brand films out of Bengaluru.',
    url: 'https://darkbirdfilms.com/filmography',
    type: 'website',
  },
  alternates: {
    canonical: 'https://darkbirdfilms.com/filmography',
  },
}

export default function FilmographyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
