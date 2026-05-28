import { logClientAction } from '@/app/_actions/observability/log-client.action';
import { serverActionLogger } from '@/libraries/observability';

export const logger = serverActionLogger(logClientAction);
