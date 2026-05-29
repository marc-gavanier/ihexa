import { withMetrics as createWithMetrics } from '@arckit/nextjs/telemetry';
import { noopMetrics } from '@arckit/telemetry';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

export const metrics = noopMetrics();

export const withMetrics = createWithMetrics(metrics, preservingAfter);
