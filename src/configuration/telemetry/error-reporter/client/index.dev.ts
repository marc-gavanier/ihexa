import { reportClientException, reportClientMessage } from '@/app/_actions/telemetry/report-client.action';
import { serverActionReporter } from '@/libraries/telemetry';

export const errorReporter = serverActionReporter({
  captureException: reportClientException,
  captureMessage: reportClientMessage
});

export const register = (): void => {};
