'use client'

import { useEffect, useMemo, useState } from 'react'
import Track from '@/components/daw/Track'
import type { AideCategory, AideOuverte, AideProfile, AidesOuvertesResponse } from '@/lib/aides-ouvertes'

const categoryFilters: { value: AideCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'production', label: 'Production' },
  { value: 'clip-video', label: 'Clip / vidéo' },
  { value: 'documentaire', label: 'Documentaire' },
  { value: 'tournee', label: 'Tournée' },
  { value: 'structuration', label: 'Structuration' },
]

const profileFilters: { value: AideProfile | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous profils' },
  { value: 'association', label: 'Association' },
  { value: 'label', label: 'Label' },
  { value: 'editeur', label: 'Éditeur' },
  { value: 'artiste', label: 'Artiste' },
]

function formatUpdatedAt(value?: string) {
  if (!value) return 'mise à jour récente'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function AidesOuvertes() {
  const [payload, setPayload] = useState<AidesOuvertesResponse | null>(null)
  const [category, setCategory] = useState<AideCategory | 'all'>('all')
  const [profile, setProfile] = useState<AideProfile | 'all'>('all')
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true

    fetch('/api/aides-ouvertes')
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json()
      })
      .then((data: AidesOuvertesResponse) => {
        if (isMounted) setPayload(data)
      })
      .catch(() => {
        if (isMounted) setError(true)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredItems = useMemo(() => {
    const items = payload?.items ?? []
    return items.filter((item) => {
      const categoryMatch = category === 'all' || item.categories.includes(category)
      const profileMatch = profile === 'all' || item.profiles.includes(profile)
      return categoryMatch && profileMatch
    })
  }, [category, payload?.items, profile])

  return (
    <section
      id="aides-ouvertes"
      style={{ borderBottom: '2px solid var(--black)', scrollMarginTop: 'var(--nav-h)' }}
    >
      <Track name="Aides ouvertes" type="Mise à jour 24h" armed hideLabel contentClassName="!py-12 !px-12 !items-start">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[0.4375rem] tracking-[0.18em] uppercase text-accent">
              Veille active
            </span>
            <h2
              className="font-cond font-black uppercase leading-[0.9] tracking-[-0.03em] text-black"
              style={{ fontSize: 'var(--fs-h2)' }}
            >
              Aides ouvertes
              <br />
              à surveiller.
            </h2>
            <p className="max-w-[760px] font-body text-[1rem] leading-[1.85] text-soft">
              Une sélection synchronisée depuis les pages publiques de Mon Projet Musique, enrichie
              avec des filtres utiles pour qualifier rapidement ton projet.
            </p>
          </div>
          <div className="border-l border-rule-dark pl-8 pt-1">
            <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-dim">
              Source
            </p>
            <p className="font-body text-[0.95rem] leading-[1.8] text-soft">
              {payload
                ? `Mon Projet Musique · ${formatUpdatedAt(payload.updatedAt)}`
                : error
                  ? 'Source indisponible pour le moment'
                  : 'Chargement des aides ouvertes...'}
            </p>
          </div>
        </div>
      </Track>

      <Track name="Filtres" type="Projet / profil" hideLabel contentClassName="!px-12 !py-6 !items-start !flex-col">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCategory(filter.value)}
                className={`border px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
                  category === filter.value
                    ? 'border-accent bg-[rgba(200,82,50,0.1)] text-accent'
                    : 'border-rule text-dim hover:border-accent hover:text-accent'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {profileFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setProfile(filter.value)}
                className={`border px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
                  profile === filter.value
                    ? 'border-black bg-black text-white'
                    : 'border-rule text-dim hover:border-black hover:text-black'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </Track>

      {(payload ? filteredItems : Array.from({ length: 3 })).slice(0, 6).map((item, index) => {
        const aid = item as AideOuverte | undefined
        return (
          <Track
            key={aid?.id ?? index}
            name={aid ? aid.organism : 'Chargement'}
            type={aid ? aid.projectType : 'Aide ouverte'}
            hideLabel
            contentClassName="!px-0 !py-0 !gap-0 !items-stretch"
          >
            <div className="grid w-full lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="px-12 py-8">
                <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-accent">
                  {aid ? aid.sourceName : 'Synchronisation'}
                </p>
                <h3
                  className="mb-4 font-cond font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-black"
                  style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
                >
                  {aid ? aid.title : 'Chargement des aides ouvertes'}
                </h3>
                <p className="max-w-[760px] font-body text-[0.96rem] leading-[1.85] text-soft">
                  {aid ? aid.summary : 'Récupération des dispositifs et catégories en cours...'}
                </p>
                {aid ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[...aid.categories, ...aid.profiles].map((tag) => (
                      <span
                        key={tag}
                        className="border border-rule bg-[var(--surface-2)] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim"
                      >
                        {tag.replace('-', ' / ')}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col justify-between border-l border-rule px-8 py-8" style={{ background: 'var(--surface-2)' }}>
                <div>
                  <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim">
                    Date limite
                  </p>
                  <p className="font-body text-[0.95rem] leading-[1.7] text-ink">
                    {aid ? aid.deadlineLabel : 'Chargement'}
                  </p>
                </div>
                {aid ? (
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={aid.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cond text-[0.625rem] font-bold uppercase tracking-[0.16em] text-accent hover:underline"
                    >
                      Voir la source →
                    </a>
                    <a
                      href="/diagnostic"
                      className="inline-flex justify-center bg-accent px-5 py-3 font-cond text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white"
                    >
                      Vérifier mon éligibilité
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </Track>
        )
      })}

      {payload && filteredItems.length === 0 ? (
        <Track name="Aucun résultat" type="Changer les filtres" hideLabel contentClassName="!px-12 !py-8">
          <p className="font-body text-[0.96rem] leading-[1.8] text-soft">
            Aucun dispositif ne correspond à ces filtres pour le moment. Essaie un autre type de
            projet ou lance le diagnostic pour vérifier les pistes proches.
          </p>
        </Track>
      ) : null}
    </section>
  )
}
