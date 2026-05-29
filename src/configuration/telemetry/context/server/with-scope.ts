import type { PipeMiddleware, ServerActionResult } from '@arckit/nextjs';
import { runWithIdentity, runWithScope } from '@arckit/telemetry/context';
import { cookies } from 'next/headers';

const ANONYMOUS_ID_COOKIE = 'arckit_aid';

export const wrapWithScope = async <T>(fn: () => T | Promise<T>): Promise<T> => {
  const anonymousId = (await cookies()).get(ANONYMOUS_ID_COOKIE)?.value;
  const scoped = anonymousId ? () => runWithIdentity({ kind: 'anonymous', anonymousId }, fn) : fn;
  return runWithScope({ source: 'server' as const, requestId: crypto.randomUUID() }, scoped);
};

export const withActionScope: PipeMiddleware<object, object, unknown> = async (
  ctx,
  _input,
  next
): Promise<ServerActionResult<unknown>> => wrapWithScope(() => next(ctx));
