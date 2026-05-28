import { after } from 'next/server';
import { serverEnv } from '@/env/env.server';
import { createMatomoEventTracker, withEventTracker as createWithEventTracker } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

export const eventTracker = createMatomoEventTracker({
  config: { url: serverEnv.MATOMO_URL, siteId: serverEnv.MATOMO_SITE_ID },
  getScope,
  getUser,
  getTrace
});

export const withEventTracker = createWithEventTracker(eventTracker, after);
