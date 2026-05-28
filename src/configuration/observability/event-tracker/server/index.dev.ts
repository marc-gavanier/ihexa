import { after } from 'next/server';
import { createLoggerEventTracker, withEventTracker as createWithEventTracker } from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';
import { logger } from '../../logger/server';

export const eventTracker = createLoggerEventTracker({ logger, getScope, getIdentity, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, after);
