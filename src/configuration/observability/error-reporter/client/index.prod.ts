import * as Sentry from '@sentry/nextjs';
import { clientEnv } from '@/env/env.client';
import { createSentryReporter } from '@/libraries/observability';

export const errorReporter = createSentryReporter();

export const register = (): void => {
  if (!clientEnv.NEXT_PUBLIC_SENTRY_DSN) return;
  Sentry.init({ dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 0 });
};
