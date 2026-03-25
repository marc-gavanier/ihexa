import { Schema } from 'effect';
import type { PipeMiddleware } from '../action-builder';
import type { ServerActionResult } from '../result';

export const withInput =
  <TInput>(schema: Schema.Schema<TInput>): PipeMiddleware<object, { input: TInput }, unknown> =>
  async (_ctx, rawInput, next): Promise<ServerActionResult<unknown>> =>
    next({ input: Schema.decodeUnknownSync(schema)(rawInput) });
