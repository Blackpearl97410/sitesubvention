# Audit production - Dossier Studio - 2026-06-14

## Synthese

Audit realise sur le site local Next.js 16.2.6 : SEO, GEO/LLM SEO, accessibilite, performance, securite, API, emails, RGPD et qualite de code.

Etat apres corrections : pret pour une preproduction, avec quelques verifications de production encore necessaires.

Note SEO globale apres corrections : 88/100.

## Corrections appliquees

- CSP complete ajoutee dans `next.config.js`, avec HSTS uniquement en production.
- Headers securite confirmes : CSP, Referrer-Policy, X-Content-Type-Options, X-Frame-Options, Permissions-Policy.
- Route contact durcie : rejet des mauvais `Content-Type`, limite de taille, rate limiting, honeypot.
- Route espace client durcie : `Cache-Control: no-store`, erreurs moins bavardes.
- Formulaires contact et diagnostic ameliores : honeypot UI, `autocomplete`, `name`, `maxLength`, roles `alert/status`.
- Home corrigee : un seul H1.
- Diagnostic corrige : H1 semantique ajoute.
- Page dupliquee `/methode` supprimee ; redirection permanente vers `/comment-ca-fonctionne`.
- JSON-LD rendu en scripts natifs `application/ld+json`.
- Section aides ouvertes elargie aux 12 aides Mon Projet Musique visibles en premiere page.
- Barres laterales nettoyees des libelles internes non clients.

## SEO technique

Points OK :
- Titles uniques sur les pages publiques.
- Meta descriptions presentes.
- Canonical presentes.
- Open Graph et Twitter Card presents.
- Sitemap et robots generes.
- URLs propres.
- Redirection `/methode` -> `/comment-ca-fonctionne` en 308.
- H1 unique sur les routes principales apres correction.
- Alt images OK sur les routes controlees.
- Favicon et manifest presents.
- Pages legales en `noIndex`.

Points a surveiller :
- `NEXT_PUBLIC_SITE_URL` doit valoir `https://dossier-studio.fr` en production, sinon sitemap/canonical peuvent sortir avec une mauvaise origine.
- Quelques titres visuels contiennent des retours ligne qui collent les mots dans l'extraction DOM, sans bloquer l'indexation.

## GEO / LLM SEO

Points forts :
- Positionnement clair : accompagnement au montage de dossiers d'aides musicales et culturelles.
- `llms.txt`, `llms-full.txt` et `ai.txt` presents.
- Schema.org global : ProfessionalService, WebSite, OfferCatalog, ItemList.
- FAQPage sur la home.
- Pages services et dispositifs structurees.
- Contact, territoire, expertise et limites de promesse presents.

Ameliorations conseillees :
- Ajouter une page "Questions frequentes aides musicales" plus conversationnelle.
- Ajouter 2 a 3 cas clients plus detailles, meme anonymises.
- Ajouter une section "Ce que Dossier Studio ne fait pas" pour renforcer la confiance.
- Ajouter des dates de mise a jour visibles sur les pages dispositifs.

## Performance

Constats :
- Build production OK.
- Static assets `.next/static` : environ 1.9 MB.
- Plus gros chunks JS observes : environ 501 KB, 221 KB, 142 KB.
- Images institutionnelles encore en `<img>` dans `Credibilite.tsx`, warnings Next.
- Animations Framer Motion, shader et Cal.com peuvent peser sur mobile.

Priorites restantes :
- Remplacer les `<img>` institutionnels par `next/image`.
- Charger Cal.com seulement apres intention utilisateur si besoin de performance maximale.
- Revoir le shader/3D sur mobile ou sous `prefers-reduced-motion`.

## Securite / API

Points OK :
- Validation serveur avec Zod.
- Echappement HTML des emails.
- Rate limiting contact.
- Honeypot.
- Pas de secrets exposes en client dans les composants controles.
- Pas de CORS permissif visible.
- SQL via requetes parametrees.

Points a surveiller :
- `npm audit --omit=dev` signale une vulnerabilite moderee PostCSS via Next. Le correctif propose par npm est incoherent ; surveiller une mise a jour Next corrigee.
- Acces espace client accepte encore un token en query string. Preferer a terme header/cookie court terme pour eviter fuite dans historiques/logs.
- Le rate limiting memoire est suffisant pour petit trafic, mais a remplacer par Redis/edge rate limit en production a trafic reel.

## Emails / RGPD

Points OK :
- Separation email admin et auto-reply.
- `reply_to` admin vers le prospect.
- Templates HTML echappes.
- Consentement RGPD visible sous formulaire.
- Politique de confidentialite presente.

Checklist DNS manuelle :
- SPF autorise le domaine d'envoi.
- DKIM configure chez Resend.
- DMARC present avec reporting.
- MX du domaine valides.
- Domaine d'envoi aligne avec `From`.
- `Reply-To` coherent avec l'adresse de contact.
- Reputation domaine a verifier apres premiers envois.

## Verifications effectuees

- `npm run lint` : 0 erreur, 2 warnings `<img>` existants.
- `npm run build` : succes.
- `npm audit --omit=dev` : 2 vulnerabilites moderees liees a PostCSS/Next.
- Controle DOM : titles, descriptions, canonical, H1, alt, liens/boutons nommes.
- Controle headers HTTP local.
- Controle API contact et espace client.
