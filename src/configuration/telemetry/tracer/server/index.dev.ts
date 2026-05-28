import { createLoggerTracer, withTracer as createWithTracer } from '@/libraries/telemetry';
import { logger } from '../../logger/server';

export const tracer = createLoggerTracer({ logger, namespace: 'ihexa' });

export const withTracer = createWithTracer(tracer);
