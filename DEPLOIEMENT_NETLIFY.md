# Déploiement Netlify

## Réglages recommandés

- Base directory : `dossier-studio` si le dépôt Git contient le dossier parent.
- Build command : `npm run build`
- Publish directory : `.next`
- Node.js : `20`

Ces valeurs sont aussi déclarées dans `netlify.toml`.

## Variables d'environnement à renseigner dans Netlify

- `NEXT_PUBLIC_SITE_URL` : URL publique finale du site.
- `RESEND_API_KEY` : clé API Resend utilisée par le formulaire de contact.
- `RESEND_FROM_EMAIL` : adresse expéditrice vérifiée dans Resend.
- `CONTACT_TO_EMAIL` : adresse de réception des demandes.

## Note Next.js

Le projet utilise Next.js 14. Netlify applique automatiquement son adaptateur OpenNext pour les versions Next.js 13.5 et plus. Il ne faut donc pas épingler `@netlify/plugin-nextjs` sauf besoin volontaire de revenir à un ancien runtime.
