'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import Magnetic from '@/components/motion/Magnetic'
import MaskedLines from '@/components/motion/MaskedLines'
import Parallax from '@/components/motion/Parallax'
import RollingText from '@/components/motion/RollingText'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { motionTiming } from '@/lib/tokens'
import { territoryLabel } from '@/lib/site'

const tags = ['CNM', 'SPEDIDAM', 'ADAMI', 'SACEM', 'DAC', 'Régions · État', 'Collectivités']

const ShaderAnimation = dynamic(
  () => import('@/components/visual/ShaderAnimation').then((mod) => mod.ShaderAnimation),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 68% 35%, rgba(200,82,50,0.2), transparent 26%), linear-gradient(135deg, rgba(18,18,18,0), rgba(200,82,50,0.08))',
        }}
      />
    ),
  }
)

export default function Hero() {
  const waveRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [shaderReady, setShaderReady] = useState(false)

  useEffect(() => {
    const el = waveRef.current
    if (!el || el.childElementCount > 0) return

    for (let i = 0; i < 220; i++) {
      const bar = document.createElement('div')
      const h = Math.abs(Math.sin(i * 0.35) * Math.cos(i * 0.12)) * 20 + 2
      bar.style.cssText = `width:2px;height:${h}px;background:var(--accent);border-radius:1px;opacity:0.18;flex-shrink:0`
      el.appendChild(bar)
    }
  }, [])

  useEffect(() => {
    const loadShader = () => setShaderReady(true)
    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (browserWindow.requestIdleCallback && browserWindow.cancelIdleCallback) {
      const idleId = browserWindow.requestIdleCallback(loadShader, { timeout: 1600 })
      return () => browserWindow.cancelIdleCallback?.(idleId)
    }

    const timeoutId = globalThis.setTimeout(loadShader, 900)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  return (
    <section ref={sectionRef} style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Aides musicales · 2026" playheadDuration={16} />

      <Parallax target={sectionRef} offset={14}>
        <Reveal viewportMargin="-16px" variant="fadeOnly">
          <div className="flex items-stretch border-b border-rule" style={{ height: 46, background: 'var(--paper)' }}>
            <div className="daw-mobile-hidden flex-shrink-0 border-r border-rule-dark flex items-center px-5" style={{ width: 'var(--label-w)' }}>
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-soft">Financeurs suivis</span>
            </div>
            <div className="flex-1 flex items-center px-8 gap-7 overflow-x-auto">
              {tags.map((t, i) => (
                <motion.span
                  key={t}
                  className={`font-mono text-[0.6875rem] tracking-[0.14em] uppercase whitespace-nowrap ${i === 0 ? 'text-accent' : 'text-soft'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.04, duration: 0.7, ease: motionTiming.ease }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </Parallax>

      <StaggerGroup delayChildren={0.08}>
        <StaggerItem>
          <Track name="Promesse" type="Aides non demandées" armed contentClassName="!min-h-[380px] !items-stretch !py-18 !px-12">
            <div className="relative grid w-full gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[56%] opacity-70"
                style={{
                  maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,1) 100%)',
                  WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,1) 100%)',
                  filter: 'blur(0.2px)',
                }}
              >
                {shaderReady ? <ShaderAnimation /> : null}
              </div>

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 72% 38%, rgba(200,82,50,0.12), transparent 18%), linear-gradient(90deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.16) 42%, rgba(17,17,17,0.62) 100%)',
                }}
              />

              <Parallax target={sectionRef} offset={22} className="w-full pt-7 relative before:absolute before:top-0 before:left-0 before:w-20 before:h-0.5 before:bg-accent after:absolute after:-left-6 after:top-10 after:h-36 after:w-36 after:rounded-full after:bg-[radial-gradient(circle,rgba(200,82,50,0.08),transparent_68%)] after:blur-2xl">
                <p className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-accent mb-6">
                  Point de départ
                </p>
                <MaskedLines
                  as="h1"
                  className="font-cond font-black uppercase text-black leading-[0.84] tracking-[-0.04em] max-w-[980px]"
                  lineClassName="pb-[0.08em]"
                  delay={0.18}
                  style={{ fontSize: 'var(--fs-hero)' }}
                  lines={[
                    'Tu es éligible à des aides',
                    <>que tu ne demandes <span className="text-accent">plus.</span></>,
                  ]}
                />
              </Parallax>

              <Reveal
                className="self-end border border-rule-dark rounded-[22px] px-6 py-6 relative z-10"
                style={{ background: 'var(--surface-2)', boxShadow: '0 18px 48px rgba(18,18,18,0.04)' }}
                delay={0.28}
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-4">
                  Ce qui bloque
                </p>
                <p className="font-body text-[0.98rem] leading-[1.7] text-soft">
                  Tu as déjà la matière artistique. Le problème, c'est la traduction du projet en
                  dossier clair, crédible et finançable.
                </p>
              </Reveal>
            </div>
          </Track>
        </StaggerItem>

        <StaggerItem>
          <Track name="Pour qui" type="Projet musical" contentClassName="!py-12 !px-12 !items-start">
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,300px)]">
              <Parallax target={sectionRef} offset={10} className="pt-4 relative before:absolute before:top-0 before:left-0 before:w-12 before:h-0.5 before:bg-dim">
                <p className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-dim mb-4">
                  Accompagnement
                </p>
                <p className="font-body font-normal text-ink leading-[1.7] max-w-[760px] text-[1.28rem]">
                  Je prends en charge le montage, la rédaction et la cohérence budgétaire.{' '}
                  <strong className="text-black font-medium">Tu restes concentré sur ce que tu sais faire.</strong>
                </p>
              </Parallax>

              <Reveal
                className="border-l border-rule-dark pl-6 pt-4"
                variant="revealSoft"
                delay={0.18}
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">
                  Pour qui
                </p>
                <p className="font-body text-[0.92rem] leading-[1.75] text-soft">
                  Labels, studios, producteurs, éditeurs, artistes et structures culturelles qui veulent
                  remettre de l'ordre dans leurs demandes d'aides.
                </p>
              </Reveal>
            </div>
          </Track>
        </StaggerItem>

        <StaggerItem>
          <Track name="Manque à gagner" type="Aides non demandées" armed contentClassName="!py-12 !px-12 !gap-16">
            <Parallax target={sectionRef} offset={16} className="pt-4 relative before:absolute before:top-0 before:left-0 before:w-16 before:h-0.5 before:bg-accent flex-shrink-0">
              <p className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-accent mb-4">
                Aides non demandées
              </p>
              <p
                className="font-cond font-black tracking-[-0.02em] text-black leading-none"
                style={{ fontSize: 'var(--fs-stat)' }}
              >
                <span className="text-accent">5 000</span> – 30 000 €
              </p>
            </Parallax>
            <p className="font-body font-normal text-soft text-[0.95rem] leading-[1.85] max-w-sm border-l border-rule-dark pl-8">
              Par dossier non déposé — multipliés par 2, 3, 4 ans d'absence, parce que le dossier
              prenait trop de place dans ton agenda.
            </p>
          </Track>
        </StaggerItem>
      </StaggerGroup>

      <Reveal viewportMargin="-24px" variant="fadeOnly">
        <Track name="Diagnostic" type="Premier échange" contentClassName="!py-6 !px-12 !gap-5">
          <Magnetic strength={12}>
            <motion.div
              style={{ background: 'linear-gradient(135deg, var(--accent), #d86a47)', boxShadow: '0 18px 40px rgba(200,82,50,0.2)' }}
              whileHover={{ y: -2, boxShadow: '0 24px 50px rgba(200,82,50,0.24)' }}
              transition={{ duration: motionTiming.fastDuration, ease: motionTiming.ease }}
            >
              <LiquidGlassButton href="/diagnostic" warm size="lg" contentClassName="text-white">
                <RollingText text="Parlons de ton projet" animateOnHover={false} />
              </LiquidGlassButton>
            </motion.div>
          </Magnetic>
          <Magnetic strength={10}>
            <motion.div
              className="border border-rule-dark"
              style={{ background: 'var(--surface-2)' }}
              whileHover={{ y: -2, borderColor: 'var(--accent)', backgroundColor: 'rgba(200,82,50,0.08)', boxShadow: '0 18px 40px rgba(0,0,0,0.18)' }}
              transition={{ duration: motionTiming.fastDuration, ease: motionTiming.ease }}
            >
              <Link href="/comment-ca-fonctionne" className="font-cond font-semibold text-[0.5625rem] tracking-[0.18em] uppercase text-soft px-6 py-4 transition-colors inline-flex hover:text-black">
                <RollingText text="Voir comment ça fonctionne →" animateOnHover={false} />
              </Link>
            </motion.div>
          </Magnetic>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-accent" style={{ animation: 'pulse-soft 2.5s ease-in-out infinite' }} />
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
              Disponible · {territoryLabel}
            </span>
          </div>
        </Track>
      </Reveal>

      <Reveal viewportMargin="-12px" variant="fadeOnly">
        <Track name="Suite" type="Parcours" contentClassName="!py-0 !h-10 !min-h-[40px]">
          <div ref={waveRef} className="flex items-center gap-[1.5px] w-full h-6" />
        </Track>
      </Reveal>
    </section>
  )
}
