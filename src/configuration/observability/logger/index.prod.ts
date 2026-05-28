import { serverEnv } from '@/env/env.server';
import { withLogger as createWithLogger } from '@/libraries/observability';
import { lokiLogger } from '@/libraries/observability/logger/loki-logger';

const loggerInstance = lokiLogger({
  url: serverEnv.LOKI_URL,
  labels: { env: 'prod' }
});

export const logger = loggerInstance;
export const withLogger = createWithLogger(loggerInstance);
