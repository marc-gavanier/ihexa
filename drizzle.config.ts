import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME } = process.env;

export default defineConfig({
  out: './src/configuration/drizzle/migrations',
  schema: './src/**/db/*.table.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/${DATABASE_NAME}`
  }
});
