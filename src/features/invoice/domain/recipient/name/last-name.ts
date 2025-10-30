import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';
import { isEmpty } from '@/libraries/utils/string/is-empty';

export type InvalidLastNameError = DomainError<'InvalidLastNameError', string>;

export const InvalidLastNameError = (value: string): InvalidLastNameError => ({
  _tag: 'InvalidLastNameError',
  value
});

export type LastName = ValueObject<string>;

export const isLastName = (value: string): value is LastName => !isEmpty(value);

export const LastName = (lastName: string): Effect<LastName, InvalidLastNameError> =>
  isLastName(lastName) ? succeed(lastName) : fail(InvalidLastNameError(lastName));
