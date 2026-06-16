import { withTracer as createWithTracer } from '@arckit/nextjs/telemetry';
import { createLoggerTracer } from '@arckit/telemetry/tracer';
import { logger } from '../../logger/server';

export const tracer = createLoggerTracer({ logger, namespace: 'ihexa' });

export const withTracer = createWithTracer(tracer);
