import { withEventTracker as createWithEventTracker, withPageView as createWithPageView } from '@arckit/nextjs/telemetry';
import { createLoggerEventTracker } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { logger } from '../../logger/server';

export const eventTracker = createLoggerEventTracker({ logger, getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker);

export const withPageView = createWithPageView(eventTracker);
