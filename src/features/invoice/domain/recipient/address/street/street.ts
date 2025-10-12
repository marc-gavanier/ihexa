import { type Effect, fail, succeed } from 'effect/Effect';
import type { ValueObject } from '@/libraries/ddd';
import { InvalidStreetError } from './invalid-street.error';

export type Street = ValueObject<string>;

const isStreet = (value: string): value is Street => value.length > 0;

export const Street = (street: string): Effect<Street, InvalidStreetError> =>
  isStreet(street) ? succeed(street) : fail(InvalidStreetError(street));
