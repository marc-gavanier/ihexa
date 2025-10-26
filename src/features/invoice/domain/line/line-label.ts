import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidLineLabelError = DomainError<'InvalidLineLabelError', string>;

export const InvalidLineLabelError = (value: string): InvalidLineLabelError => ({
  _tag: 'InvalidLineLabelError',
  value
});
export type LineLabel = ValueObject<string>;

const isLineLabel = (value: string): value is LineLabel => value.length > 0;

export const LineLabel = (lineLabel: string): Effect<LineLabel, InvalidLineLabelError> =>
  isLineLabel(lineLabel) ? succeed(lineLabel) : fail(InvalidLineLabelError(lineLabel));
