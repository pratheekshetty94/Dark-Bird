import assert from 'node:assert/strict'
import test from 'node:test'
import { PgSqlPool } from '../lib/integrations/pg-pool.ts'

test('PostgreSQL driver rejects missing or non-Postgres configuration', () => {
  assert.throws(() => new PgSqlPool(''), /database_not_configured/)
  assert.throws(() => new PgSqlPool('https://example.test'), /database_not_configured/)
})

test('PostgreSQL driver initializes lazily without connecting', async () => {
  const pool = new PgSqlPool('postgresql://demo:unused@127.0.0.1:1/demo')
  await pool.end()
})
