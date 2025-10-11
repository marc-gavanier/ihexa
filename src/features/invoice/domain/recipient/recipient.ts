import { all, type Effect } from 'effect/Effect';
import type { Address, InvalidAddressError } from './address';
import type { InvalidNameError, Name } from './name';

export type InvalidRecipientError = InvalidNameError | InvalidAddressError;

export type Recipient = Readonly<{ name: Name; address: Address }>;

export const Recipient = (
  nameEffect: Effect<Name, InvalidNameError>,
  addressEffect: Effect<Address, InvalidAddressError>,
): Effect<Recipient, InvalidRecipientError> =>
  all({ name: nameEffect, address: addressEffect });
