import assert from 'node:assert';
import type { Filtered } from '@arckit/resultset';
import { Page, PageSize, type Paginated } from '@arckit/resultset';
import type { DataTable } from '@cucumber/cucumber';
import { Then, When } from '@cucumber/cucumber';
import { listClients } from '@/features/client/abilities/list-clients';
import type { Client } from '@/features/client/domain';

let result: Filtered<Paginated<Client>> = {
  items: [],
  totalItems: 0,
  currentPage: Page(1),
  pageSize: PageSize(10),
  search: ''
};

type ClientOutputRow = { id: string };

When(/^I list all clients$/, async () => {
  result = await listClients();
});

When(/^I list clients with page (\d+) and page size (\d+)$/, async (page: string, pageSize: string) => {
  result = await listClients({ page: Page(Number(page)), pageSize: PageSize(Number(pageSize)) });
});

Then(/^I should see the following clients$/, (dataTable: DataTable) => {
  const expectedRows = dataTable.hashes() as ClientOutputRow[];
  assert.strictEqual(
    result.items.length,
    expectedRows.length,
    `Expected ${expectedRows.length} clients, got ${result.items.length}`
  );

  const getNestedValue = (obj: unknown, path: string): unknown =>
    path
      .replace(/\[(\d+)]/g, '.$1')
      .split('.')
      .reduce(
        (current: unknown, key: string) => (current == null ? undefined : (current as Record<string, unknown>)[key]),
        obj
      );

  for (const expected of expectedRows) {
    const client = result.items.find((c) => c.id === expected.id);
    assert.ok(client, `Client with id ${expected.id} not found`);
    for (const [key, value] of Object.entries(expected)) {
      const actualValue = getNestedValue(client, key);
      assert.strictEqual(String(actualValue), value, `Expected ${key} to be "${value}", got "${actualValue}"`);
    }
  }
});

Then(/^I should see (\d+) clients on page (\d+) of (\d+) total pages$/, (count: string, page: string, totalPages: string) => {
  assert.strictEqual(result.items.length, Number(count), `Expected ${count} items, got ${result.items.length}`);
  assert.strictEqual(result.currentPage, Number(page), `Expected page ${page}, got ${result.currentPage}`);
  const actualTotalPages = Math.ceil(result.totalItems / result.pageSize);
  assert.strictEqual(actualTotalPages, Number(totalPages), `Expected ${totalPages} total pages, got ${actualTotalPages}`);
});

Then(/^the total items count should be (\d+)$/, (count: string) => {
  assert.strictEqual(result.totalItems, Number(count), `Expected totalItems ${count}, got ${result.totalItems}`);
});

When(/^I search for clients with "([^"]*)"$/, async (query: string) => {
  result = await listClients({ search: query });
});

Then(/^I should find no clients$/, () => {
  assert.strictEqual(result.items.length, 0, `Expected no clients, got ${result.items.length}`);
});

Then(/^I should find clients with ids "([^"]*)"$/, (expectedIds: string) => {
  const expected = expectedIds.split(',').sort();
  const actual = result.items.map((c) => c.id).sort();
  assert.deepStrictEqual(actual, expected, `Expected ids ${expected.join(', ')}, got ${actual.join(', ')}`);
});
