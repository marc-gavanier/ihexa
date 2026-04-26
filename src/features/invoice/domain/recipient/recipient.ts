import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { Address } from './address';
import { Name } from './name';

export const Recipient = defineModel(
  Schema.Struct({
    name: Name.schema,
    address: Address.schema
  })
);
export type Recipient = Model.TypeOf<typeof Recipient>;
