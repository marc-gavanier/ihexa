import { createInstrument } from '@arckit/telemetry';
import { errorReporter } from '../error-reporter/server';
import { metrics } from '../metrics/server';
import { tracer } from '../tracer/server';

export const instrument = createInstrument({ tracer, metrics, errorReporter });
