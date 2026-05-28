import type { PipeMiddleware, ServerActionResult } from '@arckit/nextjs';
import type { LogAttributes, Logger, LogLevel } from './logger.type';

type AttributesExtractor<TCtx> = (ctx: TCtx) => LogAttributes;

type WithLoggerOptions<TCtx> = {
  readonly level?: LogLevel;
  readonly extractAttributes?: AttributesExtractor<TCtx>;
};

export type Scheduler = (fn: () => void) => void;

export const withLogger =
  (logger: Logger, schedule: Scheduler) =>
  <TCtx extends object>(
    event: string,
    { level = 'info', extractAttributes }: WithLoggerOptions<TCtx> = {}
  ): PipeMiddleware<TCtx, object, unknown> =>
  async (ctx, _rawInput, next): Promise<ServerActionResult<unknown>> => {
    const result = await next(ctx);

    schedule(() => {
      logger.log({
        level,
        event: result.success ? `${event}:success` : `${event}:failure`,
        attributes: {
          ...(extractAttributes?.(ctx) ?? {}),
          ...(result.success ? {} : { 'error.type': result.error })
        }
      });
    });

    return result;
  };
