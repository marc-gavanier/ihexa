'use server';

import { withLogger } from '@/configuration/logger';
import { actionBuilder, fromEither, withInput } from '@/libraries/nextjs/action';
import { createClientValidation } from '../create-client.validation';
import { createClient } from '../implementations';

export const createClientAction = actionBuilder()
  .use(withInput(createClientValidation))
  .use(withLogger('createClientAction', { extractPayload: ({ input: { id } }) => ({ id }) }))
  .execute(
    fromEither(async ({ input }) => createClient({ id: input.id, name: input, address: input }), {
      onError: { ClientAlreadyExists: 'error.clientAlreadyExists' }
    })
  );
