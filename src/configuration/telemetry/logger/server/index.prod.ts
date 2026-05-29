import { withLogger as createWithLogger } from '@arckit/nextjs/telemetry';
import { createPinoLogger } from '@arckit/telemetry';
import { getIdentity, getScope, getTrace } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

export const logger = createPinoLogger({ getScope, getIdentity, getTrace });

export const withLogger = createWithLogger(logger, preservingAfter);
