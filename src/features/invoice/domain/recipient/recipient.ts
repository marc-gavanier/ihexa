import { all, type Effect } from 'effect/Effect';
import { toValueObject, type ValueObject } from '@/libraries/ddd';
import type { Address, InvalidAddressError } from './address';
import type { InvalidNameError, Name } from './name';

export type InvalidRecipientError = InvalidNameError | InvalidAddressError;

export type Recipient = ValueObject<{ name: Name; address: Address }>;

export const Recipient = (
  nameEffect: Effect<Name, InvalidNameError>,
  addressEffect: Effect<Address, InvalidAddressError>,
): Effect<Recipient, InvalidRecipientError> =>
  all(toValueObject({ name: nameEffect, address: addressEffect }));
