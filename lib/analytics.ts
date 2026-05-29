export type AnalyticsEventName =
  | 'diagnostic_submit'
  | 'contact_form_submit'
  | 'email_click'
  | 'diagnostic_cta_click'

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      target: string | Date,
      params?: AnalyticsEventParams
    ) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', eventName, {
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  })
}
