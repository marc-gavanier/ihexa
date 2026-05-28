import { withTracer as createWithTracer, otelTracer } from '@/libraries/telemetry';

export const tracer = otelTracer('ihexa');

export const withTracer = createWithTracer(tracer);
