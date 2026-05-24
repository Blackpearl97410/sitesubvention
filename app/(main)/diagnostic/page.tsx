import type { Metadata } from 'next'
import DiagnosticFunnel from '@/components/sections/DiagnosticFunnel'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Diagnostic gratuit pour aides et subventions musique',
  description:
    "Évaluez en 4 questions le potentiel de financement de votre projet musical : statut, type de projet, budget et première orientation sous 48h ouvrées.",
  path: '/diagnostic',
  keywords: ['diagnostic subvention musique', 'éligibilité aides musicales', 'aide projet musical financement'],
})

export default function DiagnosticPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Diagnostic', path: '/diagnostic' }]} />
      <DiagnosticFunnel />
    </>
  )
}
