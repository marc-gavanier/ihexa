import type { Either } from 'effect';
import type { Client, ClientId } from '@/features/client/domain';
import type { ClientNotFound } from './client-not-found';

export type GetClientById = (id: ClientId) => Promise<Either.Either<Client, ClientNotFound>>;
