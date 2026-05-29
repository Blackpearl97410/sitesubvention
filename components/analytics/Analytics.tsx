'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function getLinkText(link: HTMLAnchorElement) {
  return link.innerText.trim().replace(/\s+/g, ' ').slice(0, 120)
}

export default function Analytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a')
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute('href')
      if (!href) return

      if (href.startsWith('mailto:')) {
        trackEvent('email_click', {
          link_url: href,
          link_text: getLinkText(link),
        })
        return
      }

      const url = new URL(href, window.location.origin)
      if (url.pathname === '/diagnostic') {
        trackEvent('diagnostic_cta_click', {
          link_url: url.pathname,
          link_text: getLinkText(link),
          click_location: window.location.pathname,
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: true
          });
        `}
      </Script>
    </>
  )
}
