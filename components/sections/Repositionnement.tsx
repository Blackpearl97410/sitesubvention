'use client'
import Ruler from '@/components/daw/Ruler'
import { Reveal } from '@/components/motion/Reveal'
import Track from '@/components/daw/Track'

const points = [
  { id: 'A', label: 'Avant', text: 'Tu passes des semaines sur un dossier. Tu n\'es pas sûr du résultat. La veille prend du temps que tu n\'as pas.' },
  { id: 'B', label: 'Après', text: 'Tu valides les orientations stratégiques. Je gère le reste. Le dossier sort — cohérent, argumenté, dans les délais.' },
]

export default function Repositionnement() {
  return (
    <section style={{ borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Le constat" playheadDuration={22} playheadDelay={-8} />

      <Track name="Constat" type="Positionnement" armed contentClassName="!py-6 !gap-10">
        <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent flex-shrink-0">Ce que tu délègues</span>
        <h2 className="font-cond font-black uppercase leading-[0.95] tracking-[-0.01em] text-black"
          style={{ fontSize: 'var(--fs-h2)' }}>
          Ce que je prends<br />en charge.
        </h2>
      </Track>

      {/* Citation */}
      <Reveal transition={{ duration: 0.6 }}>
        <Track name="Témoignage" type="Terrain" contentClassName="!py-12 !flex-col !items-start !gap-4">
          <div className="w-full relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <div className="pl-7">
              <p className="font-mono text-[0.4rem] tracking-[0.14em] uppercase text-accent mb-4">
                Témoignage de terrain · Éditeur musical
              </p>
              <blockquote className="font-cond font-black uppercase text-black leading-[0.95] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)' }}>
                "J'avais arrêté de déposer des demandes. Trop chronophage. Je ne savais plus combien ça me coûtait vraiment."
              </blockquote>
            </div>
          </div>
          <p className="font-body font-light text-soft text-sm leading-[1.8] max-w-lg pl-8">
            C'est le cas le plus courant. Non pas un manque de légitimité, mais un abandon silencieux dû au coût en temps.
          </p>
        </Track>
      </Reveal>

      {/* Avant / Après */}
      {points.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.1} variant="revealSoft">
          <Track
            name={p.label}
            type={p.id === 'A' ? 'Avant accompagnement' : 'Après accompagnement'}
            armed={p.id === 'B'}
            contentClassName={`!py-8 !flex-col !items-start !gap-3 ${p.id === 'B' ? 'bg-[#F8F8F6]' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-mono text-[0.4375rem] tracking-[0.14em] uppercase ${p.id === 'B' ? 'text-accent' : 'text-dim'}`}>
                {p.id === 'A' ? 'Avant' : 'Après'}
              </span>
            </div>
            <p className="font-body font-light text-soft text-[0.9375rem] leading-[1.75] max-w-xl">
              {p.text}
            </p>
          </Track>
        </Reveal>
      ))}

      {/* Périmètre d'intervention */}
      <Track name="Périmètre" type="Ce qui peut être pris en charge" contentClassName="!py-7 !flex-wrap !gap-x-10 !gap-y-2">
        {[
          'Veille & identification des dispositifs',
          'Montage stratégique du dossier',
          'Rédaction argumentaire',
          'Cohérence & présentation budgétaire',
          'Relecture critique dossiers existants',
          'Suivi & réponse aux demandes complémentaires',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
            <span className="font-body font-light text-soft text-[0.8125rem]">{item}</span>
          </div>
        ))}
      </Track>
    </section>
  )
}
