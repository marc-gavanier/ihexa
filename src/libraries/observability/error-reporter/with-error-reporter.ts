import { after } from 'next/server';
import type { PipeMiddleware } from '@/libraries/nextjs/action/action-builder';
import type { ServerActionResult } from '@/libraries/nextjs/action/result';
import type { ErrorReporter } from './error-reporter.type';

type ContextExtractor<TCtx> = (ctx: TCtx) => Record<string, unknown>;

type WithErrorReporterOptions<TCtx> = {
  extractContext?: ContextExtractor<TCtx>;
};

export const withErrorReporter =
  (errorReporter: ErrorReporter) =>
  <TCtx extends object>({ extractContext }: WithErrorReporterOptions<TCtx> = {}): PipeMiddleware<TCtx, object, unknown> =>
  async (ctx, _rawInput, next): Promise<ServerActionResult<unknown>> => {
    const result = await next(ctx);

    if (!result.success) {
      after(() => {
        errorReporter.capture({
          error: new Error(String(result.error)),
          source: 'server',
          context: extractContext?.(ctx)
        });
      });
    }

    return result;
  };
