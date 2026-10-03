-- Run once in the approved dark-bird Neon database after checking that these
-- five tables and one index are absent. This is ONE PostgreSQL statement for
-- SQL editors that prepare a single statement. Any failure rolls back all DDL.
-- Zoho Events has no supported unique booking field. A CRM timeout/crash must
-- quarantine the operation for manual reconciliation; never retry blindly.
DO $booking_ledger_migration$
BEGIN
PERFORM pg_catalog.set_config('search_path', 'pg_catalog,public', true);
PERFORM pg_catalog.set_config('lock_timeout', '5s', true);

CREATE TABLE public.cal_booking_series (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_type_id integer NOT NULL,
  calendar_uid text NOT NULL,
  current_booking_uid text NOT NULL,
  current_sequence integer NOT NULL CHECK (current_sequence >= 0),
  current_trigger text NOT NULL CHECK (current_trigger IN
    ('BOOKING_CREATED', 'BOOKING_RESCHEDULED', 'BOOKING_CANCELLED')),
  crm_meeting_id text,
  contact_id text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_type_id, calendar_uid)
);

CREATE TABLE public.cal_booking_uids (
  event_type_id integer NOT NULL,
  booking_uid text NOT NULL,
  series_id bigint NOT NULL REFERENCES public.cal_booking_series(id),
  PRIMARY KEY (event_type_id, booking_uid)
);

CREATE TABLE public.cal_webhook_deliveries (
  body_sha256 char(64) PRIMARY KEY,
  series_id bigint REFERENCES public.cal_booking_series(id),
  trigger text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  applied_at timestamptz
);

-- An out-of-order cancellation/reschedule may arrive before the create.
-- Block the entire calendar series until a human reconciles it; a later
-- create cannot infer whether the appointment should exist in CRM.
CREATE TABLE public.cal_booking_unresolved (
  event_type_id integer NOT NULL,
  calendar_uid text NOT NULL,
  highest_sequence integer NOT NULL CHECK (highest_sequence >= 0),
  first_body_sha256 char(64) NOT NULL REFERENCES public.cal_webhook_deliveries(body_sha256),
  reason text NOT NULL CHECK (reason IN ('revision_before_create', 'chain_conflict')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_type_id, calendar_uid)
);

CREATE TABLE public.cal_crm_operations (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  series_id bigint NOT NULL REFERENCES public.cal_booking_series(id),
  body_sha256 char(64) NOT NULL UNIQUE REFERENCES public.cal_webhook_deliveries(body_sha256),
  event_type_id integer NOT NULL,
  calendar_uid text NOT NULL,
  booking_uid text NOT NULL,
  sequence integer NOT NULL CHECK (sequence >= 0),
  trigger text NOT NULL CHECK (trigger IN
    ('BOOKING_CREATED', 'BOOKING_RESCHEDULED', 'BOOKING_CANCELLED')),
  action text NOT NULL CHECK (action IN ('create', 'update')),
  state text NOT NULL CHECK (state IN
    ('reserved', 'started', 'applied', 'quarantined')),
  crm_meeting_id text,
  started_at timestamptz,
  applied_at timestamptz,
  quarantined_at timestamptz,
  quarantine_reason text,
  UNIQUE (event_type_id, calendar_uid, sequence, trigger)
);

-- Keep later revisions blocked until an uncertain earlier write is reconciled.
CREATE UNIQUE INDEX cal_crm_operations_one_open_per_series
  ON public.cal_crm_operations (series_id)
  WHERE state IN ('reserved', 'started', 'quarantined');

END;
$booking_ledger_migration$ LANGUAGE plpgsql;
