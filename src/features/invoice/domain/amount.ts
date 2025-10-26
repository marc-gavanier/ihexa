import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidAmountError = DomainError<'InvalidAmountError', number>;

export const InvalidAmountError = (value: number): InvalidAmountError => ({
  _tag: 'InvalidAmountError',
  value
});

export type Amount = ValueObject<number>;

export const isAmount = (value: number): value is Amount => value >= 0;

export const Amount = (cents: number): Effect<Amount, InvalidAmountError> =>
  isAmount(cents) ? succeed(cents) : fail(InvalidAmountError(cents));

export const amountFromDecimal = (decimal: number): Effect<Amount, InvalidAmountError> => Amount(Math.round(decimal * 100));
