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

function readAccessToken(request: NextRequest) {
  return request.headers.get('x-client-access-token') || request.nextUrl.searchParams.get('token') || ''
}

export async function GET(request: NextRequest) {
  const token = readAccessToken(request)

  if (!token.trim()) {
    return NextResponse.json(
      { error: 'Token d’accès manquant.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  if (!hasTursoConfig()) {
    return NextResponse.json(
      { error: 'Base Turso non configurée sur cet environnement.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  let tokenHash: string

  try {
    tokenHash = hashClientAccessToken(token)
  } catch {
    return NextResponse.json(
      { error: 'Configuration d’accès incomplète.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
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
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
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
    ])

    return NextResponse.json(
      {
        dossier,
        documents: documentsResult.rows as unknown as DocumentRow[],
        activity: activityResult.rows as unknown as ActivityRow[],
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Turso espace client error', error)

    return NextResponse.json(
      { error: 'Service temporairement indisponible.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
