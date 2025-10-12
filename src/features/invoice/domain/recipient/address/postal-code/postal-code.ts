import { type Effect, fail, succeed } from 'effect/Effect';
import type { ValueObject } from '@/libraries/ddd';
import { InvalidPostalCodeError } from './invalid-postal-code.error';

export type PostalCode = ValueObject<string>;

const isPostalCode = (value: string): value is PostalCode => value.length > 0;

export const PostalCode = (
  postalCode: string,
): Effect<PostalCode, InvalidPostalCodeError> =>
  isPostalCode(postalCode)
    ? succeed(postalCode)
    : fail(InvalidPostalCodeError(postalCode));
