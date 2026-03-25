import { withLogger as createWithLogger, fileLogger } from '@/libraries/logger';

// TODO: Replace with Sentry or other production logger
export const withLogger = createWithLogger(fileLogger({ path: '.logs/app.jsonl' }));
