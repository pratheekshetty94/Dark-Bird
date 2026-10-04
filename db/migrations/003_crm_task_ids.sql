BEGIN;
SET LOCAL lock_timeout = '5s';
-- Keep Task IDs separate from legacy Event IDs. Apply before enabling Task sync.
-- Existing quarantined operations and the singleton test claim remain untouched.
ALTER TABLE public.cal_booking_series ADD COLUMN crm_task_id text;
ALTER TABLE public.cal_crm_operations ADD COLUMN crm_task_id text;
ALTER TABLE public.cal_booking_series ADD CONSTRAINT cal_booking_series_one_crm_record
  CHECK (crm_task_id IS NULL OR crm_meeting_id IS NULL);
ALTER TABLE public.cal_crm_operations ADD CONSTRAINT cal_crm_operations_one_crm_record
  CHECK (crm_task_id IS NULL OR crm_meeting_id IS NULL);
COMMIT;
