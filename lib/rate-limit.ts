type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
}

type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfter: number
}

const store =
  (globalThis as typeof globalThis & { __dossierStudioRateLimit?: Map<string, RateLimitEntry> })
    .__dossierStudioRateLimit ?? new Map<string, RateLimitEntry>()

;(globalThis as typeof globalThis & { __dossierStudioRateLimit?: Map<string, RateLimitEntry> })
  .__dossierStudioRateLimit = store

function cleanup(now: number) {
  if (store.size < 500) return

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const cfIp = request.headers.get('cf-connecting-ip')?.trim()

  return forwardedFor || realIp || cfIp || 'unknown'
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  cleanup(now)

  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfter: 0,
    }
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    }
  }

  current.count += 1

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    retryAfter: 0,
  }
}
