import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/features/client/db';

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME } = process.env;

export const db = drizzle({
  connection: `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}`,
  schema,
  casing: 'snake_case'
});
