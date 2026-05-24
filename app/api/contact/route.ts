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
  website?: string
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const defaultRecipient = 'lablackbox974@gmail.com'
const fallbackContactEmail = 'contact@dossier-studio.fr'

function clean(value?: string) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function labelFromValue(
  value: string,
  labels: Record<string, string>,
  fallback = 'Non renseigné'
) {
  if (!value) return fallback
  return labels[value] || value
}

function normalizePayload(payload: ContactPayload) {
  const source = clean(payload.source) || 'contact'
  const firstName = clean(payload.firstName)
  const email = clean(payload.email).toLowerCase()
  const phone = clean(payload.phone)
  const message = clean(payload.message)
  const status = clean(payload.status)
  const projectType = clean(payload.projectType)
  const budget = clean(payload.budget)

  return {
    source,
    firstName,
    email,
    phone,
    message,
    status,
    projectType,
    budget,
    statusLabel: labelFromValue(status, {
      association: 'Association',
      societe: 'Société',
      artiste: 'Artiste-auteur',
      aucun: 'Pas encore de structure',
    }),
    projectLabel: labelFromValue(projectType, {
      production: 'Production phonographique',
      'clip-video': 'Clip musical / vidéo',
      documentaire: 'Documentaire',
      spectacle: 'Spectacle & tournée',
      structuration: 'Structuration & fonctionnement',
      autre: 'Autre',
    }),
    budgetLabel: labelFromValue(budget, {
      moins10: 'Moins de 10 000 €',
      '10a50': 'Entre 10 000 € et 50 000 €',
      plus50: 'Plus de 50 000 €',
    }),
  }
}

function qualifyDemand(payload: ReturnType<typeof normalizePayload>) {
  let score = 0
  const signals: string[] = []

  if (payload.source === 'diagnostic') {
    score += 2
    signals.push('Demande issue du diagnostic')
  }

  if (payload.phone) {
    score += 1
    signals.push('Téléphone / WhatsApp fourni')
  }

  if (payload.budget === '10a50') {
    score += 2
    signals.push('Budget intermédiaire')
  }

  if (payload.budget === 'plus50') {
    score += 3
    signals.push('Budget élevé')
  }

  if (payload.projectType === 'production' || payload.projectType === 'structuration') {
    score += 1
    signals.push('Projet compatible avec les dispositifs prioritaires')
  }

  if (payload.message.length > 180) {
    score += 1
    signals.push('Message détaillé')
  }

  const priority =
    score >= 5 ? 'Priorité haute' : score >= 3 ? 'Priorité moyenne' : 'À qualifier'

  const nextAction =
    score >= 5
      ? 'Répondre rapidement et proposer un échange court pour cadrer le dossier.'
      : score >= 3
        ? 'Répondre avec 2-3 questions de cadrage puis proposer un rendez-vous si le besoin est confirmé.'
        : 'Demander des précisions sur le projet, le calendrier et le dispositif visé.'

  return {
    score,
    priority,
    nextAction,
    signals: signals.length ? signals : ['Demande à qualifier manuellement'],
  }
}

function buildOwnerText(payload: ReturnType<typeof normalizePayload>) {
  const qualification = qualifyDemand(payload)

  if (payload.source === 'diagnostic') {
    return [
      'Nouvelle demande de diagnostic Dossier Studio',
      '',
      `Priorité : ${qualification.priority}`,
      `Score : ${qualification.score}/8`,
      `Action recommandée : ${qualification.nextAction}`,
      '',
      'Signaux :',
      ...qualification.signals.map((signal) => `- ${signal}`),
      '',
      `Prénom : ${payload.firstName}`,
      `Email : ${payload.email}`,
      `WhatsApp / téléphone : ${payload.phone || 'Non renseigné'}`,
      `Statut : ${payload.statusLabel}`,
      `Projet : ${payload.projectLabel}`,
      `Budget : ${payload.budgetLabel}`,
    ].join('\n')
  }

  return [
    'Nouveau message depuis le site Dossier Studio',
    '',
    `Priorité : ${qualification.priority}`,
    `Score : ${qualification.score}/8`,
    `Action recommandée : ${qualification.nextAction}`,
    '',
    'Signaux :',
    ...qualification.signals.map((signal) => `- ${signal}`),
    '',
    `Prénom : ${payload.firstName}`,
    `Email : ${payload.email}`,
    `WhatsApp / téléphone : ${payload.phone || 'Non renseigné'}`,
    '',
    'Message :',
    payload.message || 'Non renseigné',
  ].join('\n')
}

function buildOwnerHtml(payload: ReturnType<typeof normalizePayload>) {
  const qualification = qualifyDemand(payload)
  const rows =
    payload.source === 'diagnostic'
      ? [
          ['Prénom', payload.firstName],
          ['Email', payload.email],
          ['WhatsApp / téléphone', payload.phone || 'Non renseigné'],
          ['Statut', payload.statusLabel],
          ['Projet', payload.projectLabel],
          ['Budget', payload.budgetLabel],
        ]
      : [
          ['Prénom', payload.firstName],
          ['Email', payload.email],
          ['WhatsApp / téléphone', payload.phone || 'Non renseigné'],
          ['Message', payload.message || 'Non renseigné'],
        ]

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;color:#171717">
      <p style="margin:0 0 10px;text-transform:uppercase;letter-spacing:.08em;font-size:12px;color:#c85232">Dossier Studio</p>
      <h1 style="margin:0 0 18px;font-size:24px;line-height:1.2">${payload.source === 'diagnostic' ? 'Nouvelle demande de diagnostic' : 'Nouveau message site'}</h1>
      <div style="padding:16px 18px;background:#f6f2ec;border-left:4px solid #c85232;margin-bottom:20px">
        <p style="margin:0 0 6px"><strong>${escapeHtml(qualification.priority)}</strong> · score ${qualification.score}/8</p>
        <p style="margin:0">${escapeHtml(qualification.nextAction)}</p>
      </div>
      <h2 style="font-size:16px;margin:0 0 10px">Signaux de qualification</h2>
      <ul style="margin:0 0 20px;padding-left:20px">
        ${qualification.signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join('')}
      </ul>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width:190px;padding:10px;border-top:1px solid #e5ded4;color:#6f6a63">${escapeHtml(label)}</td>
                <td style="padding:10px;border-top:1px solid #e5ded4;white-space:pre-wrap">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join('')}
      </table>
    </div>
  `
}

function buildAutoReplyText(payload: ReturnType<typeof normalizePayload>, contactEmail: string) {
  return [
    `Bonjour ${payload.firstName},`,
    '',
    'Merci pour votre message. Votre demande a bien été reçue par Dossier Studio.',
    '',
    payload.source === 'diagnostic'
      ? 'Je vais regarder votre profil de projet, votre statut et votre niveau de budget afin de vous répondre avec une première orientation claire.'
      : 'Je vais prendre connaissance de votre projet afin de vous répondre avec une première orientation claire.',
    '',
    'Réponse habituelle : sous 48h ouvrées.',
    '',
    `Si vous souhaitez ajouter un document, un calendrier ou un lien de présentation, vous pouvez répondre directement à cet email ou écrire à ${contactEmail}.`,
    '',
    'À bientôt,',
    'Dossier Studio',
  ].join('\n')
}

function buildAutoReplyHtml(payload: ReturnType<typeof normalizePayload>, contactEmail: string) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;color:#171717;line-height:1.6">
      <p>Bonjour ${escapeHtml(payload.firstName)},</p>
      <p>Merci pour votre message. Votre demande a bien été reçue par <strong>Dossier Studio</strong>.</p>
      <p>${
        payload.source === 'diagnostic'
          ? 'Je vais regarder votre profil de projet, votre statut et votre niveau de budget afin de vous répondre avec une première orientation claire.'
          : 'Je vais prendre connaissance de votre projet afin de vous répondre avec une première orientation claire.'
      }</p>
      <p><strong>Réponse habituelle :</strong> sous 48h ouvrées.</p>
      <p>Si vous souhaitez ajouter un document, un calendrier ou un lien de présentation, vous pouvez répondre directement à cet email ou écrire à <a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a>.</p>
      <p>À bientôt,<br>Dossier Studio</p>
    </div>
  `
}

async function sendEmail(apiKey: string, body: Record<string, unknown>) {
  return fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

function buildSubject(payload: ReturnType<typeof normalizePayload>) {
  const qualification = qualifyDemand(payload)
  const source = payload.source || 'contact'
  const prefix = qualification.priority === 'Priorité haute' ? '[PRIORITAIRE]' : '[Site]'
  return source === 'diagnostic'
    ? `${prefix} Diagnostic - ${payload.firstName} - ${payload.projectLabel}`
    : `${prefix} Contact - ${payload.firstName}`
}

function priorityTag(priority: string) {
  if (priority === 'Priorité haute') return 'high'
  if (priority === 'Priorité moyenne') return 'medium'
  return 'qualify'
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null

  if (!payload) {
    return NextResponse.json({ ok: false, error: 'Payload invalide.' }, { status: 400 })
  }

  if (clean(payload.website)) {
    return NextResponse.json({ ok: true })
  }

  const normalized = normalizePayload(payload)
  const firstName = normalized.firstName
  const email = normalized.email

  if (!firstName || !email || !email.includes('@')) {
    return NextResponse.json(
      { ok: false, error: 'Prénom et email valide requis.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || 'Dossier Studio <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO_EMAIL || defaultRecipient
  const contactEmail = process.env.PUBLIC_CONTACT_EMAIL || to || fallbackContactEmail
  const autoReplyEnabled = process.env.RESEND_AUTO_REPLY !== 'false'
  const subject = clean(payload.subject) || buildSubject(normalized)

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'RESEND_API_KEY manquante dans les variables d’environnement.',
      },
      { status: 500 }
    )
  }

  const ownerResponse = await sendEmail(apiKey, {
    from,
    to,
    reply_to: email,
    subject,
    text: buildOwnerText(normalized),
    html: buildOwnerHtml(normalized),
    tags: [
      { name: 'source', value: normalized.source },
      { name: 'priority', value: priorityTag(qualifyDemand(normalized).priority) },
    ],
  })

  if (!ownerResponse.ok) {
    const details = await ownerResponse.text().catch(() => '')
    console.error('Resend contact send failed', {
      status: ownerResponse.status,
      details,
    })
    return NextResponse.json(
      {
        ok: false,
        error: `L'envoi n'a pas abouti pour le moment. Tu peux écrire directement à ${contactEmail}.`,
      },
      { status: 502 }
    )
  }

  if (autoReplyEnabled) {
    const autoReplyResponse = await sendEmail(apiKey, {
      from,
      to: email,
      reply_to: contactEmail,
      subject: 'Votre demande a bien été reçue - Dossier Studio',
      text: buildAutoReplyText(normalized, contactEmail),
      html: buildAutoReplyHtml(normalized, contactEmail),
      tags: [
        { name: 'source', value: normalized.source },
        { name: 'category', value: 'auto-reply' },
      ],
    })

    if (!autoReplyResponse.ok) {
      const details = await autoReplyResponse.text().catch(() => '')
      console.error('Resend auto-reply failed', {
        status: autoReplyResponse.status,
        details,
      })
    }
  }

  return NextResponse.json({ ok: true })
}
