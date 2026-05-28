import { randomUUID } from 'node:crypto';
import { getScope, getTrace, getUser } from '../context';
import { buildEventRecord } from './build-event-record';
import type { EventRecord, EventTracker, IdentifyEvent, PageEvent, TrackedEvent } from './event-tracker.type';

export type MatomoConfig = {
  readonly url: string;
  readonly siteId: string;
};

const envelope = () => ({
  timestamp: new Date().toISOString(),
  messageId: randomUUID(),
  scope: getScope(),
  user: getUser(),
  trace: getTrace()
});

const matomoFetch = (config: MatomoConfig, params: URLSearchParams): void => {
  fetch(`${config.url}/matomo.php?${params.toString()}`).catch(() => undefined);
};

const splitEvent = (eventName: string): { category: string; action: string } => {
  const [category, ...rest] = eventName.split(' ');
  const action = rest.join(' ');
  return { category: category ?? eventName, action: action || eventName };
};

export const matomoEventTracker = (config: MatomoConfig): EventTracker => ({
  track: (event: TrackedEvent): EventRecord => {
    const record = buildEventRecord({ type: 'track', ...event, ...envelope() });
    const { category, action } = splitEvent(event.event);
    const userId = record['userId'] as string | undefined;
    matomoFetch(
      config,
      new URLSearchParams({
        idsite: config.siteId,
        rec: '1',
        e_c: category,
        e_a: action,
        ...(userId ? { uid: userId } : {})
      })
    );
    return record;
  },
  identify: (event: IdentifyEvent): EventRecord => buildEventRecord({ type: 'identify', ...event, ...envelope() }),
  page: (event: PageEvent): EventRecord => {
    const record = buildEventRecord({ type: 'page', ...event, ...envelope() });
    const userId = record['userId'] as string | undefined;
    matomoFetch(
      config,
      new URLSearchParams({
        idsite: config.siteId,
        rec: '1',
        ...(event.name ? { action_name: event.name } : {}),
        ...(userId ? { uid: userId } : {})
      })
    );
    return record;
  }
});
