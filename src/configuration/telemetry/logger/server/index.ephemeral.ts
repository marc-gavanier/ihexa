import { after } from 'next/server';
import { createConsoleLogger, withLogger as createWithLogger } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

export const logger = createConsoleLogger({ getScope, getIdentity, getTrace });

export const withLogger = createWithLogger(logger, after);
