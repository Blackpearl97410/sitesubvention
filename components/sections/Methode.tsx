'use client'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import RollingText from '@/components/motion/RollingText'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'

const steps = [
  {
    id:       '01',
    name:     'Diagnostic',
    type:     'Cadrage',
    label:    'Diagnostic',
    title:    "On identifie les aides activables.",
    body:     "On part de ton projet, de ta structure, de ton calendrier et de tes pièces disponibles. L'objectif : distinguer les dispositifs crédibles des fausses pistes, puis choisir le bon angle de dossier.",
    duration: '20 min à 1 session',
    armed:    true,
  },
  {
    id:       '02',
    name:     'Montage',
    type:     'Dossier et budget',
    label:    'Montage',
    title:    "Je transforme ton projet en dossier finançable.",
    body:     "Je structure l'argumentaire, clarifie les objectifs, rends le budget cohérent et adapte le langage au guichet ciblé. Tu fournis les éléments factuels et tu valides les orientations clés.",
    duration: '1 à 3 semaines par dossier',
    armed:    false,
  },
  {
    id:       '03',
    name:     'Dépôt',
    type:     'Suivi',
    label:    'Suivi',
    title:    "On sécurise le dépôt et la suite.",
    body:     "Je prépare les éléments de dépôt, contrôle les pièces, traite les demandes complémentaires et analyse la réponse. Si le dossier est accepté, on anticipe les obligations et les prochains guichets.",
    duration: 'Jusqu’à la réponse',
    armed:    false,
  },
]

export default function Methode() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Méthode" playheadDuration={20} playheadDelay={-5} />

      <Track name="Méthode" type="3 étapes" armed contentClassName="!py-10 !px-12 !gap-12 !items-end">
        <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent flex-shrink-0">Process simple</span>
        <h2 className="font-cond font-black uppercase leading-[0.95] tracking-[-0.01em] text-black" style={{ fontSize: 'var(--fs-h2)' }}>
          Comment<br />ça fonctionne.
        </h2>
        <p className="ml-auto max-w-[320px] font-body font-light text-soft text-[0.92rem] leading-[1.85] pl-8 border-l border-rule">
          Les 3 étapes exactes de l'accompagnement : diagnostic, montage, dépôt et suivi.
        </p>
      </Track>

      {steps.map((s, i) => (
        <Reveal key={s.id} delay={i * 0.1}>
          <Track
            name={s.name}
            type={s.type}
            armed={s.armed}
            contentClassName="!py-12 !px-12 !gap-14 !items-start"
            className="group transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex flex-col items-start gap-2 flex-shrink-0 w-24">
              <span className="font-cond font-black text-black leading-none tracking-[-0.04em] group-hover:text-accent transition-colors" style={{ fontSize: 'clamp(3.2rem, 5vw, 5.4rem)' }}>
                {s.id}
              </span>
              <span className="font-mono text-[0.4rem] tracking-[0.18em] uppercase text-accent">{s.label}</span>
            </div>
            <div className="w-px self-stretch bg-rule flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-4 pt-1">
              <h3 className="font-cond font-extrabold uppercase text-black leading-[0.98] tracking-[-0.02em]" style={{ fontSize: 'clamp(1.4rem, 2.25vw, 2rem)' }}>
                {s.title}
              </h3>
              <p className="font-body font-light text-soft text-[0.98rem] leading-[1.9] max-w-xl">{s.body}</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-2 pt-1 rounded-[18px] border border-rule px-5 py-4" style={{ background: 'var(--surface-2)' }}>
              <span className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim">Durée indicative</span>
              <span className="font-mono text-[0.4375rem] tracking-[0.12em] uppercase text-soft">{s.duration}</span>
            </div>
          </Track>
        </Reveal>
      ))}

      <Track name="En détail" type="Page méthode" contentClassName="!py-5 !px-12">
        <Link href="/comment-ca-fonctionne" className="font-cond font-bold text-[0.5625rem] tracking-[0.16em] uppercase text-accent hover:underline">
          <RollingText text="Voir la méthode en détail →" animateOnHover={false} />
        </Link>
      </Track>
    </section>
  )
}
