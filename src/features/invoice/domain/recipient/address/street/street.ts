import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidStreetError } from './invalid-street.error';

export type Street = WrapPrimitive<string>;

const isStreet = (value: string): value is Street => value.length > 0;

export const Street = (street: string): Effect<Street, InvalidStreetError> =>
  isStreet(street) ? succeed(street) : fail(InvalidStreetError(street));
