import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData'
import { dispositifs } from '@/lib/dispositifs'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Aides régionales, DAC et collectivités pour projets culturels',
  description:
    'Accompagnement pour aides régionales, DAC, collectivités et appels à projets culturels avec lecture ciblée des dispositifs territoriaux.',
  path: '/dispositifs/regions',
  keywords: ['aide région projet culturel', 'dossier DAC culture', 'appel à projets culturel collectivité'],
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Dispositifs', path: '/dispositifs' }, { name: 'Régions, DAC et collectivités', path: '/dispositifs/regions' }]} />
      <DispositifDetailPage dispositif={dispositifs.regions} />
    </>
  )
}
