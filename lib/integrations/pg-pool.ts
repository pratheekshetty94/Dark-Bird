import { Pool } from 'pg'
import type { SqlClient, SqlPool } from './postgres-booking-ledger.ts'

/** Node-only PostgreSQL binding. Construct only inside an enabled server route. */
export class PgSqlPool implements SqlPool {
  private readonly pool: Pool

  constructor(databaseUrl: string) {
    if (!databaseUrl || !/^postgres(?:ql)?:\/\//.test(databaseUrl)) {
      throw new Error('database_not_configured')
    }
    this.pool = new Pool({
      connectionString: databaseUrl,
      max: 2,
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 10000,
    })
    this.pool.on('error', () => {
      // A checked-out operation handles its own error. Do not log connection
      // strings or other driver error objects, which can contain credentials.
      console.error('booking_db_idle_error')
    })
  }

  async connect(): Promise<SqlClient> {
    const client = await this.pool.connect()
    return {
      query: async <T extends Record<string, unknown>>(sql: string, values?: readonly unknown[]) => {
        const result = await client.query<T>(sql, values as unknown[] | undefined)
        return { rows: result.rows, rowCount: result.rowCount }
      },
      release: () => client.release(),
    }
  }

  async end(): Promise<void> { await this.pool.end() }
}

/** Names only; never prints or copies the value during setup. */
export function createPgPoolFromEnvironment(): PgSqlPool {
  return new PgSqlPool(process.env.DATABASE_URL ?? '')
}
