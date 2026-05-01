import assert from 'node:assert';
import { assertMatchesDataTable } from '@arckit/cucumber';
import type { DataTable } from '@cucumber/cucumber';
import { Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import { getClientById } from '@/features/client/abilities/get-client';
import type { Client, ClientId } from '@/features/client/domain';

let currentClient: Client | undefined;
let clientNotFound: boolean;

When(/^I get the client with id "([^"]*)"$/, async (id: ClientId) => {
  const result = await getClientById(id);
  if (Either.isRight(result)) {
    currentClient = result.right;
    clientNotFound = false;
  } else {
    currentClient = undefined;
    clientNotFound = true;
  }
});

Then(/^I should see the client$/, (dataTable: DataTable) => {
  assert.ok(currentClient, 'No client loaded');
  assertMatchesDataTable(dataTable)(currentClient);
});

Then(/^the client should not be found$/, () => {
  assert.ok(clientNotFound, 'Expected client not found');
});
