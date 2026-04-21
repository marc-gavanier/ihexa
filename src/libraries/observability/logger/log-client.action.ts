'use server';

import { logger } from '@/configuration/observability/logger';

type SerializedError = {
  message: string;
  stack?: string;
};

type ClientLogPayload = {
  event: string;
  payload?: Record<string, unknown>;
  error?: SerializedError;
};

const logClient =
  (level: 'debug' | 'info' | 'warn' | 'error') =>
  async ({ event, payload, error }: ClientLogPayload): Promise<void> => {
    logger.log({
      level,
      event,
      source: 'client',
      payload,
      error: error ? Object.assign(new Error(error.message), { stack: error.stack }) : undefined
    });
  };

export const logClientDebug = logClient('debug');
export const logClientInfo = logClient('info');
export const logClientWarn = logClient('warn');
export const logClientError = logClient('error');
