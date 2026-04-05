import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/providers/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import StructuredData from '@/components/seo/StructuredData'

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

const BASE_URL = 'https://darkbirdfilms.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a1a',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ─── Core SEO ───
  title: {
    default: 'Dark Bird Films | #1 Film Production & Marketing Agency in India',
    template: '%s | Dark Bird Films',
  },
  description:
    'Award-winning film production house behind Kantara, 777 Charlie & 100+ brand campaigns. We offer ad films, music videos, social media marketing, brand design & AI-powered content. Bengaluru, India.',
  keywords: [
    // Brand keywords
    'Dark Bird Films', 'Dark Bird Socials', 'Dark Bird Designs', 'Dark Bird Labs',
    'Pratheek Shetty', 'Pratheek Shetty filmmaker', 'Pratheek Shetty editor',
    // Film production
    'film production company india', 'film production house bengaluru',
    'best film production company india', 'top production house bangalore',
    'ad film production company', 'commercial production house india',
    'music video production india', 'feature film production',
    // Notable works
    'Kantara film', 'Kantara editor', 'Kantara post production',
    '777 Charlie', '777 Charlie cinematography',
    'Gandhada Gudi', 'Rishab Shetty films',
    // Marketing keywords
    'best marketing agency india', 'social media marketing agency bengaluru',
    'brand campaign agency india', 'digital marketing production house',
    'influencer marketing agency', 'performance marketing agency india',
    // Design keywords
    'brand identity design india', 'motion graphics agency',
    'brand design agency bengaluru', 'logo design production house',
    // AI & Tech
    'AI content creation india', 'generative AI marketing',
    'AI video production', 'VFX production india',
    // Location-based
    'production house HSR Layout', 'creative agency bangalore',
    'video production company karnataka', 'film production south india',
    // Service-based
    'corporate video production', 'real estate marketing videos',
    'product video production india', 'brand film production',
    'social media content creation', 'video editing services india',
  ],
  authors: [
    { name: 'Dark Bird Films', url: BASE_URL },
    { name: 'Pratheek Shetty', url: `${BASE_URL}/about` },
  ],
  creator: 'Dark Bird Films',
  publisher: 'Dark Bird Films',
  category: 'Film Production & Marketing',

  // ─── Canonical & Alternates ───
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-IN': BASE_URL,
      'en-US': BASE_URL,
    },
  },

  // ─── Open Graph (Facebook, LinkedIn, WhatsApp) ───
  openGraph: {
    title: 'Dark Bird Films | Award-Winning Film Production & Marketing Agency',
    description:
      'Behind Kantara & 777 Charlie. We create ad films, music videos, brand campaigns, and AI-powered content. 100+ brands trust us. Bengaluru, India.',
    url: BASE_URL,
    siteName: 'Dark Bird Films',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dark Bird Films - Cinematic Storytelling Studio',
        type: 'image/jpeg',
      },
    ],
  },

  // ─── Twitter / X ───
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Bird Films | Film Production & Marketing Agency India',
    description: 'Behind Kantara & 777 Charlie. Ad films, music videos, marketing & AI content.',
    images: ['/og-image.jpg'],
    creator: '@darkbirdfilms',
    site: '@darkbirdfilms',
  },

  // ─── Robots ───
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Verification ───
  // Add your verification codes here after setting up:
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },

  // ─── App-specific ───
  applicationName: 'Dark Bird Films',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // ─── Icons ───
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icons/icon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // ─── Manifest ───
  manifest: '/manifest.json',

  // ─── Other ───
  other: {
    'google-site-verification': 'google9e213728556305a7',
    'fb:app_id': '',
    'article:publisher': 'https://www.facebook.com/Darkbirdfilms/',
    'linkedin:owner': 'https://in.linkedin.com/in/dark-bird-b33321396',
    'msapplication-TileColor': '#080808',
    'msapplication-TileImage': '/icons/icon-256x256.png',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />

        {/* Google Business Profile */}
        <link rel="me" href="https://share.google/Sj8wgl4Y6g4W5njMX" />

        {/* LLMs.txt — Generative Engine Optimization (GEO) */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site information" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9121;77.6446" />
        <meta name="ICBM" content="12.9121, 77.6446" />
      </head>
      <body className="font-sans bg-ink text-cream antialiased">
        {/* JSON-LD Structured Data */}
        <StructuredData />

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3P0FL5PVM0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3P0FL5PVM0', {
              page_title: document.title,
              send_page_view: true,
            });
          `}
        </Script>

        {/* Meta Pixel (Facebook) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1648818522773432');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1648818522773432&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
