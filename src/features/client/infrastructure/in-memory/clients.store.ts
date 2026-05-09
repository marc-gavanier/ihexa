import { Client, type ClientId } from '../../domain';
import seed from './seed.json';

const CLIENTS = new Map<ClientId, Client>(
  seed.map((raw) => {
    const client = Client(raw);
    return [client.id, client] as const;
  })
);

export const clientsStore = (): Map<ClientId, Client> => CLIENTS;

export const clearClientsStore = (): void => {
  clientsStore().clear();
};
