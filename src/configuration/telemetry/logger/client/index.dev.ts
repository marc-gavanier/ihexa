import { serverActionLogger } from '@arckit/telemetry';
import { logClientAction } from '@/app/_actions/telemetry/log-client.action';

export const logger = serverActionLogger(logClientAction);
