import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidAmountError = DomainError<'InvalidAmountError', bigint>;

export const InvalidAmountError = (value: bigint): InvalidAmountError => ({
  _tag: 'InvalidAmountError',
  value,
});

export type Amount = ValueObject<bigint>;

export const isAmount = (value: bigint): value is Amount => value >= 0;

export const Amount = (cents: bigint): Effect<Amount, InvalidAmountError> =>
  isAmount(cents) ? succeed(cents) : fail(InvalidAmountError(cents));

export const amountFromDecimal = (
  decimal: number,
): Effect<Amount, InvalidAmountError> =>
  Amount(BigInt(Math.round(decimal * 100)));
