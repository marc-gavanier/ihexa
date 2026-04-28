import type { Logger } from '../logger/logger.type';
import type { ErrorReporter } from './error-reporter.type';

export const loggerReporter = (logger: Logger): ErrorReporter => ({
  capture: ({ error, context, source }) => {
    logger.log({
      level: 'error',
      event: 'error:captured',
      payload: {
        source,
        message: error.message,
        ...(context ? { context } : {}),
        stack: error.stack
      }
    });
  }
});
