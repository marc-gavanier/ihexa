import type { ServerActionResult } from './result';

type Merge<A extends object, B extends object> = Omit<A, keyof B> & B;

type Next<TCtx extends object, TResult> = (ctx: TCtx) => Promise<ServerActionResult<TResult>>;

export type PipeMiddleware<TCtxIn extends object, TCtxOut extends object, TResult> = (
  ctx: TCtxIn,
  rawInput: unknown,
  next: Next<TCtxOut, TResult>
) => Promise<ServerActionResult<TResult>>;

type AnyPipeMiddleware = PipeMiddleware<Record<string, unknown>, Record<string, unknown>, unknown>;

interface ActionBuilder<TCtx extends object> {
  use<TCtxOut extends object>(middleware: PipeMiddleware<TCtx, TCtxOut, unknown>): ActionBuilder<Merge<TCtx, TCtxOut>>;

  execute<TResult = undefined>(
    handler: (ctx: TCtx) => Promise<ServerActionResult<TResult> | TResult | undefined>
  ): (input?: unknown) => Promise<ServerActionResult<TResult>>;
}

const toSuccessResult = <TResult>(result: ServerActionResult<TResult> | TResult | undefined): ServerActionResult<TResult> => {
  if (result == null) return { success: true, data: undefined as TResult };
  if (typeof result === 'object' && 'success' in result) return result;
  return { success: true, data: result };
};

const buildPipeline = <TResult>(
  middlewares: AnyPipeMiddleware[],
  handler: (ctx: Record<string, unknown>) => Promise<ServerActionResult<TResult> | TResult | undefined>
): ((ctx: Record<string, unknown>, rawInput: unknown) => Promise<ServerActionResult<TResult>>) => {
  const execute =
    (index: number) =>
    async (ctx: Record<string, unknown>, rawInput: unknown): Promise<ServerActionResult<TResult>> => {
      if (index >= middlewares.length) return toSuccessResult(await handler(ctx));

      const middleware = middlewares[index];

      return middleware
        ? (middleware(ctx, rawInput, (nextCtx) => execute(index + 1)({ ...ctx, ...nextCtx }, rawInput)) as Promise<
            ServerActionResult<TResult>
          >)
        : toSuccessResult(await handler(ctx));
    };

  return execute(0);
};

export const actionBuilder = (): ActionBuilder<object> => {
  const createBuilder = <TCtx extends object>(middlewares: AnyPipeMiddleware[]): ActionBuilder<TCtx> => ({
    use: (middleware) => createBuilder([...middlewares, middleware as AnyPipeMiddleware]),

    execute: <TResult = undefined>(handler: (ctx: TCtx) => Promise<ServerActionResult<TResult> | TResult | undefined>) => {
      const pipeline = buildPipeline<TResult>(
        middlewares,
        handler as (ctx: Record<string, unknown>) => Promise<ServerActionResult<TResult> | TResult | undefined>
      );

      return async (rawInput?: unknown): Promise<ServerActionResult<TResult>> => {
        try {
          return await pipeline({}, rawInput);
        } catch (error: unknown) {
          const { isRedirectError } = await import('./action-error');
          if (isRedirectError(error)) throw error;
          console.error('Action error:', error);
          return { success: false, error: 'error.500' };
        }
      };
    }
  });

  return createBuilder<object>([]);
};
