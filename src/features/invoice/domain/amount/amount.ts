import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidAmountError } from './invalid-amount.error';

export type Amount = WrapPrimitive<bigint>;

export const isAmount = (value: bigint): value is Amount => value >= 0;

export const Amount = (cents: bigint): Effect<Amount, InvalidAmountError> =>
  isAmount(cents) ? succeed(cents) : fail(InvalidAmountError(cents));

export const amountFromDecimal = (
  decimal: number,
): Effect<Amount, InvalidAmountError> =>
  Amount(BigInt(Math.round(decimal * 100)));
