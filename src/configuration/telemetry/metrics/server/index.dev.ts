import { preservingAfter } from '@/configuration/telemetry/scheduler';
import { createLoggerMetrics, withMetrics as createWithMetrics } from '@/libraries/telemetry';
import { logger } from '../../logger/server';

export const metrics = createLoggerMetrics({ logger, namespace: 'ihexa' });

export const withMetrics = createWithMetrics(metrics, preservingAfter);
