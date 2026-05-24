'use client'

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { motionTiming, motionVariants, motionViewport } from '@/lib/tokens'

type RevealVariant = keyof typeof motionVariants

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  once?: boolean
  viewportMargin?: string
  variant?: RevealVariant
  trigger?: 'load' | 'view'
}

export function Reveal({
  children,
  delay = 0,
  once = true,
  viewportMargin = motionViewport.margin,
  transition,
  trigger = 'load',
  variant = 'revealUp',
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? undefined : 'hidden'}
      animate={trigger === 'load' ? 'visible' : undefined}
      whileInView={!reduceMotion && trigger === 'view' ? 'visible' : undefined}
      viewport={trigger === 'view' ? { once, margin: viewportMargin } : undefined}
      variants={reduceMotion ? undefined : motionVariants[variant]}
      transition={{
        duration: reduceMotion ? 0 : motionTiming.baseDuration,
        ease: motionTiming.ease,
        delay: reduceMotion ? 0 : delay,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type StaggerGroupProps = HTMLMotionProps<'div'> & {
  delayChildren?: number
  once?: boolean
  stagger?: number
  trigger?: 'load' | 'view'
  viewportMargin?: string
}

export function StaggerGroup({
  children,
  delayChildren = 0,
  once = true,
  stagger = motionTiming.stagger,
  trigger = 'load',
  viewportMargin = motionViewport.margin,
  ...props
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : delayChildren,
      },
    },
  }

  return (
    <motion.div
      initial={reduceMotion ? undefined : 'hidden'}
      animate={trigger === 'load' ? 'visible' : undefined}
      whileInView={!reduceMotion && trigger === 'view' ? 'visible' : undefined}
      viewport={trigger === 'view' ? { once, margin: viewportMargin } : undefined}
      variants={reduceMotion ? undefined : variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = HTMLMotionProps<'div'> & {
  variant?: RevealVariant
}

export function StaggerItem({
  children,
  transition,
  variant = 'revealUp',
  ...props
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? undefined : motionVariants[variant]}
      transition={{
        duration: reduceMotion ? 0 : motionTiming.baseDuration,
        ease: motionTiming.ease,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

