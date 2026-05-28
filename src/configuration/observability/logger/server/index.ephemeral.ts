import { after } from 'next/server';
import { createConsoleLogger, withLogger as createWithLogger } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

export const logger = createConsoleLogger({ getScope, getUser, getTrace });

export const withLogger = createWithLogger(logger, after);
