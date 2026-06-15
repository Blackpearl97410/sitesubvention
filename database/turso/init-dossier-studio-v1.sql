create table if not exists clients (
  id text primary key,
  display_name text not null,
  email text,
  organization_name text,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists dossiers (
  id text primary key,
  client_id text not null references clients(id) on delete cascade,
  title text not null,
  status_label text not null,
  summary text not null,
  current_step text not null,
  next_action text not null,
  missing_count integer not null default 0,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists dossier_documents (
  id text primary key,
  dossier_id text not null references dossiers(id) on delete cascade,
  title text not null,
  status text not null,
  detail text not null,
  priority_label text not null,
  sort_order integer not null default 0,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists dossier_activity (
  id text primary key,
  dossier_id text not null references dossiers(id) on delete cascade,
  label text not null,
  body text not null,
  created_at text not null default (datetime('now'))
);

create table if not exists client_access_tokens (
  id text primary key,
  dossier_id text not null references dossiers(id) on delete cascade,
  token_hash text not null unique,
  label text,
  expires_at text,
  revoked_at text,
  created_at text not null default (datetime('now')),
  last_used_at text
);

create index if not exists idx_dossiers_client_id on dossiers(client_id);
create index if not exists idx_dossier_documents_dossier_id on dossier_documents(dossier_id);
create index if not exists idx_dossier_activity_dossier_id_created_at on dossier_activity(dossier_id, created_at);
create index if not exists idx_client_access_tokens_token_hash on client_access_tokens(token_hash);

insert into clients (
  id,
  display_name,
  email,
  organization_name
) values (
  'client_demo_sortie_ep_2026',
  'Client demo',
  'client@example.com',
  'Structure musicale demo'
);

insert into dossiers (
  id,
  client_id,
  title,
  status_label,
  summary,
  current_step,
  next_action,
  missing_count
) values (
  'dossier_sortie_ep_2026',
  'client_demo_sortie_ep_2026',
  'Sortie EP 2026',
  'Pieces en attente',
  'Le diagnostic est termine. Le dossier peut passer en preparation, mais le budget et le calendrier doivent etre transmis avant de verrouiller le bon dispositif.',
  'Pieces',
  'Deposer les pieces manquantes',
  2
);

insert into dossier_documents (
  id,
  dossier_id,
  title,
  status,
  detail,
  priority_label,
  sort_order
) values
  (
    'doc_budget_previsionnel',
    'dossier_sortie_ep_2026',
    'Budget previsionnel',
    'Manquant',
    'Format tableur ou PDF accepte. Il doit faire apparaitre depenses, recettes et montant demande.',
    'Priorite 1',
    10
  ),
  (
    'doc_calendrier_projet',
    'dossier_sortie_ep_2026',
    'Calendrier du projet',
    'Manquant',
    'Dates de production, sortie, diffusion, depot et principaux jalons artistiques.',
    'Priorite 2',
    20
  ),
  (
    'doc_liens_artistiques',
    'dossier_sortie_ep_2026',
    'Liens artistiques',
    'A verifier',
    'Demos, clips, dossier artistique, EPK ou tout element permettant de comprendre le projet.',
    'Priorite 3',
    30
  ),
  (
    'doc_presentation_courte',
    'dossier_sortie_ep_2026',
    'Presentation courte',
    'Recu',
    'Presentation courte deja transmise et classee dans le dossier.',
    'Archive',
    40
  ),
  (
    'doc_statuts_structure',
    'dossier_sortie_ep_2026',
    'Statuts / structure',
    'Recu',
    'Piece administrative recue.',
    'Archive',
    50
  ),
  (
    'doc_rib',
    'dossier_sortie_ep_2026',
    'RIB',
    'Recu',
    'Piece bancaire recue.',
    'Archive',
    60
  );

insert into dossier_activity (
  id,
  dossier_id,
  label,
  body,
  created_at
) values
  (
    'activity_pieces_demandees',
    'dossier_sortie_ep_2026',
    'Aujourd''hui',
    'Pieces budget et calendrier demandees.',
    datetime('now')
  ),
  (
    'activity_diagnostic_relu',
    'dossier_sortie_ep_2026',
    'Hier',
    'Diagnostic relu : piste CNM ou aide regionale a comparer.',
    datetime('now', '-1 day')
  ),
  (
    'activity_brief_recu',
    'dossier_sortie_ep_2026',
    'J-2',
    'Brief projet recu et classe dans le dossier.',
    datetime('now', '-2 day')
  );
