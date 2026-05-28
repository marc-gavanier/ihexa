export type { Authenticated, ContextGetters, ObservabilityScope, ObservabilitySource, Traced } from './context';
export { getScope, getTrace, getUser, runWithScope, runWithTrace, runWithUser } from './context';

export type {
  CaptureExceptionAction,
  CaptureMessageAction,
  ErrorAttributes,
  ErrorCapture,
  ErrorLevel,
  ErrorRecord,
  ErrorReporter,
  MessageCapture,
  ServerActionReporterActions
} from './error-reporter';
export {
  buildErrorRecord,
  createLoggerReporter,
  createNoopReporter,
  createSentryReporter,
  serverActionReporter,
  withErrorReporter
} from './error-reporter';

export type {
  AnonymousId,
  EventName,
  EventProperties,
  EventRecord,
  EventTracker,
  IdentifyAction,
  IdentifyEvent,
  MatomoConfig,
  PageAction,
  PageEvent,
  ServerActionEventTrackerActions,
  TrackAction,
  TrackedEvent,
  UserId
} from './event-tracker';
export {
  buildEventRecord,
  createLoggerEventTracker,
  createMatomoEventTracker,
  createNoopEventTracker,
  matomoBrowserEventTracker,
  serverActionEventTracker,
  withEventTracker
} from './event-tracker';

export type {
  AttributeValue,
  LogAttributes,
  LogClientAction,
  LogEntry,
  Logger,
  LogLevel,
  LogRecord,
  Scheduler
} from './logger';
export { buildLogRecord, createConsoleLogger, createPinoLogger, serverActionLogger, withLogger } from './logger';

export type {
  Counter,
  CreateOtelMetricsOptions,
  Gauge,
  Histogram,
  InstrumentOptions,
  Measurement,
  Metrics
} from './metrics';
export { buildMeasurement, createOtelMetrics, noopMetrics } from './metrics';

export type { Span, SpanAttributes, SpanKind, SpanStatus, StartSpanOptions, Tracer } from './tracer';
export { buildSpanAttributes, noopTracer, otelTracer, withTracer } from './tracer';
