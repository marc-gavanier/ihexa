import { createInstrument } from '@arckit/telemetry/instrument';
import { errorReporter } from '../error-reporter/server';
import { metrics } from '../metrics/server';
import { tracer } from '../tracer/server';

export const instrument = createInstrument({ tracer, metrics, errorReporter });
