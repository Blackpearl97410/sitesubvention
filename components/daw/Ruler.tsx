'use client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface RulerProps {
  label?: string
  playheadDelay?: number
  playheadDuration?: number
  hideLabel?: boolean
}

export default function Ruler({ label = 'Session · 2025', playheadDelay = 0, playheadDuration = 16, hideLabel }: RulerProps) {
  const marksRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const yRaw = useTransform(scrollY, [0, 800], [0, -8])
  const y = useSpring(yRaw, { stiffness: 100, damping: 26, mass: 0.4 })

  useEffect(() => {
    const el = marksRef.current
    if (!el) return
    for (let i = 0; i <= 48; i++) {
      const mark = document.createElement('div')
      const isMajor = i % 8 === 0
      const isMinor = i % 4 === 0 && !isMajor
      mark.className = 'absolute flex flex-col items-center justify-end bottom-0'
      mark.style.left = `${(i / 48) * 100}%`
      if (isMajor) {
        const lbl = document.createElement('div')
        lbl.className = 'font-mono text-[0.6875rem] text-dim mb-1 leading-none'
        lbl.textContent = String(i + 1)
        mark.appendChild(lbl)
      }
      const tick = document.createElement('div')
      tick.style.width = '1px'
      tick.style.height = isMajor ? '10px' : isMinor ? '6px' : '3px'
      tick.style.background = isMajor ? 'var(--dim)' : 'var(--rule-dark)'
      mark.appendChild(tick)
      el.appendChild(mark)
    }
    return () => { el.innerHTML = '' }
  }, [])

  return (
    <motion.div
      className="sticky z-[150] flex border-b border-rule-dark"
      style={{ y, top: 'var(--nav-h)' }}
    >
      <div
        className="flex w-full border-b border-rule-dark"
        style={{
          height: 'var(--ruler-h)',
          background: 'var(--surface)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Gutter */}
        {hideLabel ? null : (
          <div
            className="daw-mobile-hidden flex-shrink-0 border-r border-rule-dark flex items-center px-5"
            style={{ width: 'var(--label-w)' }}
          >
            <span className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-dim">{label}</span>
          </div>
        )}
        {/* Track */}
        <div className="flex-1 relative overflow-hidden" ref={marksRef}>
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-px bg-accent z-10"
            style={{
              animation: `playhead-move ${playheadDuration}s linear infinite`,
              animationDelay: `${playheadDelay}s`,
              boxShadow: '0 0 14px var(--accent-glow)',
            }}
          >
            <div
              className="absolute -top-px -left-[3px] w-[7px] h-[5px] bg-accent"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
