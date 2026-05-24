import { NextResponse } from 'next/server'

type ContactPayload = {
  source?: string
  firstName?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  status?: string
  projectType?: string
  budget?: string
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const defaultRecipient = 'lablackbox974@gmail.com'

function clean(value?: string) {
  return typeof value === 'string' ? value.trim() : ''
}

function buildText(payload: ContactPayload) {
  const source = clean(payload.source) || 'contact'

  if (source === 'diagnostic') {
    return [
      'Nouvelle demande de diagnostic Dossier Studio',
      '',
      `Prénom : ${clean(payload.firstName)}`,
      `Email : ${clean(payload.email)}`,
      `WhatsApp / téléphone : ${clean(payload.phone) || 'Non renseigné'}`,
      `Statut : ${clean(payload.status)}`,
      `Projet : ${clean(payload.projectType)}`,
      `Budget : ${clean(payload.budget)}`,
    ].join('\n')
  }

  return [
    'Nouveau message depuis le site Dossier Studio',
    '',
    `Prénom : ${clean(payload.firstName)}`,
    `Email : ${clean(payload.email)}`,
    `WhatsApp / téléphone : ${clean(payload.phone) || 'Non renseigné'}`,
    '',
    'Message :',
    clean(payload.message),
  ].join('\n')
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null

  if (!payload) {
    return NextResponse.json({ ok: false, error: 'Payload invalide.' }, { status: 400 })
  }

  const firstName = clean(payload.firstName)
  const email = clean(payload.email)

  if (!firstName || !email || !email.includes('@')) {
    return NextResponse.json(
      { ok: false, error: 'Prénom et email valide requis.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || 'Dossier Studio <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO_EMAIL || defaultRecipient
  const source = clean(payload.source) || 'contact'
  const subject =
    clean(payload.subject) ||
    (source === 'diagnostic'
      ? `Diagnostic Dossier Studio - ${firstName}`
      : `Contact Dossier Studio - ${firstName}`)

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'RESEND_API_KEY manquante dans les variables d’environnement.',
      },
      { status: 500 }
    )
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      text: buildText(payload),
    }),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    console.error('Resend contact send failed', {
      status: response.status,
      details,
    })
    return NextResponse.json(
      {
        ok: false,
        error: "L'envoi n'a pas abouti pour le moment. Tu peux écrire directement à contact@dossier-studio.fr.",
      },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
