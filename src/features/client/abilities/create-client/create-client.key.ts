import { keyFor } from 'piqure';
import type { ClientToCreate } from '@/features/client/domain';
import type { ServerActionResult } from '@/libraries/nextjs/action';
import type { CreateClientErrorKey } from './create-client.errors';
import type { CreateClientInput } from './create-client.validation';

export const CREATE_CLIENT_ACTION_KEY =
  keyFor<(formData: CreateClientInput) => Promise<ServerActionResult<ClientToCreate, CreateClientErrorKey>>>(
    'create-client.action'
  );
