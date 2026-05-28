import { after } from 'next/server';
import { createNoopEventTracker, withEventTracker as createWithEventTracker } from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';

export const eventTracker = createNoopEventTracker({ getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, after);
