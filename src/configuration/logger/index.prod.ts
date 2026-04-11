import { withLogger as createWithLogger } from '@/libraries/logger';
import { sentryLogger } from '@/libraries/logger/sentry-logger';

const loggerInstance = sentryLogger();

export const logger = loggerInstance;
export const withLogger = createWithLogger(loggerInstance);
