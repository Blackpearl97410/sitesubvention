export type AideCategory =
  | 'production'
  | 'clip-video'
  | 'documentaire'
  | 'tournee'
  | 'structuration'

export type AideProfile = 'association' | 'label' | 'editeur' | 'artiste'

export type AideOuverte = {
  id: string
  title: string
  organism: string
  projectType: string
  deadlineLabel: string
  sourceUrl: string
  sourceName: string
  summary: string
  categories: AideCategory[]
  profiles: AideProfile[]
}

export type AidesOuvertesResponse = {
  updatedAt: string
  cacheTtlSeconds: number
  source: string
  items: AideOuverte[]
  fallback: boolean
  note?: string
}

const SOURCE_BASE = 'https://www.monprojetmusique.fr'
const SOURCE_ARCHIVE = `${SOURCE_BASE}/aides/`
const CACHE_TTL_SECONDS = 60 * 60 * 24

const fallbackAides: AideOuverte[] = [
  {
    id: 'fallback-cnm-production',
    title: 'Aide à la production phonographique',
    organism: 'CNM',
    projectType: 'Production phonographique',
    deadlineLabel: 'À vérifier sur la source',
    sourceUrl: 'https://www.monprojetmusique.fr/aides/',
    sourceName: 'Mon Projet Musique',
    summary: 'Dispositif à surveiller pour les labels, artistes et producteurs en phase de sortie ou production.',
    categories: ['production'],
    profiles: ['label', 'artiste'],
  },
  {
    id: 'fallback-sacem-video',
    title: 'Aides création, édition ou développement',
    organism: 'SACEM',
    projectType: 'Création / édition / vidéo',
    deadlineLabel: 'À vérifier sur la source',
    sourceUrl: 'https://www.monprojetmusique.fr/aides/',
    sourceName: 'Mon Projet Musique',
    summary: 'Dispositifs à filtrer selon statut, catalogue, projet artistique et calendrier.',
    categories: ['production', 'clip-video'],
    profiles: ['editeur', 'artiste'],
  },
  {
    id: 'fallback-territorial',
    title: 'Appels à projets culturels territoriaux',
    organism: 'Collectivités / Région / Département',
    projectType: 'Structuration / action culturelle',
    deadlineLabel: 'À vérifier sur la source',
    sourceUrl: 'https://www.monprojetmusique.fr/aides/',
    sourceName: 'Mon Projet Musique',
    summary: 'Aides utiles pour les associations, collectifs et porteurs de projets culturels localisés.',
    categories: ['structuration', 'tournee'],
    profiles: ['association'],
  },
]

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
}

function decodeHtml(value: string) {
  return value
    .replace(/&#8211;|&#8212;/g, '–')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function absoluteUrl(url: string) {
  if (url.startsWith('http')) return url
  return `${SOURCE_BASE}${url.startsWith('/') ? '' : '/'}${url}`
}

function inferOrganism(text: string) {
  const upper = text.toUpperCase()
  const organisms = [
    ['LE FAIR', 'Le FAIR'],
    ['CNM', 'CNM'],
    ['SACEM', 'SACEM'],
    ['ADAMI', 'ADAMI'],
    ['SPEDIDAM', 'SPEDIDAM'],
    ['SCPP', 'SCPP'],
    ['SPPF', 'SPPF'],
    ['FONPEPS', 'FONPEPS'],
    ['SACD', 'SACD'],
    ['RÉGION', 'Région'],
    ['REGION', 'Région'],
    ['DAC', 'DAC'],
  ] as const
  const found = organisms.find(([needle]) => upper.includes(needle))
  if (!found) return 'Organisme à vérifier'
  return found[1]
}

function includesAny(text: string, needles: string[]) {
  const lower = text.toLowerCase()
  return needles.some((needle) => lower.includes(needle))
}

function inferCategories(text: string): AideCategory[] {
  const categories = new Set<AideCategory>()
  if (includesAny(text, ['phonographique', 'album', 'single', 'ep ', 'enregistrement', 'production'])) {
    categories.add('production')
  }
  if (includesAny(text, ['clip', 'vidéo', 'video', 'audiovisuel', 'image'])) {
    categories.add('clip-video')
  }
  if (includesAny(text, ['documentaire', 'film documentaire'])) {
    categories.add('documentaire')
  }
  if (includesAny(text, ['tournée', 'tournee', 'spectacle', 'concert', 'diffusion', 'live'])) {
    categories.add('tournee')
  }
  if (includesAny(text, ['structuration', 'développement', 'developpement', 'fonctionnement', 'association', 'résidence'])) {
    categories.add('structuration')
  }
  return Array.from(categories).length ? Array.from(categories) : ['production']
}

function inferProfiles(text: string): AideProfile[] {
  const profiles = new Set<AideProfile>()
  if (includesAny(text, ['association', 'collectif'])) profiles.add('association')
  if (includesAny(text, ['label', 'producteur', 'production phonographique'])) profiles.add('label')
  if (includesAny(text, ['éditeur', 'editeur', 'édition', 'edition'])) profiles.add('editeur')
  if (includesAny(text, ['artiste', 'auteur', 'compositeur', 'interprète'])) profiles.add('artiste')
  return Array.from(profiles).length ? Array.from(profiles) : ['artiste', 'label']
}

function inferProjectType(categories: AideCategory[]) {
  if (categories.includes('clip-video')) return 'Clip / vidéo'
  if (categories.includes('documentaire')) return 'Documentaire'
  if (categories.includes('tournee')) return 'Spectacle / tournée'
  if (categories.includes('structuration')) return 'Structuration'
  return 'Production phonographique'
}

function extractDeadline(text: string) {
  const compact = decodeHtml(stripTags(text))
  const patterns = [
    /(date limite[^.:\n]*[: ]+[^.\n]{4,80})/i,
    /(jusqu[’']au [^.:\n]{4,60})/i,
    /(avant le [0-9]{1,2} [a-zéûîôà]+ [0-9]{4})/i,
    /(d[ée]p[oô]t[^.:\n]*[: ]+[^.\n]{4,80})/i,
  ]
  const match = patterns.map((pattern) => compact.match(pattern)?.[1]).find(Boolean)
  return match ? decodeHtml(match) : 'À vérifier sur la source'
}

function extractSummary(text: string) {
  const compact = decodeHtml(stripTags(text))
  const sentence = compact
    .split(/[.!?]/)
    .map((part) => part.trim())
    .find((part) => part.length > 90 && part.length < 230)
  return sentence || 'Fiche à consulter pour vérifier les critères, les bénéficiaires et le calendrier.'
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'DossierStudioBot/1.0 (+https://dossier-studio.fr)',
      accept: 'text/html,application/xhtml+xml',
    },
    next: { revalidate: CACHE_TTL_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url}: ${response.status}`)
  }

  return response.text()
}

function extractArchiveLinks(html: string) {
  const links = new Map<string, string>()
  const regex = /<a[^>]+href=["']([^"']*\/aides\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html))) {
    const href = absoluteUrl(decodeHtml(match[1]))
    const rawTitle = decodeHtml(stripTags(match[2]))
    if (!rawTitle || rawTitle.length < 5) continue
    if (href.replace(/\/$/, '') === SOURCE_ARCHIVE.replace(/\/$/, '')) continue
    if (/page\/\d+/i.test(href)) continue
    links.set(href, rawTitle)
  }

  return Array.from(links.entries()).map(([sourceUrl, title]) => ({ sourceUrl, title }))
}

async function scrapeMonProjetMusique() {
  const archiveUrls = [SOURCE_ARCHIVE, `${SOURCE_ARCHIVE}page/2/`]
  const archiveHtml = await Promise.all(archiveUrls.map((url) => fetchHtml(url).catch(() => '')))
  const linkCandidates = archiveHtml.flatMap((html) => extractArchiveLinks(html)).slice(0, 18)
  const uniqueLinks = Array.from(new Map(linkCandidates.map((item) => [item.sourceUrl, item])).values()).slice(0, 12)

  const items = await Promise.all(
    uniqueLinks.map(async (item) => {
      const detailHtml = await fetchHtml(item.sourceUrl).catch(() => '')
      const titleText = item.title
      const categories = inferCategories(titleText)
      const profiles = inferProfiles(titleText)

      return {
        id: slugify(item.title),
        title: item.title,
        organism: inferOrganism(titleText),
        projectType: inferProjectType(categories),
        deadlineLabel: detailHtml ? extractDeadline(detailHtml) : 'À vérifier sur la source',
        sourceUrl: item.sourceUrl,
        sourceName: 'Mon Projet Musique',
        summary: detailHtml ? extractSummary(detailHtml) : 'Fiche à consulter pour vérifier les critères, les bénéficiaires et le calendrier.',
        categories,
        profiles,
      } satisfies AideOuverte
    })
  )

  return items.filter((item) => item.title.length > 5).slice(0, 12)
}

export async function getAidesOuvertes(): Promise<AidesOuvertesResponse> {
  try {
    const items = await scrapeMonProjetMusique()
    if (!items.length) throw new Error('No aid items found')

    return {
      updatedAt: new Date().toISOString(),
      cacheTtlSeconds: CACHE_TTL_SECONDS,
      source: SOURCE_ARCHIVE,
      items,
      fallback: false,
      note: 'Données issues des pages publiques Mon Projet Musique, mises en cache 24h.',
    }
  } catch (error) {
    return {
      updatedAt: new Date().toISOString(),
      cacheTtlSeconds: CACHE_TTL_SECONDS,
      source: SOURCE_ARCHIVE,
      items: fallbackAides,
      fallback: true,
      note: error instanceof Error ? `Fallback utilisé : ${error.message}` : 'Fallback utilisé.',
    }
  }
}
