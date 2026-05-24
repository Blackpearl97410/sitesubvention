import type { Metadata } from 'next'
import DispositifDetailPage from '@/components/dispositifs/DispositifDetailPage'
import { dispositifs } from '@/lib/dispositifs'
import { pageSeo } from '@/lib/seo'

export const metadata: Metadata = pageSeo({
  title: 'Accompagnement dossier SPEDIDAM pour diffusion et tournée',
  description:
    'Accompagnement SPEDIDAM pour projets live, diffusion, tournée, captation et dossiers nécessitant une lecture précise des critères.',
  path: '/dispositifs/spedidam',
  keywords: ['dossier SPEDIDAM', 'aide SPEDIDAM tournée', 'subvention spectacle vivant musique'],
})

export default function Page() {
  return <DispositifDetailPage dispositif={dispositifs.spedidam} />
}
