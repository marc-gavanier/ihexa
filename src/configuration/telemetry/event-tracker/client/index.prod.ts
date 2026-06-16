import { initMatomoBrowser, matomoBrowserEventTracker, matomoBrowserPageView } from '@arckit/telemetry/event-tracker';
import { clientEnv } from '@/env/env.client';

export const eventTracker = matomoBrowserEventTracker();

export const trackPageView = matomoBrowserPageView();

export const register = (): void => {
  initMatomoBrowser({
    url: clientEnv.NEXT_PUBLIC_MATOMO_URL || 'https://ihexa.matomo.cloud',
    siteId: clientEnv.NEXT_PUBLIC_MATOMO_SITE_ID || '1',
    disableCookies: true
  });
  trackPageView();
};
