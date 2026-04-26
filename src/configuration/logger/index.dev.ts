import { fileLogger } from '@arckit/observability';
import { withLogger as createWithLogger } from './with-logger';

export const withLogger = createWithLogger(fileLogger({ path: '.logs/app.jsonl', console: true }));
