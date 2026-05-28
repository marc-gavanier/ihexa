import { withTracer as createWithTracer, noopTracer } from '@/libraries/telemetry';

export const tracer = noopTracer();

export const withTracer = createWithTracer(tracer);
