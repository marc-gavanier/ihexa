import { getScope, getTrace, getUser } from '../context';
import type { Logger } from '../logger';
import { buildErrorRecord } from './build-error-record';
import type { ErrorCapture, ErrorRecord, ErrorReporter, MessageCapture } from './error-reporter.type';

export const loggerReporter = (logger: Logger): ErrorReporter => ({
  captureException: (capture: ErrorCapture): ErrorRecord => {
    const level = capture.level ?? 'error';
    logger.log({
      level,
      event: 'exception',
      error: capture.error,
      ...(capture.attributes ? { attributes: capture.attributes } : {})
    });
    return buildErrorRecord({ ...capture, level, scope: getScope(), user: getUser(), trace: getTrace() });
  },
  captureMessage: (capture: MessageCapture): ErrorRecord => {
    logger.log({
      level: capture.level,
      event: 'message',
      attributes: { message: capture.message, ...capture.attributes }
    });
    return buildErrorRecord({ ...capture, scope: getScope(), user: getUser(), trace: getTrace() });
  }
});
