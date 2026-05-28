import type { PipeMiddleware, ServerActionResult } from '@arckit/nextjs';
import { cookies } from 'next/headers';
import { enterIdentity, enterScope } from '@/libraries/telemetry/context';

const ANONYMOUS_ID_COOKIE = 'arckit_aid';

const applyScope = async (): Promise<void> => {
  const anonymousId = (await cookies()).get(ANONYMOUS_ID_COOKIE)?.value;
  enterScope({ source: 'server', requestId: crypto.randomUUID() });
  if (anonymousId) enterIdentity({ kind: 'anonymous', anonymousId });
};

export const withPageScope = async <TCtx extends object>(ctx: TCtx, _props: unknown): Promise<{ readonly ctx: TCtx }> => {
  await applyScope();
  return { ctx };
};

export const withActionScope: PipeMiddleware<object, object, unknown> = async (
  ctx,
  _input,
  next
): Promise<ServerActionResult<unknown>> => {
  await applyScope();
  return next(ctx);
};
