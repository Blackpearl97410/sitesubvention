import type { Metadata } from 'next'
import MethodePageContent from '@/components/pages/MethodePageContent'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Méthode de montage de dossier de subvention musicale',
  description:
    "La méthode Dossier Studio : diagnostic, ciblage des dispositifs, structuration du budget, rédaction de l'argumentaire, dépôt et suivi.",
  path: '/comment-ca-fonctionne',
  keywords: ['méthode dossier subvention musique', 'rédaction dossier aide culturelle', 'budget dossier CNM'],
})

export default function MethodePage() {
  return <MethodePageContent />
}
