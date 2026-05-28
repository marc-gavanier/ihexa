import type { Authenticated, ObservabilityScope, Traced } from '../context';
import type { ErrorAttributes, ErrorLevel, ErrorRecord } from './error-reporter.type';

type BuildErrorRecordInput = {
  readonly error?: Error | undefined;
  readonly message?: string | undefined;
  readonly level: ErrorLevel;
  readonly attributes?: ErrorAttributes | undefined;
  readonly fingerprint?: ReadonlyArray<string> | undefined;
  readonly scope?: ObservabilityScope | undefined;
  readonly user?: Authenticated | undefined;
  readonly trace?: Traced | undefined;
};

const SEVERITY_NUMBER: Readonly<Record<ErrorLevel, number>> = {
  warn: 13,
  error: 17,
  fatal: 21
};

const exceptionAttributes = (error: Error | undefined): Readonly<Record<string, unknown>> =>
  error
    ? {
        'exception.type': error.name,
        'exception.message': error.message,
        'exception.stacktrace': error.stack
      }
    : {};

const messageAttribute = (message: string | undefined): Readonly<Record<string, unknown>> => (message ? { message } : {});

const fingerprintAttribute = (fingerprint: ReadonlyArray<string> | undefined): Readonly<Record<string, unknown>> =>
  fingerprint ? { fingerprint: [...fingerprint] } : {};

export const buildErrorRecord = ({
  error,
  message,
  level,
  attributes,
  fingerprint,
  scope,
  user,
  trace
}: BuildErrorRecordInput): ErrorRecord => ({
  severityText: level.toUpperCase(),
  severityNumber: SEVERITY_NUMBER[level],
  ...scope,
  ...user,
  ...trace,
  event: error ? 'exception' : 'message',
  ...messageAttribute(message),
  ...attributes,
  ...exceptionAttributes(error),
  ...fingerprintAttribute(fingerprint)
});
