import type { VerifiedCalBooking } from './cal-booking.ts'
import { compareRevision, type BookingLedger, type ReservedOperation } from './booking-ledger.ts'

export interface SqlClient {
  query<T extends Record<string, unknown> = Record<string, unknown>>(
    sql: string, values?: readonly unknown[]
  ): Promise<{ rows: T[]; rowCount: number | null }>
  release(): void
}

export interface SqlPool {
  connect(): Promise<SqlClient>
}

type SeriesRow = {
  id: string
  current_sequence: number
  current_booking_uid: string
  current_trigger: VerifiedCalBooking['trigger']
  crm_meeting_id: string | null
  crm_task_id: string | null
}

/** PostgreSQL transaction adapter. The caller supplies a server-only pool. */
export class PostgresBookingLedger implements BookingLedger {
  private readonly pool: SqlPool
  private readonly claimSingleTestCreate: boolean
  private readonly claimTaskTestRun: string | undefined
  private readonly claimContactTestRun: string | undefined

  constructor(pool: SqlPool, options: {
    claimSingleTestCreate?: boolean; claimTaskTestRun?: string; claimContactTestRun?: string
  } = {}) {
    this.pool = pool
    this.claimSingleTestCreate = options.claimSingleTestCreate === true
    this.claimTaskTestRun = options.claimTaskTestRun
    this.claimContactTestRun = options.claimContactTestRun
  }

  async reserve(booking: VerifiedCalBooking): Promise<
    | { outcome: 'reserved'; operation: ReservedOperation }
    | { outcome: 'duplicate' | 'stale' | 'quarantined' | 'test_scope_ignored' }
  > {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      if (this.claimSingleTestCreate) {
        // The singleton primary key serializes competing first bookings across
        // Function instances. The claim commits with the first reservation.
        await client.query(
          `INSERT INTO cal_booking_test_claim (singleton, booking_uid, calendar_uid)
           VALUES (true, $1, $2) ON CONFLICT (singleton) DO NOTHING`,
          [booking.bookingUid, booking.calendarUid]
        )
        const claim = (await client.query<{ booking_uid: string; calendar_uid: string }>(
          'SELECT booking_uid, calendar_uid FROM cal_booking_test_claim WHERE singleton = true FOR UPDATE'
        )).rows[0]
        if (!claim || claim.booking_uid !== booking.bookingUid ||
            claim.calendar_uid !== booking.calendarUid) {
          return await this.finish(client, 'test_scope_ignored')
        }
      }
      // Serialize a series before checking its run claim or recording an early
      // follow-up. Otherwise an early revision could be ignored before create.
      await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1, 0))', [
        `${booking.eventTypeId}:${booking.calendarUid}`,
      ])
      const previous = await client.query('SELECT 1 FROM cal_webhook_deliveries WHERE body_sha256 = $1', [booking.deliveryHash])
      if (previous.rowCount) return await this.finish(client, 'duplicate')

      if (this.claimContactTestRun) {
        if (booking.trigger !== 'BOOKING_CREATED') return await this.finish(client, 'test_scope_ignored')
        await client.query(
          `INSERT INTO cal_booking_contact_test_claim
             (singleton, run_id, booking_uid, calendar_uid)
           VALUES (true, $1, $2, $3) ON CONFLICT (singleton) DO NOTHING`,
          [this.claimContactTestRun, booking.bookingUid, booking.calendarUid]
        )
        const claim = (await client.query<{
          run_id: string; booking_uid: string; calendar_uid: string
        }>(
          `SELECT run_id, booking_uid, calendar_uid FROM cal_booking_contact_test_claim
            WHERE singleton = true FOR UPDATE`
        )).rows[0]
        if (!claim || claim.run_id !== this.claimContactTestRun ||
            claim.booking_uid !== booking.bookingUid || claim.calendar_uid !== booking.calendarUid) {
          return await this.finish(client, 'test_scope_ignored')
        }
      }

      if (this.claimTaskTestRun) {
        if (booking.trigger === 'BOOKING_CREATED') {
          await client.query(
            `INSERT INTO cal_booking_task_test_claim
               (singleton, run_id, booking_uid, calendar_uid)
             VALUES (true, $1, $2, $3) ON CONFLICT (singleton) DO NOTHING`,
            [this.claimTaskTestRun, booking.bookingUid, booking.calendarUid]
          )
        }
        const claim = (await client.query<{
          run_id: string; booking_uid: string; calendar_uid: string;
          rescheduled: boolean; cancelled: boolean
        }>(
          `SELECT run_id, booking_uid, calendar_uid, rescheduled, cancelled
             FROM cal_booking_task_test_claim WHERE singleton = true FOR UPDATE`
        )).rows[0]
        if (!claim && booking.trigger !== 'BOOKING_CREATED') {
          return await this.tombstoneTaskTestFollowup(client, booking, 'revision_before_create')
        }
        if (claim && claim.run_id === this.claimTaskTestRun &&
            claim.calendar_uid === booking.calendarUid &&
            booking.trigger === 'BOOKING_CANCELLED' && !claim.rescheduled) {
          return await this.tombstoneTaskTestFollowup(client, booking, 'chain_conflict')
        }
        if (!claim || claim.run_id !== this.claimTaskTestRun ||
            claim.calendar_uid !== booking.calendarUid || claim.cancelled ||
            (booking.trigger === 'BOOKING_CREATED' && claim.booking_uid !== booking.bookingUid) ||
            (booking.trigger === 'BOOKING_RESCHEDULED' && claim.rescheduled) ||
            (booking.trigger === 'BOOKING_CANCELLED' && !claim.rescheduled)) {
          return await this.finish(client, 'test_scope_ignored')
        }
      }

      const unresolved = await client.query(
        `SELECT 1 FROM cal_booking_unresolved WHERE event_type_id = $1
           AND calendar_uid = $2 FOR UPDATE`, [booking.eventTypeId, booking.calendarUid]
      )
      if (unresolved.rowCount) {
        await this.recordDelivery(client, booking, null)
        return await this.finish(client, 'quarantined')
      }

      let series = (await client.query<SeriesRow>(
        `SELECT id::text, current_sequence, current_booking_uid, current_trigger, crm_meeting_id, crm_task_id
           FROM cal_booking_series WHERE event_type_id = $1 AND calendar_uid = $2 FOR UPDATE`,
        [booking.eventTypeId, booking.calendarUid]
      )).rows[0]

      // Legacy Event IDs must never be sent to the Tasks endpoint.
      if (series?.crm_meeting_id) return await this.quarantineSeries(client, booking, series.id)
      if (series && booking.trigger === 'BOOKING_CANCELLED' && !series.crm_task_id) {
        return await this.quarantineSeries(client, booking, series.id)
      }

      if (!series) {
        if (booking.trigger !== 'BOOKING_CREATED') {
          await this.recordDelivery(client, booking, null)
          await client.query(
            `INSERT INTO cal_booking_unresolved
               (event_type_id, calendar_uid, highest_sequence, first_body_sha256, reason)
             VALUES ($1, $2, $3, $4, 'revision_before_create')
             ON CONFLICT (event_type_id, calendar_uid) DO UPDATE
               SET highest_sequence = GREATEST(cal_booking_unresolved.highest_sequence, EXCLUDED.highest_sequence),
                   updated_at = now()`,
            [booking.eventTypeId, booking.calendarUid, booking.sequence, booking.deliveryHash]
          )
          return await this.finish(client, 'quarantined')
        }
        series = (await client.query<SeriesRow>(
          `INSERT INTO cal_booking_series
             (event_type_id, calendar_uid, current_booking_uid, current_sequence, current_trigger)
           VALUES ($1, $2, $3, $4, $5) RETURNING id::text, current_sequence,
             current_booking_uid, current_trigger, crm_meeting_id, crm_task_id`,
          [booking.eventTypeId, booking.calendarUid, booking.bookingUid, booking.sequence, booking.trigger]
        )).rows[0]
      } else {
        const open = await client.query(
          `SELECT 1 FROM cal_crm_operations WHERE series_id = $1
             AND state IN ('reserved', 'started', 'quarantined') LIMIT 1`, [series.id]
        )
        if (open.rowCount) return await this.quarantineSeries(client, booking, series.id)
        const revision = compareRevision({
          sequence: series.current_sequence,
          bookingUid: series.current_booking_uid,
          trigger: series.current_trigger,
        }, booking)
        if (revision === 'stale') {
          await this.recordDelivery(client, booking, series.id)
          return await this.finish(client, 'stale')
        }
        if (revision === 'ambiguous') return await this.quarantineSeries(client, booking, series.id)
        if (booking.trigger === 'BOOKING_CREATED') return await this.quarantineSeries(client, booking, series.id)
        if (booking.trigger === 'BOOKING_RESCHEDULED') {
          if (booking.previousBookingUid !== series.current_booking_uid) {
            return await this.quarantineSeries(client, booking, series.id)
          }
          const alias = await client.query(
            `SELECT 1 FROM cal_booking_uids WHERE event_type_id = $1
               AND booking_uid = $2 AND series_id = $3`,
            [booking.eventTypeId, booking.previousBookingUid, series.id]
          )
          if (!alias.rowCount) return await this.quarantineSeries(client, booking, series.id)
        } else if (booking.bookingUid !== series.current_booking_uid) {
          return await this.quarantineSeries(client, booking, series.id)
        }
        await client.query(
          `UPDATE cal_booking_series SET current_booking_uid = $2, current_sequence = $3,
             current_trigger = $4, updated_at = now() WHERE id = $1`,
          [series.id, booking.bookingUid, booking.sequence, booking.trigger]
        )
      }

      // A booking UID cannot silently move to a different calendar series.
      const uid = await client.query<{ series_id: string }>(
        `SELECT series_id::text FROM cal_booking_uids WHERE event_type_id = $1 AND booking_uid = $2`,
        [booking.eventTypeId, booking.bookingUid]
      )
      if (uid.rows[0] && uid.rows[0].series_id !== series.id) {
        return await this.quarantineSeries(client, booking, series.id)
      }
      if (!uid.rows[0]) await client.query(
        'INSERT INTO cal_booking_uids (event_type_id, booking_uid, series_id) VALUES ($1, $2, $3)',
        [booking.eventTypeId, booking.bookingUid, series.id]
      )
      await this.recordDelivery(client, booking, series.id)
      const action = series.crm_task_id ? 'update' : 'create'
      const operation = (await client.query<{ id: string }>(
        `INSERT INTO cal_crm_operations
           (series_id, body_sha256, event_type_id, calendar_uid, booking_uid, sequence,
            trigger, action, state, crm_task_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'reserved',$9) RETURNING id::text`,
        [series.id, booking.deliveryHash, booking.eventTypeId, booking.calendarUid,
          booking.bookingUid, booking.sequence, booking.trigger, action, series.crm_task_id]
      )).rows[0]
      if (this.claimTaskTestRun && booking.trigger === 'BOOKING_RESCHEDULED') {
        await client.query(
          'UPDATE cal_booking_task_test_claim SET rescheduled = true WHERE singleton = true'
        )
      }
      if (this.claimTaskTestRun && booking.trigger === 'BOOKING_CANCELLED') {
        await client.query(
          'UPDATE cal_booking_task_test_claim SET cancelled = true WHERE singleton = true'
        )
      }
      await client.query('COMMIT')
      return { outcome: 'reserved', operation: { id: operation.id, booking, action, crmTaskId: series.crm_task_id } }
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined)
      throw error
    } finally {
      client.release()
    }
  }

  private async finish(client: SqlClient, outcome: 'duplicate' | 'stale' | 'quarantined' | 'test_scope_ignored') {
    await client.query('COMMIT')
    return { outcome } as const
  }

  private async recordDelivery(client: SqlClient, booking: VerifiedCalBooking, seriesId: string | null) {
    await client.query(
      `INSERT INTO cal_webhook_deliveries (body_sha256, series_id, trigger) VALUES ($1, $2, $3)`,
      [booking.deliveryHash, seriesId, booking.trigger]
    )
  }

  private async tombstoneTaskTestFollowup(
    client: SqlClient, booking: VerifiedCalBooking,
    reason: 'revision_before_create' | 'chain_conflict'
  ) {
    await this.recordDelivery(client, booking, null)
    await client.query(
      `INSERT INTO cal_booking_unresolved
         (event_type_id, calendar_uid, highest_sequence, first_body_sha256, reason)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (event_type_id, calendar_uid) DO UPDATE
         SET highest_sequence = GREATEST(cal_booking_unresolved.highest_sequence, EXCLUDED.highest_sequence),
             updated_at = now()`,
      [booking.eventTypeId, booking.calendarUid, booking.sequence, booking.deliveryHash, reason]
    )
    return await this.finish(client, 'quarantined')
  }

  private async quarantineSeries(client: SqlClient, booking: VerifiedCalBooking, seriesId: string) {
    await this.recordDelivery(client, booking, seriesId)
    await client.query(
      `INSERT INTO cal_booking_unresolved
         (event_type_id, calendar_uid, highest_sequence, first_body_sha256, reason)
       VALUES ($1, $2, $3, $4, 'chain_conflict')
       ON CONFLICT (event_type_id, calendar_uid) DO UPDATE
         SET highest_sequence = GREATEST(cal_booking_unresolved.highest_sequence, EXCLUDED.highest_sequence),
             updated_at = now()`,
      [booking.eventTypeId, booking.calendarUid, booking.sequence, booking.deliveryHash]
    )
    return await this.finish(client, 'quarantined')
  }

  async markStarted(operationId: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(
        `UPDATE cal_crm_operations SET state = 'started', started_at = now()
         WHERE id = $1 AND state = 'reserved' RETURNING id`, [operationId]
      )
      if (result.rowCount !== 1) throw new Error('operation_not_reserved')
    } finally { client.release() }
  }

  async markApplied(operationId: string, crmTaskId: string, contactId: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const rows = await client.query<{ series_id: string; body_sha256: string }>(
        `UPDATE cal_crm_operations SET state = 'applied', crm_task_id = $2,
           applied_at = now() WHERE id = $1 AND state = 'started'
         RETURNING series_id::text, body_sha256`, [operationId, crmTaskId]
      )
      if (rows.rowCount !== 1) throw new Error('operation_not_started')
      await client.query(
        `UPDATE cal_booking_series SET crm_task_id = $2, contact_id = $3,
           updated_at = now() WHERE id = $1`, [rows.rows[0].series_id, crmTaskId, contactId]
      )
      await client.query('UPDATE cal_webhook_deliveries SET applied_at = now() WHERE body_sha256 = $1', [rows.rows[0].body_sha256])
      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined)
      throw error
    } finally { client.release() }
  }

  async quarantine(operationId: string, reason: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(
        `UPDATE cal_crm_operations SET state = 'quarantined', quarantined_at = now(),
           quarantine_reason = $2 WHERE id = $1 AND state IN ('reserved', 'started')`,
        [operationId, reason.slice(0, 80)]
      )
      if (result.rowCount !== 1) throw new Error('operation_not_open')
    } finally { client.release() }
  }
}
