'use client'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import RollingText from '@/components/motion/RollingText'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'
import ContactAtmosphere from '@/components/sections/ContactAtmosphere'

const situations = [
  {
    id:        '01',
    name:      'Découverte',
    type:      'Premier dossier',
    situation: "Tu n'as jamais déposé de dossier",
    desc:      "On part de zéro. Identification des dispositifs pertinents, calendrier des dépôts, premier dossier monté ensemble.",
    tags:      ['Audit initial', 'Veille incluse', 'Accompagnement complet'],
    armed:     true,
  },
  {
    id:        '02',
    name:      'Relance',
    type:      'Après un arrêt',
    situation: "Tu as déjà candidaté mais tu as arrêté",
    desc:      "Reprise du suivi. Analyse des refus passés, réorientation stratégique, remontée en puissance.",
    tags:      ['Analyse refus', 'Repositionnement dossier', 'Relance ciblée'],
    armed:     false,
  },
  {
    id:        '03',
    name:      'Optimisation',
    type:      'Dossiers existants',
    situation: "Tu déposes mais tu veux améliorer ton taux",
    desc:      "Relecture critique de tes dossiers existants. Renforcement de l'argumentaire, cohérence budgétaire, veille sur les dispositifs.",
    tags:      ['Relecture critique', 'Budget renforcé', 'Taux optimisé'],
    armed:     false,
  },
  {
    id:        '04',
    name:      'Volume',
    type:      'Plusieurs projets',
    situation: "Tu gères plusieurs artistes ou projets",
    desc:      "Suivi régulier. Plusieurs dossiers en parallèle, calendrier annuel des dépôts, veille continue sur l'ensemble du portefeuille.",
    tags:      ['Multi-projets', 'Calendrier annuel', 'Suivi continu'],
    armed:     false,
  },
]

export default function OffresApercu() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Offres" playheadDuration={26} playheadDelay={-12} />

      <Track name="Offres" type="Situations client" armed contentClassName="!py-12 !px-12 !items-start">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">Offres & tarifs</span>
            <h2 className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] text-black" style={{ fontSize: 'var(--fs-h2)' }}>
              Un aperçu selon<br />ta situation.
            </h2>
          </div>
          <div className="border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">Orientation</p>
            <p className="font-body text-soft text-[0.95rem] leading-[1.82]">
              Chaque projet n’appelle pas le même niveau d’accompagnement. Les premiers repères :
              diagnostic gratuit, montage dès 390 €, puis commission standard de 10% si l’aide est encaissée.
            </p>
          </div>
        </div>
      </Track>

      {situations.map((s, i) => (
        <Reveal key={s.id} delay={i * 0.08} variant="revealLeft">
          <Track
            name={s.name}
            type={s.type}
            armed={s.armed}
            contentClassName="!py-0 !px-0 !gap-0 group"
            className="transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="grid w-full lg:grid-cols-[86px_minmax(0,1fr)_220px]">
              <div className="px-12 py-10 border-r border-rule">
                <span className="font-cond font-black leading-none text-rule-dark tracking-[-0.03em] group-hover:text-accent transition-colors block" style={{ fontSize: 'var(--fs-h3)' }}>
                  {s.id}
                </span>
              </div>
              <div className="px-12 py-10 flex flex-col gap-5">
                <h3 className="font-cond font-extrabold uppercase text-black leading-[0.96] tracking-[-0.03em]" style={{ fontSize: 'clamp(1.38rem, 2.15vw, 2rem)' }}>
                  {s.situation}
                </h3>
                <p className="font-body text-soft text-[0.96rem] leading-[1.9] max-w-xl">{s.desc}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {s.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-2 rounded-full border border-rule bg-[var(--surface-2)] px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-10 py-10 border-l border-rule flex items-end justify-between lg:flex-col lg:items-end lg:justify-between" style={{ background: 'var(--surface-2)' }}>
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">Situation</span>
                <span className="font-cond font-bold text-[0.5625rem] tracking-[0.18em] uppercase text-rule-dark group-hover:text-accent transition-colors group-hover:translate-x-1">→ Explorer</span>
              </div>
            </div>
          </Track>
        </Reveal>
      ))}

      <Track
        name="Orientation"
        type="Diagnostic"
        hideLabel
        contentClassName="!relative !overflow-hidden !py-8 !px-8 sm:!px-12 !gap-6"
      >
        <ContactAtmosphere compact className="opacity-40" />
        <div className="relative z-10 flex flex-1 flex-col gap-2">
          <span className="font-mono text-[0.4375rem] uppercase tracking-[0.16em] text-accent">
            Choisir la bonne entrée
          </span>
          <p className="font-body text-soft text-[1rem] leading-[1.75] max-w-[760px]">
            Tu ne sais pas encore dans quelle case tu te situes ? Le diagnostic permet de trier
            rapidement le bon niveau d’accompagnement.
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row">
          <LiquidGlassButton href="/diagnostic" warm size="lg" className="flex-shrink-0" contentClassName="text-white">
            <RollingText text="Diagnostic gratuit →" animateOnHover={false} />
          </LiquidGlassButton>
        </div>
      </Track>
    </section>
  )
}
