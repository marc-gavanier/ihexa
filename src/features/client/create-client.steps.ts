import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import { type ClientId, ClientToCreate } from '@/features/client/domain';
import { clearClientsStore } from '@/features/client/infrastructure/in-memory';
import { assertMatchesDataTable } from '@/libraries/cucumber';
import type { CreateClientFormData } from './abilities/create-client/action';
import { createClient } from './abilities/create-client/implementations';
import { getClientById } from './abilities/get-client';

let clientId: ClientId | undefined;

const dataTableToInput = (dataTable: DataTable) => Object.fromEntries(dataTable.rows()) as CreateClientFormData;

Given(/^I am a user with the ability to create clients$/, () => {
  clientId = undefined;
  clearClientsStore();
});

When(/^I create a client with the following data$/, async (dataTable: DataTable) => {
  const { id, ...input } = dataTableToInput(dataTable);

  const result = await createClient(
    ClientToCreate({
      id,
      name: input,
      address: input
    })
  );
  clientId = Either.getOrThrow(result).id;
});

Then(/^the client should be created with formatted data$/, async (dataTable: DataTable) => {
  if (!clientId) throw new Error('Client ID not set');
  const client = Either.getOrThrow(await getClientById(clientId));
  assertMatchesDataTable(dataTable)(client);
});
