'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${340 - i * 5 * position} -${172 + i * 7}C-${
      340 - i * 5 * position
    } -${172 + i * 7} -${286 - i * 5 * position} ${194 - i * 5} ${
      148 - i * 4 * position
    } ${304 - i * 6}C${540 - i * 4 * position} ${414 - i * 6} ${
      628 - i * 3 * position
    } ${742 - i * 7} ${628 - i * 3 * position} ${742 - i * 7}`,
    width: 0.6 + i * 0.035,
    opacity: 0.08 + i * 0.012,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="h-full w-full text-[rgba(243,241,234,0.95)]" viewBox="0 0 696 316" fill="none">
        <title>Hybrid pricing paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.35, opacity: 0.32 }}
            animate={{
              pathLength: 1,
              opacity: [0.16, 0.34, 0.16],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + path.id * 0.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const pricingPlans = [
  {
    name: "Diagnostic d'éligibilité",
    fixed: 'Gratuit',
    variable: 'Aucune commission',
    detail: "Premier tri du potentiel, recherche d'aides ciblée, statut, budget et calendrier possible.",
  },
  {
    name: 'Montage standard',
    fixed: 'À partir de 390 €',
    variable: '10% du montant encaissé',
    detail: 'Pour un dossier ciblé : relecture, structuration budgétaire, calendrier de dépôt et argumentaire.',
  },
  {
    name: 'Montage stratégique',
    fixed: 'À partir de 1 200 €',
    variable: '10 à 15% du montant encaissé',
    detail: 'Pour les dossiers plus lourds : budget à reprendre, calendrier complexe, argumentaire à renforcer.',
  },
]

export default function OffersPricingSpotlight() {
  return (
    <section className="border-b border-rule">
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111111,#1b1513_48%,#241814)]" />
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,82,50,0.2),transparent_28%),linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.42))]" />

        <div className="relative z-10 grid gap-0 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="border-r border-[rgba(243,241,234,0.14)] px-12 py-12">
            <div className="mb-9 flex flex-col gap-5">
              <span className="font-mono text-[0.75rem] tracking-[0.16em] uppercase text-accent">
                Grille tarifaire
              </span>
              <h2
                className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] text-white"
                style={{ fontSize: 'var(--fs-h2)' }}
              >
                Grille
                <br />
                tarifaire.
              </h2>
              <p className="max-w-[780px] font-body text-[1rem] leading-[1.85] text-[rgba(243,241,234,0.82)]">
                Les tarifs varient selon le niveau de cadrage, la complexité du dossier, le montant visé
                et le volume de reprise nécessaire.
              </p>
            </div>

            <div className="overflow-hidden border border-[rgba(243,241,234,0.14)] bg-[rgba(255,255,255,0.05)] backdrop-blur-xl">
              <div className="grid border-b border-[rgba(243,241,234,0.12)] bg-[rgba(255,255,255,0.05)] lg:grid-cols-[minmax(0,1fr)_190px_230px]">
                {['Accompagnement', 'Socle fixe', 'Commission'].map((head) => (
                  <p
                    key={head}
                    className="border-b border-[rgba(243,241,234,0.1)] px-6 py-4 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[rgba(243,241,234,0.62)] lg:border-b-0 lg:border-r last:border-r-0"
                  >
                    {head}
                  </p>
                ))}
              </div>
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`grid lg:grid-cols-[minmax(0,1fr)_190px_230px] ${
                    index < pricingPlans.length - 1 ? 'border-b border-[rgba(243,241,234,0.1)]' : ''
                  }`}
                >
                  <div className="px-6 py-5 lg:border-r lg:border-[rgba(243,241,234,0.1)]">
                    <p className="mb-2 font-cond text-[1rem] font-bold uppercase tracking-[0.06em] text-white">
                      {plan.name}
                    </p>
                    <p className="font-body text-[0.92rem] leading-[1.7] text-[rgba(243,241,234,0.72)]">
                      {plan.detail}
                    </p>
                  </div>
                  <div className="border-t border-[rgba(243,241,234,0.08)] px-6 py-5 lg:border-r lg:border-t-0 lg:border-[rgba(243,241,234,0.1)]">
                    <p className="font-cond text-[1.15rem] font-black uppercase leading-tight text-white">
                      {plan.fixed}
                    </p>
                  </div>
                  <div className="border-t border-[rgba(243,241,234,0.08)] px-6 py-5 lg:border-t-0">
                    <p className="font-body text-[0.96rem] leading-[1.7] text-[rgba(243,241,234,0.82)]">
                      {plan.variable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 px-10 py-12">
            <div className="space-y-6">
              <div className="border border-[rgba(243,241,234,0.12)] bg-[rgba(255,255,255,0.04)] px-6 py-6 backdrop-blur-lg">
                <p className="mb-3 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-accent">
                  Principe
                </p>
                <p className="font-body text-[1rem] leading-[1.85] text-[rgba(243,241,234,0.82)]">
                  Un fixe couvre le travail réel de montage. La part variable ne se déclenche que sur
                  une subvention accordée et encaissée.
                </p>
              </div>

              <div className="border border-[rgba(243,241,234,0.12)] bg-[rgba(255,255,255,0.04)] px-6 py-6 backdrop-blur-lg">
                <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-[rgba(243,241,234,0.6)]">
                  Exemple de logique
                </p>
                <div className="space-y-4">
                  <p className="font-cond text-[1.4rem] font-black uppercase leading-none text-white">
                    Fixe + 10 à 15%
                  </p>
                  <p className="font-body text-[0.96rem] leading-[1.7] text-[rgba(243,241,234,0.8)]">
                    Le pourcentage exact dépend du type de dossier, du montant visé, de l’urgence et du
                    niveau de reprise nécessaire.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(243,241,234,0.18)] bg-[linear-gradient(135deg,#c85232,#dc7551)] px-8 py-4 font-cond text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white shadow-[0_22px_60px_rgba(200,82,50,0.22)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_70px_rgba(200,82,50,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,241,234,0.55)]"
              >
                Vérifier mon projet
              </Link>
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-[rgba(243,241,234,0.52)]">
                Commission uniquement sur subvention accordée et encaissée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
