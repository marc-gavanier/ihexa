import { withErrorReporter as createWithErrorReporter } from '@arckit/nextjs/telemetry';
import { createSentryReporter } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import * as Sentry from '@sentry/nextjs';
import { serverEnv } from '@/env/env.server';

export const errorReporter = createSentryReporter({ getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter);

export const register = async (): Promise<void> => {
  if (!serverEnv.SENTRY_DSN) return;
  Sentry.init({ dsn: serverEnv.SENTRY_DSN, tracesSampleRate: 0 });
};

export const onRequestError = Sentry.captureRequestError;
