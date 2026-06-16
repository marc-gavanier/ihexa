import { serverActionReporter } from '@arckit/telemetry/error-reporter';
import { reportClientException, reportClientMessage } from '@/app/_actions/telemetry/report-client.action';

export const errorReporter = serverActionReporter({
  captureException: reportClientException,
  captureMessage: reportClientMessage
});

export const register = (): void => {};

export const onRouterTransitionStart = (_url: string, _navigationType: 'push' | 'replace' | 'traverse'): void => {};
