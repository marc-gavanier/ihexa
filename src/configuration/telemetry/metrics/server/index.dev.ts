import { after } from 'next/server';
import { withMetrics as createWithMetrics, noopMetrics } from '@/libraries/telemetry';

export const metrics = noopMetrics();

export const withMetrics = createWithMetrics(metrics, after);
