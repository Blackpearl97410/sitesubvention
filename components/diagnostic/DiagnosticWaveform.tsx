'use client'

import { motion, useReducedMotion } from 'framer-motion'

const bars = Array.from({ length: 64 }, (_, index) => {
  const base = Math.abs(Math.sin(index * 0.34) * Math.cos(index * 0.18))
  return {
    id: index,
    left: `${(index / 63) * 100}%`,
    height: 28 + base * 148,
    duration: 2.4 + (index % 5) * 0.22,
    delay: index * 0.035,
  }
})

export default function DiagnosticWaveform() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 18%, rgba(0,0,0,0.9) 72%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 18%, rgba(0,0,0,0.9) 72%, transparent 100%)',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,82,50,0.16),transparent_22%),radial-gradient(circle_at_top_right,rgba(200,82,50,0.08),transparent_24%)]" />

      <div className="absolute inset-x-0 bottom-0 top-[26%]">
        <div
          className="absolute inset-x-8 bottom-12 h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(23,21,20,0.04) 0%, rgba(200,82,50,0.45) 28%, rgba(200,82,50,0.22) 68%, rgba(23,21,20,0.03) 100%)',
            boxShadow: '0 0 22px rgba(200,82,50,0.18)',
          }}
        />

        <div className="absolute inset-x-8 bottom-0 top-0">
          {bars.map((bar) => (
            <motion.span
              key={bar.id}
              className="absolute bottom-0 w-[8px] rounded-full"
              style={{
                left: bar.left,
                marginLeft: '-4px',
                background:
                  'linear-gradient(180deg, rgba(200,82,50,0.95) 0%, rgba(200,82,50,0.42) 56%, rgba(200,82,50,0.08) 100%)',
                boxShadow: '0 0 18px rgba(200,82,50,0.14)',
              }}
              initial={
                reduceMotion
                  ? false
                  : {
                      height: bar.height * 0.62,
                      opacity: 0.44,
                    }
              }
              animate={
                reduceMotion
                  ? {
                      height: bar.height * 0.82,
                      opacity: 0.72,
                    }
                  : {
                      height: [bar.height * 0.62, bar.height, bar.height * 0.76],
                      opacity: [0.32, 0.92, 0.46],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: bar.duration,
                      delay: bar.delay,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                    }
              }
            />
          ))}
        </div>

        <motion.div
          className="absolute inset-x-10 bottom-[92px] h-[2px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(23,21,20,0) 0%, rgba(200,82,50,0.7) 22%, rgba(200,82,50,0.28) 70%, rgba(23,21,20,0) 100%)',
            filter: 'blur(0.8px)',
          }}
          initial={reduceMotion ? false : { scaleX: 0.86, opacity: 0.34 }}
          animate={reduceMotion ? { scaleX: 1, opacity: 0.5 } : { scaleX: [0.86, 1, 0.92], opacity: [0.24, 0.58, 0.28] }}
          transition={reduceMotion ? undefined : { duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
