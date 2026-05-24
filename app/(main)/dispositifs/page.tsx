import type { Metadata } from 'next'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import AidesOuvertes from '@/components/sections/AidesOuvertes'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { BackgroundGradientAnimation } from '@/components/visual/BackgroundGradientAnimation'
import { dispositifList } from '@/lib/dispositifs'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Aides musicales accompagnées : CNM, SACEM, ADAMI, SPEDIDAM',
  description:
    "Panorama des dispositifs de financement accompagnés : CNM, SPEDIDAM, ADAMI, SACEM, Régions, DAC, collectivités et appels à projets culturels.",
  path: '/dispositifs',
  keywords: ['aides musique CNM SACEM ADAMI SPEDIDAM', 'dispositifs financement musique', 'guichets subventions culturelles'],
})

export default function Page() {
  return (
    <section style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label="Dispositifs" playheadDuration={20} />

      <Track name="Dispositifs" type="Aides à activer" armed contentClassName="!py-16 !px-12 !items-start">
        <div className="relative grid w-full gap-10 overflow-hidden lg:grid-cols-[minmax(0,1fr)_320px]">
          <BackgroundGradientAnimation
            interactive={false}
            size="74%"
            containerClassName="opacity-55"
            gradientBackgroundStart="rgb(16, 16, 16)"
            gradientBackgroundEnd="rgb(31, 26, 22)"
            firstColor="200, 82, 50"
            secondColor="243, 241, 234"
            thirdColor="120, 72, 56"
            fourthColor="84, 52, 44"
            fifthColor="205, 135, 109"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.22),rgba(17,17,17,0.08)_42%,rgba(17,17,17,0.52))]" />
          <div className="relative z-10 flex flex-col gap-6">
            <span className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
              Guichets accompagnés
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.88] tracking-[-0.04em] text-black max-w-[920px]"
              style={{ fontSize: 'var(--fs-hero)' }}
            >
              Les guichets les plus
              <br />
              utiles à activer.
            </h1>
            <p className="font-body text-[1.04rem] leading-[1.9] text-soft max-w-[760px]">
              Tous les projets ne relèvent pas des mêmes financeurs. L&apos;enjeu n&apos;est pas de déposer
              partout, mais de cibler les bons dispositifs, dans le bon ordre, avec un dossier à la hauteur.
              La veille des aides ouvertes est centralisée ici pour comparer rapidement les pistes utiles.
            </p>
          </div>
          <div className="relative z-10 border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">Lecture</p>
            <p className="font-body text-[0.95rem] leading-[1.8] text-soft">
              CNM, SPEDIDAM, ADAMI, SACEM, Régions, DAC, collectivités et appels à projets : chaque
              piste implique des critères, des rythmes et des attentes différentes.
            </p>
          </div>
        </div>
      </Track>

      <AidesOuvertes />

      {dispositifList.map((dispositif) => (
        <Track
          key={dispositif.slug}
          name={dispositif.short}
          type={dispositif.title}
          armed={dispositif.slug === 'cnm'}
          contentClassName="!px-0 !py-0 !gap-0 !items-stretch"
        >
          <div className="grid w-full lg:grid-cols-[120px_minmax(0,1fr)_240px]">
            <div className="border-r border-rule px-10 py-10">
              <span
                className="font-cond font-black uppercase tracking-[-0.03em] text-rule-dark"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}
              >
                {dispositif.short}
              </span>
            </div>
            <div className="px-10 py-10">
              <h2
                className="font-cond font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-black mb-4"
                style={{ fontSize: 'clamp(1.45rem, 2.35vw, 2.2rem)' }}
              >
                {dispositif.title}
              </h2>
              <p className="font-body text-[0.98rem] leading-[1.9] text-soft max-w-[760px]">
                {dispositif.summary}
              </p>
            </div>
            <div className="border-l border-rule px-10 py-10 flex items-end justify-between lg:flex-col lg:items-end lg:justify-between" style={{ background: 'var(--surface-2)' }}>
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
                Guichet détaillé
              </p>
              <Link
                href={`/dispositifs/${dispositif.slug}`}
                className="font-cond font-bold text-[0.5625rem] tracking-[0.18em] uppercase text-accent"
              >
                → Explorer
              </Link>
            </div>
          </div>
        </Track>
      ))}

      <Track name="Diagnostic" type="Trouver le bon guichet" contentClassName="!py-8 !px-12 !gap-6">
        <div className="flex-1">
          <p className="font-cond font-bold uppercase tracking-[0.08em] text-black text-[0.95rem] mb-2">
            Tu n&apos;es pas sûr du bon guichet ?
          </p>
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft max-w-[700px]">
            Le diagnostic sert à trier les pistes crédibles, à éliminer les fausses bonnes idées et à
            définir une stratégie de dépôts réaliste.
          </p>
        </div>
        <LiquidGlassButton href="/diagnostic" warm size="lg" contentClassName="text-white">
          Demander un diagnostic →
        </LiquidGlassButton>
      </Track>
    </section>
  )
}
