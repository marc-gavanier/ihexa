export type { ContextGetters, Identity, ObservabilityScope, ObservabilitySource, Traced } from './context';
// Note: ALS runtime functions (getScope/runWithScope/...) are not re-exported here because
// they import node:async_hooks which cannot be bundled for the browser. Server code that needs
// them imports directly from '@/libraries/observability/context'.

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
export { buildMeasurement, createOtelMetrics, noopMetrics, withMetrics } from './metrics';

export type { Span, SpanAttributes, SpanKind, SpanStatus, StartSpanOptions, Tracer } from './tracer';
export { buildSpanAttributes, noopTracer, otelTracer, withTracer } from './tracer';
