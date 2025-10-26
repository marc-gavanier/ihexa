import { expect, test } from '@playwright/test';

test('consult invoice shows loader', async ({ page }) => {
  await page.goto('/invoices/b06f2a21-d137-4557-80e1-6e6d44669cf6', {
    waitUntil: 'commit'
  });
  await expect(page.getByTestId('invoice-loader')).toBeVisible();
});

test('consult invoice shows invoice', async ({ page }) => {
  await page.goto('/invoices/b06f2a21-d137-4557-80e1-6e6d44669cf6');
  await expect(page.getByTestId('invoice-loader')).toBeHidden();
  await expect(page.getByTestId('invoice-recipient.name')).toContainText('John Doe');
  await expect(page.getByTestId('invoice-recipient.address.street')).toContainText('123 Main St');
  await expect(page.getByTestId('invoice-recipient.address.city')).toContainText('Anytown');
  await expect(page.getByTestId('invoice-recipient.address.postalCode')).toContainText('12345');
  await expect(page.getByTestId('invoice-line[0].label')).toContainText('Item 1');
  await expect(page.getByTestId('invoice-line[0].unitPrice')).toContainText('100');
  await expect(page.getByTestId('invoice-line[0].quantity')).toContainText('2');
  await expect(page.getByTestId('invoice-line[1].label')).toContainText('Item 2');
  await expect(page.getByTestId('invoice-line[1].unitPrice')).toContainText('50');
  await expect(page.getByTestId('invoice-line[1].quantity')).toContainText('1');
  await expect(page.getByTestId('invoice-total')).toContainText('250');
});

test('consult unknown invoice shows error', async ({ page }) => {
  await page.goto('/invoices/b06f2a21-d137-4557-80e1-6e6d44669cf5');
  await expect(page.getByTestId('invoice-error')).toBeVisible();
});
