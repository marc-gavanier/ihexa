import type { Client, ClientId } from '../../domain';

const CLIENTS = new Map<ClientId, Client>();

export const clientsStore = (): Map<ClientId, Client> => CLIENTS;

export const clearClientsStore = (): void => {
  clientsStore().clear();
};
