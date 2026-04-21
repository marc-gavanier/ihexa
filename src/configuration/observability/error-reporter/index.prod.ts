import { withErrorReporter as createWithErrorReporter } from '@/libraries/observability';
import { sentryReporter } from '@/libraries/observability/error-reporter/sentry-reporter';

export const errorReporter = sentryReporter();
export const withErrorReporter = createWithErrorReporter(errorReporter);
