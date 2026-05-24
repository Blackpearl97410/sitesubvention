import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { dispositifs } from '@/lib/dispositifs'

export const metadata: Metadata = {
  title: 'ADAMI — Dossier Studio',
  description:
    "Accompagnement ADAMI pour artistes-interprètes et projets de création ou de diffusion nécessitant un dossier plus solide.",
}

export default function Page() {
  return <DispositifDetailPage dispositif={dispositifs.adami} />
}
