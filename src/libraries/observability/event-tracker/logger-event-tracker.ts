import { randomUUID } from 'node:crypto';
import { getScope, getTrace, getUser } from '../context';
import type { Logger } from '../logger';
import { buildEventRecord } from './build-event-record';
import type { EventRecord, EventTracker, IdentifyEvent, PageEvent, TrackedEvent } from './event-tracker.type';

const envelope = () => ({
  timestamp: new Date().toISOString(),
  messageId: randomUUID(),
  scope: getScope(),
  user: getUser(),
  trace: getTrace()
});

export const loggerEventTracker = (logger: Logger): EventTracker => ({
  track: (event: TrackedEvent): EventRecord => {
    const record = buildEventRecord({ type: 'track', ...event, ...envelope() });
    logger.log({
      level: 'info',
      event: 'analytics.track',
      attributes: { name: event.event, ...event.properties }
    });
    return record;
  },
  identify: (event: IdentifyEvent): EventRecord => {
    const record = buildEventRecord({ type: 'identify', ...event, ...envelope() });
    logger.log({
      level: 'info',
      event: 'analytics.identify',
      attributes: { userId: event.userId, ...event.traits }
    });
    return record;
  },
  page: (event: PageEvent): EventRecord => {
    const record = buildEventRecord({ type: 'page', ...event, ...envelope() });
    logger.log({
      level: 'info',
      event: 'analytics.page',
      attributes: { ...(event.name ? { name: event.name } : {}), ...event.properties }
    });
    return record;
  }
});
