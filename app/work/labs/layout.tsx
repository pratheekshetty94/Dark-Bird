import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dark Bird Labs | AI Content Creation & VFX Production India',
  description: 'Dark Bird Labs pioneers AI-powered content creation, VFX, CGI, and generative AI marketing. Future-ready storytelling combining human creativity with artificial intelligence.',
  keywords: [
    'AI content creation india', 'generative AI marketing', 'AI video production',
    'VFX production house bengaluru', 'CGI animation india', 'AI advertising agency',
    'dark bird labs', 'AI film production', 'machine learning creative agency',
    'generative AI ads india', 'AI brand content', 'artificial intelligence marketing',
  ],
  openGraph: {
    title: 'Dark Bird Labs | AI-Powered Creative Content',
    description: 'Future-ready storytelling powered by AI and human direction. GenAI marketing, VFX, CGI, and AI-driven content creation.',
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
