import { withTracer as createWithTracer, noopTracer } from '@/libraries/observability';

export const tracer = noopTracer();

export const withTracer = createWithTracer(tracer);
