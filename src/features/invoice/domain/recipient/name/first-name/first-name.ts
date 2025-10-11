import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidFirstNameError } from './invalid-first-name.error';

export type FirstName = WrapPrimitive<string>;

const isFirstName = (value: string): value is FirstName => value.length > 0;

export const FirstName = (
  firstName: string,
): Effect<FirstName, InvalidFirstNameError> =>
  isFirstName(firstName)
    ? succeed(firstName)
    : fail(InvalidFirstNameError(firstName));
