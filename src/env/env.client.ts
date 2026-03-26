import { Schema } from 'effect';

const ClientEnvSchema = Schema.Struct({
  NEXT_PUBLIC_APP_NAME: Schema.optionalWith(Schema.String, { default: () => 'ihexa' })
});

export type ClientEnv = typeof ClientEnvSchema.Type;

export const clientEnv = Schema.decodeUnknownSync(ClientEnvSchema)(process.env);
