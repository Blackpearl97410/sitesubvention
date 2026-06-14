# Mini-audit technique V1 - Dossier Studio

Date : 2026-05-31
Portee : `dossier-studio` uniquement.
Stack observee : Next.js 14 App Router, React 18, routes API Next, fonction Netlify planifiee, Resend, Turso.

Mise a jour apres corrections : le projet est passe a Next.js 16.2.6 / React 19.2.6 pour traiter les advisories hautes/critique visibles sur la ligne 14.

## Synthese executive

Le site a deja de bons reflexes : les secrets principaux sont cote serveur, `.env.local` est ignore par Git, les requetes SQL Turso utilisent des parametres, et les contenus injectes dans les emails HTML sont echappes.

Pour une V1 publique, les corrections prioritaires sont :

1. Mettre a jour Next.js, car `npm audit --omit=dev` remonte une vulnerabilite critique corrigee en `14.2.35`.
2. Ajouter une validation serveur stricte et des limites de taille sur `/api/contact`.
3. Ajouter du rate limiting sur `/api/contact` et `/api/espace-client`.
4. Ajouter des headers de securite via `next.config.js` ou Netlify.
5. Reduire le risque de fuite de token dans l'espace client en evitant le token en query string.

## Points positifs

- Secrets : `RESEND_API_KEY`, `TURSO_AUTH_TOKEN`, `CLIENT_ACCESS_SECRET` sont utilises dans des routes serveur ou libs serveur, sans prefixe `NEXT_PUBLIC_`.
- Git hygiene : `.gitignore` ignore `.env.local` et `.env.*.local`.
- SQL : les requetes Turso de l'espace client utilisent des placeholders `?` avec `args`.
- Email HTML : les donnees prospects sont echappees avec `escapeHtml()` avant insertion dans les templates email.
- Honeypot : `/api/contact` ignore les soumissions avec le champ `website`, utile contre une partie du spam simple.

## Findings prioritaires

### SEC-001 - Next.js vulnerable selon `npm audit`

Severity : Critical
Statut : Corrige pour les vulnérabilités critique/hautes par upgrade vers `next@16.2.6`.
Location : `package.json`, ligne 20
Evidence : `next` est fixe en `14.2.5`. `npm audit --omit=dev --json` remonte `next` avec une severite critique et propose `14.2.35` comme correction sans changement majeur.
Impact : exposition a plusieurs advisories Next.js, dont authorization bypass / DoS / cache poisoning selon les chemins exploites.
Fix : mettre a jour `next` vers `14.2.35`, et idealement aligner `eslint-config-next` sur `14.2.35`, puis lancer `npm install`, `npm run build`, et un test formulaire.
Priorite V1 : Indispensable avant mise en ligne.

### SEC-002 - Validation serveur insuffisante sur le formulaire de contact

Severity : High
Statut : Corrige sur `/api/contact` avec Zod, limites de longueur et limite de taille payload.
Location : `app/api/contact/route.ts`, lignes 430-449
Evidence : le payload JSON est accepte puis seulement `firstName`, `email` et `email.includes('@')` sont controles.
Impact : spam plus facile, champs inattendus, tailles non limitees, emails invalides, donnees incoherentes dans Resend, risque de cout/abus et de logs bruités.
Fix : ajouter un schema de validation runtime, par exemple Zod, avec longueurs max, enum pour `source/status/projectType/budget`, email valide, message max, phone max, et rejet des champs trop grands.
Priorite V1 : Indispensable si le formulaire est public.

### SEC-003 - Absence de rate limiting visible sur les routes exposées

Severity : High
Statut : Corrige sur `/api/contact` avec limitation IP en mémoire par fenêtre de 10 minutes. A renforcer plus tard par une solution distribuée si trafic élevé.
Location : `app/api/contact/route.ts`, ligne 430 ; `app/api/espace-client/route.ts`, ligne 40
Evidence : aucune logique de limitation IP/token n'est visible avant l'envoi Resend ou la verification Turso.
Impact : spam formulaire, couts Resend, brute force de tokens espace client, degradation du service.
Fix : ajouter un rate limiter par IP sur `/api/contact`; sur `/api/espace-client`, limiter par IP et par hash/empreinte de token rate-limitable sans logger le token.
Priorite V1 : Indispensable pour `/api/contact`, fortement recommande pour `/api/espace-client` si active en production.

### SEC-004 - Headers de securite non configures dans l'app

Severity : Medium
Statut : Corrige avec headers globaux dans `next.config.js`.
Location : `next.config.js`, lignes 2-14 ; `netlify.toml`, lignes 1-11
Evidence : pas de `headers()` Next.js et pas de bloc Netlify `[[headers]]`.
Impact : protections navigateur manquantes ou dependantes de la plateforme : clickjacking, sniffing MIME, referrer leakage, permissions browser, CSP defense-in-depth.
Fix : ajouter au minimum `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` ou CSP `frame-ancestors 'none'`, `Permissions-Policy`, et une CSP progressive compatible avec Next/Spline/Cal si ces integrations sont gardees.
Priorite V1 : Recommande avant mise en ligne. CSP stricte peut etre V1.1 si elle demande ajustements.

### SEC-005 - Token espace client accepte en query string

Severity : Medium
Location : `app/api/espace-client/route.ts`, lignes 36-38
Evidence : `readAccessToken()` lit `x-client-access-token` ou `request.nextUrl.searchParams.get('token')`.
Impact : les tokens en URL peuvent fuiter via historique navigateur, captures, logs proxy/CDN, referers vers ressources tierces selon la navigation.
Fix : preferer le header ou un cookie HttpOnly/SameSite ; si le token en URL est conserve pour onboarding, l'echanger immediatement contre un cookie et rediriger vers l'URL sans token.
Priorite V1 : A faire avant d'utiliser l'espace client avec de vraies donnees.

### SEC-006 - Messages d'erreur serveur trop explicites

Severity : Low
Statut : Corrige pour `/api/contact`; reste a harmoniser sur `/api/espace-client` si l'espace client passe en production.
Location : `app/api/contact/route.ts`, lignes 459-466 ; `app/api/espace-client/route.ts`, lignes 47-60 et 121-126
Evidence : les reponses publiques mentionnent des variables d'environnement internes (`RESEND_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`).
Impact : faible exposition d'informations techniques, utile pour reconnaissance et peu premium pour l'utilisateur.
Fix : retourner un message generique cote client, logger le detail cote serveur.
Priorite V1 : Simple et recommande.

## Reponses au prompt de l'image, adaptees au site

| Sujet | Etat actuel | Priorite V1 | Recommandation |
|---|---|---:|---|
| Cles API cote serveur | Globalement OK | Haute | Garder Resend/Turso/secret hors `NEXT_PUBLIC_`; verifier que `.env.local` n'est jamais commit. |
| Rate limiting | Non visible | Tres haute | Ajouter sur `/api/contact`, puis `/api/espace-client`. |
| Validation inputs | Trop legere | Tres haute | Ajouter Zod ou equivalent cote serveur. |
| CORS + Helmet + CSP | Non visible | Moyenne | Helmet n'est pas necessaire en Next ; ajouter headers via `next.config.js` ou Netlify. |
| Logs et alertes | Logs erreur seulement | Moyenne | Logger tentatives rate-limit, erreurs Resend/Turso, sans secret/token. Alertes en V2. |

## Priorisation V1

### Must-have avant mise en ligne

1. Upgrade `next` vers `14.2.35` et rebuild.
2. Validation stricte de `/api/contact`.
3. Rate limiting de `/api/contact`.
4. Headers minimum hors CSP stricte.
5. Erreurs publiques generiques.

### Si l'espace client est actif en V1

1. Rate limiting de `/api/espace-client`.
2. Suppression ou echange immediat du token en query string.
3. Expiration par defaut des tokens client.
4. Verifier que `/espace-client` ne sert pas de donnees reelles statiques si l'API est censee devenir source de verite.

### Peut attendre V2

1. Alerting avance Slack/email sur activite suspecte.
2. CSP stricte avec nonce si integrations tierces complexes.
3. Journalisation structuree centralisee.
4. WAF / bot management selon hebergeur et volume.

## Commandes executees

- `rg --files`
- inspection de `next.config.js`, `netlify.toml`, `.env.example`, `.env.local` avec valeurs masquees
- inspection des routes API
- inspection des formulaires client
- `npm audit --omit=dev --json`
- apres corrections : `npm run build`, `npm run lint`, tests `curl` locaux sur `/api/contact` et `/contact`

## Limites de l'audit

Cet audit est statique. Les headers reellement servis par Netlify/Vercel/CDN doivent etre verifies apres deploiement avec une requete runtime. Aucun test d'intrusion actif n'a ete effectue.
