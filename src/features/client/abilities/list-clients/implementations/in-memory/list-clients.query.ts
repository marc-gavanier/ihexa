import type { ListClients } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';
import { paginate } from '@/libraries/pagination';

export const listClients: ListClients = async (params) => {
  const allClients = Array.from(clientsStore().values());
  return paginate(allClients, params);
};
