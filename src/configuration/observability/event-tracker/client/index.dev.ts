import { identifyClient, trackClientEvent, trackClientPage } from '@/app/_actions/observability/track-client.action';
import { serverActionEventTracker } from '@/libraries/observability';

export const eventTracker = serverActionEventTracker({
  track: trackClientEvent,
  identify: identifyClient,
  page: trackClientPage
});
