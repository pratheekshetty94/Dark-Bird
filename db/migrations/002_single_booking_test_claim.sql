-- Apply once to the approved booking ledger database before enabling the
-- single internal booking test. No customer record or CRM data is changed.
CREATE TABLE public.cal_booking_test_claim (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  booking_uid text NOT NULL,
  calendar_uid text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
