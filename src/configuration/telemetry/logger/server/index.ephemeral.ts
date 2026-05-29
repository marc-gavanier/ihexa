import { withLogger as createWithLogger } from '@arckit/nextjs/telemetry';
import { noopLogger } from '@arckit/telemetry';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

export const logger = noopLogger();

export const withLogger = createWithLogger(logger, preservingAfter);
