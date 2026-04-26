import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { City } from './city';
import { Street } from './street';
import { Zipcode } from './zipcode';

export const Address = defineModel(
  Schema.Struct({
    street: Street.schema,
    city: City.schema,
    zipcode: Zipcode.schema
  })
);
export type Address = Model.TypeOf<typeof Address>;
