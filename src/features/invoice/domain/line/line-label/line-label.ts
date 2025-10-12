import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidLineLabelError } from './invalid-line-label.error';

export type LineLabel = WrapPrimitive<string>;

const isLineLabel = (value: string): value is LineLabel => value.length > 0;

export const LineLabel = (
  lineLabel: string,
): Effect<LineLabel, InvalidLineLabelError> =>
  isLineLabel(lineLabel)
    ? succeed(lineLabel)
    : fail(InvalidLineLabelError(lineLabel));
