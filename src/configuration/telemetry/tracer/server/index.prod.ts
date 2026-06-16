import { withTracer as createWithTracer } from '@arckit/nextjs/telemetry';
import { otelTracer } from '@arckit/telemetry/tracer';

export const tracer = otelTracer('ihexa');

export const withTracer = createWithTracer(tracer);
