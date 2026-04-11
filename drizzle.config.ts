import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME } = process.env;

const connectionString =
  DATABASE_URL ?? `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}`;

export default defineConfig({
  out: './src/configuration/drizzle/migrations',
  schema: './src/**/db/*.table.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: connectionString
  }
});
