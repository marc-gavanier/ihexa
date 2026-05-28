import * as Sentry from '@sentry/nextjs';

type SentryConfig = {
  dsn?: string;
  tracesSampleRate?: number;
};

const isServerRuntime = (): boolean => process.env['NEXT_RUNTIME'] === 'nodejs' || process.env['NEXT_RUNTIME'] === 'edge';

export const registerSentry =
  ({ dsn, tracesSampleRate = 0 }: SentryConfig) =>
  async (): Promise<void> => {
    if (isServerRuntime()) {
      Sentry.init({ dsn, tracesSampleRate });
    }
  };

export const initSentryClient = ({ dsn, tracesSampleRate = 0 }: SentryConfig): void => {
  Sentry.init({ dsn, tracesSampleRate });
};

export const onRequestError = Sentry.captureRequestError;
