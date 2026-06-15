# Déploiement Netlify

## Réglages recommandés

- Base directory : `dossier-studio` si le dépôt Git contient le dossier parent.
- Build command : `npm run build`
- Publish directory : `.next`
- Node.js : `20`

Ces valeurs sont aussi déclarées dans `netlify.toml`.

## Variables d'environnement à renseigner dans Netlify

- `NEXT_PUBLIC_SITE_URL` : `https://dossier-studio.fr`
- `RESEND_API_KEY` : clé API Resend utilisée par le formulaire de contact.
- `RESEND_FROM_EMAIL` : adresse expediteur verifiee dans Resend, au format `Nom <email@domaine.fr>`.
- `CONTACT_TO_EMAIL` : adresse de reception des demandes.
- `PUBLIC_CONTACT_EMAIL` : adresse publique affichee sur le site.
- `RESEND_AUTO_REPLY` : `true`

## DNS mail à créer dans Netlify

Le domaine utilise les DNS Netlify. Pour conserver Netlify pour le site web tout en recevant les emails via LWS, ajouter ces enregistrements dans la zone DNS Netlify :

| Type | Nom | Valeur | Priorité | TTL |
|---|---|---|---|---|
| A | `mail` | `213.255.195.67` | - | Auto |
| MX | `@` | `mail.dossier-studio.fr` | `10` | Auto |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | - | Auto |

Ne pas supprimer les enregistrements web Netlify existants pour `dossier-studio.fr` et `www`.

Après propagation, vérifier :

```bash
dig MX dossier-studio.fr
dig A mail.dossier-studio.fr
dig TXT _dmarc.dossier-studio.fr
```

Résultat attendu :

- `MX dossier-studio.fr` retourne `10 mail.dossier-studio.fr.`
- `A mail.dossier-studio.fr` retourne `213.255.195.67`
- `_dmarc.dossier-studio.fr` retourne `v=DMARC1; p=none;`

## Note Next.js

Le projet utilise Next.js 14. Netlify applique automatiquement son adaptateur OpenNext pour les versions Next.js 13.5 et plus. Il ne faut donc pas épingler `@netlify/plugin-nextjs` sauf besoin volontaire de revenir à un ancien runtime.
