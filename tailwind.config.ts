import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New warm palette - moving away from Netflix look
        'accent': {
          DEFAULT: '#E85A3F',      // Warm terracotta (primary accent)
          hover: '#D14A30',
          muted: '#F5A898',
          light: '#FFF0ED',
        },
        'ink': '#1A1818',           // Warm black (not pure #000)
        'charcoal': '#2B2926',      // Rich charcoal
        'stone': '#4A4744',         // Medium gray
        'warm-gray': '#8A8580',     // Text gray
        'silver': '#B5B0AA',        // Light gray
        'cream': '#FAF6EF',         // Warm cream (ToyFight-inspired)
        'paper': '#FFFEF8',         // Near white
        'warm-white': '#F5F2EB',    // Off-white
        'gold': '#C9A962',          // Awards, premium
        'sage': '#A8B5A0',          // Subtle accent
        // Keep legacy colors for backward compatibility during transition
        'primary-red': '#E85A3F',
        'primary-red-hover': '#D14A30',
        'deep-black': '#1A1818',
        'muted-red': '#F5A898',
        'warm-beige': '#FDF8F4',
      },
      fontFamily: {
        // New typography system
        'display': ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        'sans': ['var(--font-space)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Fluid typography with clamp()
        'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subsection': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'body': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.7' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.6' }],
        'caption': ['clamp(0.75rem, 0.9vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.15em' }],
        'metric': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        'section': 'clamp(5rem, 12vw, 9rem)',
        'section-sm': 'clamp(3rem, 8vw, 6rem)',
        'gutter': 'clamp(1.5rem, 4vw, 3rem)',
      },
      maxWidth: {
        'content': '1400px',
        'narrow': '900px',
        'wide': '1800px',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'reveal': 'reveal 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-33.333%, 0, 0)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translate3d(-33.333%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0% 0 0 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(transparent 40%, rgba(26,24,24,0.9) 100%)',
        'gradient-overlay': 'linear-gradient(to top, rgba(26,24,24,0.95) 0%, transparent 60%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'bounce': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'dramatic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'dramatic': '0 20px 60px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 40px rgba(232, 90, 63, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
