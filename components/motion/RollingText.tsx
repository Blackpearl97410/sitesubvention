'use client'

import { motion } from 'framer-motion'
import { motionTiming } from '@/lib/tokens'

export default function RollingText({
  text,
  className,
  animateOnHover = true,
}: {
  text: string
  className?: string
  animateOnHover?: boolean
}) {
  return (
    <span className={`relative inline-flex h-[1em] overflow-hidden leading-none align-middle ${className ?? ''}`}>
      <motion.span
        className="flex flex-col"
        initial={{ y: '0%' }}
        whileHover={animateOnHover ? { y: '-50%' } : undefined}
        transition={animateOnHover ? { duration: motionTiming.fastDuration, ease: motionTiming.ease } : undefined}
      >
        <span className="leading-none">{text}</span>
        {animateOnHover ? (
          <span aria-hidden="true" className="leading-none pt-[0.18em]">
            {text}
          </span>
        ) : null}
      </motion.span>
    </span>
  )
}
