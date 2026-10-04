# Booking → CRM exception operations

Customer sync remains off until a named operator, check cadence, and alert or
delivery channel are actually established. The current private SQL report is a
durable queue view, **not** a scheduled monitor or notification. Website booking
confirmation emails do not prove that CRM synchronization succeeded.

## Private review

1. In the authorized ledger SQL editor, run `scripts/booking-crm-review-queue.sql`.
   It returns counts and at most 50 linkable IDs per category. Keep the output
   private. Missing and duplicate Contact cases are separate from uncertain
   writes and aged operations. The historic uncertain Event operation remains
   in the queue; do not reset it.
2. For one operation ID, replace `SET_OPERATION_ID` in
   `scripts/booking-crm-review-case.sql` and run that read-only query. Match its
   booking UID and calendar UID to the original booking in private Cal.com,
   including attendee, organizer, time, timezone, and join URL. Inspect Zoho
   Contacts and Tasks in the production org. Do not use a webhook replay as a
   search or repair tool.
3. Record who reviewed the case, when, the Cal and Zoho IDs, the evidence for
   the chosen Contact, and the decision in an approved private case log. A
   `contact_missing` or `contact_duplicate` code means the automatic Task
   writer stopped before a Tasks request. `other_quarantined`, `aged_started`,
   and `aged_reserved` may mean a CRM write happened; check CRM first and
   never retry automatically.

## Manual new-prospect path with today's grant

The integration can **read** Contacts and create/update Tasks. It cannot create
a Contact or Lead with the current OAuth scopes. For a booking with no exact
primary-email Contact, an authorized Zoho user may create a Contact in the CRM
UI after checking for duplicates. For duplicate Contacts, resolve the canonical
Contact in the UI; never pick one arbitrarily. A Lead alone is not sufficient
for this writer, which links Tasks to `Who_Id` on a Contact.

Once the Contact is verified, handle the booking's Task manually in CRM using
the original Cal join URL and exact booking time, with no reminder or email
notification. If it is a reschedule or cancellation, update the already linked
Task rather than creating another. Verify the Contact link, Task ID, subject,
status, and original URL. For a **known prewrite** missing/duplicate Contact
case only, a second authorized reviewer may fill in
`scripts/booking-crm-reconcile-contact.sql` with the exact operation, Contact,
Task IDs and expected reason. The one-statement transaction checks the series,
delivery, original reason, and manual CRM link before marking that operation
applied; it does not call Cal or Zoho. Independently confirm the Task in Zoho
first. Do not run that template for uncertain writes, a chain conflict, or the
historic Event operation. If the guard rejects the case, leave it quarantined
and investigate. Until a case is safely reconciled, later revisions cannot
sync automatically; follow them manually in Cal and CRM. Never delete the
quarantine or claim, or replay the signed webhook.

For automatic new-prospect capture, the smallest additional Zoho permission is
`ZohoCRM.modules.contacts.CREATE` on a new private grant, followed by code and
a bounded live test that deduplicates before creating one Contact. This scope
is not currently installed. Lead creation would require a different scope and
a different linking design.

## Activation gate

Assign an operator and a documented check cadence, establish a working alert
or scheduled review delivery, and verify one exception reaches that operator.
Until that happens, the SQL file alone is not monitoring. Then review the
existing historic queue without altering the uncertain Event operation. Only
after a safe manual exception path is staffed and tested should customer sync
be considered for activation.
