'use client'

import { useEffect } from 'react'

const calLink = 'alexandre-paviel-formateur-consultant-ia-p4cha5/diagnostic-gratuit'
const namespace = 'diagnostic-gratuit'

declare global {
  interface Window {
    Cal?: any
    __dossierStudioCalFloatingReady?: boolean
  }
}

export function openDiagnosticCal() {
  if (typeof window === 'undefined') return

  const cal = window.Cal?.ns?.[namespace]
  if (cal) {
    cal('modal', {
      calLink,
      config: {
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
      },
    })
    return
  }

  window.open(`https://cal.com/${calLink}`, '_blank', 'noopener,noreferrer')
}

export default function CalFloatingPopup() {
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.querySelectorAll('cal-floating-button').forEach((node) => node.remove())
      return
    }
    if (window.__dossierStudioCalFloatingReady) return

    ;((C: Window, A: string, L: string) => {
      const push = (api: { q: unknown[] }, args: IArguments) => {
        api.q.push(args)
      }
      const d = C.document

      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal
          const args = arguments

          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []

            const script = d.createElement('script')
            script.src = A
            script.async = true
            d.head.appendChild(script)
            cal.loaded = true
          }

          if (args[0] === L) {
            const api = function () {
              push(api, arguments)
            } as { (...apiArgs: unknown[]): void; q: unknown[] }
            const currentNamespace = args[1]
            api.q = api.q || []

            if (typeof currentNamespace === 'string') {
              cal.ns[currentNamespace] = cal.ns[currentNamespace] || api
              push(cal.ns[currentNamespace], args)
              push(cal, ['initNamespace', currentNamespace] as unknown as IArguments)
            } else {
              push(cal, args)
            }
            return
          }

          push(cal, args)
        }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    window.Cal('init', namespace, { origin: 'https://app.cal.com' })
    window.Cal.ns[namespace]('floatingButton', {
      calLink,
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      buttonText: 'Reservez mon appel ! ',
      buttonColor: '#c54c4c',
    })
    window.Cal.ns[namespace]('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    window.__dossierStudioCalFloatingReady = true
  }, [])

  return null
}
