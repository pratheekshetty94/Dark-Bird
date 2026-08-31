import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Dark Bird Films for film production, ad films, social media marketing, brand design, and AI-powered content. HSR Layout, Bengaluru. Call or WhatsApp us today.',
  keywords: [
    'contact dark bird films', 'film production enquiry', 'video production quote',
    'marketing agency bengaluru contact', 'ad film production contact',
    'social media marketing enquiry', 'brand campaign quote india',
  ],
  openGraph: {
    title: 'Contact Dark Bird Films | Get a Free Quote',
    description: 'Ready to create something extraordinary? Reach out for film production, marketing, design, and AI content services. Based in HSR Layout, Bengaluru.',
    url: 'https://www.darkbirdfilms.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.darkbirdfilms.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
