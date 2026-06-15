# Brief base de données - Espace client V1

## Objectif

Créer une base Turso légère pour alimenter l'espace client V1 avec des données utiles, sécurisées et faciles à maintenir.

La base ne doit pas devenir un CRM complet. Elle doit permettre à un client de voir clairement :

- le dossier concerné ;
- l'état d'avancement ;
- les pièces reçues ;
- les pièces manquantes ;
- les prochaines actions ;
- l'activité récente ;
- éventuellement des liens de dépôt ou de consultation.

## Principe de sécurité

La base ne doit jamais être appelée directement depuis le navigateur.

Architecture retenue :

```text
Page /espace-client
-> API Next / Netlify Function
-> Turso
```

Les secrets Turso restent uniquement côté serveur :

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `CLIENT_ACCESS_SECRET`

La V1 peut fonctionner avec un lien privé contenant un token. Le token envoyé par le client n'est pas stocké en clair en base. La base stocke uniquement un hash.

## Ce que la base doit contenir en V1

### 1. Clients

Rôle : identifier la personne ou structure accompagnée.

Champs utiles :

- identifiant technique ;
- nom affiché ;
- email ;
- structure / organisation ;
- dates de création et mise à jour.

### 2. Dossiers

Rôle : représenter un accompagnement concret.

Exemples :

- sortie EP ;
- aide CNM ;
- appel à projets régional ;
- aide production phonographique ;
- structuration label.

Champs utiles :

- titre du dossier ;
- client lié ;
- statut court ;
- résumé ;
- étape actuelle ;
- prochaine action ;
- nombre de pièces manquantes ;
- date de mise à jour.

### 3. Documents attendus

Rôle : afficher une checklist claire.

Champs utiles :

- titre du document ;
- statut ;
- description ;
- priorité ;
- ordre d'affichage.

Statuts recommandés :

- `manquant`
- `a_verifier`
- `recu`
- `valide`
- `a_corriger`

### 4. Activité récente

Rôle : rassurer le client et montrer que le dossier avance.

Champs utiles :

- libellé lisible ;
- message court ;
- date.

### 5. Tokens d'accès

Rôle : protéger l'espace client sans créer tout de suite un système d'authentification lourd.

Champs utiles :

- dossier lié ;
- hash du token ;
- date d'expiration optionnelle ;
- date de révocation optionnelle ;
- dernière utilisation.

## Ce que la base ne doit pas contenir en V1

Pour limiter les risques, éviter en V1 :

- documents originaux sensibles stockés directement en base ;
- mots de passe ;
- tokens en clair ;
- données bancaires détaillées ;
- pièces d'identité ;
- historique complet façon CRM ;
- messagerie complexe ;
- droits multi-utilisateurs.

Les fichiers réels pourront être stockés plus tard dans un stockage dédié, avec seulement leurs métadonnées dans Turso.

## Structure V1 recommandée

Tables :

- `clients`
- `dossiers`
- `dossier_documents`
- `dossier_activity`
- `client_access_tokens`

Cette structure suffit pour brancher l'interface actuelle sans complexifier le projet.

## Préparation du fichier SQLite à uploader

Le fichier SQLite doit contenir :

- le schéma des tables ;
- les index utiles ;
- éventuellement un dossier de démonstration ;
- aucun secret réel ;
- aucun token en clair ;
- aucun document sensible.

Nom recommandé :

```text
dossier-studio-client-v1.sqlite
```

## Décision V1

On valide une base orientée "suivi de dossier", pas une plateforme client complète.

La priorité est de rendre l'espace client crédible, lisible et sécurisé avec peu de données :

- statut du dossier ;
- checklist ;
- activité ;
- accès protégé.

## Backlog V2

À envisager plus tard :

- upload réel de fichiers ;
- espace admin pour mettre à jour les dossiers ;
- notifications email ;
- historique détaillé ;
- plusieurs dossiers par client ;
- plusieurs contacts par structure ;
- authentification complète ;
- stockage de fichiers séparé ;
- journal d'audit ;
- exports PDF.
