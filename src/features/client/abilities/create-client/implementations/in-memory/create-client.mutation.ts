import { Either } from 'effect';
import { ClientId } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';
import { ClientAlreadyExists, type CreateClient, SiretAlreadyExists, toB2BClient, toB2CClient } from '../../domain';

const siretExists = (siret: string): boolean =>
  Array.from(clientsStore().values()).some((client) => client._tag === 'B2BClient' && client.siret === siret);

export const createClient: CreateClient = async (clientToCreate) => {
  const store = clientsStore();
  const clientId = ClientId(clientToCreate.id);

  if (store.has(clientId)) return Either.left(new ClientAlreadyExists({ clientId }));

  if ('siret' in clientToCreate && siretExists(clientToCreate.siret)) {
    return Either.left(new SiretAlreadyExists({ siret: clientToCreate.siret }));
  }

  const client = 'siret' in clientToCreate ? toB2BClient(clientToCreate) : toB2CClient(clientToCreate);
  store.set(clientId, client);
  return Either.right(client);
};
