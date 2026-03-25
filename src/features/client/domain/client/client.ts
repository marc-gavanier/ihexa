import { Data, type Either, Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';
import { Address } from '../address';
import { Name } from '../name';

export const ClientId = defineModel(Schema.UUID.pipe(Schema.brand('ClientId')));
export type ClientId = Model.TypeOf<typeof ClientId>;

const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

const capitalizeCompoundName = (name: string): string =>
  name
    .split(' ')
    .map((part) => part.split('-').map(capitalizeWord).join('-'))
    .join(' ');

const formatName = ({ firstname, lastname }: Model.EncodedOf<typeof Name>) => ({
  firstname: capitalizeCompoundName(firstname),
  lastname: lastname.toUpperCase()
});

export const Client = defineModel(
  Schema.Struct({
    id: ClientId.schema,
    name: Name.schema,
    address: Address.schema
  }),
  ({ name, ...input }) => ({ ...input, name: formatName(name) })
);
export type Client = Model.TypeOf<typeof Client>;

export class ClientAlreadyExists extends Data.TaggedError('ClientAlreadyExists')<{
  readonly clientId: ClientId;
}> {}

export type CreateClient = (client: Model.EncodedOf<typeof Client>) => Promise<Either.Either<Client, ClientAlreadyExists>>;
