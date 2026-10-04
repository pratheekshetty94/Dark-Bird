-- Private, read-only case detail. Replace SET_OPERATION_ID with the numeric
-- operation ID from booking-crm-review-queue.sql before running.
-- IDs, state, reason and times are linkable; keep the result in the authorized
-- ledger editor. This query does not retrieve payload, email, name or URL.
SELECT o.id AS operation_id, o.series_id, o.event_type_id, o.calendar_uid,
       o.booking_uid, o.sequence, o.trigger, o.action, o.state,
       o.quarantine_reason, d.received_at, o.started_at, o.quarantined_at,
       s.crm_task_id, s.crm_meeting_id, s.contact_id
  FROM public.cal_crm_operations o
  JOIN public.cal_booking_series s ON s.id = o.series_id
  JOIN public.cal_webhook_deliveries d ON d.body_sha256 = o.body_sha256
 WHERE o.id = 'SET_OPERATION_ID'::bigint;
