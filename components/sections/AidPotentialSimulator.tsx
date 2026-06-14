'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import RollingText from '@/components/motion/RollingText'

const projectTypes = [
  { value: 'single', label: 'Single / EP', rate: 0.22 },
  { value: 'album', label: 'Album / production', rate: 0.3 },
  { value: 'live', label: 'Diffusion / tournée', rate: 0.26 },
  { value: 'structure', label: 'Structuration', rate: 0.34 },
] as const

const budgetSteps = [5000, 10000, 15000, 25000, 40000, 60000] as const

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export default function AidPotentialSimulator() {
  const [budget, setBudget] = useState<number>(15000)
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]['value']>('album')

  const selectedProject = projectTypes.find((type) => type.value === projectType) ?? projectTypes[1]
  const estimate = useMemo(() => {
    const mid = Math.round((budget * selectedProject.rate) / 500) * 500
    return {
      low: Math.max(1500, Math.round((mid * 0.75) / 500) * 500),
      high: Math.round((mid * 1.35) / 500) * 500,
    }
  }, [budget, selectedProject.rate])

  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Simulation" playheadDuration={22} playheadDelay={-8} />

      <Track name="Potentiel" type="Estimation rapide" armed contentClassName="!items-stretch !gap-0 !p-0 !flex-col lg:!flex-row">
        <div className="flex flex-1 flex-col gap-6 px-5 py-8 md:px-12 md:py-10">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">
              Simulateur express
            </span>
            <h2
              className="font-cond font-black uppercase leading-[0.92] tracking-[-0.03em] text-black"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.4rem)' }}
            >
              Ton aide potentielle.
            </h2>
            <p className="max-w-[720px] font-body text-[0.98rem] leading-[1.85] text-soft">
              Une estimation indicative pour situer l&apos;enjeu avant diagnostic. Le montant réel dépend
              du dispositif, du calendrier, de la structure et des pièces disponibles.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,360px)]">
            <div className="space-y-5">
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="aid-budget" className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                    Budget du projet
                  </label>
                  <span className="font-cond text-[1.35rem] font-black uppercase text-black">
                    {euro.format(budget)}
                  </span>
                </div>
                <input
                  id="aid-budget"
                  type="range"
                  min={budgetSteps[0]}
                  max={budgetSteps[budgetSteps.length - 1]}
                  step={1000}
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer accent-[var(--accent)]"
                />
                <div className="mt-2 flex justify-between font-mono text-[0.625rem] uppercase tracking-[0.12em] text-dim">
                  <span>{euro.format(budgetSteps[0])}</span>
                  <span>{euro.format(budgetSteps[budgetSteps.length - 1])}</span>
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                  Type de projet
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setProjectType(type.value)}
                      className={`border px-4 py-3 text-left font-cond text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors ${
                        projectType === type.value
                          ? 'border-[var(--accent)] bg-[rgba(200,82,50,0.1)] text-accent'
                          : 'border-rule bg-[var(--surface-2)] text-soft hover:border-[var(--accent)] hover:text-accent'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 border border-rule-dark bg-[var(--surface-2)] px-6 py-6">
              <div>
                <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                  Fourchette indicative
                </p>
                <p className="font-cond text-[2.6rem] font-black uppercase leading-none tracking-[-0.03em] text-black">
                  <span className="text-accent">{euro.format(estimate.low)}</span>
                  <br />
                  {euro.format(estimate.high)}
                </p>
                <p className="mt-4 font-body text-[0.9rem] leading-[1.75] text-soft">
                  À comparer à un montage standard à partir de 390 €, avec commission uniquement
                  sur une aide accordée et encaissée.
                </p>
              </div>
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center bg-accent px-6 py-4 font-cond text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
              >
                <RollingText text="Diagnostic gratuit →" animateOnHover={false} />
              </Link>
            </div>
          </div>
        </div>
      </Track>
    </section>
  )
}
