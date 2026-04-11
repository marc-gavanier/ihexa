import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/features/client/db';

const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME } = process.env;

const connectionString =
  DATABASE_URL ?? `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}`;

export const db = drizzle({
  connection: connectionString,
  schema,
  casing: 'snake_case'
});
