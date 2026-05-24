import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { dispositifs } from '@/lib/dispositifs'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Accompagnement dossier SACEM pour auteurs et éditeurs',
  description:
    "Accompagnement SACEM pour auteurs, compositeurs, éditeurs et projets de création avec argumentaire, budget et stratégie de dépôt plus clairs.",
  path: '/dispositifs/sacem',
  keywords: ['dossier SACEM', 'aide SACEM création', 'subvention éditeur musical'],
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Dispositifs', path: '/dispositifs' }, { name: 'SACEM', path: '/dispositifs/sacem' }]} />
      <DispositifDetailPage dispositif={dispositifs.sacem} />
    </>
  )
}
