import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'
import { pageSeo } from '@/lib/seo'

const clientLightTheme = {
  '--white': '#F7F0E4',
  '--paper': '#EFE6D7',
  '--track-bg': '#F1E8D8',
  '--surface': 'rgba(255, 251, 242, 0.96)',
  '--surface-2': 'rgba(249, 242, 229, 0.98)',
  '--black': '#181511',
  '--ink': '#24211B',
  '--soft': '#5D564C',
  '--dim': '#8B8173',
  '--rule': 'rgba(53, 45, 36, 0.14)',
  '--rule-dark': 'rgba(53, 45, 36, 0.28)',
  '--accent': '#C85232',
  '--accent-dim': 'rgba(200, 82, 50, 0.08)',
  '--accent-glow': 'rgba(200, 82, 50, 0.18)',
  '--client-bg': '#F7F0E4',
  '--client-nav': 'rgba(247, 240, 228, 0.94)',
} as CSSProperties

export const metadata: Metadata = pageSeo({
  title: 'Espace client léger pour suivi de dossier',
  description:
    "Prototype d'espace client Dossier Studio : situation actuelle, checklist des pièces, dépôt guidé, progression et suivi d'un dossier d'aide musicale.",
  path: '/espace-client',
  keywords: ['espace client dossier subvention', 'suivi dossier aides musique', 'checklist dossier CNM'],
  noIndex: true,
})

const progress = [
  { label: 'Diagnostic', state: 'Terminé' },
  { label: 'Pièces', state: 'En cours' },
  { label: 'Rédaction', state: 'À venir' },
  { label: 'Dépôt', state: 'À planifier' },
]

const requiredDocuments = [
  {
    name: 'Budget prévisionnel',
    status: 'Manquant',
    detail: 'Format tableur ou PDF accepté. Il doit faire apparaître dépenses, recettes et montant demandé.',
    priority: 'Priorité 1',
  },
  {
    name: 'Calendrier du projet',
    status: 'Manquant',
    detail: 'Dates de production, sortie, diffusion, dépôt et principaux jalons artistiques.',
    priority: 'Priorité 2',
  },
  {
    name: 'Liens artistiques',
    status: 'À vérifier',
    detail: 'Démos, clips, dossier artistique, EPK ou tout élément permettant de comprendre le projet.',
    priority: 'Priorité 3',
  },
]

const receivedDocuments = [
  ['Présentation courte', 'Reçu'],
  ['Statuts / structure', 'Reçu'],
  ['RIB', 'Reçu'],
]

const activity = [
  ['Aujourd’hui', 'Pièces budget et calendrier demandées.'],
  ['Hier', 'Diagnostic relu : piste CNM ou aide régionale à comparer.'],
  ['J-2', 'Brief projet reçu et classé dans le dossier.'],
]

export default function EspaceClientPage() {
  return (
    <section className="min-h-screen bg-[var(--client-bg)] text-black" style={clientLightTheme}>
      <BreadcrumbJsonLd items={[{ name: 'Espace client', path: '/espace-client' }]} />

      <div className="sticky top-0 z-[260] border-b border-rule-dark bg-[var(--client-nav)] backdrop-blur-xl">
        <div className="flex min-h-[76px] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/" className="font-cond text-[1.05rem] font-black uppercase tracking-[0.08em] text-black">
              Dossier<span className="text-accent">.</span>Studio
            </Link>
            <div className="hidden h-8 w-px bg-rule-dark sm:block" />
            <div>
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-dim">Dossier client</p>
              <p className="mt-1 font-cond text-[1.05rem] font-bold uppercase tracking-[0.06em] text-black">
                Sortie EP 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent">
              Pièces en attente
            </span>
            <span className="rounded-full border border-rule-dark bg-white/55 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-soft">
              3 notifications
            </span>
            <Link
              href="/"
              className="rounded-full border border-rule-dark px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim transition-colors hover:border-accent hover:text-accent"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto grid w-full max-w-[1380px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                  Situation actuelle
                </p>
                <h1
                  className="mt-5 max-w-[760px] font-cond font-black uppercase leading-[0.88] text-black"
                  style={{
                    fontFamily: 'var(--font-barlow-condensed), sans-serif',
                    fontSize: 'clamp(3rem, 5.9vw, 6.4rem)',
                    letterSpacing: 0,
                  }}
                >
                  Il manque 2 pièces pour avancer.
                </h1>
                <p className="mt-5 max-w-[720px] font-body text-[1rem] leading-[1.85] text-soft">
                  Le diagnostic est terminé. Le dossier peut passer en préparation, mais le budget et le
                  calendrier doivent être transmis avant de verrouiller le bon dispositif.
                </p>
              </div>

              <div className="border-l border-rule-dark pl-6">
                <p className="font-mono text-[0.48rem] uppercase tracking-[0.16em] text-dim">Action à faire</p>
                <p className="mt-4 font-cond text-[1.35rem] font-black uppercase tracking-[0.04em] text-black">
                  Déposer les pièces manquantes
                </p>
                <p className="mt-3 font-body text-[0.95rem] leading-[1.7] text-soft">
                  Priorité : budget prévisionnel et calendrier du projet.
                </p>
                <div className="mt-6">
                  <LiquidGlassButton href="#depot" warm size="lg" contentClassName="text-white">
                    Aller au dépôt
                  </LiquidGlassButton>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                    Documents manquants
                  </p>
                  <h2 className="mt-3 font-cond text-[2rem] font-black uppercase leading-none tracking-[0.04em] text-black">
                    À fournir maintenant
                  </h2>
                </div>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim">
                  2 requis / 1 à vérifier
                </span>
              </div>

              <div className="mt-7 space-y-4">
                {requiredDocuments.map((document) => (
                  <article key={document.name} className="border border-rule bg-white/50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-cond text-[1.15rem] font-black uppercase tracking-[0.06em] text-black">
                          {document.name}
                        </p>
                        <p className="mt-2 max-w-[680px] font-body text-[0.94rem] leading-[1.7] text-soft">
                          {document.detail}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <span className="rounded-full border border-accent/45 px-3 py-1.5 font-mono text-[0.48rem] uppercase tracking-[0.14em] text-accent">
                          {document.status}
                        </span>
                        <span className="rounded-full border border-rule-dark px-3 py-1.5 font-mono text-[0.48rem] uppercase tracking-[0.14em] text-dim">
                          {document.priority}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
              <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                Déjà reçu
              </p>
              <div className="mt-6 space-y-3">
                {receivedDocuments.map(([name, status]) => (
                  <div key={name} className="flex items-center justify-between border-b border-rule pb-3 last:border-b-0">
                    <span className="font-body text-[0.95rem] leading-[1.5] text-soft">{name}</span>
                    <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-accent">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section id="depot" className="border border-accent/45 bg-[rgba(200,82,50,0.07)] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
              <div>
                <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                  Dépôt de documents
                </p>
                <h2 className="mt-3 font-cond text-[2.4rem] font-black uppercase leading-none tracking-[0.04em] text-black">
                  Glisser ou choisir un fichier
                </h2>
                <p className="mt-4 max-w-[720px] font-body text-[0.98rem] leading-[1.75] text-soft">
                  Formats attendus : PDF, DOCX, XLSX, ZIP ou liens rassemblés dans un document. Chaque envoi
                  doit être rattaché à une pièce précise pour éviter les fichiers perdus.
                </p>
              </div>

              <div className="border border-dashed border-accent/60 bg-[var(--surface)] p-6 text-center">
                <p className="font-cond text-[1.15rem] font-black uppercase tracking-[0.08em] text-black">
                  Zone de dépôt
                </p>
                <p className="mt-3 font-body text-[0.92rem] leading-[1.65] text-soft">
                  Prototype local : le dépôt réel sera branché plus tard.
                </p>
                <button className="mt-5 min-h-[44px] rounded-full bg-accent px-6 font-cond text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white">
                  Choisir un fichier
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Fichier reçu', 'En vérification', 'Validé ou à corriger'].map((label, index) => (
                <div key={label} className="border border-rule bg-white/50 px-4 py-4">
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-dim">Étape 0{index + 1}</p>
                  <p className="mt-2 font-body text-[0.95rem] leading-[1.55] text-soft">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
              Progression
            </p>
            <div className="mt-6 space-y-5">
              {progress.map((step, index) => (
                <div key={step.label} className="grid grid-cols-[34px_minmax(0,1fr)] gap-4">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[0.58rem]"
                    style={{
                      borderColor: index <= 1 ? 'var(--accent)' : 'rgba(243,241,234,0.18)',
                      color: index <= 1 ? 'var(--accent)' : 'var(--dim)',
                    }}
                  >
                    0{index + 1}
                  </span>
                  <div className="border-b border-rule pb-5 last:border-b-0">
                    <p className="font-cond text-[1rem] font-black uppercase tracking-[0.08em] text-black">
                      {step.label}
                    </p>
                    <p className="mt-1 font-body text-[0.9rem] leading-[1.6] text-soft">{step.state}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
              Activité récente
            </p>
            <div className="mt-6 space-y-5">
              {activity.map(([date, event]) => (
                <div key={date} className="border-l border-rule-dark pl-4">
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-dim">
                    {date}
                  </p>
                  <p className="mt-2 font-body text-[0.94rem] leading-[1.65] text-soft">{event}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
              Besoin d'aide ?
            </p>
            <p className="mt-4 font-body text-[0.95rem] leading-[1.75] text-soft">
              Si une pièce est floue, le plus utile est d'envoyer ce que vous avez déjà, même imparfait.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <LiquidGlassButton href="/contact" warm size="lg" contentClassName="text-white">
                Poser une question
              </LiquidGlassButton>
              <Link
                href="/diagnostic"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-rule-dark px-5 font-cond text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Revoir le diagnostic
              </Link>
            </div>
          </section>
        </aside>
      </main>
    </section>
  )
}
