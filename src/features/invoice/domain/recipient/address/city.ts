import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidCityError = DomainError<'InvalidCityError', string>;

export const InvalidCityError = (value: string): InvalidCityError => ({
  _tag: 'InvalidCityError',
  value,
});

export type City = ValueObject<string>;

const isCity = (value: string): value is City => value.length > 0;

export const City = (city: string): Effect<City, InvalidCityError> =>
  isCity(city) ? succeed(city) : fail(InvalidCityError(city));
