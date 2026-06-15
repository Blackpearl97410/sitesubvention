import { NextRequest, NextResponse } from 'next/server'
import { hashClientAccessToken } from '@/lib/client-access'
import { getTursoClient, hasTursoConfig } from '@/lib/turso'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type DossierRow = {
  id: string
  title: string
  client_name: string
  status_label: string
  summary: string
  current_step: string
  next_action: string
  missing_count: number
  updated_at: string
}

type DocumentRow = {
  id: string
  title: string
  status: string
  detail: string
  priority_label: string
  sort_order: number
}

type ActivityRow = {
  id: string
  label: string
  body: string
  created_at: string
}

const rateLimitWindowMs = 60_000
const maxAttemptsPerWindow = 12
const attempts = new Map<string, { count: number; resetAt: number }>()

function readAccessToken(request: NextRequest) {
  return request.headers.get('x-client-access-token') || request.nextUrl.searchParams.get('token') || ''
}

function getClientKey(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'local'
  )
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = attempts.get(key)

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + rateLimitWindowMs })
    return false
  }

  current.count += 1
  return current.count > maxAttemptsPerWindow
}

const noStoreHeaders = { 'Cache-Control': 'no-store' }

export async function GET(request: NextRequest) {
  const clientKey = getClientKey(request)

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessaie dans une minute.' },
      { status: 429, headers: noStoreHeaders }
    )
  }

  const token = readAccessToken(request)

  if (!token.trim()) {
    return NextResponse.json(
      { error: 'Token d’accès manquant.' },
      { status: 401, headers: noStoreHeaders }
    )
  }

  if (!hasTursoConfig()) {
    return NextResponse.json(
      { error: "L'espace client n'est pas encore disponible sur cet environnement." },
      { status: 503, headers: noStoreHeaders }
    )
  }

  let tokenHash: string

  try {
    tokenHash = hashClientAccessToken(token)
  } catch {
    return NextResponse.json(
      { error: "L'espace client n'est pas encore disponible sur cet environnement." },
      { status: 500, headers: noStoreHeaders }
    )
  }

  try {
    const db = getTursoClient()

    const dossierResult = await db.execute({
      sql: `
        select
          d.id,
          d.title,
          c.display_name as client_name,
          d.status_label,
          d.summary,
          d.current_step,
          d.next_action,
          d.missing_count,
          d.updated_at
        from client_access_tokens t
        join dossiers d on d.id = t.dossier_id
        join clients c on c.id = d.client_id
        where t.token_hash = ?
          and t.revoked_at is null
          and (t.expires_at is null or t.expires_at > datetime('now'))
        limit 1
      `,
      args: [tokenHash],
    })

    const dossier = dossierResult.rows[0] as unknown as DossierRow | undefined

    if (!dossier) {
      return NextResponse.json(
        { error: 'Accès invalide ou expiré.' },
        { status: 403, headers: noStoreHeaders }
      )
    }

    const [documentsResult, activityResult] = await Promise.all([
      db.execute({
        sql: `
          select id, title, status, detail, priority_label, sort_order
          from dossier_documents
          where dossier_id = ?
          order by sort_order asc, created_at asc
        `,
        args: [dossier.id],
      }),
      db.execute({
        sql: `
          select id, label, body, created_at
          from dossier_activity
          where dossier_id = ?
          order by created_at desc
          limit 8
        `,
        args: [dossier.id],
      }),
      db.execute({
        sql: `
          update client_access_tokens
          set last_used_at = datetime('now')
          where token_hash = ?
        `,
        args: [tokenHash],
      }),
    ])

    return NextResponse.json(
      {
        dossier,
        documents: documentsResult.rows as unknown as DocumentRow[],
        activity: activityResult.rows as unknown as ActivityRow[],
      },
      { headers: noStoreHeaders }
    )
  } catch (error) {
    console.error('Turso espace client error', error)

    return NextResponse.json(
      { error: 'Service temporairement indisponible.' },
      { status: 502, headers: noStoreHeaders }
    )
  }
}
