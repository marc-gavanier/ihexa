import assert from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import { type Client, type ClientId, ClientToCreate } from '@/features/client/domain';
import { clearClientsStore } from '@/features/client/infrastructure/in-memory';
import { assertMatchesDataTable } from '@/libraries/cucumber';
import type { CreateClientFormData } from './abilities/create-client/action';
import { createClient } from './abilities/create-client/implementations';
import { getClientById } from './abilities/get-client';
import { listClients } from './abilities/list-clients';

let clientId: ClientId | undefined;
let clients: Client[] = [];

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

type ClientInputRow = { id: string; firstname: string; lastname: string; street: string; city: string; zipcode: string };
type ClientOutputRow = { id: string };

Given(/^the following clients exist$/, async (dataTable: DataTable) => {
  clearClientsStore();
  clients = [];
  const rows = dataTable.hashes() as ClientInputRow[];
  for (const row of rows) {
    const clientToCreate = ClientToCreate({
      id: row.id,
      name: { firstname: row.firstname, lastname: row.lastname },
      address: { street: row.street, city: row.city, zipcode: row.zipcode }
    });
    await createClient(clientToCreate);
  }
});

When(/^I list all clients$/, async () => {
  clients = await listClients();
});

Then(/^I should see the following clients$/, (dataTable: DataTable) => {
  const expectedRows = dataTable.hashes() as ClientOutputRow[];
  assert.strictEqual(clients.length, expectedRows.length, `Expected ${expectedRows.length} clients, got ${clients.length}`);

  for (const expected of expectedRows) {
    const client = clients.find((c) => c.id === expected.id);
    assert.ok(client, `Client with id ${expected.id} not found`);
    for (const [key, value] of Object.entries(expected)) {
      const actualValue = getNestedValue(client, key);
      assert.strictEqual(String(actualValue), value, `Expected ${key} to be "${value}", got "${actualValue}"`);
    }
  }
});

const getNestedValue = (obj: unknown, path: string): unknown =>
  path
    .replace(/\[(\d+)]/g, '.$1')
    .split('.')
    .reduce((current: unknown, key: string) => (current == null ? undefined : (current as Record<string, unknown>)[key]), obj);
