import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';
import { City } from './city';
import { Street } from './street';
import { Zipcode } from './zipcode';

export const Address = defineModel(
  Schema.Struct({
    street: Street,
    city: City,
    zipcode: Zipcode
  })
);
export type Address = Model.TypeOf<typeof Address>;
