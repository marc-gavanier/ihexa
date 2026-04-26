import { defineModel, type Model } from '@arckit/effect';
import { Data, type Either, Schema } from 'effect';
import { Address } from '../address';
import { Name } from '../name';
import type { Client } from './client';
import { ClientId } from './client-id';

const FIRSTNAME_PATTERN = /(?<=^|[\s-])\p{L}/gu;

const capitalizeCompoundName = (name: string): string =>
  name.toLowerCase().replace(FIRSTNAME_PATTERN, (letter) => letter.toUpperCase());

const formatName = ({ firstname, lastname }: Model.EncodedOf<typeof Name>) => ({
  firstname: capitalizeCompoundName(firstname),
  lastname: lastname.toUpperCase()
});

export const ClientToCreate = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    name: Name.schema,
    address: Address.schema
  }),
  ({ name, ...input }) => ({ ...input, name: formatName(name) })
);

export type ClientToCreate = Model.TypeOf<typeof ClientToCreate>;

export class ClientAlreadyExists extends Data.TaggedError('ClientAlreadyExists')<{
  readonly clientId: ClientId;
}> {}

export type CreateClient = (clientToCreate: ClientToCreate) => Promise<Either.Either<Client, ClientAlreadyExists>>;
