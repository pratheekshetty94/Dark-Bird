# Cal.com to Zoho Meetings preparation

The route wires the PostgreSQL ledger and Zoho writer behind
`BOOKING_CRM_SYNC_ENABLED`; with that flag unset it returns 503 before
constructing either client. Production Zoho OAuth variables and the approved
Neon migration have been prepared. The Cal.com signing secret and webhook are
still absent, and this feature is not enabled. The existing booking flow and
SalesIQ tracking are unchanged. The handler, ledger, and writer have mocked
tests; the disposable PostgreSQL acceptance test has not yet run.

## Scope and data

- Accept only signed Cal.com `BOOKING_CREATED`, `BOOKING_RESCHEDULED`, and
  `BOOKING_CANCELLED` payloads for discovery event type `4773493`.
- Store booking UID, iCalUID, sequence, event type, delivery digest, status,
  Zoho Contact ID, Zoho Meeting ID, and timestamps. Do not store the raw webhook
  or attendee email in the ledger.
- Search Zoho Contacts by email, then compare the returned primary `Email`
  exactly after normalization. Continue only for one match and a complete
  search page. Never create a Contact or Lead or alter qualification, Deal
  stage, or payment status.
- Before Contact search and before each Events write, call the read-only
  organization endpoint. Require the observed production organization's
  `domain_name=org60090260228`, `zgid=60090260228`, CRM record
  `id=1457002000000020813`, and `country_code=IN`. Cache success only for
  the current access token. Another India org must fail closed.
- A CRM Meeting has a fixed title, appointment window, `Who_Id` for the
  verified Contact, `Meeting_Venue__s: Online`, and a fixed UID marker in
  `Description`. Do not add participants, reminders, or outgoing messages.
- The writer uses `trigger: []` and
  `skip_feature_execution: [{name: 'cadences'}]` on Events create/update.
  Zoho documents these controls for workflows and cadences, but its update
  documentation says records enter review by default. Confirm the actual
  organization's approval/review configuration and whether `Who_Id` has any
  notification effect before activation. No attendee invitation is authorized.
- A Cal.com cancellation creates a durable manual-reconciliation state and
  makes no Zoho write. The connected org's read-only Events metadata has no
  native cancellation field; `Check_In_Status` is read-only and
  `Record_Status__s` offers only Trash, Available, and Draft. The reviewed
  public Events API docs likewise do not establish a native cancel action.
  Renaming an Event would leave the Meeting record present and must not be
  described as native cancellation.

## Required transaction and recovery behavior

1. Verify the raw HMAC before parsing, enforce body bounds, payload version,
   event type, required fields, and a bounded delivery age. A replayed body
   digest or already accepted revision cannot cause another CRM write.
2. In Postgres, serialize by `(event_type_id, calendar_uid)`. Insert a unique
   delivery and reserve an operation in one transaction. A stale or equal but
   different revision is ignored or quarantined, never applied.
3. Commit `started` **before** the Zoho request. On a definitive success,
   persist the Meeting ID and mark applied. On timeout, crash, or ambiguous
   response, block the series for manual reconciliation. Never automatically
   resend an operation whose `started` state was committed.
4. Reschedules can have a new booking UID; verify `rescheduleUid` against the
   known alias before updating the same Meeting. A cancellation without a
   resolved series creates a durable unresolved-series tombstone. Every later
   delivery for that calendar UID, including an older create, remains blocked
   for manual reconciliation. A later revision also waits behind any open or
   uncertain operation.
   An unknown previous UID, conflicting equal revision, mismatched cancellation
   UID, or any other quarantined chain decision also writes a delivery and
   unresolved-series tombstone. Later revisions cannot pass that decision.
5. Manual reconciliation compares the Cal.com UID marker, person, appointment
   window, and Zoho record ID before an operator marks an uncertain operation
   resolved. A free-text Description marker is not a unique CRM key.

This approach guarantees **at-most-once automatic CRM requests**, not eventual
delivery without intervention. Zoho Meetings do not support a unique external
booking field, so automatic recovery after an uncertain create is unsafe.

## Database migration review

The approved Neon Free production database is connected to this Vercel project
with the server-side `DATABASE_URL` name. Its value is not needed to review the
SQL. The migration was applied once after checking the SQL
editor is targeting that database and these five `public.cal_*` tables plus
`cal_crm_operations_one_open_per_series` did not already exist. The whole file
was executed as one prepared statement. Its `DO` block is atomic; an error
rolls back all of its DDL. Do not rerun after success.

After a successful commit, rollback is safe only before any webhook traffic or
manual data entry. Check that all five tables are empty, then run this in the
same database. The `DO` block aborts instead of deleting records if any exist:

```sql
DO $booking_ledger_rollback$
BEGIN
  PERFORM pg_catalog.set_config('search_path', 'pg_catalog,public', true);
  IF EXISTS (SELECT 1 FROM public.cal_crm_operations)
     OR EXISTS (SELECT 1 FROM public.cal_booking_unresolved)
     OR EXISTS (SELECT 1 FROM public.cal_webhook_deliveries)
     OR EXISTS (SELECT 1 FROM public.cal_booking_uids)
     OR EXISTS (SELECT 1 FROM public.cal_booking_series) THEN
    RAISE EXCEPTION 'booking ledger has data; manual reconciliation required';
  END IF;
  DROP TABLE public.cal_crm_operations;
  DROP TABLE public.cal_booking_unresolved;
  DROP TABLE public.cal_webhook_deliveries;
  DROP TABLE public.cal_booking_uids;
  DROP TABLE public.cal_booking_series;
END;
$booking_ledger_rollback$ LANGUAGE plpgsql;
```

## Activation gates

- Verify the Vercel project storage inventory and obtain approved Postgres
  access. Apply the migration only after reviewing its retention and access
  controls. Keep database credentials server-side.
- Obtain a Cal.com signing secret, the actual account's webhook payload for the
  three events, and the configured payload version. Validate signature header
  format and UID/sequence behavior against those samples.
- Use narrowly scoped Zoho authorization for Contacts read and Events
  create/update. The documented scopes are
  `ZohoCRM.org.READ`, `ZohoCRM.modules.contacts.READ`, `ZohoSearch.securesearch.READ`,
  `ZohoCRM.modules.events.CREATE`, and `ZohoCRM.modules.events.UPDATE`.
  Verify the Events field serialization and permissions in the actual org.
- Audit Zoho workflows/cadences/notifications and suppress outgoing side
  effects. No participant invitation, email, or message is authorized.
- Bind the Postgres adapter to an approved server-only driver and connection;
  `DATABASE_URL` is supplied by the approved Neon integration. The source
  binds to it lazily; never copy its value into files or logs.
- Set up an India-domain Zoho OAuth client for the actual production CRM org,
  with exactly `ZohoCRM.org.READ`, `ZohoCRM.modules.contacts.READ`,
  `ZohoSearch.securesearch.READ`, `ZohoCRM.modules.events.CREATE`, and
  `ZohoCRM.modules.events.UPDATE`. After confirming the org's India data
  center, put `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, and
  `ZOHO_REFRESH_TOKEN` in server-side Vercel production environment variables,
  plus `ZOHO_DC=in`. The writer fixes hosts to `accounts.zoho.in` and
  `www.zohoapis.in` and rejects any other token `api_domain`.
- `CAL_WEBHOOK_SECRET` needs a new Cal.com webhook signing secret. The existing
  `CAL_API_KEY` is for booking creation and is not a webhook signing secret.
  Keep `BOOKING_CRM_SYNC_ENABLED` unset until every gate is reviewed.
- Verify Zoho accepts OAuth refresh credentials in a form-encoded POST body;
  the public Zoho CRM refresh example places them in the URL query. The source
  keeps them out of the URL to avoid query logging and fails closed if the
  request is rejected. Do not move secrets into the URL without review.
- Complete integration tests against disposable Postgres for duplicate,
  out-of-order, timeout, crash, cancellation, and manual-resolution cases.
  Review the live Cal.com payload shape and Zoho workflow side effects before
  enabling any webhook.

## Read-only provider preflight and acceptance tests

`scripts/verify-zoho-org.mjs` is an explicitly opted-in build-time diagnostic.
It refreshes the configured India OAuth token and makes only `GET /crm/v8/org`.
It prints a fixed success or failure code, never credentials, headers, tokens,
or the provider response. It does not create a public endpoint, enable the
booking route, or write CRM records. An unopted direct invocation exits without
making any request.

After reviewing the change and approving a one-time provider build, temporarily
set the Vercel build command to:

```sh
ZOHO_ORG_PREFLIGHT=1 node scripts/verify-zoho-org.mjs && npm run build
```

Run that command only in Vercel's Production build environment, where the
existing Production secrets are injected. Restore the original `npm run build`
command immediately afterward. Do not copy the secrets locally or put values
in the command. The result proves that the **build environment's** credentials
can refresh and read the expected org; it does not prove that a deployed
Function received the same values or that Contact search and Events writes
are permitted. A true runtime check would require a separately reviewed,
authenticated invocation mechanism. Keep `BOOKING_CRM_SYNC_ENABLED` unset.

For real database acceptance, create a fresh **local, disposable** PostgreSQL
database named `booking_test_*` and set `BOOKING_TEST_DATABASE_URL` only for
the test process. `tests/postgres-booking-acceptance.test.mts` refuses nonlocal
hosts and other database names, applies the actual migration to the fresh
database, then tests concurrent duplicate delivery, replay, out-of-order
cancellation, crash after `started`, and uncertain CRM response using synthetic
data and a fake CRM writer. The test is skipped without that URL. Never point
it at the production Neon database. No real Zoho request is made by this test.

## Validation-only webhook mode

`BOOKING_CRM_VALIDATE_ONLY=true` is a temporary mode on the existing POST
endpoint. It requires `BOOKING_CRM_SYNC_ENABLED` to remain unset/false and
`CAL_WEBHOOK_SECRET` to be configured. If both flags are true, the route
returns 503 before provider work. This mode checks body size, raw HMAC, and
webhook version first. Recognized booking triggers must pass the full event
type and payload checks and return `booking_payload_valid`. A signed JSON
message with an unrecognized trigger returns `signed_transport_only`; that
result does not establish booking payload compatibility. Cal's public docs do
not specify a ping payload, so a ping is not counted as a validated booking.

After local validation, this mode only refreshes OAuth and reads the Zoho org.
It does not instantiate the Postgres ledger, search Contacts, write Events,
store payloads, or log personal data. The Zoho writer caches the verified org
per access token within the Function process, limiting repeated provider
requests. There is no cross-process replay cache in this mode; accepted
deliveries are deliberately discarded. Keep the Cal subscription **inactive**
throughout validation mode. Test only with a manually submitted synthetic,
signed request; do not create a booking to generate a test event. Disable the
validation flag before activating any subscription. A Cal UI ping is not a
validated booking, and real booking traffic during validation would be lost.
