import { createClient, type Client } from '@libsql/client'

let client: Client | null = null

export function hasTursoConfig() {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN)
}

export function getTursoClient() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN')
  }

  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }

  return client
}
