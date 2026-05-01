import { Data } from 'effect';
import type { ClientId } from '@/features/client/domain';

export class ClientNotFound extends Data.TaggedError('ClientNotFound')<{
  readonly clientId: ClientId;
}> {}
