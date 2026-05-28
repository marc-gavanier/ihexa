import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { createPinoLogger, withLogger as createWithLogger } from '@/libraries/telemetry';
import { getIdentity, getScope, getTrace } from '@/libraries/telemetry/context';

export const logger = createPinoLogger({ getScope, getIdentity, getTrace });

export const withLogger = createWithLogger(logger, preservingAfter);
