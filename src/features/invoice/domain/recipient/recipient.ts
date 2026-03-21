import { Schema } from 'effect';
import { Address } from './address';
import { Name } from './name';

export const Recipient = Schema.Struct({
  name: Name,
  address: Address
});
export type Recipient = typeof Recipient.Type;
