import { withLogger as createWithLogger } from '@arckit/nextjs/telemetry';
import { noopLogger } from '@arckit/telemetry/logger';

export const logger = noopLogger();

export const withLogger = createWithLogger(logger);
