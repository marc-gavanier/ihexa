import { Schema } from 'effect';

const ClientEnvSchema = Schema.Struct({
  NEXT_PUBLIC_APP_NAME: Schema.optionalWith(Schema.String, { default: () => 'ihexa' }),
  NEXT_PUBLIC_SENTRY_DSN: Schema.optionalWith(Schema.String, { default: () => '' }),
  NEXT_PUBLIC_MATOMO_URL: Schema.optionalWith(Schema.String, { default: () => '' }),
  NEXT_PUBLIC_MATOMO_SITE_ID: Schema.optionalWith(Schema.String, { default: () => '1' })
});

export type ClientEnv = typeof ClientEnvSchema.Type;

export const clientEnv = Schema.decodeUnknownSync(ClientEnvSchema)({
  NEXT_PUBLIC_APP_NAME: process.env['NEXT_PUBLIC_APP_NAME'],
  NEXT_PUBLIC_SENTRY_DSN: process.env['NEXT_PUBLIC_SENTRY_DSN'],
  NEXT_PUBLIC_MATOMO_URL: process.env['NEXT_PUBLIC_MATOMO_URL'],
  NEXT_PUBLIC_MATOMO_SITE_ID: process.env['NEXT_PUBLIC_MATOMO_SITE_ID']
});
