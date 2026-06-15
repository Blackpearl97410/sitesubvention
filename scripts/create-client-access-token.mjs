import { randomBytes, createHash } from 'node:crypto'

const dossierId = process.argv[2] || 'dossier_sortie_ep_2026'
const providedToken = process.argv[3]
const token = providedToken || randomBytes(24).toString('base64url')
const secret = process.env.CLIENT_ACCESS_SECRET

if (!secret) {
  console.error('Missing CLIENT_ACCESS_SECRET.')
  console.error('Example: CLIENT_ACCESS_SECRET="..." npm run client:token -- dossier_sortie_ep_2026')
  process.exit(1)
}

const tokenHash = createHash('sha256').update(`${secret}:${token}`).digest('hex')
const tokenId = `access_${randomBytes(10).toString('hex')}`

console.log('Client access URL token:')
console.log(token)
console.log('')
console.log('SQL to run in Turso:')
console.log(`
insert into client_access_tokens (
  id,
  dossier_id,
  token_hash,
  label,
  expires_at
) values (
  '${tokenId}',
  '${dossierId.replaceAll("'", "''")}',
  '${tokenHash}',
  'Acces client principal',
  null
);
`.trim())
