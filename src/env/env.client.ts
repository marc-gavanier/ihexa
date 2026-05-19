import { Schema } from 'effect';

const ClientEnvSchema = Schema.Struct({
  NEXT_PUBLIC_APP_NAME: Schema.optionalWith(Schema.String, { default: () => 'ihexa' }),
  NEXT_PUBLIC_SENTRY_DSN: Schema.optional(Schema.String)
});

export type ClientEnv = typeof ClientEnvSchema.Type;

export const clientEnv = Schema.decodeUnknownSync(ClientEnvSchema)(process.env);
