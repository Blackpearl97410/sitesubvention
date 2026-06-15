import { createHash } from 'crypto'

export function hashClientAccessToken(token: string) {
  const normalizedToken = token.trim()

  if (!normalizedToken) {
    throw new Error('Missing client access token')
  }

  if (!process.env.CLIENT_ACCESS_SECRET) {
    throw new Error('Missing CLIENT_ACCESS_SECRET')
  }

  return createHash('sha256')
    .update(`${process.env.CLIENT_ACCESS_SECRET}:${normalizedToken}`)
    .digest('hex')
}
