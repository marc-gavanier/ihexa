import { withMetrics as createWithMetrics } from '@arckit/nextjs/telemetry';
import { createOtelMetrics } from '@arckit/telemetry';
import { getIdentity, getScope } from '@arckit/telemetry/context';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });

export const withMetrics = createWithMetrics(metrics);
