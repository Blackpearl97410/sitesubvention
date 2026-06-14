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
