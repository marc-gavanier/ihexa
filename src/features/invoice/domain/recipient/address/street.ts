import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidStreetError = DomainError<'InvalidStreetError', string>;

export const InvalidStreetError = (value: string): InvalidStreetError => ({
  _tag: 'InvalidStreetError',
  value,
});

export type Street = ValueObject<string>;

const isStreet = (value: string): value is Street => value.length > 0;

export const Street = (street: string): Effect<Street, InvalidStreetError> =>
  isStreet(street) ? succeed(street) : fail(InvalidStreetError(street));
