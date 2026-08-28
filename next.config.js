/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
  },

  // Campaign links must live on our own domain so Gmail does not show a
  // redirect warning. Next.js `permanent: true` emits 308, so the status
  // code is set explicitly to 301 as required.
  async redirects() {
    return [
      {
        source: '/book',
        destination: 'https://cal.com/team-darkbirdfilms/30min',
        statusCode: 301,
      },
      {
        source: '/whatsapp',
        destination: 'https://wa.me/919108955609',
        statusCode: 301,
      },
      {
        source: '/reel',
        destination:
          'https://www.darkbirdfilms.com/industries/real-estate-video-production-bangalore',
        statusCode: 301,
      },
    ]
  },
}

module.exports = nextConfig
