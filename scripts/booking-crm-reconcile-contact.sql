-- PRIVATE, ONE-CASE MANUAL RECONCILIATION. This is a single atomic statement.
-- Replace every SET_* value after independently verifying the Cal booking,
-- canonical Contact, and manually created/updated Task in the Zoho UI.
-- Use only for known prewrite missing/duplicate Contact errors. Never use for
-- uncertain CRM writes, unresolved chains, or the historical Event operation.
-- Keep a separate private case record naming the reviewer and evidence.
DO $booking_contact_reconcile$
DECLARE
  v_operation_id bigint := 'SET_OPERATION_ID'::bigint;
  v_contact_id text := 'SET_CONTACT_ID';
  v_task_id text := 'SET_TASK_ID';
  v_expected_reason text := 'SET_EXPECTED_REASON';
  v_op public.cal_crm_operations%ROWTYPE;
  v_series public.cal_booking_series%ROWTYPE;
BEGIN
  PERFORM pg_catalog.set_config('search_path', 'pg_catalog,public', true);
  PERFORM pg_catalog.set_config('lock_timeout', '5s', true);
  IF v_expected_reason NOT IN ('zoho_contact_missing', 'zoho_contact_duplicate') OR
     v_contact_id !~ '^[0-9]{10,30}$' OR v_task_id !~ '^[0-9]{10,30}$' THEN
    RAISE EXCEPTION 'invalid_manual_reconciliation_input';
  END IF;

  SELECT * INTO v_op FROM public.cal_crm_operations
   WHERE id = v_operation_id FOR UPDATE;
  IF NOT FOUND OR v_op.state IS DISTINCT FROM 'quarantined' OR
     v_op.quarantine_reason IS DISTINCT FROM v_expected_reason OR v_op.started_at IS NULL THEN
    RAISE EXCEPTION 'operation_not_eligible_for_manual_reconciliation';
  END IF;
  SELECT * INTO v_series FROM public.cal_booking_series
   WHERE id = v_op.series_id FOR UPDATE;
  IF NOT FOUND OR v_series.crm_meeting_id IS NOT NULL OR
     v_series.event_type_id IS DISTINCT FROM v_op.event_type_id OR
     v_series.calendar_uid IS DISTINCT FROM v_op.calendar_uid OR
     v_series.current_booking_uid IS DISTINCT FROM v_op.booking_uid OR
     v_series.current_sequence IS DISTINCT FROM v_op.sequence OR
     v_series.current_trigger IS DISTINCT FROM v_op.trigger OR
     EXISTS (SELECT 1 FROM public.cal_booking_unresolved u
              WHERE u.event_type_id = v_op.event_type_id
                AND u.calendar_uid = v_op.calendar_uid) OR
     NOT EXISTS (SELECT 1 FROM public.cal_webhook_deliveries d
                  WHERE d.body_sha256 = v_op.body_sha256 AND d.applied_at IS NULL) THEN
    RAISE EXCEPTION 'series_not_safe_for_manual_reconciliation';
  END IF;
  IF (v_op.action = 'create' AND
      (v_op.trigger <> 'BOOKING_CREATED' OR v_op.sequence <> 0 OR
       v_series.crm_task_id IS NOT NULL OR v_series.contact_id IS NOT NULL OR
       v_op.crm_task_id IS NOT NULL)) OR
     (v_op.action = 'update' AND
      (v_series.crm_task_id IS DISTINCT FROM v_task_id OR
       v_series.contact_id IS DISTINCT FROM v_contact_id OR
       v_op.crm_task_id IS DISTINCT FROM v_task_id)) OR
     EXISTS (SELECT 1 FROM public.cal_booking_series s
              WHERE s.crm_task_id = v_task_id AND s.id <> v_series.id) THEN
    RAISE EXCEPTION 'crm_link_not_safe_for_manual_reconciliation';
  END IF;

  UPDATE public.cal_crm_operations
     SET state = 'applied', crm_task_id = v_task_id, applied_at = now()
   WHERE id = v_operation_id;
  UPDATE public.cal_booking_series
     SET crm_task_id = v_task_id, contact_id = v_contact_id, updated_at = now()
   WHERE id = v_series.id;
  UPDATE public.cal_webhook_deliveries
     SET applied_at = now() WHERE body_sha256 = v_op.body_sha256;
END
$booking_contact_reconcile$;
