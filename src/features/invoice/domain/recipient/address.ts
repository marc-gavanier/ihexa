import { Schema } from 'effect';
import { City } from './city';
import { Street } from './street';
import { Zipcode } from './zipcode';

export const Address = Schema.Struct({
  street: Street,
  city: City,
  zipcode: Zipcode
});
export type Address = typeof Address.Type;
