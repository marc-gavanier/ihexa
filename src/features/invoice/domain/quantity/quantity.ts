import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidQuantityError } from './invalid-quantity.error';

export type Quantity = WrapPrimitive<number>;

export const isQuantity = (value: number): value is Quantity => value >= 0;

export const Quantity = (
  count: number,
): Effect<Quantity, InvalidQuantityError> =>
  isQuantity(count) ? succeed(count) : fail(InvalidQuantityError(count));
