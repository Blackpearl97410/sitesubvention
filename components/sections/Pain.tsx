'use client'
import Ruler from '@/components/daw/Ruler'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'

const pains = [
  {
    id: '01', name: 'Aides', type: 'À activer', tag: 'Coût d\'opportunité',
    title: 'Tu as arrêté de candidater',
    body: 'Une semaine bloquée pour un dossier. Six mois d\'attente. Un refus sans explication. À un moment, le ratio temps/résultat ne tient plus — et chaque année d\'absence, c\'est des milliers d\'euros qui restent dans l\'enveloppe.',
  },
  {
    id: '02', name: 'Projet', type: 'À clarifier', tag: 'Institutionnel',
    title: 'Le langage des financeurs n\'est pas le tien',
    body: 'Tu connais ton projet mieux que quiconque. Mais le traduire dans le langage attendu par un instructeur CNM — argumentaire structuré, cohérence budgétaire, logique de financement — c\'est un exercice à part entière.',
  },
  {
    id: '03', name: 'Dispositifs', type: 'À cibler', tag: 'Veille',
    title: 'La charge de veille est invisible mais réelle',
    body: 'Les critères changent, les enveloppes se ferment, les nouveaux dispositifs émergent. Rester à jour sur tous les guichets pertinents, c\'est un travail à plein temps que personne ne fait vraiment.',
  },
  {
    id: '04', name: 'Dossier', type: 'À déposer', tag: 'Qualité',
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
            contentClassName="!flex-col !items-start !gap-0 !px-5 !py-0 md:!px-12"
            className="group transition-transform duration-300 hover:-translate-y-0.5"
          >
            <details className="w-full py-6" open={i === 0}>
              <summary className="grid cursor-pointer list-none gap-4 lg:grid-cols-[84px_minmax(0,1fr)_220px] lg:items-center">
                <span className="font-cond font-black leading-none text-rule-dark transition-colors group-hover:text-accent"
                  style={{ fontSize: 'var(--fs-h3)', letterSpacing: '-0.04em' }}>
                  {p.id}
                </span>
                <h3 className="font-cond font-extrabold uppercase text-black leading-[0.98] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.35rem, 2.1vw, 2rem)' }}>
                  {p.title}
                </h3>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-rule bg-[var(--surface-2)] px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim transition-colors group-hover:text-accent lg:justify-self-end">
                  {p.tag}
                </span>
              </summary>
              <p className="mt-5 max-w-[760px] font-body text-[0.96rem] leading-[1.85] text-soft lg:ml-[84px]">
                {p.body}
              </p>
            </details>
          </Track>
        </Reveal>
      ))}

    </section>
  )
}
