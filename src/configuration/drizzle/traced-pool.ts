import { Pool, type QueryResult, type QueryResultRow } from 'pg';
import { instrument } from '@/configuration/telemetry/instrument/server';

const statementOf = (firstArg: unknown): string => {
  if (typeof firstArg === 'string') return firstArg;
  if (firstArg && typeof firstArg === 'object' && 'text' in firstArg && typeof firstArg.text === 'string') return firstArg.text;
  return 'unknown';
};

export const tracedPool = (connectionString: string): Pool => {
  const pool = new Pool({ connectionString });
  const query = pool.query.bind(pool) as (...args: ReadonlyArray<unknown>) => Promise<QueryResult<QueryResultRow>>;

  pool.query = ((...args: ReadonlyArray<unknown>): Promise<QueryResult<QueryResultRow>> =>
    instrument(
      {
        name: 'db.query',
        service: 'postgresql',
        attributes: { 'db.system': 'postgresql', 'db.statement': statementOf(args[0]) }
      },
      () => query(...args)
    )) as typeof pool.query;

  return pool;
};
