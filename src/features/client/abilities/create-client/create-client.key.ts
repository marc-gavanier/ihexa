import type { ServerActionResult } from '@arckit/nextjs';
import { keyFor } from 'piqure';
import type { CreateClientErrorKey } from './create-client.errors';
import type { CreateClientInput } from './create-client.validation';
import type { ClientToCreate } from './domain';

export const CREATE_CLIENT_ACTION_KEY =
  keyFor<(formData: CreateClientInput) => Promise<ServerActionResult<ClientToCreate, CreateClientErrorKey>>>(
    'create-client.action'
  );
