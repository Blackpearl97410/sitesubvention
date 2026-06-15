'use client'

import type { CSSProperties, FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton'

const storageKey = 'dossier-studio-client-token'

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

type Dossier = {
  id: string
  title: string
  client_name: string
  status_label: string
  summary: string
  current_step: string
  next_action: string
  missing_count: number
  updated_at: string
}

type DocumentItem = {
  id: string
  title: string
  status: string
  detail: string
  priority_label: string
  sort_order: number
}

type ActivityItem = {
  id: string
  label: string
  body: string
  created_at: string
}

type ClientPayload = {
  dossier: Dossier
  documents: DocumentItem[]
  activity: ActivityItem[]
}

const progressSteps = ['Diagnostic', 'Pièces', 'Rédaction', 'Dépôt']

function normalizeStatus(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return value
  }
}

function splitDocuments(documents: DocumentItem[]) {
  return {
    pending: documents.filter((document) => {
      const status = normalizeStatus(document.status)
      return status.includes('manquant') || status.includes('verifier') || status.includes('attente')
    }),
    received: documents.filter((document) => {
      const status = normalizeStatus(document.status)
      return status.includes('recu') || status.includes('valide') || status.includes('archive')
    }),
  }
}

export default function EspaceClientApp() {
  const [identifier, setIdentifier] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [payload, setPayload] = useState<ClientPayload | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const documents = useMemo(() => splitDocuments(payload?.documents || []), [payload])
  const activeStepIndex = Math.max(0, progressSteps.findIndex((step) => step === payload?.dossier.current_step))

  async function loadClientSpace(token: string) {
    const cleanToken = token.trim()

    if (cleanToken.length < 6) {
      setError('Entre un identifiant valide.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/espace-client', {
        method: 'GET',
        headers: {
          'x-client-access-token': cleanToken,
        },
        cache: 'no-store',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Impossible d'ouvrir cet espace client.")
      }

      setPayload(data)
      setAccessToken(cleanToken)
      sessionStorage.setItem(storageKey, cleanToken)
    } catch (fetchError) {
      setPayload(null)
      setAccessToken('')
      sessionStorage.removeItem(storageKey)
      setError(fetchError instanceof Error ? fetchError.message : "Impossible d'ouvrir cet espace client.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loadClientSpace(identifier)
  }

  function disconnect() {
    setPayload(null)
    setAccessToken('')
    setIdentifier('')
    setSelectedFile(null)
    setError('')
    sessionStorage.removeItem(storageKey)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromUrl = params.get('token')
    const savedToken = sessionStorage.getItem(storageKey)
    const token = tokenFromUrl || savedToken

    if (token) {
      setIdentifier(token)
      loadClientSpace(token)
    }

    if (tokenFromUrl) {
      window.history.replaceState({}, '', '/espace-client')
    }
  }, [])

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
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-dim">
                {payload ? 'Dossier client' : 'Accès privé'}
              </p>
              <p className="mt-1 font-cond text-[1.05rem] font-bold uppercase tracking-[0.06em] text-black">
                {payload?.dossier.title || 'Espace client'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {payload ? (
              <>
                <span className="rounded-full border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent">
                  {payload.dossier.status_label}
                </span>
                <span className="rounded-full border border-rule-dark bg-white/55 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-soft">
                  {payload.dossier.missing_count} pièce{payload.dossier.missing_count > 1 ? 's' : ''} à traiter
                </span>
                <button
                  type="button"
                  onClick={disconnect}
                  className="rounded-full border border-rule-dark px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim transition-colors hover:border-accent hover:text-accent"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/"
                className="rounded-full border border-rule-dark px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim transition-colors hover:border-accent hover:text-accent"
              >
                Retour au site
              </Link>
            )}
          </div>
        </div>
      </div>

      {!payload ? (
        <main className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-[1180px] items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="max-w-[720px]">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-accent">
              Suivi de dossier
            </p>
            <h1
              className="mt-5 font-cond font-black uppercase leading-[0.88] text-black"
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                letterSpacing: 0,
              }}
            >
              Connecte ton espace client.
            </h1>
            <p className="mt-6 max-w-[640px] font-body text-[1rem] leading-[1.85] text-soft">
              Entre l'identifiant transmis par Dossier Studio pour consulter l'avancement du dossier,
              les pièces attendues et les prochaines actions.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-8">
            <label htmlFor="client-identifier" className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-accent">
              Identifiant client
            </label>
            <input
              id="client-identifier"
              name="identifier"
              type="password"
              autoComplete="one-time-code"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Identifiant reçu par email"
              className="mt-4 min-h-[54px] w-full border border-rule-dark bg-white/70 px-4 font-body text-[1rem] text-black outline-none transition-colors placeholder:text-dim focus:border-accent"
            />
            {error ? (
              <p className="mt-4 border border-accent/40 bg-accent/10 px-4 py-3 font-body text-[0.92rem] leading-[1.55] text-accent">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 min-h-[50px] w-full rounded-full bg-accent px-6 font-cond text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
            >
              {isLoading ? 'Vérification...' : "Ouvrir l'espace client"}
            </button>
            <p className="mt-4 font-body text-[0.86rem] leading-[1.65] text-dim">
              L'identifiant reste uniquement dans cette session de navigateur. Déconnecte-toi sur un ordinateur partagé.
            </p>
          </form>
        </main>
      ) : (
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
                    {payload.dossier.missing_count > 0
                      ? `Il manque ${payload.dossier.missing_count} pièce${payload.dossier.missing_count > 1 ? 's' : ''} pour avancer.`
                      : 'Le dossier est à jour.'}
                  </h1>
                  <p className="mt-5 max-w-[720px] font-body text-[1rem] leading-[1.85] text-soft">
                    {payload.dossier.summary}
                  </p>
                  <p className="mt-4 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-dim">
                    Dernière mise à jour : {formatDate(payload.dossier.updated_at)}
                  </p>
                </div>

                <div className="border-l border-rule-dark pl-6">
                  <p className="font-mono text-[0.48rem] uppercase tracking-[0.16em] text-dim">Action à faire</p>
                  <p className="mt-4 font-cond text-[1.35rem] font-black uppercase tracking-[0.04em] text-black">
                    {payload.dossier.next_action}
                  </p>
                  <p className="mt-3 font-body text-[0.95rem] leading-[1.7] text-soft">
                    Étape actuelle : {payload.dossier.current_step}
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
                      Documents à traiter
                    </p>
                    <h2 className="mt-3 font-cond text-[2rem] font-black uppercase leading-none tracking-[0.04em] text-black">
                      À fournir maintenant
                    </h2>
                  </div>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim">
                    {documents.pending.length} en attente
                  </span>
                </div>

                <div className="mt-7 space-y-4">
                  {documents.pending.length > 0 ? (
                    documents.pending.map((document) => (
                      <article key={document.id} className="border border-rule bg-white/50 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-cond text-[1.15rem] font-black uppercase tracking-[0.06em] text-black">
                              {document.title}
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
                              {document.priority_label}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="border border-rule bg-white/50 p-5 font-body text-[0.95rem] leading-[1.7] text-soft">
                      Aucune pièce urgente à fournir pour le moment.
                    </p>
                  )}
                </div>
              </div>

              <aside className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
                <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                  Déjà reçu
                </p>
                <div className="mt-6 space-y-3">
                  {documents.received.length > 0 ? (
                    documents.received.map((document) => (
                      <div key={document.id} className="flex items-center justify-between border-b border-rule pb-3 last:border-b-0">
                        <span className="font-body text-[0.95rem] leading-[1.5] text-soft">{document.title}</span>
                        <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-accent">
                          {document.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="font-body text-[0.92rem] leading-[1.65] text-soft">Aucune pièce validée pour l'instant.</p>
                  )}
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
                    Préparer un fichier
                  </h2>
                  <p className="mt-4 max-w-[720px] font-body text-[0.98rem] leading-[1.75] text-soft">
                    Sélectionne le fichier à envoyer. Le dépôt serveur sera branché avec le stockage de production ;
                    pour l'instant, cette étape permet de vérifier le parcours client et le nom du fichier.
                  </p>
                </div>

                <label className="block cursor-pointer border border-dashed border-accent/60 bg-[var(--surface)] p-6 text-center transition-colors hover:bg-white/70">
                  <span className="font-cond text-[1.15rem] font-black uppercase tracking-[0.08em] text-black">
                    Choisir un fichier
                  </span>
                  <span className="mt-3 block font-body text-[0.92rem] leading-[1.65] text-soft">
                    PDF, DOCX, XLSX, ZIP ou image.
                  </span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              {selectedFile ? (
                <div className="mt-6 border border-rule-dark bg-white/55 px-4 py-4">
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-dim">Fichier sélectionné</p>
                  <p className="mt-2 font-body text-[0.95rem] leading-[1.55] text-soft">
                    {selectedFile.name} · {(selectedFile.size / 1024 / 1024).toFixed(2)} Mo
                  </p>
                </div>
              ) : null}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
              <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                Progression
              </p>
              <div className="mt-6 space-y-5">
                {progressSteps.map((step, index) => (
                  <div key={step} className="grid grid-cols-[34px_minmax(0,1fr)] gap-4">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[0.58rem]"
                      style={{
                        borderColor: index <= activeStepIndex ? 'var(--accent)' : 'rgba(53,45,36,0.18)',
                        color: index <= activeStepIndex ? 'var(--accent)' : 'var(--dim)',
                      }}
                    >
                      0{index + 1}
                    </span>
                    <div className="border-b border-rule pb-5 last:border-b-0">
                      <p className="font-cond text-[1rem] font-black uppercase tracking-[0.08em] text-black">
                        {step}
                      </p>
                      <p className="mt-1 font-body text-[0.9rem] leading-[1.6] text-soft">
                        {index < activeStepIndex ? 'Terminé' : index === activeStepIndex ? 'En cours' : 'À venir'}
                      </p>
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
                {payload.activity.map((event) => (
                  <div key={event.id} className="border-l border-rule-dark pl-4">
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-dim">
                      {event.label}
                    </p>
                    <p className="mt-2 font-body text-[0.94rem] leading-[1.65] text-soft">{event.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-rule-dark bg-[var(--surface)] p-6 sm:p-7">
              <p className="font-mono text-[0.48rem] uppercase tracking-[0.18em] text-accent">
                Besoin d'aide ?
              </p>
              <p className="mt-4 font-body text-[0.95rem] leading-[1.75] text-soft">
                Si une pièce est floue, envoie ce que tu as déjà ou pose une question avant dépôt.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <LiquidGlassButton href="/contact" warm size="lg" contentClassName="text-white">
                  Poser une question
                </LiquidGlassButton>
                <a
                  href={`mailto:contact@dossier-studio.fr?subject=Question%20espace%20client%20-%20${encodeURIComponent(payload.dossier.title)}`}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-rule-dark px-5 font-cond text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Écrire par email
                </a>
              </div>
            </section>
          </aside>
        </main>
      )}
    </section>
  )
}
