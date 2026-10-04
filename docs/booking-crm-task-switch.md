# Cal.com booking to Contact-linked Zoho CRM Task

This is a local implementation for review. Do not enable production or test sync until
`003_crm_task_ids.sql` is applied to the approved ledger database, the narrow Task OAuth
grant is installed privately, the Cal webhook join-URL shape is validated, and Task
notification behavior is approved. No new booking or CRM write is part of this change.
The previous quarantined Event attempt and singleton test claim remain untouched.

## One internal Task lifecycle test (local follow-up, not deployed)

Migration `004_task_test_run_claim.sql` adds a separate, permanent one-run claim;
it does not read, reset, or delete `cal_booking_test_claim`. Test mode requires a
named `BOOKING_CRM_TASK_TEST_RUN_ID` (`task-` plus 8–40 lowercase letters or digits),
exact first-slot start/end, and exact reschedule-slot start/end. A Cal UI test
payload may prove signed transport, but a ping does not prove the booking URL
shape. On the one approved internal `BOOKING_CREATED`, signature, fields,
participants, exact first slot, and approved HTTPS `payload.metadata.videoCallUrl`
are all checked before ledger reservation or CRM write. A missing or invalid
URL fails closed; do not invent or replay a URL.

The first eligible create binds the new claim to one booking UID and calendar UID.
Only that series may reschedule to the second exact slot and then cancel; the
claim records each follow-up at reservation time, so replay or a second move
cannot write again. Every step must retain the exact internal attendee and
organizer and have no extra guests. Keep customer sync off. Do not activate this
path until the named run, two slots, and one own-account booking lifecycle are
explicitly approved. An uncertain result stays quarantined; stop the test.
An eligible reschedule before create or cancellation before reschedule records
an unresolved tombstone, blocking a later obsolete Task write.

After the private Task grant is installed, a signed validation request can check
Tasks READ without a ledger reservation: set `BOOKING_CRM_VALIDATE_ONLY=true` and
`BOOKING_CRM_TASK_READ_PREFLIGHT=true` while keeping normal and test sync off.
The preflight verifies the pinned org and calls only `GET /crm/v8/Tasks?fields=id&per_page=1`;
an empty module (HTTP 204) is valid. It logs only fixed success/failure codes and
does not expose a Task record. Optionally set `BOOKING_CRM_CONTACT_PREFLIGHT=true`
to repeat the exact internal Contact check. A signed booking payload is still needed
to validate the join URL shape; a signed ping checks transport only.

## Task record

The writer searches for one exact primary-email Contact and checks the pinned production
org before any CRM write. It sends `POST /crm/v8/Tasks` with `Subject`, local `Due_Date`,
`Status: Not Started`, `Who_Id: {id: contactId}`, `Send_Notification_Email: false`, and
`Description`. The description contains the exact UTC start/end, business and attendee time zones,
original Cal/Meet join URL, iCalUID, and booking UID. It omits `Remind_At` and recurrence.
`trigger: []` and `skip_feature_execution: [{name: 'cadences'}]` suppress documented
workflow and cadence execution. A Task is not a calendar Meeting and creates no
second meeting link. Zoho's Task schema reports Subject as the sole mandatory field;
verify the real org behavior before activation.

The signed Cal webhook must provide `payload.metadata.videoCallUrl` with an HTTPS
Google Meet or Cal Video URL on create and reschedule. Missing or unapproved links
are rejected before ledger reservation. The attendee `timeZone` is required and validated as an
IANA zone. The Task subject and due date use the fixed business zone `Asia/Kolkata`;
the attendee zone is retained separately in the description. Missing or invalid
timezone data is rejected before ledger reservation. Cal's live webhook shape for the configured
version still needs validation. The original URL is copied verbatim into the Task.

On reschedule, the ledger uses the existing Task ID and never creates a second Task.
Before and after the update, the writer reads that Task, verifies its Contact and
series marker, and rejects any non-null reminder or recurrence. A completed Task
cannot be reopened by a reschedule. It never sends an Event ID to the Tasks endpoint.
A valid cancellation of an applied Task updates that same Task with a `CANCELLED`
subject prefix and `Completed` status, appending the cancellation time while keeping
the original join URL in its description. Cancellation before creation, or without a
known Task ID, is quarantined. No Task is deleted. A timeout or malformed CRM
response remains quarantined with no automatic retry.

## Minimal authorization and private setup

The exact scope set is `ZohoCRM.org.READ`, `ZohoCRM.modules.contacts.READ`,
`ZohoSearch.securesearch.READ`, `ZohoCRM.modules.tasks.READ`,
`ZohoCRM.modules.tasks.CREATE`, and `ZohoCRM.modules.tasks.UPDATE`.
The existing Events CREATE/UPDATE scopes are removed. Tasks DELETE and all-module
access are unnecessary. Use the existing India data center and the pinned CRM org.
The account owner must enter and submit the client credentials, authorization code,
and refresh token only in their private Zoho/Vercel setup surfaces. Never paste them
into chat, files, CLI output, or logs. Replace the server-side refresh token only
after the new narrow grant is confirmed; keep sync flags off during setup.

`003_crm_task_ids.sql` adds separate nullable `crm_task_id` columns to series and
operations. It does not rename or repurpose `crm_meeting_id`, alter existing rows,
release quarantine, or reset the singleton claim. Apply it before any Task sync
execution. Do not apply it as part of a read-only diagnostic.

Zoho references: [V8 insert records](https://www.zoho.com/crm/developer/docs/api/v8/insert-records.html),
[V8 update records](https://www.zoho.com/crm/developer/docs/api/v8/update-records.html),
[V8 get records](https://www.zoho.com/crm/developer/docs/api/v8/get-records.html).
