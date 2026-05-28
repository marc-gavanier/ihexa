import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { createOtelMetrics, withMetrics as createWithMetrics } from '@/libraries/telemetry';
import { getIdentity, getScope } from '@/libraries/telemetry/context';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });

export const withMetrics = createWithMetrics(metrics, preservingAfter);
