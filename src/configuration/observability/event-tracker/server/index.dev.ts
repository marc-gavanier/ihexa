import { after } from 'next/server';
import { createLoggerEventTracker, withEventTracker as createWithEventTracker } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';
import { logger } from '../../logger/server';

export const eventTracker = createLoggerEventTracker({ logger, getScope, getUser, getTrace });

export const withEventTracker = createWithEventTracker(eventTracker, after);
