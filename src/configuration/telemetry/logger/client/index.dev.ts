import { logClientAction } from '@/app/_actions/telemetry/log-client.action';
import { serverActionLogger } from '@/libraries/telemetry';

export const logger = serverActionLogger(logClientAction);
