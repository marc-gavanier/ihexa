'use server';

import { ERROR_PREFIX } from '@/configuration/errors';
import { withErrorReporter } from '@/configuration/observability/error-reporter';
import { withLogger } from '@/configuration/observability/logger';
import { ClientToCreate } from '@/features/client/domain';
import { actionBuilder, fromEither, withInput } from '@/libraries/nextjs/action';
import { createClient } from '../implementations';
import { CREATE_CLIENT_ERRORS } from './create-client.errors';
import { createClientValidation } from './create-client.validation';

export const createClientAction = actionBuilder(ERROR_PREFIX)
  .use(withInput(createClientValidation))
  .use(withLogger('createClientAction', { extractContext: ({ input }) => input }))
  .use(withErrorReporter('createClientAction', { extractContext: ({ input }) => input }))
  .execute(
    fromEither(async ({ input }) => createClient(ClientToCreate({ id: input.id, name: input, address: input })), {
      onError: CREATE_CLIENT_ERRORS
    })
  );
