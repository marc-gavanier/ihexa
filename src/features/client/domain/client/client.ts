import { defineModel, type Model } from '@arckit/effect';
import { Schema } from 'effect';
import { Address } from '../address';
import { Name } from '../name';
import { ClientId } from './client-id';

export const Client = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    name: Name.schema,
    address: Address.schema
  })
);
export type Client = Model.TypeOf<typeof Client>;
