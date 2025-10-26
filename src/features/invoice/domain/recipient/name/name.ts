import { all, type Effect } from 'effect/Effect';
import { toValueObject, type ValueObject } from '@/libraries/ddd';
import type { FirstName, InvalidFirstNameError } from './first-name';
import type { InvalidLastNameError, LastName } from './last-name';

export type InvalidNameError = InvalidFirstNameError | InvalidLastNameError;

export type Name = ValueObject<{
  firstName: FirstName;
  lastName: LastName;
}>;

export const Name = (
  firstNameEffect: Effect<FirstName, InvalidFirstNameError>,
  lastNameEffect: Effect<LastName, InvalidLastNameError>
): Effect<Name, InvalidNameError> => all(toValueObject({ firstName: firstNameEffect, lastName: lastNameEffect }));
