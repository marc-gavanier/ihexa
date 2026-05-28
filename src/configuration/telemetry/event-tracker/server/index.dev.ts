import { preservingAfter } from '@/configuration/telemetry/scheduler';
import {
  createLoggerEventTracker,
  withEventTracker as createWithEventTracker,
  type EventProperties
} from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';
import { logger } from '../../logger/server';

export const eventTracker = createLoggerEventTracker({ logger, getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, preservingAfter);

export const withPageView =
  (name: string, properties?: EventProperties) =>
  async <TCtx extends object>(ctx: TCtx, _props: unknown): Promise<{ readonly ctx: TCtx }> => {
    preservingAfter(() => eventTracker.page({ name, ...(properties ? { properties } : {}) }));
    return { ctx };
  };
