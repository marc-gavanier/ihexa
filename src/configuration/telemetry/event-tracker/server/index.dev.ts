import { withEventTracker as createWithEventTracker, withPageView as createWithPageView } from '@arckit/nextjs/telemetry';
import { createLoggerEventTracker } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { logger } from '../../logger/server';

export const eventTracker = createLoggerEventTracker({ logger, getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, preservingAfter);

export const withPageView = createWithPageView(eventTracker, preservingAfter);
