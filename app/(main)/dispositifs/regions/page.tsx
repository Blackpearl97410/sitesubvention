import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { dispositifs } from '@/lib/dispositifs'

export const metadata: Metadata = {
  title: 'Régions, DAC et collectivités — Dossier Studio',
  description:
    'Accompagnement pour aides régionales, DAC, collectivités et appels à projets culturels avec lecture ciblée des dispositifs territoriaux.',
}

export default function Page() {
  return <DispositifDetailPage dispositif={dispositifs.regions} />
}
