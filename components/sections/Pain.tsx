'use client'
import Ruler from '@/components/daw/Ruler'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'

const pains = [
  {
    id: '01', name: 'Frein 01', type: 'Abandon', tag: 'Coût d\'opportunité',
    title: 'Tu as arrêté de candidater',
    body: 'Une semaine bloquée pour un dossier. Six mois d\'attente. Un refus sans explication. À un moment, le ratio temps/résultat ne tient plus — et chaque année d\'absence, c\'est des milliers d\'euros qui restent dans l\'enveloppe.',
  },
  {
    id: '02', name: 'Frein 02', type: 'Traduction', tag: 'Institutionnel',
    title: 'Le langage des financeurs n\'est pas le tien',
    body: 'Tu connais ton projet mieux que quiconque. Mais le traduire dans le langage attendu par un instructeur CNM — argumentaire structuré, cohérence budgétaire, logique de financement — c\'est un exercice à part entière.',
  },
  {
    id: '03', name: 'Frein 03', type: 'Charge mentale', tag: 'Veille',
    title: 'La charge de veille est invisible mais réelle',
    body: 'Les critères changent, les enveloppes se ferment, les nouveaux dispositifs émergent. Rester à jour sur tous les guichets pertinents, c\'est un travail à plein temps que personne ne fait vraiment.',
  },
  {
    id: '04', name: 'Frein 04', type: 'Qualité finale', tag: 'Qualité',
    title: 'Un dossier insuffisant coûte plus qu\'un refus',
    body: '6 à 18 mois d\'attente pour un refus. Du financement manqué, parfois une relation abîmée avec un guichet. La qualité du dossier n\'est pas un détail — c\'est ce qui fait passer ou non.',
  },
]

export default function Pain() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>

      <Ruler label="Le problème" playheadDuration={20} playheadDelay={-6} />

      {/* Masthead */}
      <Track name="Problème" type="Temps perdu" armed contentClassName="!py-12 !px-12 !items-start">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">Pourquoi ça bloque</span>
            <h2 className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] text-black"
              style={{ fontSize: 'var(--fs-h2)' }}>
              Plus le temps<br />de le faire bien.
            </h2>
          </div>
          <div className="border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">Lecture</p>
            <p className="font-body text-soft text-[0.95rem] leading-[1.82]">
              Tu connais les dispositifs. Tu as peut-être déjà arrêté de candidater, non par manque de
              légitimité, mais parce que le coût en temps est devenu intenable.
            </p>
          </div>
        </div>
      </Track>

      {/* Pain tracks */}
      {pains.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.08} variant="revealSoft">
          <Track
            name={p.name}
            type={p.type}
            contentClassName={`!flex-col !items-start !gap-6 !px-12 ${i % 2 === 0 ? '!py-14' : '!py-11'}`}
            className="group transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="grid w-full gap-6 lg:grid-cols-[84px_minmax(0,1fr)_220px] lg:items-start">
              <span className="font-cond font-black leading-none text-rule-dark group-hover:text-accent transition-colors"
                style={{ fontSize: 'var(--fs-h3)', letterSpacing: '-0.04em' }}>
                {p.id}
              </span>
              <div className="flex flex-col gap-4">
                <h3 className="font-cond font-extrabold uppercase text-black leading-[0.98] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.5rem, 2.35vw, 2.2rem)' }}>
                  {p.title}
                </h3>
                <p className="font-body text-soft text-[0.98rem] leading-[1.9] max-w-[760px]">
                  {p.body}
                </p>
              </div>
              <div className="flex items-start lg:justify-end">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim group-hover:text-accent transition-colors rounded-full border border-rule bg-[var(--surface-2)] px-3 py-1.5">
                  {p.tag}
                </span>
              </div>
            </div>
          </Track>
        </Reveal>
      ))}

    </section>
  )
}
