import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { withMetrics as createWithMetrics, noopMetrics } from '@/libraries/telemetry';

export const metrics = noopMetrics();

export const withMetrics = createWithMetrics(metrics, preservingAfter);
