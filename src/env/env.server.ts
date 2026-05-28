import { Schema } from 'effect';

const ServerEnvSchema = Schema.Struct({
  NODE_ENV: Schema.optionalWith(Schema.Literal('development', 'production', 'test'), {
    default: () => 'development' as const
  }),
  ENV: Schema.optionalWith(Schema.Literal('dev', 'prod', 'ephemeral'), { default: () => 'dev' as const }),
  AWS_ACCESS_KEY_ID: Schema.optional(Schema.String),
  AWS_SECRET_ACCESS_KEY: Schema.optional(Schema.String),
  SENTRY_DSN: Schema.optionalWith(Schema.String, { default: () => '' }),
  MATOMO_URL: Schema.optionalWith(Schema.String, { default: () => 'http://localhost:8080' }),
  MATOMO_SITE_ID: Schema.optionalWith(Schema.String, { default: () => '1' })
});

export type ServerEnv = typeof ServerEnvSchema.Type;

export const serverEnv = Schema.decodeUnknownSync(ServerEnvSchema)(process.env);
