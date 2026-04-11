import * as Sentry from '@sentry/nextjs';
import type { Logger } from './logger.type';

const LEVEL_MAP = {
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error'
} as const;

export const sentryLogger = (): Logger => ({
  log: ({ level, event, source, payload, error }) => {
    Sentry.withScope((scope) => {
      if (source) scope.setTag('source', source);
      if (payload) scope.setContext('payload', payload);

      if (error) {
        scope.setLevel(LEVEL_MAP[level]);
        Sentry.captureException(error, {
          captureContext: { extra: { event } }
        });
      } else {
        Sentry.captureMessage(event, LEVEL_MAP[level]);
      }
    });
  }
});
