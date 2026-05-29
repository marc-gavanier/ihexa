import { withEventTracker as createWithEventTracker, withPageView as createWithPageView } from '@arckit/nextjs/telemetry';
import { createNoopEventTracker } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

export const eventTracker = createNoopEventTracker({ getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, preservingAfter);

export const withPageView = createWithPageView(eventTracker, preservingAfter);
