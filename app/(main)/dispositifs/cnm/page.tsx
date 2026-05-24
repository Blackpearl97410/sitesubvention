import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { dispositifs } from '@/lib/dispositifs'

export const metadata: Metadata = {
  title: 'CNM — Dossier Studio',
  description:
    "Accompagnement CNM pour le secteur musical : production phonographique, structuration, diffusion et dossiers plus cohérents.",
}

export default function Page() {
  return <DispositifDetailPage dispositif={dispositifs.cnm} />
}
