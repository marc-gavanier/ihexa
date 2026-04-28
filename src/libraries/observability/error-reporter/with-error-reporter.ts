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
  <TCtx extends object>(
    action: string,
    { extractContext }: WithErrorReporterOptions<TCtx> = {}
  ): PipeMiddleware<TCtx, object, unknown> =>
  async (ctx, _rawInput, next): Promise<ServerActionResult<unknown>> => {
    try {
      return await next(ctx);
    } catch (error) {
      after(() => {
        errorReporter.capture({
          error: error instanceof Error ? error : new Error(String(error)),
          source: 'server',
          context: { action, ...extractContext?.(ctx) }
        });
      });
      throw error;
    }
  };
