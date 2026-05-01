import { assertMatchesDataTable } from '@arckit/cucumber';
import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import type { CreateClientFormData } from '@/features/client/abilities/create-client';
import { ClientToCreate } from '@/features/client/abilities/create-client/domain';
import { createClient } from '@/features/client/abilities/create-client/implementations';
import { getClientById } from '@/features/client/abilities/get-client';
import type { ClientId } from '@/features/client/domain';

let clientId: ClientId | undefined;

const dataTableToInput = (dataTable: DataTable) => Object.fromEntries(dataTable.rows()) as CreateClientFormData;

Given(/^I am a user with the ability to create clients$/, () => {
  clientId = undefined;
});

When(/^I create a client with the following data$/, async (dataTable: DataTable) => {
  const { id, ...input } = dataTableToInput(dataTable);

  const createResult = await createClient(
    ClientToCreate({
      id,
      name: input,
      address: input
    })
  );
  clientId = Either.getOrThrow(createResult).id;
});

Then(/^the client should be created with formatted data$/, async (dataTable: DataTable) => {
  if (!clientId) throw new Error('Client ID not set');
  const client = Either.getOrThrow(await getClientById(clientId));
  assertMatchesDataTable(dataTable)(client);
});
