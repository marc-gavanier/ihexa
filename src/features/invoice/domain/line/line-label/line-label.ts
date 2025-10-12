import { type Effect, fail, succeed } from 'effect/Effect';
import type { ValueObject } from '@/libraries/ddd';
import { InvalidLineLabelError } from './invalid-line-label.error';

export type LineLabel = ValueObject<string>;

const isLineLabel = (value: string): value is LineLabel => value.length > 0;

export const LineLabel = (
  lineLabel: string,
): Effect<LineLabel, InvalidLineLabelError> =>
  isLineLabel(lineLabel)
    ? succeed(lineLabel)
    : fail(InvalidLineLabelError(lineLabel));
