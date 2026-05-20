import type { ServerActionResult } from '@arckit/nextjs/client';
import { keyFor } from 'piqure';
import type { B2BClient, B2CClient } from '@/features/client/domain/client';
import type { CompanySearchResult } from '../domain';
import type { CreateClientErrorKey } from './create-client.errors';
import type { CreateB2BClientInput, CreateB2CClientInput } from './create-client.validation';

export const CREATE_B2C_CLIENT_ACTION_KEY =
  keyFor<(formData: CreateB2CClientInput) => Promise<ServerActionResult<B2CClient, CreateClientErrorKey>>>(
    'create-b2c-client.action'
  );

export const CREATE_B2B_CLIENT_ACTION_KEY =
  keyFor<(formData: CreateB2BClientInput) => Promise<ServerActionResult<B2BClient, CreateClientErrorKey>>>(
    'create-b2b-client.action'
  );

export const SEARCH_COMPANY_KEY = keyFor<(query: string) => Promise<ServerActionResult<readonly CompanySearchResult[]>>>(
  'create-client.search-company.action'
);
