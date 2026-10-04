-- Run manually in the private ledger SQL editor with read-only access.
-- Four category counts plus at most 50 existing IDs per category. No payload,
-- email, name, URL, token, or CRM request/response content is selected.
-- A reserved/started operation is aged after 15 minutes. Do not retry or clear it.
WITH categories(category) AS (
  VALUES ('unresolved'), ('quarantined'), ('aged_started'), ('aged_reserved')
), review_items AS (
  SELECT 'unresolved'::text AS category, NULL::bigint AS operation_id,
         NULL::bigint AS series_id, u.event_type_id, u.calendar_uid
    FROM public.cal_booking_unresolved u
  UNION ALL
  SELECT CASE o.state
           WHEN 'quarantined' THEN 'quarantined'
           WHEN 'started' THEN 'aged_started'
           ELSE 'aged_reserved'
         END AS category,
         o.id AS operation_id, o.series_id, o.event_type_id, o.calendar_uid
    FROM public.cal_crm_operations o
    JOIN public.cal_webhook_deliveries d ON d.body_sha256 = o.body_sha256
   WHERE o.state = 'quarantined'
      OR (o.state = 'started' AND o.started_at <= now() - interval '15 minutes')
      OR (o.state = 'reserved' AND d.received_at <= now() - interval '15 minutes')
), numbered AS (
  SELECT review_items.*,
         row_number() OVER (PARTITION BY category ORDER BY event_type_id, calendar_uid, operation_id) AS rn
    FROM review_items
), totals AS (
  SELECT category, count(*) AS total_count FROM review_items GROUP BY category
)
SELECT c.category, COALESCE(t.total_count, 0) AS total_count,
       COALESCE(jsonb_agg(jsonb_build_object(
         'event_type_id', n.event_type_id,
         'calendar_uid', n.calendar_uid,
         'series_id', n.series_id,
         'operation_id', n.operation_id
       ) ORDER BY n.rn) FILTER (WHERE n.rn IS NOT NULL), '[]'::jsonb) AS ids
  FROM categories c
  LEFT JOIN totals t ON t.category = c.category
  LEFT JOIN numbered n ON n.category = c.category AND n.rn <= 50
 GROUP BY c.category, t.total_count
 ORDER BY c.category;
