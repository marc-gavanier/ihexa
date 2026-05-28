import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { withLogger as createWithLogger, noopLogger } from '@/libraries/telemetry';

export const logger = noopLogger();

export const withLogger = createWithLogger(logger, preservingAfter);
