import { reportClientException, reportClientMessage } from '@/app/_actions/observability/report-client.action';
import { serverActionReporter } from '@/libraries/observability';

export const errorReporter = serverActionReporter({
  captureException: reportClientException,
  captureMessage: reportClientMessage
});

export const register = (): void => {};
