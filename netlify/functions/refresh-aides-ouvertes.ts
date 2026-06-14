export default async function handler() {
  const siteUrl =
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://dossier-studio.fr'

  const endpoint = new URL('/api/aides-ouvertes', siteUrl)
  const response = await fetch(endpoint, {
    headers: {
      'user-agent': 'DossierStudioRefresh/1.0 (+https://dossier-studio.fr)',
    },
  })

  if (!response.ok) {
    return new Response(`Refresh failed: ${response.status}`, { status: 500 })
  }

  const payload = await response.json().catch(() => null)
  const count = Array.isArray(payload?.items) ? payload.items.length : 0

  return Response.json({
    ok: true,
    refreshedAt: new Date().toISOString(),
    endpoint: endpoint.toString(),
    count,
  })
}
