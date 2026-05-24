'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 })

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={(event) => {
        if (reduceMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        const offsetX = event.clientX - (rect.left + rect.width / 2)
        const offsetY = event.clientY - (rect.top + rect.height / 2)
        x.set((offsetX / rect.width) * strength)
        y.set((offsetY / rect.height) * strength)
      }}
      onMouseLeave={() => {
        if (reduceMotion) return
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
