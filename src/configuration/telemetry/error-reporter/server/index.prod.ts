import * as Sentry from '@sentry/nextjs';
import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { serverEnv } from '@/env/env.server';
import { createSentryReporter, withErrorReporter as createWithErrorReporter } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

export const errorReporter = createSentryReporter({ getScope, getIdentity, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, preservingAfter);

export const register = async (): Promise<void> => {
  if (!serverEnv.SENTRY_DSN) return;
  Sentry.init({ dsn: serverEnv.SENTRY_DSN, tracesSampleRate: 0 });
};

export const onRequestError = Sentry.captureRequestError;
