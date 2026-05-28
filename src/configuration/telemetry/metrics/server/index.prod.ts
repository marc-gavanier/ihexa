import { after } from 'next/server';
import { createOtelMetrics, withMetrics as createWithMetrics } from '@/libraries/telemetry';
import { getIdentity, getScope } from '@/libraries/telemetry/context';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });

export const withMetrics = createWithMetrics(metrics, after);
