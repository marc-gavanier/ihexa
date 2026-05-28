'use server';

import {
  createConsoleLogger,
  createLoggerEventTracker,
  type IdentifyEvent,
  type PageEvent,
  type TrackedEvent
} from '@/libraries/observability';

const tracker = createLoggerEventTracker({ logger: createConsoleLogger() });

export const trackClientEvent = async (event: TrackedEvent): Promise<void> => {
  tracker.track({
    ...event,
    properties: { ...event.properties, 'observability.origin': 'client' }
  });
};

export const identifyClient = async (event: IdentifyEvent): Promise<void> => {
  tracker.identify({
    ...event,
    traits: { ...event.traits, 'observability.origin': 'client' }
  });
};

export const trackClientPage = async (event: PageEvent): Promise<void> => {
  tracker.page({
    ...event,
    properties: { ...event.properties, 'observability.origin': 'client' }
  });
};
