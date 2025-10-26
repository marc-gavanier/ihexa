import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidQuantityError = DomainError<'InvalidQuantityError', number>;

export const InvalidQuantityError = (value: number): InvalidQuantityError => ({
  _tag: 'InvalidQuantityError',
  value
});

export type Quantity = ValueObject<number>;

export const isQuantity = (value: number): value is Quantity => value >= 0;

export const Quantity = (count: number): Effect<Quantity, InvalidQuantityError> =>
  isQuantity(count) ? succeed(count) : fail(InvalidQuantityError(count));
