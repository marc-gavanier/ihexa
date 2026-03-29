import { Data, type Either, Schema } from 'effect';
import { defineModel, type Model } from '@/libraries/effect';
import type { Paginated, PaginationParams } from '@/libraries/pagination';
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

export class ClientNotFound extends Data.TaggedError('ClientNotFound')<{
  readonly clientId: ClientId;
}> {}

export type GetClientById = (id: ClientId) => Promise<Either.Either<Client, ClientNotFound>>;

export type ListClients = (params?: PaginationParams) => Promise<Paginated<Client>>;
