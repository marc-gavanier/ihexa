import { drizzle } from 'drizzle-orm/node-postgres';
import * as clientSchema from '@/features/client/db';
import * as settingsSchema from '@/features/settings/db';
import { tracedPool } from './traced-pool';

const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME } = process.env;

const connectionString =
  DATABASE_URL ?? `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}`;

export const db = drizzle(tracedPool(connectionString), {
  schema: { ...clientSchema, ...settingsSchema },
  casing: 'snake_case'
});
