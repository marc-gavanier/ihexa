import { withLogger as createWithLogger, fileLogger } from '@/libraries/logger';

const loggerInstance = fileLogger({ path: '.logs/app.jsonl', console: true });

export const logger = loggerInstance;
export const withLogger = createWithLogger(loggerInstance);
