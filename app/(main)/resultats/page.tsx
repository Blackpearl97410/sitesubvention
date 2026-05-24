import type { Metadata } from 'next'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { BackgroundGradientAnimation } from '@/components/visual/BackgroundGradientAnimation'

const stats = [
  { value: '3', label: 'cas clients anonymisés' },
  { value: '24 471 €', label: 'financements obtenus' },
  { value: 'Jan. à mai', label: 'période des résultats présentés' },
]

const results = [
  {
    id: '01',
    structure: 'Nicolas · artiste autoproduit',
    dispositif: 'SACEM — Aide à l’autoproduction',
    amount: '5 000 €',
    issue: "Projet musical porté en autoproduction, avec un besoin de clarifier le récit artistique, le calendrier et l'utilisation précise de l'aide demandée.",
    work: "Structuration de l'argumentaire, mise en cohérence du budget, clarification des postes de dépenses et préparation des éléments attendus par le dispositif.",
    outcome: "Aide obtenue en janvier. Le dossier a permis de rendre le projet plus lisible et plus solide pour l'instruction.",
    status: 'Obtenu',
  },
  {
    id: '02',
    structure: 'Association culturelle',
    dispositif: 'Département — Financement de projet culturel',
    amount: '15 000 €',
    issue: "Projet culturel associatif à présenter de manière plus lisible : objectifs, publics visés, impact local, budget et calendrier de réalisation.",
    work: "Reformulation du projet, hiérarchisation des arguments, consolidation du budget et mise en avant de l'intérêt territorial du projet.",
    outcome: 'Financement obtenu en avril auprès du département pour accompagner la mise en œuvre du projet culturel.',
    status: 'Financé',
  },
  {
    id: '03',
    structure: 'Éditeur musical',
    dispositif: 'CNM — Aide éditoriale',
    amount: '4 471 €',
    issue: "Dossier éditorial à cadrer avec précision : cohérence du projet, justification des dépenses, calendrier et argumentaire professionnel.",
    work: "Clarification du positionnement éditorial, reprise des éléments budgétaires et rédaction d'un dossier plus direct, plus lisible et mieux justifié.",
    outcome: 'Aide éditoriale obtenue en mai pour soutenir le développement du projet.',
    status: 'Obtenu',
  },
]

export const metadata: Metadata = {
  title: 'Résultats — Dossier Studio',
  description:
    'Résultats, cas anonymisés et montants réels obtenus ou visés dans les dossiers accompagnés par Dossier Studio.',
}

export default function ResultatsPage() {
  return (
    <section style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Résultats" playheadDuration={22} />

      <Track name="Résultats" type="Cas clients anonymisés" armed contentClassName="!py-16 !px-12 !items-start">
        <div className="relative grid w-full gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_340px]">
          <BackgroundGradientAnimation
            interactive={false}
            size="72%"
            containerClassName="opacity-55"
            gradientBackgroundStart="rgb(17, 17, 17)"
            gradientBackgroundEnd="rgb(29, 24, 22)"
            firstColor="200, 82, 50"
            secondColor="243, 241, 234"
            thirdColor="116, 68, 54"
            fourthColor="92, 46, 38"
            fifthColor="186, 124, 101"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.22),rgba(17,17,17,0.06)_44%,rgba(17,17,17,0.54))]" />
          <div className="relative z-10 flex flex-col gap-6">
            <span className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
              Preuves concrètes
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.88] tracking-[-0.04em] text-black max-w-[900px]"
              style={{ fontSize: 'var(--fs-hero)' }}
            >
              Des dossiers plus clairs.
              <br />
              Des montants réels.
            </h1>
            <p className="font-body text-[1.05rem] leading-[1.9] text-soft max-w-[760px]">
              Les cas ci-dessous sont anonymisés, mais le niveau de preuve est concret : type de
              structure, dispositif, point de blocage initial, travail réalisé et résultat obtenu.
            </p>
          </div>
          <div className="relative z-10 border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">Lecture</p>
            <p className="font-body text-[0.95rem] leading-[1.8] text-soft">
              L&apos;enjeu n&apos;est pas seulement d&apos;obtenir un “oui”. Il est aussi de remettre un dossier
              qui tient vraiment la route face à un instructeur.
            </p>
          </div>
        </div>
      </Track>

      <Track name="Stats" type="Preuve · Chiffres" contentClassName="!p-0 !gap-0">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`flex-1 px-8 py-8 ${index < stats.length - 1 ? 'border-r border-rule' : ''}`}>
            <p className="font-cond font-black leading-none tracking-[-0.04em] text-black" style={{ fontSize: 'var(--fs-stat)' }}>
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim leading-[1.7]">
              {stat.label}
            </p>
          </div>
        ))}
      </Track>

      {results.map((result) => (
        <Track
          key={result.id}
          name={`Case_${result.id}`}
          type={result.dispositif}
          armed={result.status === 'Accepté'}
          contentClassName="!px-0 !py-0 !gap-0 !items-stretch"
        >
          <div className="grid w-full lg:grid-cols-[90px_minmax(0,1fr)_300px]">
            <div className="border-r border-rule px-10 py-10">
              <span
                className="font-cond font-black leading-none tracking-[-0.04em] text-rule-dark"
                style={{ fontSize: 'var(--fs-h3)' }}
              >
                {result.id}
              </span>
            </div>
            <div className="px-10 py-10">
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <p className="font-cond font-extrabold uppercase tracking-[0.08em] text-black text-[1.05rem]">
                  {result.structure}
                </p>
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-accent rounded-full border border-[rgba(200,82,50,0.22)] bg-[rgba(200,82,50,0.08)] px-3 py-1.5">
                  {result.status}
                </span>
              </div>
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-5">
                {result.dispositif}
              </p>
              <div className="space-y-5 max-w-[760px]">
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim mb-2">Point de départ</p>
                  <p className="font-body text-[0.96rem] leading-[1.85] text-soft">{result.issue}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim mb-2">Travail réalisé</p>
                  <p className="font-body text-[0.96rem] leading-[1.85] text-soft">{result.work}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim mb-2">Résultat</p>
                  <p className="font-body text-[0.96rem] leading-[1.85] text-ink">{result.outcome}</p>
                </div>
              </div>
            </div>
            <div className="border-l border-rule px-10 py-10" style={{ background: 'var(--surface-2)' }}>
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">
                Montant obtenu / visé
              </p>
              <p
                className="font-cond font-black leading-none tracking-[-0.04em] text-black"
                style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)' }}
              >
                {result.amount}
              </p>
            </div>
          </div>
        </Track>
      ))}

      <Track name="Diagnostic" type="Évaluer ton projet" contentClassName="!py-8 !px-12 !gap-6">
        <div className="flex-1">
          <p className="font-cond font-bold uppercase tracking-[0.08em] text-black text-[0.95rem] mb-2">
            Tu veux savoir ce qui est activable dans ton cas ?
          </p>
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft max-w-[680px]">
            Le diagnostic permet d&apos;estimer si ton projet relève d&apos;un vrai potentiel de financement
            ou d&apos;un simple travail préparatoire à faire d&apos;abord.
          </p>
        </div>
        <LiquidGlassButton href="/diagnostic" warm size="lg" contentClassName="text-white">
          Demander un diagnostic →
        </LiquidGlassButton>
      </Track>
    </section>
  )
}
