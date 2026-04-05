import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dark Bird Labs | #1 AI Film Studio in India & Bangalore',
  description: 'Dark Bird Labs is India\'s #1 AI film studio. AI commercials, AI short films, AI launch trailers, AI music videos, VFX, CGI and generative marketing — directed, not prompted, by a nine-year feature-film team in Bengaluru.',
  keywords: [
    'no 1 ai film studio india', 'best ai film studio india', 'top ai film studio india',
    'no 1 ai film studio bangalore', 'best ai film studio bangalore',
    'ai film studio india', 'ai film studio bangalore',
    'ai video production india', 'ai video production bangalore',
    'ai commercial production bangalore', 'ai short film bangalore',
    'ai launch trailer bangalore', 'ai music video bangalore',
    'ai marketing automation bangalore', 'generative AI marketing india',
    'VFX production house bengaluru', 'CGI animation india',
    'dark bird labs', 'AI film production', 'machine learning creative agency',
    'generative AI ads india', 'AI brand content', 'artificial intelligence marketing',
  ],
  openGraph: {
    title: 'Dark Bird Labs | #1 AI Film Studio in India',
    description: 'India\'s #1 AI film studio. AI commercials, short films, launch trailers, music videos and generative marketing — directed by a feature-film team.',
    url: 'https://darkbirdfilms.com/work/labs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://darkbirdfilms.com/work/labs',
  },
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
