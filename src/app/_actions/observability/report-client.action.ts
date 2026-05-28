'use server';

import { consoleLogger, type ErrorCapture, loggerReporter, type MessageCapture } from '@/libraries/observability';

const reporter = loggerReporter(consoleLogger());

export const reportClientException = async (capture: ErrorCapture): Promise<void> => {
  reporter.captureException({
    ...capture,
    attributes: { ...capture.attributes, 'observability.origin': 'client' }
  });
};

export const reportClientMessage = async (capture: MessageCapture): Promise<void> => {
  reporter.captureMessage({
    ...capture,
    attributes: { ...capture.attributes, 'observability.origin': 'client' }
  });
};
