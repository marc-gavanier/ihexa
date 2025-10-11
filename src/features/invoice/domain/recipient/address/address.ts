import { all, type Effect } from 'effect/Effect';
import type { City, InvalidCityError } from './city';
import type { InvalidPostalCodeError, PostalCode } from './postal-code';
import type { InvalidStreetError, Street } from './street';

export type InvalidAddressError =
  | InvalidStreetError
  | InvalidCityError
  | InvalidPostalCodeError;

export type Address = Readonly<{
  street: Street;
  city: City;
  postalCode: PostalCode;
}>;

export const Address = (
  streetEffect: Effect<Street, InvalidStreetError>,
  cityEffect: Effect<City, InvalidCityError>,
  postalCodeEffect: Effect<PostalCode, InvalidPostalCodeError>,
): Effect<Address, InvalidAddressError> =>
  all({ street: streetEffect, city: cityEffect, postalCode: postalCodeEffect });
