import { randomUUID } from 'node:crypto';
import { getScope, getTrace, getUser } from '../context';
import { buildEventRecord } from './build-event-record';
import type { EventRecord, EventTracker, IdentifyEvent, PageEvent, TrackedEvent } from './event-tracker.type';

const envelope = () => ({
  timestamp: new Date().toISOString(),
  messageId: randomUUID(),
  scope: getScope(),
  user: getUser(),
  trace: getTrace()
});

export const noopEventTracker = (): EventTracker => ({
  track: (event: TrackedEvent): EventRecord => buildEventRecord({ type: 'track', ...event, ...envelope() }),
  identify: (event: IdentifyEvent): EventRecord => buildEventRecord({ type: 'identify', ...event, ...envelope() }),
  page: (event: PageEvent): EventRecord => buildEventRecord({ type: 'page', ...event, ...envelope() })
});
