import { after } from 'next/server';
import { createPinoLogger, withLogger as createWithLogger } from '@/libraries/observability';
import { getIdentity, getScope, getTrace } from '@/libraries/observability/context';

export const logger = createPinoLogger({ getScope, getIdentity, getTrace });

export const withLogger = createWithLogger(logger, after);
