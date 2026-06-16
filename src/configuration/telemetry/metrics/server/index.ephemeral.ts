import { withMetrics as createWithMetrics } from '@arckit/nextjs/telemetry';
import { noopMetrics } from '@arckit/telemetry/metrics';

export const metrics = noopMetrics();

export const withMetrics = createWithMetrics(metrics);
