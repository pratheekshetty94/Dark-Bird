// GA4 event helpers. Safe to call on server or client — no-ops if gtag is
// unavailable (e.g. SSR, ad-blockers, before the GA script has loaded).

type GtagArgs = [string, string, Record<string, unknown>?]

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void
    fbq?: (...args: unknown[]) => void
  }
}

function gtagEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

function fbqTrack(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, params)
}

/**
 * Generic CTA click — use `location` to distinguish buttons
 * (e.g. "home_hero", "navbar", "footer", "services_films", "floating_whatsapp").
 */
export function trackCtaClick(location: string, label?: string) {
  gtagEvent('cta_click', { cta_location: location, cta_label: label })
}

export function trackWhatsAppClick(location: string) {
  gtagEvent('whatsapp_click', { cta_location: location })
  fbqTrack('Contact', { method: 'whatsapp', location })
}

export function trackPhoneClick(location: string) {
  gtagEvent('phone_click', { cta_location: location })
  fbqTrack('Contact', { method: 'phone', location })
}

export function trackEmailClick(location: string) {
  gtagEvent('email_click', { cta_location: location })
}

/** Fired the first time the user interacts with a form field. */
export function trackFormStart(formName: string) {
  gtagEvent('form_start', { form_name: formName })
}

export function trackFormSubmit(formName: string) {
  gtagEvent('form_submit', { form_name: formName })
  // Also fire a specific event name for the contact form so it matches the
  // `contact_form_submit` key event configured in GA4.
  if (formName === 'contact_project') {
    gtagEvent('contact_form_submit')
  }
  fbqTrack('Lead', { form: formName })
}

export function trackBookingConfirmed(params: { date?: string; time?: string } = {}) {
  gtagEvent('booking_confirmed', params)
  fbqTrack('Schedule', params)
}

export function trackBrochureDownload() {
  gtagEvent('brochure_download')
}
