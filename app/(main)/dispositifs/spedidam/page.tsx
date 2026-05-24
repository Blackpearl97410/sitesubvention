import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { dispositifs } from '@/lib/dispositifs'

export const metadata: Metadata = {
  title: 'SPEDIDAM — Dossier Studio',
  description:
    'Accompagnement SPEDIDAM pour projets live, diffusion, tournée et demandes nécessitant une lecture précise des critères.',
}

export default function Page() {
  return <DispositifDetailPage dispositif={dispositifs.spedidam} />
}
