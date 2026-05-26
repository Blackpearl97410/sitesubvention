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
const defaultRecipient = 'unisonore@gmail.com'
const fallbackContactEmail = 'contact@dossier-studio.fr'
const defaultFromEmail = 'Dossier Studio <contact@dossier-studio.fr>'
const emailTheme = {
  black: '#111111',
  ink: '#F3F1EA',
  paper: '#F5F6F1',
  paper2: '#ECEDE7',
  soft: '#D7D2C8',
  dim: '#A39E95',
  rule: 'rgba(243,241,234,0.18)',
  accent: '#C85232',
  accentDark: '#A7432A',
}

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

function emailShell({
  preheader,
  eyebrow,
  title,
  intro,
  children,
}: {
  preheader: string
  eyebrow: string
  title: string
  intro?: string
  children: string
}) {
  return `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="dark light">
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0;padding:0;background:${emailTheme.black};color:${emailTheme.ink};font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${emailTheme.black};background-image:radial-gradient(circle at 88% 0%, rgba(200,82,50,0.22), transparent 28%),linear-gradient(180deg, rgba(255,255,255,0.04), transparent 36%);">
          <tr>
            <td align="center" style="padding:34px 16px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border-collapse:collapse">
                <tr>
                  <td style="padding:0 0 18px">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align:middle">
                          <p style="margin:0;font-size:12px;line-height:1;text-transform:uppercase;letter-spacing:0.16em;color:${emailTheme.dim};font-weight:700">Dossier Studio</p>
                          <p style="margin:7px 0 0;font-size:13px;line-height:1.5;color:${emailTheme.soft}">De l'idée artistique au dossier finançable.</p>
                        </td>
                        <td align="right" style="vertical-align:middle">
                          <span style="display:inline-block;width:10px;height:10px;border-radius:999px;background:${emailTheme.accent};box-shadow:0 0 18px rgba(200,82,50,0.55)"></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="border:1px solid ${emailTheme.rule};background:${emailTheme.paper};color:#161614">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:12px 18px;border-bottom:1px solid #D0D2CA;background:${emailTheme.paper2}">
                          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:${emailTheme.accent};font-weight:700">${escapeHtml(eyebrow)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:30px 26px 26px">
                          <h1 style="margin:0;color:#121212;font-size:34px;line-height:0.96;text-transform:uppercase;letter-spacing:0;font-weight:900;font-family:Arial Black,Arial,Helvetica,sans-serif">${escapeHtml(title)}</h1>
                          ${
                            intro
                              ? `<p style="margin:18px 0 0;color:#565650;font-size:16px;line-height:1.65">${escapeHtml(intro)}</p>`
                              : ''
                          }
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 26px 30px">
                          ${children}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 2px 0">
                    <p style="margin:0;color:${emailTheme.dim};font-size:12px;line-height:1.6">
                      Dossier Studio · Accompagnement subventions, appels à projets et dossiers culturels.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function calloutHtml(title: string, body: string) {
  return `
    <div style="margin:0 0 22px;padding:18px 18px 17px;background:#161614;color:${emailTheme.ink};border-left:4px solid ${emailTheme.accent}">
      <p style="margin:0 0 7px;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${emailTheme.accent};font-weight:700">${escapeHtml(title)}</p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:${emailTheme.soft}">${escapeHtml(body)}</p>
    </div>
  `
}

function buttonHtml(label: string, href: string) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:22px 0 0">
      <tr>
        <td style="background:${emailTheme.accent};border:1px solid ${emailTheme.accentDark}">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:13px 18px;color:#ffffff;text-decoration:none;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;font-weight:700">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `
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
  const title = payload.source === 'diagnostic' ? 'Nouvelle demande de diagnostic' : 'Nouveau message site'
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

  const content = `
    ${calloutHtml(
      `${qualification.priority} · score ${qualification.score}/8`,
      qualification.nextAction
    )}
    <div style="margin:0 0 22px;padding:18px;border:1px solid #D0D2CA;background:#FFFFFF">
      <p style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${emailTheme.accent};font-weight:700">Signaux de qualification</p>
      <ul style="margin:0;padding-left:20px;color:#161614;font-size:14px;line-height:1.7">
        ${qualification.signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join('')}
      </ul>
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#FFFFFF;border:1px solid #D0D2CA">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="width:190px;padding:13px 14px;border-bottom:1px solid #E4E5DE;color:#85857E;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;vertical-align:top">${escapeHtml(label)}</td>
              <td style="padding:13px 14px;border-bottom:1px solid #E4E5DE;color:#161614;font-size:15px;line-height:1.55;white-space:pre-wrap;vertical-align:top">${escapeHtml(value)}</td>
            </tr>
          `
        )
        .join('')}
    </table>
    ${buttonHtml('Répondre au prospect', `mailto:${payload.email}`)}
  `

  return emailShell({
    preheader: `${qualification.priority} - ${payload.firstName}`,
    eyebrow: payload.source === 'diagnostic' ? 'Diagnostic entrant' : 'Contact entrant',
    title,
    intro: 'Une nouvelle demande vient d’arriver depuis le site. Voici la synthèse exploitable pour traiter le lead rapidement.',
    children: content,
  })
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
  const intro =
    payload.source === 'diagnostic'
      ? 'Je vais regarder votre profil de projet, votre statut et votre niveau de budget afin de vous répondre avec une première orientation claire.'
      : 'Je vais prendre connaissance de votre projet afin de vous répondre avec une première orientation claire.'

  const content = `
    <div style="padding:20px;border:1px solid #D0D2CA;background:#FFFFFF">
      <p style="margin:0 0 16px;color:#161614;font-size:16px;line-height:1.7">Bonjour ${escapeHtml(payload.firstName)},</p>
      <p style="margin:0 0 16px;color:#161614;font-size:16px;line-height:1.7">Merci pour votre message. Votre demande a bien été reçue par <strong>Dossier Studio</strong>.</p>
      <p style="margin:0;color:#565650;font-size:16px;line-height:1.7">${escapeHtml(intro)}</p>
    </div>
    ${calloutHtml('Réponse habituelle', 'Sous 48h ouvrées, avec une première orientation claire sur votre dossier.')}
    <p style="margin:0;color:#565650;font-size:14px;line-height:1.7">
      Si vous souhaitez ajouter un document, un calendrier ou un lien de présentation, vous pouvez répondre directement à cet email ou écrire à
      <a href="mailto:${escapeHtml(contactEmail)}" style="color:${emailTheme.accent};text-decoration:underline;text-underline-offset:3px">${escapeHtml(contactEmail)}</a>.
    </p>
    ${buttonHtml('Ajouter une information', `mailto:${contactEmail}`)}
  `

  return emailShell({
    preheader: 'Votre demande a bien été reçue par Dossier Studio.',
    eyebrow: 'Demande reçue',
    title: 'Message bien reçu',
    intro: 'Merci pour votre confiance. Votre demande entre maintenant en phase de lecture et de qualification.',
    children: content,
  })
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
  const from = process.env.RESEND_FROM_EMAIL || defaultFromEmail
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
