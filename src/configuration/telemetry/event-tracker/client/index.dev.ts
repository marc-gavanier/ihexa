import { identifyClient, trackClientEvent, trackClientPage } from '@/app/_actions/telemetry/track-client.action';
import { serverActionEventTracker } from '@/libraries/telemetry';

export const eventTracker = serverActionEventTracker({
  track: trackClientEvent,
  identify: identifyClient,
  page: trackClientPage
});
