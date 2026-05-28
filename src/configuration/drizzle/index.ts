import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, type QueryResult, type QueryResultRow } from 'pg';
import { metrics } from '@/configuration/observability/metrics/server';
import { tracer } from '@/configuration/observability/tracer/server';
import * as clientSchema from '@/features/client/db';
import * as settingsSchema from '@/features/settings/db';

const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME } = process.env;

const connectionString =
  DATABASE_URL ?? `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}`;

const queriesCounter = metrics.counter('db.queries_total', { description: 'Number of database queries executed' });
const queryDuration = metrics.histogram('db.query_duration_ms', { description: 'Database query duration in ms', unit: 'ms' });

const pool = new Pool({ connectionString });

const statementOf = (firstArg: unknown): string => {
  if (typeof firstArg === 'string') return firstArg;
  if (firstArg && typeof firstArg === 'object' && 'text' in firstArg && typeof firstArg.text === 'string') return firstArg.text;
  return 'unknown';
};

const originalQuery = pool.query.bind(pool) as (...args: ReadonlyArray<unknown>) => Promise<QueryResult<QueryResultRow>>;

pool.query = ((...args: ReadonlyArray<unknown>): Promise<QueryResult<QueryResultRow>> => {
  const statement = statementOf(args[0]);
  const start = performance.now();
  return tracer
    .startSpan('db.query', () => originalQuery(...args), {
      kind: 'client',
      attributes: { 'db.system': 'postgresql', 'db.statement': statement }
    })
    .then(
      (result) => {
        queriesCounter.add(1, { status: 'success' });
        queryDuration.record(performance.now() - start, { status: 'success' });
        return result;
      },
      (caught) => {
        queriesCounter.add(1, { status: 'error' });
        queryDuration.record(performance.now() - start, { status: 'error' });
        throw caught;
      }
    );
}) as typeof pool.query;

export const db = drizzle(pool, {
  schema: { ...clientSchema, ...settingsSchema },
  casing: 'snake_case'
});
