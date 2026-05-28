'use server';

import { consoleLogger, type LogEntry } from '@/libraries/observability';

const logger = consoleLogger();

export const logClientAction = async (entry: LogEntry): Promise<void> => {
  logger.log({
    ...entry,
    attributes: { ...entry.attributes, 'observability.origin': 'client' }
  });
};
