import type { Metadata } from 'next'
import Link from 'next/link'
import Ruler from '@/components/daw/Ruler'
import OffersPricingSpotlight from '@/components/sections/OffersPricingSpotlight'
import Track from '@/components/daw/Track'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { BackgroundGradientAnimation } from '@/components/visual/BackgroundGradientAnimation'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { pageSeo } from '@/lib/seo'

const offers = [
  {
    id: '01',
    profile: "Tu ne sais pas par où commencer",
    title: 'Diagnostic & recherche ciblée',
    summary:
      "On clarifie ta situation, les aides crédibles à court terme et le niveau d'effort réel à prévoir avant de lancer un montage.",
    includes: [
      "Audit rapide de la structure et du projet",
      "Recherche d'aides ciblée",
      'Cartographie des dispositifs prioritaires',
      'Lecture du calendrier réaliste',
    ],
    fit: 'Pour les structures qui veulent repartir sur de bonnes bases sans se disperser.',
  },
  {
    id: '02',
    profile: 'Tu veux monter un dossier de A à Z',
    title: 'Pack montage de dossier',
    summary:
      "L'offre principale : transformer ton projet en dossier clair, cohérent, budgété et prêt à déposer.",
    includes: [
      'Relecture du dossier',
      'Structuration budgétaire',
      'Calendrier de dépôt',
      "Rédaction de l'argumentaire",
      'Contrôle des pièces à fournir',
    ],
    fit: 'Pour un dépôt précis avec enjeu financier réel.',
  },
  {
    id: '03',
    profile: 'Ton cas dépasse un seul dossier',
    title: 'Accompagnement sur devis',
    summary:
      "Certains besoins demandent un cadrage spécifique : volume, complexité, appels à projets lourds ou stratégie sur plusieurs mois.",
    includes: [
      'Stratégie multi-dossiers',
      'Veille récurrente',
      'Appels à projets complexes',
      'Accompagnement multi-artistes',
    ],
    fit: 'Pour les labels, éditeurs, associations ou structures qui gèrent plusieurs projets ou un cadre institutionnel plus lourd.',
  },
]

export const metadata: Metadata = pageSeo({
  title: "Offres d'accompagnement aux dossiers de subventions musique",
  description:
    "Diagnostic, montage complet de dossier et accompagnement sur devis pour aides CNM, SACEM, ADAMI, SPEDIDAM, collectivités et appels à projets culturels.",
  path: '/offres',
  keywords: ['consultant subventions musique', 'montage dossier CNM tarif', 'accompagnement appel à projets musique'],
})

export default function OffresPage() {
  return (
    <section style={{ paddingTop: 'var(--nav-h)', borderBottom: '2px solid var(--black)' }}>
      <BreadcrumbJsonLd items={[{ name: 'Offres', path: '/offres' }]} />
      <Ruler label="Offres" playheadDuration={18} />

      <Track name="Offres" type="Modèle d'accompagnement" armed contentClassName="!items-start !px-5 !py-12 md:!px-12 md:!py-16">
        <div className="relative grid w-full gap-10 overflow-hidden">
          <BackgroundGradientAnimation
            interactive={false}
            size="70%"
            containerClassName="opacity-55"
            gradientBackgroundStart="rgb(17, 17, 17)"
            gradientBackgroundEnd="rgb(34, 27, 23)"
            firstColor="200, 82, 50"
            secondColor="243, 241, 234"
            thirdColor="140, 77, 60"
            fourthColor="80, 48, 42"
            fifthColor="214, 145, 119"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.26),rgba(17,17,17,0.1)_42%,rgba(17,17,17,0.5))]" />
          <div className="relative z-10 flex flex-col gap-6">
            <span className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
              Tarifs & accompagnement
            </span>
            <h1
              className="font-cond font-black uppercase leading-[0.88] tracking-[-0.04em] text-black max-w-[900px]"
              style={{ fontSize: 'var(--fs-hero)' }}
            >
              Un modèle clair
              <br />
              et aligné.
            </h1>
            <p className="font-body text-[1rem] leading-[1.85] text-soft max-w-[760px] md:text-[1.05rem]">
              L&apos;accompagnement repose sur un modèle hybride : un fixe pour couvrir le travail
              d&apos;ingénierie du dossier, puis une commission uniquement si la subvention est accordée
              et encaissée.
            </p>
          </div>
        </div>
      </Track>

      <OffersPricingSpotlight />

      {offers.map((offer) => (
        <Track
          key={offer.id}
          name={`Offre ${offer.id}`}
          armed={offer.id === '02'}
          contentClassName="!px-0 !py-0 !gap-0 !items-stretch"
        >
          <div className="grid w-full lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="px-5 py-8 md:px-10 md:py-10">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-accent mb-4">
                {offer.profile}
              </p>
              <h2
                className="font-cond font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-black mb-4"
                style={{ fontSize: 'clamp(1.45rem, 2.4vw, 2.3rem)' }}
              >
                {offer.title}
              </h2>
              <p className="font-body text-[0.98rem] leading-[1.9] text-soft max-w-[760px]">
                {offer.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {offer.includes.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-rule bg-[var(--surface-2)] px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-rule px-5 py-8 md:border-l md:border-t-0 md:px-10 md:py-10" style={{ background: 'var(--surface-2)' }}>
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim mb-3">
                Pour qui
              </p>
              <p className="font-body text-[0.93rem] leading-[1.8] text-soft">{offer.fit}</p>
              {offer.title === 'Accompagnement sur devis' ? (
                <Link
                  href="/diagnostic"
                  className="mt-6 inline-flex items-center justify-center bg-accent px-6 py-3 font-cond text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
                >
                  Demander un devis →
                </Link>
              ) : null}
            </div>
          </div>
        </Track>
      ))}

      <Track name="Diagnostic" type="Choisir la bonne formule" contentClassName="!flex-col !items-stretch !gap-5 !px-5 !py-8 md:!flex-row md:!items-center md:!gap-6 md:!px-12">
        <div className="flex-1">
          <p className="font-cond font-bold uppercase tracking-[0.08em] text-black text-[0.95rem] mb-2">
            Tu hésites entre plusieurs situations ?
          </p>
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft max-w-[680px]">
            Le diagnostic sert justement à éviter de partir sur la mauvaise charge de travail ou le
            mauvais angle de dossier.
          </p>
        </div>
        <LiquidGlassButton href="/diagnostic" warm size="lg" contentClassName="text-white">
          Démarrer le diagnostic →
        </LiquidGlassButton>
      </Track>
    </section>
  )
}
