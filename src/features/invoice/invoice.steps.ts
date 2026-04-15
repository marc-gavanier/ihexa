import assert from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import type { Invoice, InvoiceId, InvoiceNotFound } from '@/features/invoice/domain';
import { assertMatchesDataTable } from '@/libraries/cucumber';
import { invoiceById } from './abilities/consult-invoice/implementations';

let currentInvoice: Invoice | undefined;
let currentError: InvoiceNotFound | undefined;

const getInvoice = (): Invoice => {
  if (currentInvoice === undefined) throw new Error('No invoice loaded');
  return currentInvoice;
};

Given(/^I am a user with the ability to consult invoices$/, () => {
  currentInvoice = undefined;
  currentError = undefined;
});

When(/^I consult an invoice with ID "([^"]*)"$/, async (id: InvoiceId) => {
  const result = await invoiceById(id);
  if (Either.isRight(result)) {
    currentInvoice = result.right;
  } else {
    currentError = result.left;
  }
});

Then(/^I should see the invoice$/, (dataTable: DataTable) => {
  assertMatchesDataTable(dataTable)(getInvoice());
});

Then(/^I should see the recipient$/, (dataTable: DataTable) => {
  assertMatchesDataTable(dataTable)(getInvoice());
});

Then(/^I should see the line (\d+)$/, (_index: string, dataTable: DataTable) => {
  assertMatchesDataTable(dataTable)(getInvoice());
});

Then(/^the invoice should not be found$/, () => {
  assert.ok(currentError, 'Expected invoice not found error');
  assert.strictEqual(currentError._tag, 'InvoiceNotFound');
});
