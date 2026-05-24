import { contactEmail } from '@/lib/site'

export const legalDetails = {
  brandName: 'Dossier Studio',
  editorName: 'Alexandre Paviel',
  legalForm: 'Entrepreneur individuel',
  siret: '923 682 991 00016',
  vatNumber: 'FR30923682991',
  registeredAddress: 'Montesquieu, 97419 La Possession',
  publicationDirector: 'Alexandre Paviel',
  contactEmail,
  hostName: 'Vercel Inc.',
  hostAddress: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
  lastUpdated: '23 mai 2026',
} as const

export const legalMailto =
  `mailto:${contactEmail}?subject=Question%20juridique%20%E2%80%94%20Dossier%20Studio`
