import { withEventTracker as createWithEventTracker, withPageView as createWithPageView } from '@arckit/nextjs/telemetry';
import { createMatomoEventTracker } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { serverEnv } from '@/env/env.server';

export const eventTracker = createMatomoEventTracker({
  config: { url: serverEnv.MATOMO_URL, siteId: serverEnv.MATOMO_SITE_ID },
  getScope,
  getIdentity,
  getTrace
});

export const withEventTracker = createWithEventTracker(eventTracker, preservingAfter);

export const withPageView = createWithPageView(eventTracker, preservingAfter);
