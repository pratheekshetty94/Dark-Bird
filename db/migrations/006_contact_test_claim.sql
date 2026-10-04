-- One new-prospect test booking, independent of prior internal test claims.
-- Keep this singleton permanently; never reset it to rerun a Contact POST.
CREATE TABLE public.cal_booking_contact_test_claim (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  run_id text NOT NULL,
  booking_uid text NOT NULL,
  calendar_uid text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
