import * as Sentry from '@sentry/nextjs';
import type { Authenticated, ObservabilityScope, Traced } from '../context';
import { buildErrorRecord } from './build-error-record';
import type { ErrorCapture, ErrorLevel, ErrorRecord, ErrorReporter, MessageCapture } from './error-reporter.type';

const SENTRY_LEVEL: Readonly<Record<ErrorLevel, Sentry.SeverityLevel>> = {
  warn: 'warning',
  error: 'error',
  fatal: 'fatal'
};

const sentryOptions = (
  attributes: Readonly<Record<string, unknown>> | undefined,
  fingerprint: ReadonlyArray<string> | undefined,
  level: ErrorLevel
) => ({
  level: SENTRY_LEVEL[level],
  ...(attributes ? { contexts: { attributes: { ...attributes } } } : {}),
  ...(fingerprint ? { fingerprint: [...fingerprint] } : {})
});

export type ContextGetters = {
  readonly getScope?: () => ObservabilityScope | undefined;
  readonly getUser?: () => Authenticated | undefined;
  readonly getTrace?: () => Traced | undefined;
};

export const createSentryReporter = ({ getScope, getUser, getTrace }: ContextGetters = {}): ErrorReporter => ({
  captureException: (capture: ErrorCapture): ErrorRecord => {
    const level = capture.level ?? 'error';
    Sentry.captureException(capture.error, sentryOptions(capture.attributes, capture.fingerprint, level));
    return buildErrorRecord({ ...capture, level, scope: getScope?.(), user: getUser?.(), trace: getTrace?.() });
  },
  captureMessage: (capture: MessageCapture): ErrorRecord => {
    Sentry.captureMessage(capture.message, sentryOptions(capture.attributes, capture.fingerprint, capture.level));
    return buildErrorRecord({ ...capture, scope: getScope?.(), user: getUser?.(), trace: getTrace?.() });
  }
});
