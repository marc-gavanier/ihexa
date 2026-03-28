import type { ClientToCreate } from '@/features/client/domain';
import { key } from '@/libraries/injection';
import type { ServerActionResult } from '@/libraries/nextjs/action';
import type { CreateClientInput } from '../create-client.validation';

export const CREATE_CLIENT_ACTION_KEY =
  key<(formData: CreateClientInput) => Promise<ServerActionResult<ClientToCreate>>>('create-client.action');
