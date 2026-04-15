'use server';

import { ERROR_PREFIX } from '@/configuration/errors';
import { withLogger } from '@/configuration/logger';
import { CREATE_CLIENT_ERRORS, createClientValidation } from '@/features/client/abilities/create-client';
import { createClient } from '@/features/client/abilities/create-client/implementations';
import { ClientToCreate } from '@/features/client/domain';
import { actionBuilder, fromEither, withInput } from '@/libraries/nextjs/action';

export const createClientAction = actionBuilder(ERROR_PREFIX)
  .use(withInput(createClientValidation))
  .use(withLogger('createClientAction', { extractPayload: ({ input: { id } }) => ({ id }) }))
  .execute(
    fromEither(async ({ input }) => createClient(ClientToCreate({ id: input.id, name: input, address: input })), {
      onError: CREATE_CLIENT_ERRORS
    })
  );
