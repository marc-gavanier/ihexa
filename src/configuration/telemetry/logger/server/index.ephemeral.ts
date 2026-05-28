import { after } from 'next/server';
import { withLogger as createWithLogger, noopLogger } from '@/libraries/telemetry';

export const logger = noopLogger();

export const withLogger = createWithLogger(logger, after);
