import { consoleLogger } from '@arckit/observability';
import { withLogger as createWithLogger } from './with-logger';

export const withLogger = createWithLogger(consoleLogger());
