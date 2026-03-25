import { Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';
import { Address } from './address';
import { Name } from './name';

export const Recipient = defineModel(
  Schema.Struct({
    name: Name.schema,
    address: Address.schema
  })
);
export type Recipient = Model.TypeOf<typeof Recipient>;
