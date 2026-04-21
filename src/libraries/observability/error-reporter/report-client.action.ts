'use server';

import { errorReporter } from '@/configuration/observability/error-reporter';

type SerializedError = {
  message: string;
  stack?: string;
};

type ClientErrorReport = {
  error: SerializedError;
  context?: Record<string, unknown>;
};

export const reportClientError = async ({ error, context }: ClientErrorReport): Promise<void> => {
  errorReporter.capture({
    error: Object.assign(new Error(error.message), { stack: error.stack }),
    source: 'client',
    context
  });
};
