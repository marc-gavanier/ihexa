import { consoleLogger, withLogger as createWithLogger } from '@/libraries/logger';

export const withLogger = createWithLogger(consoleLogger());
