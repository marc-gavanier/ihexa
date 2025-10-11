import { type Effect, fail, succeed } from 'effect/Effect';
import type { WrapPrimitive } from '@/libraries/ddd/wrap-primitive';
import { InvalidLastNameError } from './invalid-last-name.error';

export type LastName = WrapPrimitive<string>;

const isLastName = (value: string): value is LastName => value.length > 0;

export const LastName = (
  lastName: string,
): Effect<LastName, InvalidLastNameError> =>
  isLastName(lastName)
    ? succeed(lastName)
    : fail(InvalidLastNameError(lastName));
