'use server';

import { createLoggerReporter, type ErrorCapture, type MessageCapture } from '@arckit/telemetry/error-reporter';
import { createConsoleLogger } from '@arckit/telemetry/logger';

const reporter = createLoggerReporter({ logger: createConsoleLogger() });

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
