import { clientEnv } from '@/env/env.client';
import { initSentryClient } from '@/libraries/observability/error-reporter/sentry-instrumentation';

initSentryClient({ dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN });
