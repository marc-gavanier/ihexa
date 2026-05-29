import { withMetrics as createWithMetrics } from '@arckit/nextjs/telemetry';
import { createOtelMetrics } from '@arckit/telemetry';
import { getIdentity, getScope } from '@arckit/telemetry/context';
import { preservingAfter } from '@/configuration/telemetry/scheduler';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });

export const withMetrics = createWithMetrics(metrics, preservingAfter);
