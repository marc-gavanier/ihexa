import { withTracer as createWithTracer, otelTracer } from '@/libraries/observability';

export const tracer = otelTracer('ihexa');

export const withTracer = createWithTracer(tracer);
