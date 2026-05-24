'use client'
import Ruler from '@/components/daw/Ruler'
import RollingText from '@/components/motion/RollingText'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'

const cases = [
  {
    id:        '01',
    name:      'Case_01',
    type:      'SACEM · Autoproduction',
    structure: 'Nicolas · artiste autoproduit',
    lieu:      'Janvier',
    dispositif:'SACEM — Aide à l’autoproduction',
    montant:   '5 000 €',
    context:   (
      <>
        Nicolas avait un excellent projet musical entre les mains, mais face aux grilles de la SACEM, son récit artistique s&apos;éparpillait. Le stress de devoir justifier précisément l&apos;utilisation de l&apos;aide risquait de faire capoter un dossier pourtant parfaitement légitime.
        <br /><br />
        Nous n&apos;avons pas changé son projet, nous l&apos;avons simplement &quot;traduit&quot;. En restructurant son calendrier et en verrouillant la logique de son budget prévisionnel pour qu&apos;il coche exactement les attentes du jury, le doute a laissé place à la validation.
      </>
    ),
    result:    "Le dossier, devenu ultra-lisible, est passé du premier coup.",
    tag:       'Obtenu',
    armed:     true,
  },
  {
    id:        '02',
    name:      'Case_02',
    type:      'Département · Projet culturel',
    structure: 'Association culturelle',
    lieu:      'Avril',
    dispositif:'Département — Financement de projet culturel',
    montant:   '15 000 €',
    context:   (
      <>
        Cette association faisait un travail remarquable de terrain, avec des ateliers et résidences pour les publics éloignés de la culture. Le problème ? Leur dossier ressemblait à une note d&apos;intention très (trop) passionnée, et manquait des indicateurs d&apos;impact territorial qu&apos;attendent les élus du Département.
        <br /><br />
        Nous avons transformé cette passion en &quot;preuve institutionnelle&quot; via un cadrage stratégique des objectifs et un montage budgétaire prouvant la viabilité de l&apos;action.
      </>
    ),
    result:    "L'association a enfin obtenu la reconnaissance financière à la hauteur de son travail.",
    tag:       'Financé',
    armed:     false,
  },
  {
    id:        '03',
    name:      'Case_03',
    type:      'CNM · Édition',
    structure: 'Éditeur musical',
    lieu:      'Mai',
    dispositif:'CNM — Aide éditoriale',
    montant:   '4 471 €',
    context:   (
      <>
        Pour un éditeur, le temps c&apos;est du catalogue. Le dossier d&apos;aide éditoriale du CNM est redouté pour sa précision chirurgicale. Face à la charge mentale exigée pour justifier la moindre dépense et projeter un calendrier au cordeau, le risque d&apos;abandon (et donc de perte financière) était énorme.
        <br /><br />
        Nous avons pris le relais sur toute cette mécanique institutionnelle : mise en cohérence du projet, construction de l&apos;argumentaire et alignement millimétré du budget.
      </>
    ),
    result:    "L'éditeur est resté concentré sur le développement de ses artistes, tout en sécurisant cette enveloppe vitale.",
    tag:       'Obtenu',
    armed:     false,
  },
]

export default function Resultats() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Résultats" playheadDuration={24} playheadDelay={-10} />

      <Track name="Résultats" type="Cas anonymisés" armed contentClassName="!py-12 !px-12 !items-start">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">Cas clients anonymisés</span>
            <h2 className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] text-black" style={{ fontSize: 'var(--fs-h2)' }}>
              Cas concrets.<br />
              Montants réels.
            </h2>
          </div>
          <div className="border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.4rem] tracking-[0.16em] uppercase text-dim mb-3">Lecture</p>
            <p className="font-body text-soft text-[0.95rem] leading-[1.82]">
              Structures anonymisées. Dispositifs, contextes et résultats réels pour donner un niveau de preuve plus lisible et plus crédible.
            </p>
          </div>
        </div>
      </Track>

      {cases.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.09}>
          <Track
            name={`Cas ${c.id}`}
            type={c.type}
            armed={c.armed}
            contentClassName="!flex-col !items-start !gap-0 !p-0"
            className="group transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="w-full grid border-b border-rule lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="px-12 py-9">
                <div className="flex items-baseline gap-5 mb-5">
                  <span className="font-cond font-black text-rule-dark leading-none tracking-[-0.03em]" style={{ fontSize: 'var(--fs-h3)' }}>
                    {c.id}
                  </span>
                  <div>
                    <span className="font-cond font-extrabold uppercase text-black text-[1.08rem] tracking-[0.08em]">{c.structure}</span>
                    <span className="font-mono text-[0.4rem] tracking-[0.16em] uppercase text-dim ml-3">{' · '}{c.lieu}</span>
                  </div>
                  <span className="ml-auto font-mono text-[0.4rem] tracking-[0.16em] uppercase text-accent rounded-full border border-[rgba(200,82,50,0.22)] bg-[rgba(200,82,50,0.08)] px-3 py-1.5">{c.tag}</span>
                </div>
                <p className="font-mono text-[0.4375rem] tracking-[0.16em] uppercase text-dim mb-4">{c.dispositif}</p>
                <p className="font-body text-soft text-[0.96rem] leading-[1.9] max-w-xl">{c.context}</p>
              </div>
              <div
                className="flex flex-col justify-between px-10 py-9 border-l border-rule"
                style={{ background: 'var(--surface-2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}
              >
                <div>
                  <span className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-2 block">Montant obtenu</span>
                  <span className="font-cond font-black text-black leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(2.1rem, 3.4vw, 3rem)' }}>
                    {c.montant}
                  </span>
                </div>
                <div className="pt-8">
                  <span className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim block mb-2">Type de structure</span>
                  <span className="font-body text-[0.92rem] leading-[1.65] text-ink">
                    {c.structure}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-3 px-12 py-4 bg-[var(--accent-dim)]">
              <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
              <p className="font-body text-ink text-[0.89rem] leading-[1.8]">{c.result}</p>
            </div>
          </Track>
        </Reveal>
      ))}

      <Track name="Autres cas" type="En cours" contentClassName="!py-6 !px-12 !gap-6">
        <div className="flex-1">
          <p className="font-body text-soft text-sm">D'autres cas sont en cours de documentation et d'anonymisation.</p>
        </div>
        <a href="/resultats" className="font-cond font-bold text-[0.5625rem] tracking-[0.16em] uppercase text-accent hover:underline">
          <RollingText text="Voir tous les résultats →" animateOnHover={false} />
        </a>
      </Track>
    </section>
  )
}
