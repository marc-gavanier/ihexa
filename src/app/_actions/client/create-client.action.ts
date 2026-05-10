'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { withLogger } from '@/configuration/logger';
import { actionBuilder } from '@/configuration/nextjs';
import {
  CREATE_CLIENT_ERRORS,
  createB2BClientValidation,
  createB2CClientValidation
} from '@/features/client/abilities/create-client';
import { B2BClientToCreate, B2CClientToCreate } from '@/features/client/abilities/create-client/domain';
import { createClient } from '@/features/client/abilities/create-client/implementations';

export const createB2CClientAction = actionBuilder()
  .use(withInput(createB2CClientValidation))
  .use(withLogger('createB2CClientAction', { extractPayload: ({ input: { id } }) => ({ id }) }))
  .execute(
    fromEither(
      async ({ input }) =>
        createClient(
          B2CClientToCreate({
            id: input.id,
            name: input,
            address: input,
            ...(input.email != null ? { email: input.email } : {}),
            ...(input.phone != null ? { phone: input.phone } : {})
          })
        ),
      {
        onError: CREATE_CLIENT_ERRORS
      }
    )
  );

export const createB2BClientAction = actionBuilder()
  .use(withInput(createB2BClientValidation))
  .use(withLogger('createB2BClientAction', { extractPayload: ({ input: { id } }) => ({ id }) }))
  .execute(
    fromEither(
      async ({ input }) =>
        createClient(
          B2BClientToCreate({
            id: input.id,
            denominationSociale: input.denominationSociale,
            formeJuridique: input.formeJuridique,
            siret: input.siret,
            address: input,
            ...(input.email != null ? { email: input.email } : {}),
            ...(input.phone != null ? { phone: input.phone } : {})
          })
        ),
      {
        onError: CREATE_CLIENT_ERRORS
      }
    )
  );
