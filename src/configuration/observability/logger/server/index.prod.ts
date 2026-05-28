import { after } from 'next/server';
import { createPinoLogger, withLogger as createWithLogger } from '@/libraries/observability';
import { getScope, getTrace, getUser } from '@/libraries/observability/context';

export const logger = createPinoLogger({ getScope, getUser, getTrace });

export const withLogger = createWithLogger(logger, after);
