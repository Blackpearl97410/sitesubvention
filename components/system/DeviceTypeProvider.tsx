'use client'

import { useEffect } from 'react'

type DeviceType = 'phone' | 'tablet' | 'desktop'

function detectDeviceType(): DeviceType {
  const width = window.innerWidth
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobileAgent = /iphone|ipod|android.*mobile|windows phone/.test(userAgent)
  const isTabletAgent = /ipad|tablet|android(?!.*mobile)/.test(userAgent)

  if (width < 768 || isMobileAgent) return 'phone'
  if (width < 1100 || isTabletAgent || coarsePointer) return 'tablet'
  return 'desktop'
}

export default function DeviceTypeProvider() {
  useEffect(() => {
    const applyDeviceType = () => {
      const deviceType = detectDeviceType()
      const root = document.documentElement

      root.dataset.device = deviceType
      root.dataset.pointer = window.matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine'
      root.dataset.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    }

    applyDeviceType()
    window.addEventListener('resize', applyDeviceType)
    window.addEventListener('orientationchange', applyDeviceType)

    return () => {
      window.removeEventListener('resize', applyDeviceType)
      window.removeEventListener('orientationchange', applyDeviceType)
    }
  }, [])

  return null
}
