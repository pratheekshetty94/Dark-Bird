import assert from 'node:assert/strict'
import test from 'node:test'
import { PostgresBookingLedger, type SqlPool } from '../lib/integrations/postgres-booking-ledger.ts'
import type { VerifiedCalBooking } from '../lib/integrations/cal-booking.ts'

const booking: VerifiedCalBooking = {
  trigger: 'BOOKING_CREATED', eventTypeId: 4773493, bookingUid: 'booking-1',
  calendarUid: 'series-1', sequence: 0, previousBookingUid: null,
  attendeeEmail: 'person@example.com', startAt: '2026-10-04T12:00:00.000Z',
  endAt: '2026-10-04T12:30:00.000Z', occurredAt: '2026-10-03T12:00:00.000Z',
  deliveryHash: 'a'.repeat(64),
}

test('first delivery reserves within transaction; start is a separate committed update', async () => {
  const statements: string[] = []
  const client = {
    async query(sql: string) {
      statements.push(sql)
      if (sql.includes('INSERT INTO cal_booking_series')) return { rows: [{
        id: '7', current_sequence: 0, current_booking_uid: 'booking-1',
        current_trigger: 'BOOKING_CREATED', crm_meeting_id: null,
      }], rowCount: 1 }
      if (sql.includes('INSERT INTO cal_crm_operations')) return { rows: [{ id: '9' }], rowCount: 1 }
      if (sql.includes("SET state = 'started'")) return { rows: [{ id: '9' }], rowCount: 1 }
      return { rows: [], rowCount: sql.startsWith('SELECT 1') || sql.includes('FROM cal_booking_series') || sql.includes('FROM cal_booking_uids') ? 0 : 1 }
    },
    release() { statements.push('RELEASE') },
  }
  const ledger = new PostgresBookingLedger({ connect: async () => client } as unknown as SqlPool)
  const result = await ledger.reserve(booking)
  assert.equal(result.outcome, 'reserved')
  assert.equal(result.outcome === 'reserved' && result.operation.action, 'create')
  await ledger.markStarted('9')
  assert.ok(statements.indexOf('COMMIT') < statements.findIndex(sql => sql.includes("SET state = 'started'")))
  assert.ok(statements.some(sql => sql.includes('pg_advisory_xact_lock')))
  assert.ok(statements.some(sql => sql.includes('INSERT INTO cal_booking_uids')))
})

test('duplicate delivery stops before a CRM operation is reserved', async () => {
  const statements: string[] = []
  const client = {
    async query(sql: string) {
      statements.push(sql)
      return { rows: [], rowCount: sql.includes('FROM cal_webhook_deliveries') ? 1 : 0 }
    },
    release() {},
  }
  const ledger = new PostgresBookingLedger({ connect: async () => client } as unknown as SqlPool)
  assert.deepEqual(await ledger.reserve(booking), { outcome: 'duplicate' })
  assert.ok(!statements.some(sql => sql.includes('INSERT INTO cal_crm_operations')))
})

test('single-test claim skips a different UID before reserving a CRM operation', async () => {
  const statements: string[] = []
  const client = {
    async query(sql: string) {
      statements.push(sql)
      if (sql.includes('FROM cal_booking_test_claim')) return {
        rows: [{ booking_uid: 'already-claimed', calendar_uid: 'other-series' }], rowCount: 1,
      }
      return { rows: [], rowCount: 1 }
    },
    release() {},
  }
  const ledger = new PostgresBookingLedger({ connect: async () => client } as unknown as SqlPool,
    { claimSingleTestCreate: true })
  assert.deepEqual(await ledger.reserve(booking), { outcome: 'test_scope_ignored' })
  assert.ok(statements.some(sql => sql.includes('INSERT INTO cal_booking_test_claim')))
  assert.ok(!statements.some(sql => sql.includes('INSERT INTO cal_crm_operations')))
})

function statefulPool() {
  const deliveries = new Set<string>()
  let unresolved = false
  let series = false
  const statements: string[] = []
  let tail = Promise.resolve()
  const pool = { async connect() {
    let unlock: (() => void) | undefined
    return {
      async query(sql: string, values: readonly unknown[] = []) {
        statements.push(sql)
        if (sql.includes('pg_advisory_xact_lock')) {
          const previous = tail
          tail = new Promise<void>(resolve => { unlock = resolve })
          await previous
        }
        if (sql === 'COMMIT' || sql === 'ROLLBACK') unlock?.()
        if (sql.includes('FROM cal_webhook_deliveries')) return { rows: [], rowCount: deliveries.has(String(values[0])) ? 1 : 0 }
        if (sql.includes('FROM cal_booking_unresolved')) return { rows: [], rowCount: unresolved ? 1 : 0 }
        if (sql.includes('FROM cal_booking_series')) return { rows: [], rowCount: series ? 1 : 0 }
        if (sql.includes('INSERT INTO cal_webhook_deliveries')) deliveries.add(String(values[0]))
        if (sql.includes('INSERT INTO cal_booking_unresolved')) unresolved = true
        if (sql.includes('INSERT INTO cal_booking_series')) {
          series = true
          return { rows: [{ id: '7', current_sequence: 0, current_booking_uid: 'booking-1',
            current_trigger: 'BOOKING_CREATED', crm_meeting_id: null }], rowCount: 1 }
        }
        if (sql.includes('INSERT INTO cal_crm_operations')) return { rows: [{ id: '9' }], rowCount: 1 }
        return { rows: [], rowCount: 0 }
      },
      release() {},
    }
  } } as unknown as SqlPool
  return { pool, deliveries, statements, get unresolved() { return unresolved }, get series() { return series } }
}

for (const trigger of ['BOOKING_CANCELLED', 'BOOKING_RESCHEDULED'] as const) {
  test(`${trigger} before create leaves a tombstone and blocks stale create`, async () => {
    const state = statefulPool()
    const ledger = new PostgresBookingLedger(state.pool)
    const early: VerifiedCalBooking = { ...booking, trigger, sequence: 1,
      deliveryHash: 'b'.repeat(64),
      previousBookingUid: trigger === 'BOOKING_RESCHEDULED' ? 'booking-0' : null }
    assert.deepEqual(await ledger.reserve(early), { outcome: 'quarantined' })
    assert.equal(state.unresolved, true)
    assert.equal(state.deliveries.has(early.deliveryHash), true)
    assert.deepEqual(await ledger.reserve(booking), { outcome: 'quarantined' })
    assert.deepEqual(await ledger.reserve({ ...booking, sequence: 2, deliveryHash: 'd'.repeat(64) }),
      { outcome: 'quarantined' })
    assert.equal(state.series, false)
    assert.equal(state.deliveries.has(booking.deliveryHash), true)
    assert.ok(!state.statements.some(sql => sql.includes('INSERT INTO cal_crm_operations')))
  })
}

test('concurrent early cancellation serializes before a stale create', async () => {
  const state = statefulPool()
  const ledger = new PostgresBookingLedger(state.pool)
  const cancellation: VerifiedCalBooking = { ...booking, trigger: 'BOOKING_CANCELLED',
    sequence: 1, deliveryHash: 'c'.repeat(64) }
  const [first, second] = await Promise.all([ledger.reserve(cancellation), ledger.reserve(booking)])
  assert.deepEqual(first, { outcome: 'quarantined' })
  assert.deepEqual(second, { outcome: 'quarantined' })
  assert.equal(state.series, false)
  assert.ok(!state.statements.some(sql => sql.includes('INSERT INTO cal_crm_operations')))
})

type ExistingCase = { open?: boolean; alias?: boolean; foreignUid?: boolean }

function existingSeriesPool(options: ExistingCase = {}) {
  const statements: string[] = []
  const deliveries = new Set<string>()
  let unresolved = false
  const pool = { async connect() {
    return {
      async query(sql: string, values: readonly unknown[] = []) {
        statements.push(sql)
        if (sql.includes('FROM cal_webhook_deliveries')) {
          return { rows: [], rowCount: deliveries.has(String(values[0])) ? 1 : 0 }
        }
        if (sql.includes('FROM cal_booking_unresolved')) return { rows: [], rowCount: unresolved ? 1 : 0 }
        if (sql.includes('FROM cal_booking_series')) return { rows: [{
          id: '7', current_sequence: 1, current_booking_uid: 'booking-1',
          current_trigger: 'BOOKING_CREATED', crm_meeting_id: 'meeting-1',
        }], rowCount: 1 }
        if (sql.includes('FROM cal_crm_operations')) return { rows: [], rowCount: options.open ? 1 : 0 }
        if (sql.includes('SELECT 1 FROM cal_booking_uids')) {
          return { rows: [], rowCount: options.alias === false ? 0 : 1 }
        }
        if (sql.includes('SELECT series_id::text FROM cal_booking_uids')) {
          return options.foreignUid ? { rows: [{ series_id: '99' }], rowCount: 1 } :
            { rows: [], rowCount: 0 }
        }
        if (sql.includes('INSERT INTO cal_webhook_deliveries')) deliveries.add(String(values[0]))
        if (sql.includes('INSERT INTO cal_booking_unresolved')) unresolved = true
        if (sql.includes('INSERT INTO cal_crm_operations')) return { rows: [{ id: '9' }], rowCount: 1 }
        return { rows: [], rowCount: 1 }
      },
      release() {},
    }
  } } as unknown as SqlPool
  return { pool, statements, deliveries, get unresolved() { return unresolved } }
}

const conflictingCases: { name: string; incoming: Partial<VerifiedCalBooking>; options?: ExistingCase }[] = [
  { name: 'unknown previous UID', incoming: { trigger: 'BOOKING_RESCHEDULED',
    previousBookingUid: 'unknown', bookingUid: 'booking-2' } },
  { name: 'missing previous UID alias', incoming: { trigger: 'BOOKING_RESCHEDULED',
    previousBookingUid: 'booking-1', bookingUid: 'booking-2' }, options: { alias: false } },
  { name: 'equal conflicting revision', incoming: { sequence: 1, trigger: 'BOOKING_CANCELLED' } },
  { name: 'new create on existing series', incoming: { trigger: 'BOOKING_CREATED', bookingUid: 'booking-2' } },
  { name: 'mismatched cancellation UID', incoming: { trigger: 'BOOKING_CANCELLED', bookingUid: 'booking-2' } },
  { name: 'open previous operation', incoming: { trigger: 'BOOKING_CANCELLED' }, options: { open: true } },
  { name: 'booking UID belongs to another series', incoming: { trigger: 'BOOKING_RESCHEDULED',
    previousBookingUid: 'booking-1', bookingUid: 'booking-2' }, options: { foreignUid: true } },
]

for (const scenario of conflictingCases) {
  test(`${scenario.name} persists a block against the next revision`, async () => {
    const state = existingSeriesPool(scenario.options)
    const ledger = new PostgresBookingLedger(state.pool)
    const incoming: VerifiedCalBooking = { ...booking, trigger: 'BOOKING_CANCELLED', sequence: 2,
      deliveryHash: 'e'.repeat(64), ...scenario.incoming }
    assert.deepEqual(await ledger.reserve(incoming), { outcome: 'quarantined' })
    assert.equal(state.unresolved, true)
    assert.equal(state.deliveries.has(incoming.deliveryHash), true)
    assert.deepEqual(await ledger.reserve({ ...booking, trigger: 'BOOKING_CANCELLED', sequence: 3,
      deliveryHash: 'f'.repeat(64) }), { outcome: 'quarantined' })
    assert.ok(!state.statements.some(sql => sql.includes('INSERT INTO cal_crm_operations')))
  })
}
