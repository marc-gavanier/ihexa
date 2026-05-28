import { after } from 'next/server';
import { withMetrics as createWithMetrics, noopMetrics } from '@/libraries/observability';

export const metrics = noopMetrics();

export const withMetrics = createWithMetrics(metrics, after);
