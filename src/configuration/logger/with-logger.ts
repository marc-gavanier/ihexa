import type { PipeMiddleware, ServerActionResult } from '@arckit/nextjs';
import type { Logger, LogLevel } from '@arckit/observability';
import { after } from 'next/server';

type PayloadExtractor<TCtx> = (ctx: TCtx) => Record<string, unknown>;

type WithLoggerOptions<TCtx> = {
  level?: LogLevel;
  extractPayload?: PayloadExtractor<TCtx>;
};

export const withLogger =
  (logger: Logger) =>
  <TCtx extends object>(
    event: string,
    { level = 'info', extractPayload }: WithLoggerOptions<TCtx> = {}
  ): PipeMiddleware<TCtx, object, unknown> =>
  async (ctx, _rawInput, next): Promise<ServerActionResult<unknown>> => {
    const result = await next(ctx);

    after(() => {
      logger.log({
        level,
        event: result.success ? `${event}:success` : `${event}:failure`,
        payload: { ...(extractPayload?.(ctx) ?? {}), ...(result.success ? {} : { error: result.error }) }
      });
    });

    return result;
  };
