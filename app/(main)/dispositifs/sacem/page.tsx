import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { dispositifs } from '@/lib/dispositifs'

export const metadata: Metadata = {
  title: 'SACEM — Dossier Studio',
  description:
    "Accompagnement SACEM pour auteurs, compositeurs, éditeurs et projets de création avec stratégie de dépôt plus claire.",
}

export default function Page() {
  return <DispositifDetailPage dispositif={dispositifs.sacem} />
}
