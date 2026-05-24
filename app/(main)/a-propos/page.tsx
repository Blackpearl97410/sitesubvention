import type { Metadata } from 'next'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import Track from '@/components/daw/Track'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'À propos de Dossier Studio et Alexandre Paviel',
  description:
    "Dossier Studio accompagne labels, artistes, éditeurs, associations et structures culturelles dans le montage de dossiers d'aides et subventions.",
  path: '/a-propos',
  keywords: ['Alexandre Paviel Dossier Studio', 'consultant subventions culturelles', 'accompagnement artistes labels'],
})

export default function Page() {
  return (
    <section style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <Ruler label="À propos" playheadDuration={18} />

      <Track name="À propos" type="Positionnement" armed contentClassName="!py-16 !px-12 !items-start">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">
              Dossier Studio
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.88] tracking-[-0.04em] text-black max-w-[920px]"
              style={{ fontSize: 'var(--fs-hero)' }}
            >
              Entre matière artistique
              <br />
              et dossier défendable.
            </h1>
            <p className="font-body text-[1.04rem] leading-[1.9] text-soft max-w-[760px]">
              Dossier Studio accompagne les acteurs musicaux francophones qui ont de la matière, des
              projets, parfois de vraies opportunités de financement, mais plus le temps de traduire
              cela en dossiers clairs, cohérents et finançables.
            </p>
          </div>
          <div className="border-l border-rule-dark pl-8 pt-1">
            <p className="font-mono text-[0.4rem] tracking-[0.16em] uppercase text-dim mb-3">Repères</p>
            <div className="space-y-3">
              {[
                'Alexandre Paviel',
                'France & La Réunion',
                'Secteur musical francophone',
                '13 dossiers lancés depuis janvier 2026',
              ].map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.8] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Track>

      <Track name="Posture" type="Lecture · Posture" contentClassName="!py-10 !px-12 !items-start">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-[760px]">
            <p className="font-mono text-[0.4rem] tracking-[0.16em] uppercase text-accent mb-3">
              Comment je travaille
            </p>
            <p className="font-body text-[0.98rem] leading-[1.9] text-soft">
              Je ne vends pas une promesse vague de “subvention obtenue”. Le travail consiste à
              cadrer, hiérarchiser, rédiger, rendre le budget crédible et adapter le projet au langage
              attendu par chaque financeur. Le bon rôle est souvent moins de “remplir un dossier” que
              de remettre de l&apos;ordre dans une demande qui risquait de rester à l&apos;arrêt.
            </p>
          </div>
          <div className="border-l border-rule-dark pl-8">
            <p className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-3">
              Fil rouge
            </p>
            <p className="font-cond font-bold uppercase leading-[1.05] tracking-[0.04em] text-black text-[1.2rem]">
              De l&apos;idée artistique
              <br />
              au dossier finançable.
            </p>
          </div>
        </div>
      </Track>

      <Track name="Valeur" type="Ce que ça change" contentClassName="!px-0 !py-0 !gap-0 !items-stretch">
        <div className="grid w-full lg:grid-cols-3">
          <div className="border-r border-rule px-10 py-10">
            <p className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-4">
              Ce que ça change
            </p>
            <div className="space-y-3">
              {[
                'Moins de charge mentale sur la veille et la rédaction',
                'Des demandes plus cohérentes et plus lisibles',
                'Un meilleur arbitrage entre les aides à tenter et celles à écarter',
              ].map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="border-r border-rule px-10 py-10">
            <p className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-4">
              Pour qui
            </p>
            <div className="space-y-3">
              {[
                'Labels et éditeurs musicaux',
                'Producteurs, studios et managers',
                'Artistes, associations et structures culturelles',
              ].map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="px-10 py-10" style={{ background: 'var(--surface-2)' }}>
            <p className="font-mono text-[0.375rem] tracking-[0.16em] uppercase text-dim mb-4">
              Dispositifs fréquents
            </p>
            <div className="space-y-3">
              {[
                'CNM',
                'SPEDIDAM',
                'ADAMI',
                'SACEM',
                'Régions, DAC, collectivités et appels à projets',
              ].map((item) => (
                <p key={item} className="font-body text-[0.95rem] leading-[1.75] text-soft">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Track>

      <Track name="Diagnostic" type="Vérifier ton projet" contentClassName="!py-8 !px-12 !gap-6">
        <div className="flex-1">
          <p className="font-cond font-bold uppercase tracking-[0.08em] text-black text-[0.95rem] mb-2">
            Le plus simple reste de regarder ton cas concret.
          </p>
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft max-w-[700px]">
            Un diagnostic permet de voir rapidement si ton projet relève d&apos;une relance, d&apos;un montage
            complet ou d&apos;une simple relecture stratégique.
          </p>
        </div>
        <Link
          href="/diagnostic"
          className="font-cond font-bold text-[0.625rem] tracking-[0.16em] uppercase text-white px-8 py-4"
          style={{ background: 'linear-gradient(135deg, var(--accent), #d86a47)', boxShadow: '0 18px 40px rgba(200,82,50,0.18)' }}
        >
          Démarrer le diagnostic →
        </Link>
      </Track>
    </section>
  )
}
