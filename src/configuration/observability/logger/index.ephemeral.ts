import { consoleLogger, withLogger as createWithLogger } from '@/libraries/observability';

const loggerInstance = consoleLogger();

export const logger = loggerInstance;
export const withLogger = createWithLogger(loggerInstance);
