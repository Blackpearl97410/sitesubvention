import type { Metadata } from 'next'
import MethodePageContent from '@/components/pages/MethodePageContent'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Comment fonctionne le montage de dossier de subvention musique',
  description:
    "Process en 3 étapes pour transformer un projet musical en dossier clair, cohérent et finançable : diagnostic, montage, dépôt et suivi.",
  path: '/comment-ca-fonctionne',
  keywords: ['comment monter un dossier de subvention musique', 'process dossier aide musicale', 'consultant dossier culturel'],
})

export default function CommentCaFonctionnePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Comment ça fonctionne', path: '/comment-ca-fonctionne' }]} />
      <MethodePageContent />
    </>
  )
}
