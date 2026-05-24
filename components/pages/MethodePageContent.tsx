'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import Magnetic from '@/components/motion/Magnetic'
import MaskedLines from '@/components/motion/MaskedLines'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { BackgroundGradientAnimation } from '@/components/visual/BackgroundGradientAnimation'
import { motionTiming } from '@/lib/tokens'

const steps = [
  {
    id: '01',
    label: 'Diagnostic',
    title: 'On identifie les aides activables.',
    type: 'Cadrage',
    text: "On part de ton projet, de ta structure, de ton calendrier et de tes pièces disponibles. L'objectif est de distinguer les dispositifs crédibles des fausses pistes, puis de choisir le bon angle de dossier.",
    output: 'Aides prioritaires, niveau de potentiel, prochaines actions.',
    duration: '20 min à 1 session',
  },
  {
    id: '02',
    label: 'Montage',
    title: 'Je transforme ton projet en dossier finançable.',
    type: 'Dossier et budget',
    text: "Je structure l'argumentaire, clarifie les objectifs, rends le budget cohérent et adapte le langage au guichet ciblé. Tu fournis les éléments factuels et tu valides les orientations clés.",
    output: 'Argumentaire, budget, pièces et dossier prêts à déposer.',
    duration: '1 à 3 semaines par dossier',
  },
  {
    id: '03',
    label: 'Suivi',
    title: 'On sécurise le dépôt et la suite.',
    type: 'Dépôt et suivi',
    text: "Je prépare les éléments de dépôt, contrôle les pièces, traite les demandes complémentaires et analyse la réponse. Si le dossier est accepté, on anticipe les obligations et les prochains guichets.",
    output: 'Dépôt propre, relances suivies, suite clarifiée.',
    duration: 'Jusqu’à la réponse',
  },
]

const pageTheme = {
  paddingTop: 'var(--nav-h)',
  borderBottom: '2px solid #f3f1ea',
  background:
    'radial-gradient(circle at top right, rgba(200, 82, 50, 0.12), transparent 22%), linear-gradient(180deg, #101010 0%, #121212 36%, #151514 100%)',
  color: '#f3f1ea',
  '--track-bg': 'rgba(22, 22, 20, 0.96)',
  '--surface': 'rgba(18, 18, 18, 0.98)',
  '--surface-2': 'rgba(28, 28, 26, 0.98)',
  '--rule': 'rgba(243, 241, 234, 0.14)',
  '--rule-dark': 'rgba(243, 241, 234, 0.24)',
  '--soft': 'rgba(243, 241, 234, 0.86)',
  '--dim': 'rgba(243, 241, 234, 0.68)',
} as CSSProperties

export default function MethodePageContent() {
  return (
    <section style={pageTheme}>
      <Ruler label="Comment ça fonctionne" playheadDuration={20} />

      <Track name="Méthode" type="Process d'accompagnement" armed contentClassName="!items-start !px-12 !py-16">
        <div className="relative grid w-full gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_340px]">
          <BackgroundGradientAnimation
            interactive={false}
            size="74%"
            containerClassName="opacity-60"
            gradientBackgroundStart="rgb(16, 16, 16)"
            gradientBackgroundEnd="rgb(32, 25, 22)"
            firstColor="200, 82, 50"
            secondColor="243, 241, 234"
            thirdColor="118, 73, 58"
            fourthColor="92, 54, 46"
            fifthColor="218, 148, 118"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.18),rgba(17,17,17,0.06)_44%,rgba(17,17,17,0.5))]" />

          <Reveal trigger="view" variant="revealUp" className="relative z-10 flex flex-col gap-6">
            <span className="font-mono text-[0.75rem] tracking-[0.16em] uppercase text-accent">
              Les 3 étapes
            </span>
            <MaskedLines
              as="h1"
              className="max-w-[900px] font-cond font-black uppercase leading-[0.88] tracking-[-0.04em] text-white"
              lineClassName="pb-[0.06em]"
              style={{ fontSize: 'var(--fs-hero)' }}
              lines={['Comment', 'ça fonctionne.']}
            />
            <p className="max-w-[760px] font-body text-[1.0625rem] leading-[1.9] text-soft">
              Un accompagnement en trois étapes : on trie les bonnes aides, on transforme le projet
              en dossier clair, puis on sécurise le dépôt et le suivi.
            </p>
          </Reveal>

          <Reveal trigger="view" variant="revealRight" delay={0.08} className="relative z-10 border-l border-rule-dark pl-8 pt-1">
            <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">Promesse</p>
            <p className="font-body text-[1rem] leading-[1.85] text-soft">
              Tu restes sur les arbitrages et la matière projet. Je prends la partie chronophage,
              technique et rédactionnelle.
            </p>
          </Reveal>
        </div>
      </Track>

      <StaggerGroup trigger="view" stagger={0.09}>
        {steps.map((step, index) => (
          <StaggerItem key={step.id} variant={index % 2 === 0 ? 'revealLeft' : 'revealRight'}>
            <Track
              name={step.label}
              type={step.type}
              armed={step.id === '01'}
              contentClassName="!items-stretch !gap-0 !px-0 !py-0"
            >
              <motion.div
                className="grid w-full lg:grid-cols-[92px_220px_minmax(0,1fr)_280px]"
                whileHover={{ y: -3 }}
                transition={{ duration: motionTiming.fastDuration, ease: motionTiming.ease }}
              >
                <div className="border-r border-rule px-10 py-10">
                  <span
                    className="font-cond font-black leading-none tracking-[-0.04em]"
                    style={{ color: 'rgba(243, 241, 234, 0.42)', fontSize: 'var(--fs-h3)' }}
                  >
                    {step.id}
                  </span>
                </div>

                <div className="border-r border-rule px-10 py-10">
                  <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-accent">
                    {step.label}
                  </p>
                  <p
                    className="font-cond font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-white"
                    style={{ fontSize: 'clamp(1.2rem, 1.9vw, 1.7rem)' }}
                  >
                    {step.title}
                  </p>
                </div>

                <div className="px-10 py-10">
                  <p className="max-w-[760px] font-body text-[1rem] leading-[1.9] text-soft">{step.text}</p>
                </div>

                <div
                  className="border-l border-rule px-10 py-10"
                  style={{ background: 'linear-gradient(180deg, rgba(33, 33, 31, 0.96), rgba(26, 26, 24, 0.96))' }}
                >
                  <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                    Sortie attendue
                  </p>
                  <p className="font-body text-[0.96rem] leading-[1.75] text-soft">{step.output}</p>
                  <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim">
                    {step.duration}
                  </p>
                </div>
              </motion.div>
            </Track>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Track name="Diagnostic" type="Vérifier ton projet" contentClassName="!px-12 !py-8 !gap-6">
        <Reveal trigger="view" variant="revealLeft" className="flex-1">
          <p className="mb-2 font-cond text-[1rem] font-bold uppercase tracking-[0.08em] text-white">
            Le meilleur point de départ reste ton cas concret.
          </p>
          <p className="max-w-[680px] font-body text-[1rem] leading-[1.8] text-soft">
            Le diagnostic permet de voir rapidement si on parle d&apos;un montage complet, d&apos;une relance
            ou d&apos;une simple relecture stratégique.
          </p>
        </Reveal>

        <Reveal trigger="view" variant="revealRight" delay={0.08}>
          <Magnetic strength={8}>
            <motion.div
              whileHover={{ y: -2, boxShadow: '0 24px 54px rgba(200,82,50,0.22)' }}
              transition={{ duration: motionTiming.fastDuration, ease: motionTiming.ease }}
            >
              <LiquidGlassButton href="/diagnostic" warm size="lg" contentClassName="text-white">
                Demander un diagnostic →
              </LiquidGlassButton>
            </motion.div>
          </Magnetic>
        </Reveal>
      </Track>
    </section>
  )
}
