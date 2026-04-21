import * as Sentry from '@sentry/nextjs';
import type { ErrorReporter } from './error-reporter.type';

export const sentryReporter = (): ErrorReporter => ({
  capture: ({ error, context, source }) => {
    Sentry.withScope((scope) => {
      if (source) scope.setTag('source', source);
      if (context) scope.setContext('context', context);
      scope.setLevel('error');
      Sentry.captureException(error);
    });
  }
});
