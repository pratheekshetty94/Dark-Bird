import Script from 'next/script'

const BASE_URL = 'https://darkbirdfilms.com'

// ─── Organization Schema ───
// Tells Google: "We are a legitimate company with this brand identity"
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Dark Bird Films',
  alternateName: ['Dark Bird', 'DarkBird Films', 'Dark Bird Socials', 'Dark Bird Designs', 'Dark Bird Labs'],
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/logo.png`,
    width: 320,
    height: 120,
  },
  image: `${BASE_URL}/og-image.jpg`,
  description:
    'Award-winning film production and marketing agency behind Kantara, 777 Charlie, and 100+ brand campaigns. Based in Bengaluru, India.',
  foundingDate: '2016',
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#founder`,
    name: 'Pratheek Shetty',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'HSR Layout',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560102',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'management@darkbirdfilms.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
  ],
  sameAs: [
    'https://instagram.com/darkbirdsocials',
    'https://youtube.com/@darkbirdfilms',
    'https://in.linkedin.com/in/dark-bird-b33321396',
    'https://www.facebook.com/Darkbirdfilms/',
    'https://vimeo.com/darkbirdfilms',
    'https://www.imdb.com/name/nm10035706/',
    'https://share.google/Sj8wgl4Y6g4W5njMX',
  ],
  award: [
    'National Award — Best Film (SHPSK, 2018)',
    'Kantara (2022) — Highest-grossing Kannada film of all time',
    'Grammy Award-winning album Divine Tides — Ricky Kej',
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 10,
    maxValue: 50,
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'India',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 12.9121,
        longitude: 77.6446,
      },
      geoRadius: '5000',
    },
  ],
  knowsAbout: [
    'Film Production',
    'Video Editing',
    'Cinematography',
    'Post-Production',
    'Ad Films',
    'Music Videos',
    'Social Media Marketing',
    'Brand Design',
    'Motion Graphics',
    'AI Content Creation',
    'VFX',
    'CGI',
    'Influencer Marketing',
    'Performance Marketing',
    'Corporate Videos',
    'Real Estate Marketing',
  ],
}

// ─── LocalBusiness Schema ───
// Critical for Google Maps, "near me" searches, and local pack results
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProductionCompany',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'Dark Bird Films',
  image: `${BASE_URL}/og-image.jpg`,
  url: BASE_URL,
  telephone: '+91-9108955609',
  email: 'management@darkbirdfilms.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'HSR Layout',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560102',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9121,
    longitude: 77.6446,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  priceRange: '$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Production & Marketing Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Film Production',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Feature Film Production' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ad Film & Commercial Production' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Music Video Production' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Documentary Filmmaking' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing & Post-Production' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cinematography' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Video Production' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Marketing & Social Media',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Campaign Strategy' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Influencer Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Marketing & Ads' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Strategy & Creation' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motion Graphics' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Modelling & CGI' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'AI & Technology',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Content Creation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Generative AI Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VFX & Visual Effects' } },
        ],
      },
    ],
  },
}

// ─── Person Schema (Founder) ───
// Personal brand SEO for Pratheek Shetty
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#founder`,
  name: 'Pratheek Shetty',
  alternateName: 'Pratheek Shetty Filmmaker',
  url: `${BASE_URL}/about`,
  image: `${BASE_URL}/images/about/pratheek-shetty.jpg`,
  jobTitle: 'Founder & Creative Director',
  worksFor: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Dark Bird Films',
  },
  description:
    'Award-winning filmmaker, editor, and creative director. Founder of Dark Bird Films. Known for editing Kantara, 777 Charlie, and Gandhada Gudi. Based in Bengaluru, India.',
  knowsAbout: [
    'Film Editing', 'Cinematography', 'Film Direction', 'Post-Production',
    'Visual Storytelling', 'Brand Strategy', 'Content Marketing',
    'Ad Film Production', 'Music Video Direction',
  ],
  nationality: {
    '@type': 'Country',
    name: 'India',
  },
  sameAs: [
    'https://www.imdb.com/name/nm10035706/',
    'https://www.rottentomatoes.com/celebrity/pratheek_shetty',
    'https://instagram.com/darkbirdsocials',
    'https://linkedin.com/in/pratheek-shetty-67b932275/',
    'https://in.linkedin.com/in/dark-bird-b33321396',
    'https://youtube.com/@darkbirdfilms',
    'https://www.facebook.com/Pratheekdarkbirdfilm/',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Manipal University',
    sameAs: 'https://manipal.edu/',
  },
  birthPlace: {
    '@type': 'Place',
    name: 'Udupi, Karnataka, India',
  },
  award: [
    'National Award — Best Film (SHPSK, 2018) — Editor',
    'Kantara (2022) — Highest-grossing Kannada film — Editor',
    'Grammy Award-winning album Divine Tides by Ricky Kej — Director',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Experience',
      name: 'Editor - Kantara (2022) — Pan-India blockbuster, 100M+ trailer views',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Experience',
      name: 'Editor - 777 Charlie (2022) — Pan-India release across 5 languages',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Experience',
      name: 'Cinematographer - Gandhada Gudi (2022) — Puneeth Rajkumar\'s last film',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Experience',
      name: 'Editor - SHPSK (2018) — National Award-winning film',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Experience',
      name: 'Director - Divine Tides music videos for 3-time Grammy Award winner Ricky Kej',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Experience',
      name: 'Editor - Kotee (2024) — Directed by Ramesh Aravind',
    },
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Film Editor',
      occupationalCategory: '27-4032',
    },
    {
      '@type': 'Occupation',
      name: 'Cinematographer',
      occupationalCategory: '27-4031',
    },
    {
      '@type': 'Occupation',
      name: 'Film Director',
      occupationalCategory: '27-2012',
    },
  ],
}

// ─── WebSite Schema ───
// Enables sitelinks search box in Google results
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Dark Bird Films',
  alternateName: 'Dark Bird',
  url: BASE_URL,
  publisher: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
  },
  inLanguage: 'en-IN',
  copyrightYear: 2016,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/work?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// ─── BreadcrumbList Schema ───
// Improves Google's understanding of site hierarchy
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Our Work',
      item: `${BASE_URL}/work`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Films',
      item: `${BASE_URL}/work/films`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Socials',
      item: `${BASE_URL}/work/socials`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Designs',
      item: `${BASE_URL}/work/designs`,
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Labs',
      item: `${BASE_URL}/work/labs`,
    },
  ],
}

// ─── VideoObject Schema (for featured works) ───
// Makes videos eligible for Google Video carousel
const videoSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Kantara - Official Trailer',
    description: 'Official trailer for Kantara, edited and post-produced by Dark Bird Films. 100M+ views.',
    thumbnailUrl: 'https://img.youtube.com/vi/8mrVmf239GU/maxresdefault.jpg',
    uploadDate: '2022-07-01',
    contentUrl: 'https://www.youtube.com/watch?v=8mrVmf239GU',
    embedUrl: 'https://www.youtube.com/embed/8mrVmf239GU',
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: 100000000,
    },
    productionCompany: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: '777 Charlie - Official Trailer',
    description: 'Official trailer for 777 Charlie. Cinematography and editing by Dark Bird Films. 26M+ views.',
    thumbnailUrl: 'https://img.youtube.com/vi/REqFOV2A7sI/maxresdefault.jpg',
    uploadDate: '2022-04-15',
    contentUrl: 'https://www.youtube.com/watch?v=REqFOV2A7sI',
    embedUrl: 'https://www.youtube.com/embed/REqFOV2A7sI',
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: 26000000,
    },
    productionCompany: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'DANKS ANTHEM - Su From So',
    description: 'DANKS ANTHEM music video directed and produced by Dark Bird Films. 29M+ views.',
    thumbnailUrl: 'https://img.youtube.com/vi/RldAVzPGMuA/maxresdefault.jpg',
    uploadDate: '2021-01-01',
    contentUrl: 'https://www.youtube.com/watch?v=RldAVzPGMuA',
    embedUrl: 'https://www.youtube.com/embed/RldAVzPGMuA',
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: 29000000,
    },
    productionCompany: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
  },
]

// ─── FAQPage Schema ───
// Enables FAQ rich snippets in search results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Dark Bird Films offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dark Bird Films offers film production (feature films, ad films, music videos, documentaries), social media marketing (brand campaigns, influencer marketing, performance ads), brand design (identity, motion graphics, websites), and AI-powered content creation (GenAI marketing, VFX, CGI).',
      },
    },
    {
      '@type': 'Question',
      name: 'Which famous films has Dark Bird Films worked on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dark Bird Films has worked on blockbuster films including Kantara (100M+ trailer views), 777 Charlie (26M+ views), Gandhada Gudi documentary with Puneeth Rajkumar, and several other Kannada cinema hits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Dark Bird Films located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dark Bird Films is headquartered in HSR Layout, Bengaluru, Karnataka, India. We serve clients across India and internationally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who founded Dark Bird Films?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dark Bird Films was founded by Pratheek Shetty, an award-winning filmmaker, editor, and creative director known for his work on Kantara, 777 Charlie, and Gandhada Gudi.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to produce an ad film with Dark Bird Films?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ad film production costs vary based on scope, duration, and requirements. We offer packages starting from under 2 lakhs to 20 lakhs and above. Contact us for a customized quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Dark Bird Films offer social media marketing services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, through Dark Bird Socials, we offer comprehensive social media marketing including brand campaigns, influencer marketing, performance ads, content strategy, and community management for brands across India.',
      },
    },
  ],
}

export default function StructuredData() {
  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-local-business"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="schema-founder"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {videoSchemas.map((schema, index) => (
        <Script
          key={`video-${index}`}
          id={`schema-video-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
