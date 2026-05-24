import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { dispositifs } from '@/lib/dispositifs'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Accompagnement dossier ADAMI pour artistes-interprètes',
  description:
    "Accompagnement ADAMI pour artistes-interprètes, projets de création, diffusion ou développement nécessitant un dossier plus solide.",
  path: '/dispositifs/adami',
  keywords: ['dossier ADAMI', 'aide ADAMI artiste', 'subvention artiste interprète'],
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Dispositifs', path: '/dispositifs' }, { name: 'ADAMI', path: '/dispositifs/adami' }]} />
      <DispositifDetailPage dispositif={dispositifs.adami} />
    </>
  )
}
