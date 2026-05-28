import pino, { type DestinationStream, type LoggerOptions } from 'pino';
import { getScope, getTrace, getUser } from '../context';
import { buildLogRecord } from './build-log-record';
import type { LogEntry, Logger, LogRecord } from './logger.type';

export const pinoLogger = (options: LoggerOptions = {}, destination?: DestinationStream): Logger => {
  const instance = destination ? pino(options, destination) : pino(options);

  return {
    log: (entry: LogEntry): LogRecord => {
      const record = buildLogRecord({ ...entry, scope: getScope(), user: getUser(), trace: getTrace() });
      instance[entry.level](record);
      return record;
    }
  };
};
