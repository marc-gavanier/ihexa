'use server';

import { fromEither, withInput } from '@arckit/nextjs';
import { actionBuilder } from '@/configuration/nextjs';
import { withErrorReporter } from '@/configuration/telemetry/error-reporter/server';
import { withEventTracker } from '@/configuration/telemetry/event-tracker/server';
import { withLogger } from '@/configuration/telemetry/logger/server';
import { withMetrics } from '@/configuration/telemetry/metrics/server';
import { withTracer } from '@/configuration/telemetry/tracer/server';
import {
  CREATE_CLIENT_ERRORS,
  createB2BClientValidation,
  createB2CClientValidation
} from '@/features/client/abilities/create-client';
import { B2BClientToCreate, B2CClientToCreate } from '@/features/client/abilities/create-client/domain';
import { createB2BClient, createB2CClient } from '@/features/client/abilities/create-client/implementations';

export const createB2CClientAction = actionBuilder()
  .use(withTracer('action.createB2CClient', { kind: 'server' }))
  .use(withMetrics('createB2CClient'))
  .use(withInput(createB2CClientValidation))
  .use(withLogger('createB2CClientAction', { extractAttributes: ({ input: { id } }) => ({ id }) }))
  .use(withErrorReporter('createB2CClientAction', { extractAttributes: ({ input: { id } }) => ({ id }) }))
  .use(withEventTracker('Client Created', { extractProperties: () => ({ type: 'b2c' }) }))
  .execute(
    fromEither(
      async ({ input }) =>
        createB2CClient(
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
  .use(withTracer('action.createB2BClient', { kind: 'server' }))
  .use(withMetrics('createB2BClient'))
  .use(withInput(createB2BClientValidation))
  .use(withLogger('createB2BClientAction', { extractAttributes: ({ input: { id } }) => ({ id }) }))
  .use(withErrorReporter('createB2BClientAction', { extractAttributes: ({ input: { id } }) => ({ id }) }))
  .use(withEventTracker('Client Created', { extractProperties: () => ({ type: 'b2b' }) }))
  .execute(
    fromEither(
      async ({ input }) =>
        createB2BClient(
          B2BClientToCreate({
            id: input.id,
            denominationSociale: input.company.companyName,
            formeJuridique: input.company.legalForm,
            siret: input.company.siret,
            address: {
              street: input.company.street,
              city: input.company.city,
              zipcode: input.company.zipcode
            },
            ...(input.email != null ? { email: input.email } : {}),
            ...(input.phone != null ? { phone: input.phone } : {})
          })
        ),
      {
        onError: CREATE_CLIENT_ERRORS
      }
    )
  );
