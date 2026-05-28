import type { Authenticated, ObservabilityScope } from '../context';
import { buildSpanAttributes, type SpanAttributes } from '../tracer';
import type { Measurement } from './metrics.type';

type BuildMeasurementInput = {
  readonly instrumentName: string;
  readonly value: number;
  readonly namespace: string;
  readonly attributes?: SpanAttributes | undefined;
  readonly scope?: ObservabilityScope | undefined;
  readonly user?: Authenticated | undefined;
};

export const buildMeasurement = ({
  instrumentName,
  value,
  namespace,
  attributes,
  scope,
  user
}: BuildMeasurementInput): Measurement => ({
  instrumentName,
  value,
  attributes: buildSpanAttributes({ namespace, attributes, scope, user })
});
