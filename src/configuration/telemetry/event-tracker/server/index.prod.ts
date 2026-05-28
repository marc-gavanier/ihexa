import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { serverEnv } from '@/env/env.server';
import {
  createMatomoEventTracker,
  withEventTracker as createWithEventTracker,
  type EventProperties
} from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

export const eventTracker = createMatomoEventTracker({
  config: { url: serverEnv.MATOMO_URL, siteId: serverEnv.MATOMO_SITE_ID },
  getScope,
  getIdentity,
  getTrace
});

export const withEventTracker = createWithEventTracker(eventTracker, preservingAfter);

export const withPageView =
  (name: string, properties?: EventProperties) =>
  async <TCtx extends object>(ctx: TCtx, _props: unknown): Promise<{ readonly ctx: TCtx }> => {
    preservingAfter(() => eventTracker.page({ name, ...(properties ? { properties } : {}) }));
    return { ctx };
  };
