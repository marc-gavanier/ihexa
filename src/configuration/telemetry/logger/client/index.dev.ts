import { serverActionLogger } from '@arckit/telemetry/logger';
import { logClientAction } from '@/app/_actions/telemetry/log-client.action';

export const logger = serverActionLogger(logClientAction);
