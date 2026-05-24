'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { motionTiming } from '@/lib/tokens'

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: motionTiming.baseDuration,
        ease: motionTiming.ease,
      }}
    >
      {children}
    </MotionConfig>
  )
}
