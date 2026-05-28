import type { PipeMiddleware, ServerActionResult } from '@arckit/nextjs';
import { after } from 'next/server';
import type { LogAttributes, Logger, LogLevel } from './logger.type';

type AttributesExtractor<TCtx> = (ctx: TCtx) => LogAttributes;

type WithLoggerOptions<TCtx> = {
  level?: LogLevel;
  extractAttributes?: AttributesExtractor<TCtx>;
};

export const withLogger =
  (logger: Logger) =>
  <TCtx extends object>(
    event: string,
    { level = 'info', extractAttributes }: WithLoggerOptions<TCtx> = {}
  ): PipeMiddleware<TCtx, object, unknown> =>
  async (ctx, _rawInput, next): Promise<ServerActionResult<unknown>> => {
    const result = await next(ctx);

    after(() => {
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
