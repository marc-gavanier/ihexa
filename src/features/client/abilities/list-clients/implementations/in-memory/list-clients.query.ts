import type { ListClients } from '@/features/client/domain';
import { clientsStore } from '@/features/client/infrastructure/in-memory';

export const listClients: ListClients = async () => Array.from(clientsStore().values());
