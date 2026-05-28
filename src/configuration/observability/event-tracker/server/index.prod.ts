import { after } from 'next/server';
import { serverEnv } from '@/env/env.server';
import {
  createMatomoEventTracker,
  withEventTracker as createWithEventTracker,
  type EventProperties
} from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';

export const eventTracker = createMatomoEventTracker({
  config: { url: serverEnv.MATOMO_URL, siteId: serverEnv.MATOMO_SITE_ID },
  getScope,
  getIdentity,
  getTrace
});

export const withEventTracker = createWithEventTracker(eventTracker, after);

export const withPageView =
  (name: string, properties?: EventProperties) =>
  async <TCtx extends object>(ctx: TCtx, _props: unknown): Promise<{ readonly ctx: TCtx }> => {
    after(() => eventTracker.page({ name, ...(properties ? { properties } : {}) }));
    return { ctx };
  };
