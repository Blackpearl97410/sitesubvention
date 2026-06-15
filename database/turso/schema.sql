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
