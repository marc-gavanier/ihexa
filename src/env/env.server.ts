import { Schema } from 'effect';

const ServerEnvSchema = Schema.Struct({
  NODE_ENV: Schema.optionalWith(Schema.Literal('development', 'production', 'test'), { default: () => 'development' as const }),
  ENV: Schema.optionalWith(Schema.Literal('dev', 'prod', 'ephemeral'), { default: () => 'dev' as const }),
  AWS_ACCESS_KEY_ID: Schema.optional(Schema.String),
  AWS_SECRET_ACCESS_KEY: Schema.optional(Schema.String)
});

export type ServerEnv = typeof ServerEnvSchema.Type;

export const serverEnv = Schema.decodeUnknownSync(ServerEnvSchema)(process.env);
