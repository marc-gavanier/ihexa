import { after } from 'next/server';
import {
  createNoopEventTracker,
  withEventTracker as createWithEventTracker,
  type EventProperties
} from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';

export const eventTracker = createNoopEventTracker({ getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, after);

export const withPageView =
  (name: string, properties?: EventProperties) =>
  async <TCtx extends object>(ctx: TCtx, _props: unknown): Promise<{ readonly ctx: TCtx }> => {
    after(() => eventTracker.page({ name, ...(properties ? { properties } : {}) }));
    return { ctx };
  };
