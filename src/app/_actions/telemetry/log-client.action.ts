'use server';

import { createConsoleLogger, type LogEntry } from '@/libraries/telemetry';

const logger = createConsoleLogger();

export const logClientAction = async (entry: LogEntry): Promise<void> => {
  logger.log({
    ...entry,
    attributes: { ...entry.attributes, 'observability.origin': 'client' }
  });
};
