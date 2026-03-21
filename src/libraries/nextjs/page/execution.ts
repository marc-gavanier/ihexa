import type { ReactNode } from 'react';
import type { Pipeline } from '../shared/types';

type AnyMiddleware<TExtra> = (ctx: Record<string, unknown>, extra: TExtra) => Promise<{ ctx: Record<string, unknown> }>;

type MiddlewareEntry<TExtra> = AnyMiddleware<TExtra> | AnyMiddleware<TExtra>[];

const executeParallel = async <TExtra>(
  middlewares: AnyMiddleware<TExtra>[],
  ctx: Record<string, unknown>,
  extra: TExtra
): Promise<Record<string, unknown>> => {
  const results = await Promise.all(middlewares.map((middleware) => middleware(ctx, extra)));
  return results.reduce<Record<string, unknown>>((acc, result) => ({ ...acc, ...result.ctx }), ctx);
};

const toResolvedMiddleware =
  <TExtra>(extra: TExtra) =>
  async (accPromise: Promise<Record<string, unknown>>, entry: MiddlewareEntry<TExtra>): Promise<Record<string, unknown>> => {
    const ctx = await accPromise;
    if (Array.isArray(entry)) {
      return executeParallel(entry, ctx, extra);
    }
    const result = await entry(ctx, extra);
    return { ...ctx, ...result.ctx };
  };

export const render =
  <TCtx extends object, TExtra, TFin extends string>(pipeline: Pipeline<TCtx, TExtra, TFin>) =>
  (handler: (ctx: TCtx, extra: TExtra) => Promise<ReactNode>): ((extra: TExtra) => Promise<ReactNode>) =>
  async (extra: TExtra) => {
    const ctx = await (pipeline.middlewares as unknown as MiddlewareEntry<TExtra>[]).reduce(
      toResolvedMiddleware(extra),
      Promise.resolve<Record<string, unknown>>({})
    );
    return handler(ctx as TCtx, extra);
  };
