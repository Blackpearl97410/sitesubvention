select 'clients' as table_name, count(*) as row_count from clients
union all
select 'dossiers', count(*) from dossiers
union all
select 'dossier_documents', count(*) from dossier_documents
union all
select 'dossier_activity', count(*) from dossier_activity
union all
select 'client_access_tokens', count(*) from client_access_tokens;
