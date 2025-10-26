import { type Effect, fail, succeed } from 'effect/Effect';
import type { DomainError, ValueObject } from '@/libraries/ddd';

export type InvalidPostalCodeError = DomainError<'InvalidPostalCodeError', string>;

export const InvalidPostalCodeError = (value: string): InvalidPostalCodeError => ({
  _tag: 'InvalidPostalCodeError',
  value
});

export type PostalCode = ValueObject<string>;

const isPostalCode = (value: string): value is PostalCode => value.length > 0;

export const PostalCode = (postalCode: string): Effect<PostalCode, InvalidPostalCodeError> =>
  isPostalCode(postalCode) ? succeed(postalCode) : fail(InvalidPostalCodeError(postalCode));
