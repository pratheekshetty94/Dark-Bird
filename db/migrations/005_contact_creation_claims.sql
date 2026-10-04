-- One irreversible create claim per normalized attendee email. Store only a
-- SHA-256 digest; it remains linkable and belongs in the private ledger.
-- No existing booking rows, claims, or quarantines are changed.
CREATE TABLE public.cal_contact_creation_claims (
  email_sha256 char(64) PRIMARY KEY,
  owner_operation_id bigint NOT NULL UNIQUE REFERENCES public.cal_crm_operations(id),
  state text NOT NULL CHECK (state IN ('reserved', 'started', 'applied', 'quarantined')),
  contact_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  applied_at timestamptz,
  quarantined_at timestamptz,
  quarantine_reason text,
  CHECK (state <> 'applied' OR contact_id IS NOT NULL)
);
