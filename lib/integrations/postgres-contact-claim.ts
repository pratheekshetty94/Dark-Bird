import { createHash } from 'node:crypto'
import type { SqlPool } from './postgres-booking-ledger.ts'
import type { ContactCreationGate } from './zoho-task-writer.ts'

function digest(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex')
}

/** A committed claim exists before any Contact POST. Never reclaims a prior row. */
export class PostgresContactCreationGate implements ContactCreationGate {
  private readonly pool: SqlPool

  constructor(pool: SqlPool) { this.pool = pool }

  async reserve(operationId: string, email: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(
        `INSERT INTO public.cal_contact_creation_claims
           (email_sha256, owner_operation_id, state)
         VALUES ($1, $2, 'reserved') ON CONFLICT (email_sha256) DO NOTHING`,
        [digest(email), operationId]
      )
      if (result.rowCount !== 1) throw new Error('zoho_contact_create_claim_exists')
    } finally { client.release() }
  }

  async markStarted(operationId: string, email: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(
        `UPDATE public.cal_contact_creation_claims SET state = 'started', started_at = now()
         WHERE email_sha256 = $1 AND owner_operation_id = $2 AND state = 'reserved'`,
        [digest(email), operationId]
      )
      if (result.rowCount !== 1) throw new Error('zoho_contact_create_claim_unsafe')
    } finally { client.release() }
  }

  async markApplied(operationId: string, email: string, contactId: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(
        `UPDATE public.cal_contact_creation_claims
            SET state = 'applied', contact_id = $3, applied_at = now()
          WHERE email_sha256 = $1 AND owner_operation_id = $2 AND state = 'started'`,
        [digest(email), operationId, contactId]
      )
      if (result.rowCount !== 1) throw new Error('zoho_contact_create_claim_unsafe')
    } finally { client.release() }
  }

  async quarantine(operationId: string, email: string): Promise<void> {
    const client = await this.pool.connect()
    try {
      await client.query(
        `UPDATE public.cal_contact_creation_claims
            SET state = 'quarantined', quarantined_at = now(),
                quarantine_reason = 'uncertain_contact_create'
          WHERE email_sha256 = $1 AND owner_operation_id = $2
            AND state IN ('reserved', 'started')`,
        [digest(email), operationId]
      )
    } finally { client.release() }
  }
}
