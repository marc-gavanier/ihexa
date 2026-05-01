'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { withLogger } from '@/configuration/logger';
import { actionBuilder } from '@/configuration/nextjs';
import { CREATE_CLIENT_ERRORS, createClientValidation } from '@/features/client/abilities/create-client';
import { ClientToCreate } from '@/features/client/abilities/create-client/domain';
import { createClient } from '@/features/client/abilities/create-client/implementations';

export const createClientAction = actionBuilder()
  .use(withInput(createClientValidation))
  .use(withLogger('createClientAction', { extractPayload: ({ input: { id } }) => ({ id }) }))
  .execute(
    fromEither(async ({ input }) => createClient(ClientToCreate({ id: input.id, name: input, address: input })), {
      onError: CREATE_CLIENT_ERRORS
    })
  );
