import { type Effect, fail, succeed } from 'effect/Effect';
import type { ValueObject } from '@/libraries/ddd';
import { InvalidCityError } from './invalid-city.error';

export type City = ValueObject<string>;

const isCity = (value: string): value is City => value.length > 0;

export const City = (city: string): Effect<City, InvalidCityError> =>
  isCity(city) ? succeed(city) : fail(InvalidCityError(city));
