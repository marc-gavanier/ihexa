import { withMetrics as createWithMetrics } from '@arckit/nextjs/telemetry';
import { getIdentity, getScope } from '@arckit/telemetry/context';
import { createOtelMetrics } from '@arckit/telemetry/metrics';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });

export const withMetrics = createWithMetrics(metrics);
