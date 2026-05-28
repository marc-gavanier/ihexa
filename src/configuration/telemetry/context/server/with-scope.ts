import type { PipeMiddleware, ServerActionResult } from '@arckit/nextjs';
import { cookies } from 'next/headers';
import { runWithIdentity, runWithScope } from '@/libraries/telemetry/context';

const ANONYMOUS_ID_COOKIE = 'arckit_aid';

export const wrapWithScope = async <T>(fn: () => T | Promise<T>): Promise<T> => {
  const anonymousId = (await cookies()).get(ANONYMOUS_ID_COOKIE)?.value;
  const scope = { source: 'server' as const, requestId: crypto.randomUUID() };
  return anonymousId
    ? runWithScope(scope, () => runWithIdentity({ kind: 'anonymous', anonymousId }, fn))
    : runWithScope(scope, fn);
};

export const withActionScope: PipeMiddleware<object, object, unknown> = async (
  ctx,
  _input,
  next
): Promise<ServerActionResult<unknown>> => wrapWithScope(() => next(ctx));
