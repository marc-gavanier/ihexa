/** biome-ignore-all lint/complexity/useLiteralKeys: tests env is not referenced in app code */

import assert from 'node:assert';
import { Before, type DataTable, Then, When } from '@cucumber/cucumber';
import type { Invoice } from '@/features/invoice/domain';
import { assertMatchesDataTable, parseJsonSafely } from '@/libraries/cucumber';

interface TestContext {
  response: Response | undefined | null;
  invoice: Invoice | undefined | null;
}

const context: TestContext = {
  response: undefined,
  invoice: undefined
};

Before(() => {
  context.response = undefined;
  context.invoice = undefined;
});

const API_BASE_URL = process.env['API_BASE_URL'] || 'http://localhost:3000';

const consultInvoice = async (invoiceId: string): Promise<Response> => {
  const url = `${API_BASE_URL}/api/invoices/${invoiceId}`;
  try {
    return await fetch(url);
  } catch (error) {
    throw new Error(`Failed to fetch invoice ${invoiceId}: ${error}`);
  }
};

When('I consult the invoice with ID {string}', async (id: string) => {
  context.response = await consultInvoice(id);
  context.invoice = await parseJsonSafely<Invoice>(context.response);
});

Then('Invoice should not be found', () => {
  assert.strictEqual(context.response?.status, 404);
});

Then('I should see the invoice details', (dataTable: DataTable): void => {
  assertMatchesDataTable(dataTable)(context.invoice);
});

Then('I should see the invoice recipient', (dataTable: DataTable): void => {
  assertMatchesDataTable(dataTable)(context.invoice);
});

Then('I should see the invoice first line', (dataTable: DataTable): void => {
  assertMatchesDataTable(dataTable)(context.invoice);
});
