'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { motionTiming } from '@/lib/tokens'
import { proofStats, territoryLabel } from '@/lib/site'

const creds = [
  { num: String(proofStats.dossiersLances), unit: 'dossiers', lbl: 'lancés depuis jan. 2026' },
  { num: String(proofStats.structuresAccompagnees), unit: 'structures', lbl: 'artistes & labels accompagnés' },
  { num: String(proofStats.tauxReussite), unit: '%', lbl: 'de taux de réussite' },
  { num: String(proofStats.territoires), unit: 'territoires', lbl: territoryLabel },
]

const logos = [
  { name: 'CNM', src: '/logos-institutions/optimized/cnm.png' },
  { name: 'SPEDIDAM', src: '/logos-institutions/optimized/spedidam.png' },
  { name: 'ADAMI', src: '/logos-institutions/optimized/adami.png' },
  { name: 'SACEM', src: '/logos-institutions/optimized/sacem.png' },
  { name: 'SCPP', src: '/logos-institutions/optimized/scpp.png' },
  { name: 'SPPF', src: '/logos-institutions/optimized/sppf.png' },
  { name: 'DAC', src: '/logos-institutions/optimized/dac.png' },
  { name: 'Région', src: '/logos-institutions/optimized/region.png' },
  { name: 'Collectivité', src: '/logos-institutions/optimized/collectivite.png' },
]

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const start = performance.now()
    const duration = 1600
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.round(ease * target) + suffix
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, target, suffix])

  return <span ref={ref}>{target}{suffix}</span>
}

export default function Credibilite() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Track name="Preuves" type="Chiffres réels" armed contentClassName="credibility-stats-track !p-0 !gap-0">
        <StaggerGroup className="contents" viewportMargin="-40px" stagger={0.07}>
          {creds.map((c, i) => (
            <StaggerItem
              key={i}
              className="credibility-stat flex-1 flex flex-col justify-center px-8 py-6 border-r border-rule last:border-r-0"
              variant="revealSoft"
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-cond font-black text-black leading-none tracking-[-0.02em]"
                  style={{ fontSize: 'var(--fs-stat)' }}>
                  <CountUp target={parseInt(c.num)} suffix={c.unit === '%' ? '' : ''} />
                </span>
                <span className="font-mono text-[0.75rem] tracking-[0.12em] uppercase text-accent">{c.unit}</span>
              </div>
              <span className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-dim leading-[1.6]">
                {c.lbl}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Track>

      <Track name="Guichets" type="Aides travaillées" contentClassName="!px-8 !py-6 !gap-5 !flex-col !items-start">
        <Reveal trigger="view" variant="fadeOnly" className="w-full">
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-16 bg-accent" />
              <p className="font-mono text-[0.75rem] tracking-[0.12em] uppercase text-dim">
                Dispositifs et institutions fréquemment travaillés
              </p>
            </div>

            <StaggerGroup
              trigger="view"
              viewportMargin="-24px"
              stagger={0.05}
              className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {logos.map((logo, index) => (
                <StaggerItem key={logo.name} variant="revealScale">
                  <motion.div
                    className="group relative overflow-hidden rounded-[28px] px-6 py-5"
                    style={{
                      minHeight: 104,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.01,
                            boxShadow: '0 30px 54px rgba(0,0,0,0.22)',
                          }
                    }
                    transition={{ duration: motionTiming.fastDuration, ease: motionTiming.ease }}
                  >
                    <span className="absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.025))]" />
                    <span className="absolute inset-0 rounded-[28px] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.12),0_20px_36px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.03)]" />
                    <span
                      className="absolute inset-[1px] rounded-[27px]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(243,241,234,0.3), rgba(231,226,216,0.14))',
                        backdropFilter: 'blur(26px) saturate(155%)',
                        WebkitBackdropFilter: 'blur(26px) saturate(155%)',
                      }}
                    />
                    <span className="absolute inset-[1px] rounded-[27px] bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.08),transparent_24%)]" />
                    <span className="pointer-events-none absolute inset-[1px] rounded-[27px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.12),transparent_26%)]" />
                    <motion.span
                      className="absolute left-0 top-0 h-full w-[3px] rounded-l-[28px] bg-accent"
                      initial={{ scaleY: 0, transformOrigin: 'top' }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: '-24px' }}
                      transition={{ duration: motionTiming.slowDuration, ease: motionTiming.ease }}
                    />

                    <div className="relative z-10 flex min-h-[174px] flex-col items-center justify-center gap-6 text-center">
                      <div
                        className="relative flex min-h-[104px] items-center justify-center"
                        style={{ perspective: 900 }}
                      >
                        <span className="absolute bottom-0 h-3 w-20 rounded-full bg-black/20 blur-md" />
                        <motion.div
                          className="relative flex h-24 w-24 items-center justify-center rounded-full"
                          style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: '50% 50%',
                            filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.24))',
                          }}
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  rotateY: [0, 0, 180, 180, 360, 360],
                                }
                          }
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  scale: 1.08,
                                  y: -2,
                                }
                          }
                          transition={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  rotateY: {
                                    duration: 9.5 + index * 0.4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: index * 0.55,
                                    times: [0, 0.18, 0.42, 0.62, 0.86, 1],
                                  },
                                  scale: { duration: motionTiming.fastDuration, ease: motionTiming.ease },
                                  y: { duration: motionTiming.fastDuration, ease: motionTiming.ease },
                                }
                          }
                        >
                          <span
                            className="pointer-events-none absolute inset-0 rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.34),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0))] opacity-60"
                            style={{ transform: 'translateZ(4px)' }}
                          />
                          <img
                            src={logo.src}
                            alt={logo.name}
                            className="relative z-10 max-h-24 w-auto object-contain opacity-100 grayscale-0"
                            loading="lazy"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'translateZ(8px)',
                            }}
                          />
                          <img
                            src={logo.src}
                            alt=""
                            aria-hidden="true"
                            className="absolute z-10 max-h-24 w-auto object-contain opacity-100 grayscale-0"
                            loading="lazy"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg) translateZ(8px)',
                            }}
                          />
                          <span
                            className="absolute inset-1 rounded-full border border-black/25 bg-[linear-gradient(135deg,rgba(38,33,28,0.38),rgba(255,255,255,0.08))]"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'translateZ(-5px) rotateY(180deg)',
                            }}
                          />
                        </motion.div>
                      </div>

                      <LiquidGlassButton
                        size="md"
                        className="cursor-default pointer-events-none"
                        contentClassName="font-mono text-[#2a2722]"
                      >
                        {logo.name}
                      </LiquidGlassButton>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>
      </Track>
    </section>
  )
}
