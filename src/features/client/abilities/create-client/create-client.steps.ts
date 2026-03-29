import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import type { ClientToCreate } from '@/features/client/domain';
import { assertMatchesDataTable } from '@/libraries/cucumber';
import type { CreateClientFormData } from './action';
import { clearClients, createClient } from './implementations';

let client: ClientToCreate | undefined;

const dataTableToInput = (dataTable: DataTable) => Object.fromEntries(dataTable.rows()) as CreateClientFormData;

Given(/^I am a user with the ability to create clients$/, () => {
  client = undefined;
  clearClients();
});

When(/^I create a client with the following data$/, async (dataTable: DataTable) => {
  const { id, ...input } = dataTableToInput(dataTable);

  const result = await createClient({
    id,
    name: input,
    address: input
  });
  client = Either.getOrThrow(result);
});

Then(/^the client should be created with formatted data$/, (dataTable: DataTable) => {
  assertMatchesDataTable(dataTable)(client);
});
