import { withMetrics as createWithMetrics } from '@arckit/nextjs/telemetry';
import { createLoggerMetrics } from '@arckit/telemetry/metrics';
import { logger } from '../../logger/server';

export const metrics = createLoggerMetrics({ logger, namespace: 'ihexa' });

export const withMetrics = createWithMetrics(metrics);
