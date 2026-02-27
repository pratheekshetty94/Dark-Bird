import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Filmography | Dark Bird Films - Kantara, 777 Charlie & More',
  description: 'Complete filmography of Dark Bird Films featuring Kantara, 777 Charlie, Gandhada Gudi, and more. Award-winning editing, cinematography, and post-production for Indian cinema.',
  keywords: [
    'dark bird films filmography', 'kantara editing', '777 charlie cinematography',
    'gandhada gudi documentary', 'indian film production house',
    'kannada film editor', 'bollywood post production', 'south indian cinema',
    'pratheek shetty films', 'award winning film editor india',
  ],
  openGraph: {
    title: 'Filmography | Dark Bird Films',
    description: 'From Kantara to 777 Charlie — explore our complete body of work in Indian cinema.',
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
