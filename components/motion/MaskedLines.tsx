'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { motionTiming } from '@/lib/tokens'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p' | 'div'

export default function MaskedLines({
  as = 'div',
  className,
  lineClassName,
  lines,
  delay = 0,
  ...props
}: {
  as?: HeadingTag
  className?: string
  lineClassName?: string
  lines: ReactNode[]
  delay?: number
} & HTMLMotionProps<'div'>) {
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: motionTiming.stagger,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {lines.map((line, index) => (
        <span key={index} className={`block overflow-hidden ${lineClassName ?? ''}`}>
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '108%', rotate: 1.5, opacity: 0 },
              visible: {
                y: '0%',
                rotate: 0,
                opacity: 1,
                transition: {
                  duration: motionTiming.cinematic,
                  ease: motionTiming.ease,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
