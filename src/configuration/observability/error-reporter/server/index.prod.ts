import * as Sentry from '@sentry/nextjs';
import { after } from 'next/server';
import { serverEnv } from '@/env/env.server';
import { createSentryReporter, withErrorReporter as createWithErrorReporter } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

export const errorReporter = createSentryReporter({ getScope, getUser, getTrace });

export const withErrorReporter = createWithErrorReporter(errorReporter, after);

export const register = async (): Promise<void> => {
  if (!serverEnv.SENTRY_DSN) return;
  Sentry.init({ dsn: serverEnv.SENTRY_DSN, tracesSampleRate: 0 });
};

export const onRequestError = Sentry.captureRequestError;
