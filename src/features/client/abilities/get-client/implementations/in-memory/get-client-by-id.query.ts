import { Either } from 'effect';
import type { ClientId } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';
import type { GetClientById } from '../../domain';
import { ClientNotFound } from '../../domain';

export const getClientById: GetClientById = async (id: ClientId) => {
  const client = clientsStore().get(id);
  return client ? Either.right(client) : Either.left(new ClientNotFound({ clientId: id }));
};
