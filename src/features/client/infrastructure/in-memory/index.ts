import { clearClientsStore } from './clients.store';

export * from './clients.store';

export const clearClients = (): void => {
  clearClientsStore();
};
