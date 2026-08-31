import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GK Builders — Website Design Case Study',
  description: 'How Dark Bird Designs built the GK Builders website — real-estate brand, UX and web design case study from Bengaluru.',
  alternates: { canonical: 'https://www.darkbirdfilms.com/work/designs/websites/gk-builders' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
