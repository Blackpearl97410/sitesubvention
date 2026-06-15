'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { ReactNode, RefObject } from 'react'

export default function Parallax({
  children,
  className,
  offset = 22,
  target,
}: {
  children: ReactNode
  className?: string
  offset?: number
  target: RefObject<HTMLElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const y = useSpring(yRaw, { stiffness: 90, damping: 24, mass: 0.35 })

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
