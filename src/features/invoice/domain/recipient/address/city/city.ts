import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidCityError } from './invalid-city.error';

export type City = WrapPrimitive<string>;

const isCity = (value: string): value is City => value.length > 0;

export const City = (city: string): Effect<City, InvalidCityError> =>
  isCity(city) ? succeed(city) : fail(InvalidCityError(city));
