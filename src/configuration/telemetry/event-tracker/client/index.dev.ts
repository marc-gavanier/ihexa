import { serverActionEventTracker } from '@arckit/telemetry/event-tracker';
import { identifyClient, trackClientEvent, trackClientPage } from '@/app/_actions/telemetry/track-client.action';

export const eventTracker = serverActionEventTracker({
  track: trackClientEvent,
  identify: identifyClient,
  page: trackClientPage
});

export const trackPageView = (_href?: string): void => {};

export const register = (): void => {};
