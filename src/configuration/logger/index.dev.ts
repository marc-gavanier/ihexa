import { withLogger as createWithLogger, fileLogger } from '@/libraries/logger';

export const withLogger = createWithLogger(fileLogger({ path: '.logs/app.jsonl', console: true }));
