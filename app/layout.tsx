import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/providers/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'

// Primary sans-serif for body text and UI
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Elegant serif for display headlines
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

// Monospace for technical details and labels
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Dark Bird Films | Cinematic Storytelling Studio',
  description: 'We tell stories that move people and grow brands. Award-winning production house behind Kantara, 777 Charlie, and 100+ brand campaigns. Based in Bengaluru.',
  keywords: ['film production', 'video production', 'Bengaluru', 'Kantara', '777 Charlie', 'brand films', 'music videos', 'real estate marketing'],
  authors: [{ name: 'Dark Bird Films' }],
  openGraph: {
    title: 'Dark Bird Films | Cinematic Storytelling Studio',
    description: 'We tell stories that move people and grow brands. Award-winning production house based in Bengaluru.',
    url: 'https://darkbirdfilms.com',
    siteName: 'Dark Bird Films',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Bird Films | Cinematic Storytelling Studio',
    description: 'We tell stories that move people and grow brands.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-ink text-cream antialiased">
        {/* Smooth scrolling provider */}
        <SmoothScroll>
          {/* Custom cursor */}
          <CustomCursor />

          {/* Subtle noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
