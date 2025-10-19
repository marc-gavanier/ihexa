import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidFirstNameError = DomainError<
  'InvalidFirstNameError',
  string
>;

export const InvalidFirstNameError = (
  value: string,
): InvalidFirstNameError => ({
  _tag: 'InvalidFirstNameError',
  value,
});

export type FirstName = ValueObject<string>;

const isFirstName = (value: string): value is FirstName => value.length > 0;

export const FirstName = (
  firstName: string,
): Effect<FirstName, InvalidFirstNameError> =>
  isFirstName(firstName)
    ? succeed(firstName)
    : fail(InvalidFirstNameError(firstName));
