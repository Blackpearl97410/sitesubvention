import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { dispositifs } from '@/lib/dispositifs'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Accompagnement dossier CNM pour projets musicaux',
  description:
    "Accompagnement au montage de dossiers CNM : production phonographique, structuration, diffusion, export, budget et argumentaire.",
  path: '/dispositifs/cnm',
  keywords: ['dossier CNM', 'aide CNM production phonographique', 'accompagnement CNM musique'],
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Dispositifs', path: '/dispositifs' }, { name: 'CNM', path: '/dispositifs/cnm' }]} />
      <DispositifDetailPage dispositif={dispositifs.cnm} />
    </>
  )
}
