import { preservingAfter } from '@/configuration/telemetry/scheduler';
import {
  createNoopEventTracker,
  withEventTracker as createWithEventTracker,
  type EventProperties
} from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

export const eventTracker = createNoopEventTracker({ getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, preservingAfter);

export const withPageView =
  (name: string, properties?: EventProperties) =>
  async <TCtx extends object>(ctx: TCtx, _props: unknown): Promise<{ readonly ctx: TCtx }> => {
    preservingAfter(() => eventTracker.page({ name, ...(properties ? { properties } : {}) }));
    return { ctx };
  };
