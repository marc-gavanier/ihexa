import { after } from 'next/server';
import { createOtelMetrics, withMetrics as createWithMetrics } from '@/libraries/observability';
import { getIdentity, getScope } from '@/libraries/observability/context';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });

export const withMetrics = createWithMetrics(metrics, after);
