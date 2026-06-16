import { createSentryReporter } from '@arckit/telemetry/error-reporter';
import * as Sentry from '@sentry/nextjs';
import { clientEnv } from '@/env/env.client';

export const errorReporter = createSentryReporter();

export const register = (): void => {
  if (!clientEnv.NEXT_PUBLIC_SENTRY_DSN) return;
  Sentry.init({ dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 0 });
};

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
