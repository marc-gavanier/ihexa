import type { Identity, ObservabilityScope, Traced } from '../context';
import type { LogEntry, LogLevel, LogRecord } from './logger.type';

type BuildLogRecordInput = LogEntry & {
  readonly scope?: ObservabilityScope | undefined;
  readonly identity?: Identity | undefined;
  readonly trace?: Traced | undefined;
};

const SEVERITY_NUMBER: Readonly<Record<LogLevel, number>> = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};

const identityAttributes = (identity: Identity | undefined): Readonly<Record<string, string>> => {
  if (!identity) return {};
  if (identity.kind === 'identified') return { 'enduser.id': identity.userId, 'enduser.anonymous_id': identity.anonymousId };
  return { 'enduser.anonymous_id': identity.anonymousId };
};

const exceptionAttributes = (error: Error | undefined): Readonly<Record<string, unknown>> =>
  error
    ? {
        'exception.type': error.name,
        'exception.message': error.message,
        'exception.stacktrace': error.stack
      }
    : {};

export const buildLogRecord = ({
  level,
  event,
  attributes,
  error,
  scope,
  identity,
  trace
}: BuildLogRecordInput): LogRecord => ({
  severityText: level.toUpperCase(),
  severityNumber: SEVERITY_NUMBER[level],
  ...scope,
  ...identityAttributes(identity),
  ...trace,
  event,
  ...attributes,
  ...exceptionAttributes(error)
});
