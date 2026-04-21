import type { Analytics } from './analytics.type';
import { trackAnalyticsEvent } from './track.action';

export const serverAnalytics = (): Analytics => ({
  track: (event) => {
    trackAnalyticsEvent(event).catch(console.error);
  }
});
