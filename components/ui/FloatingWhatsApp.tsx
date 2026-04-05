'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { WHATSAPP_URL, PHONE_TEL_URL } from '@/lib/contact'
import { trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics'

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  // Reveal after the user scrolls a bit so it doesn't fight with the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 transition-all duration-300 md:bottom-6 md:right-6 ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
      }`}
    >
      {/* Call */}
      <a
        href={PHONE_TEL_URL}
        onClick={() => trackPhoneClick('floating_button')}
        aria-label="Call Dark Bird Films"
        className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(232,90,63,0.45)] transition-all duration-300 hover:scale-105 hover:bg-accent-hover md:px-5 md:py-3.5"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
        <span className="hidden sm:inline">Call us</span>
      </a>

      {/* WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        aria-label="Chat with Dark Bird Films on WhatsApp"
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] md:px-5 md:py-3.5"
      >
        {/* WhatsApp glyph */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden sm:inline">Chat with us</span>
      </a>
    </div>
  )
}
