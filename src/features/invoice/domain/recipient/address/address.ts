import { all, type Effect } from 'effect/Effect';
import { toValueObject, type ValueObject } from '@/libraries/ddd';
import type { City, InvalidCityError } from './city';
import type { InvalidPostalCodeError, PostalCode } from './postal-code';
import type { InvalidStreetError, Street } from './street';

export type InvalidAddressError = InvalidStreetError | InvalidCityError | InvalidPostalCodeError;

export type Address = ValueObject<{
  street: Street;
  city: City;
  postalCode: PostalCode;
}>;

export const Address = (
  streetEffect: Effect<Street, InvalidStreetError>,
  cityEffect: Effect<City, InvalidCityError>,
  postalCodeEffect: Effect<PostalCode, InvalidPostalCodeError>
): Effect<Address, InvalidAddressError> =>
  all(
    toValueObject({
      street: streetEffect,
      city: cityEffect,
      postalCode: postalCodeEffect
    })
  );
