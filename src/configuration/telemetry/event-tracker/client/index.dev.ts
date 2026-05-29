import { serverActionEventTracker } from '@arckit/telemetry';
import { identifyClient, trackClientEvent, trackClientPage } from '@/app/_actions/telemetry/track-client.action';

export const eventTracker = serverActionEventTracker({
  track: trackClientEvent,
  identify: identifyClient,
  page: trackClientPage
});
