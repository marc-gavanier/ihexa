import { withTracer as createWithTracer } from '@arckit/nextjs/telemetry';
import { noopTracer } from '@arckit/telemetry/tracer';

export const tracer = noopTracer();

export const withTracer = createWithTracer(tracer);
