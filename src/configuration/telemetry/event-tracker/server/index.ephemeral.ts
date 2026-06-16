import { withEventTracker as createWithEventTracker, withPageView as createWithPageView } from '@arckit/nextjs/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { createNoopEventTracker } from '@arckit/telemetry/event-tracker';

export const eventTracker = createNoopEventTracker({ getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker);

export const withPageView = createWithPageView(eventTracker);
