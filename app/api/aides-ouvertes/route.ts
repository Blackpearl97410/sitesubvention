import { NextResponse } from 'next/server'
import { getAidesOuvertes } from '@/lib/aides-ouvertes'

export const revalidate = 86400

export async function GET() {
  const payload = await getAidesOuvertes()

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
