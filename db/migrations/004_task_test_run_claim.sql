-- Separate one-run Task lifecycle claim. Do not alter the legacy test claim.
CREATE TABLE public.cal_booking_task_test_claim (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  run_id text NOT NULL,
  booking_uid text NOT NULL,
  calendar_uid text NOT NULL,
  rescheduled boolean NOT NULL DEFAULT false,
  cancelled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
