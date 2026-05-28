export { buildEventRecord } from './build-event-record';
export type { MatomoConfig } from './build-matomo-params';
export { buildMatomoPageParams, buildMatomoTrackParams, matomoVisitorId } from './build-matomo-params';
export type {
  AnonymousId,
  EventName,
  EventProperties,
  EventRecord,
  EventTracker,
  IdentifyEvent,
  PageEvent,
  TrackedEvent,
  UserId
} from './event-tracker.type';
export { loggerEventTracker } from './logger-event-tracker';
export { matomoEventTracker } from './matomo-event-tracker';
export { noopEventTracker } from './noop-event-tracker';
export { withEventTracker } from './with-event-tracker';
