import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Dossier Studio',
  legalName: 'Dossier Studio',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dossier-studio.fr',
  title: "Dossier Studio - Montage de dossiers d'aides pour projets musicaux",
  description:
    "Accompagnement premium au montage de dossiers d'aides, subventions et appels à projets pour labels, artistes, éditeurs, producteurs, studios et structures culturelles francophones.",
  tagline: "De l'idée artistique au dossier finançable.",
  email: process.env.PUBLIC_CONTACT_EMAIL || 'contact@dossier-studio.fr',
  author: 'Alexandre Paviel',
  locale: 'fr_FR',
  territory: 'France, La Réunion et francophonie',
} as const

export const seoKeywords = [
  'montage dossier subvention musique',
  'aide CNM dossier',
  'accompagnement subventions musique',
  'dossier aide production phonographique',
  'subvention label musique',
  'aide artiste francophone',
  'aide SACEM dossier',
  'aide SPEDIDAM dossier',
  'aide ADAMI dossier',
  'appel à projets culturel',
  'financement projet musical',
  'dossier de subvention culturelle',
  'La Réunion musique subvention',
]

type PageSeoOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

export function pageSeo({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: PageSeoOptions): Metadata {
  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}
