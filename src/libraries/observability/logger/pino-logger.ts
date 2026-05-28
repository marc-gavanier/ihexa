import pino, { type DestinationStream, type LoggerOptions } from 'pino';
import { getScope, getTrace, getUser } from '../context';
import type { LogEntry, Logger, LogLevel } from './logger.type';

const emit = (instance: pino.Logger, level: LogLevel, payload: Record<string, unknown>): void => {
  switch (level) {
    case 'trace':
      instance.trace(payload);
      return;
    case 'debug':
      instance.debug(payload);
      return;
    case 'info':
      instance.info(payload);
      return;
    case 'warn':
      instance.warn(payload);
      return;
    case 'error':
      instance.error(payload);
      return;
    case 'fatal':
      instance.fatal(payload);
      return;
  }
};

export const pinoLogger = (options: LoggerOptions = {}, destination?: DestinationStream): Logger => {
  const instance = destination ? pino(options, destination) : pino(options);

  return {
    log: ({ level, event, attributes, error }: LogEntry): void => {
      const payload: Record<string, unknown> = {
        ...getScope(),
        ...getUser(),
        ...getTrace(),
        event,
        ...attributes
      };

      if (error) {
        payload['exception.type'] = error.name;
        payload['exception.message'] = error.message;
        payload['exception.stacktrace'] = error.stack;
      }

      emit(instance, level, payload);
    }
  };
};
