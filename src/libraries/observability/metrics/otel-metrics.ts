import { type Attributes, metrics as otelMetricsApi } from '@opentelemetry/api';
import { getScope, getUser } from '../context';
import type { SpanAttributes } from '../tracer';
import { buildMeasurement } from './build-measurement';
import type { Counter, Gauge, Histogram, InstrumentOptions, Measurement, Metrics } from './metrics.type';

export type OtelMetricsOptions = {
  readonly namespace: string;
  readonly meterName?: string;
};

const toOtelAttributes = (attributes: SpanAttributes): Attributes =>
  Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value])
  ) as Attributes;

const recordMeasurement = (
  instrumentName: string,
  value: number,
  attributes: SpanAttributes | undefined,
  namespace: string,
  forward: (value: number, attrs: Attributes) => void
): Measurement => {
  const measurement = buildMeasurement({
    instrumentName,
    value,
    namespace,
    attributes,
    scope: getScope(),
    user: getUser()
  });
  forward(value, toOtelAttributes(measurement.attributes));
  return measurement;
};

export const otelMetrics = ({ namespace, meterName = 'arckit-observability' }: OtelMetricsOptions): Metrics => {
  const meter = otelMetricsApi.getMeter(meterName);
  return {
    counter: (name: string, options?: InstrumentOptions): Counter => {
      const instrument = meter.createCounter(name, options);
      return { add: (value, attrs) => recordMeasurement(name, value, attrs, namespace, (v, a) => instrument.add(v, a)) };
    },
    histogram: (name: string, options?: InstrumentOptions): Histogram => {
      const instrument = meter.createHistogram(name, options);
      return {
        record: (value, attrs) => recordMeasurement(name, value, attrs, namespace, (v, a) => instrument.record(v, a))
      };
    },
    gauge: (name: string, options?: InstrumentOptions): Gauge => {
      const instrument = meter.createGauge(name, options);
      return {
        record: (value, attrs) => recordMeasurement(name, value, attrs, namespace, (v, a) => instrument.record(v, a))
      };
    }
  };
};
