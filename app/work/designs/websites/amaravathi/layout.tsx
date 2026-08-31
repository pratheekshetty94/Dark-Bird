import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Amaravathi — Website Design Case Study',
  description: 'How Dark Bird Designs built the Amaravathi restaurant website — hospitality brand, UX and web design case study from Bengaluru.',
  alternates: { canonical: 'https://www.darkbirdfilms.com/work/designs/websites/amaravathi' },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
