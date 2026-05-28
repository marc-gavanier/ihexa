import { after } from 'next/server';
import { createNoopEventTracker, withEventTracker as createWithEventTracker } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

export const eventTracker = createNoopEventTracker({ getScope, getUser, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, after);
