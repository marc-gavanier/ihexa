import { after } from 'next/server';
import { createConsoleLogger, withLogger as createWithLogger } from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';

export const logger = createConsoleLogger({ getScope, getIdentity, getTrace });

export const withLogger = createWithLogger(logger, after);
