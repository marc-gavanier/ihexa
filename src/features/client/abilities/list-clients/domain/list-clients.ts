import type { Filtered, FilterParams, Paginated, PaginationParams } from '@arckit/resultset';
import type { Client } from '@/features/client/domain';

export type ListClients = (params?: PaginationParams & FilterParams) => Promise<Filtered<Paginated<Client>>>;
