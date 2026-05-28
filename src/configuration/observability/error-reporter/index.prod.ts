import { clientEnv } from '@/env/env.client';
import { withErrorReporter as createWithErrorReporter } from '@/libraries/observability';
import { registerSentry } from '@/libraries/observability/error-reporter/sentry-instrumentation';
import { sentryReporter } from '@/libraries/observability/error-reporter/sentry-reporter';

export { onRequestError } from '@/libraries/observability/error-reporter/sentry-instrumentation';

export const errorReporter = sentryReporter();
export const withErrorReporter = createWithErrorReporter(errorReporter);

export const register = registerSentry({ dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN });
