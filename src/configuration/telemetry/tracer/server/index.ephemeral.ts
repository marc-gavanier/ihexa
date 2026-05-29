import { withTracer as createWithTracer } from '@arckit/nextjs/telemetry';
import { noopTracer } from '@arckit/telemetry';

export const tracer = noopTracer();

export const withTracer = createWithTracer(tracer);
