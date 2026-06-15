import { createClient, type Client } from '@libsql/client'

let client: Client | null = null

function getDatabaseUrl() {
  if (process.env.NODE_ENV !== 'production' && process.env.LOCAL_CLIENT_DATABASE_URL) {
    return process.env.LOCAL_CLIENT_DATABASE_URL
  }

  return process.env.TURSO_DATABASE_URL
}

export function hasTursoConfig() {
  const databaseUrl = getDatabaseUrl()
  return Boolean(databaseUrl && (databaseUrl.startsWith('file:') || process.env.TURSO_AUTH_TOKEN))
}

export function getTursoClient() {
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('Missing database URL')
  }

  if (!databaseUrl.startsWith('file:') && !process.env.TURSO_AUTH_TOKEN) {
    throw new Error('Missing TURSO_AUTH_TOKEN')
  }

  if (!client) {
    client = createClient({
      url: databaseUrl,
      authToken: databaseUrl.startsWith('file:') ? undefined : process.env.TURSO_AUTH_TOKEN,
    })
  }

  return client
}
