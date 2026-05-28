import { getContext } from '../context';
import type { LogEntry, Logger, LogLevel } from './logger.type';

const SEVERITY_NUMBER: Readonly<Record<LogLevel, number>> = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};

const CONSOLE_METHOD: Readonly<Record<LogLevel, 'debug' | 'log' | 'warn' | 'error'>> = {
  trace: 'debug',
  debug: 'debug',
  info: 'log',
  warn: 'warn',
  error: 'error',
  fatal: 'error'
};

export const consoleLogger = (): Logger => ({
  log: ({ level, event, attributes, error }: LogEntry): void => {
    const record: Record<string, unknown> = {
      time: new Date().toISOString(),
      severityText: level.toUpperCase(),
      severityNumber: SEVERITY_NUMBER[level],
      ...getContext(),
      event,
      ...attributes
    };

    if (error) {
      record['exception.type'] = error.name;
      record['exception.message'] = error.message;
      record['exception.stacktrace'] = error.stack;
    }

    console[CONSOLE_METHOD[level]](JSON.stringify(record));
  }
});
