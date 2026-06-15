import type { Metadata } from 'next'
import EspaceClientApp from './EspaceClientApp'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Espace client pour suivi de dossier',
  description:
    "Accès privé Dossier Studio pour suivre l'avancement d'un dossier d'aide musicale, les pièces attendues et les prochaines actions.",
  path: '/espace-client',
  keywords: ['espace client dossier subvention', 'suivi dossier aides musique', 'checklist dossier CNM'],
  noIndex: true,
})

export default function EspaceClientPage() {
  return <EspaceClientApp />
}
