import { expect, test } from '@playwright/test';

test('consult invoice shows loader', async ({ page }) => {
  await page.goto('/invoices/36916dcd-ccd1-46ef-972d-377db546014a', {
    waitUntil: 'commit',
  });
  await expect(page.getByTestId('invoice-loader')).toBeVisible();
});

test('consult invoice shows invoice', async ({ page }) => {
  await page.goto('/invoices/36916dcd-ccd1-46ef-972d-377db546014a');
  await expect(page.getByTestId('invoice-loader')).toBeHidden();
  await expect(page.getByTestId('invoice-recipient.name')).toContainText(
    'John Doe',
  );
  await expect(
    page.getByTestId('invoice-recipient.address.street'),
  ).toContainText('123 Main St');
  await expect(
    page.getByTestId('invoice-recipient.address.city'),
  ).toContainText('Anytown');
  await expect(
    page.getByTestId('invoice-recipient.address.postalCode'),
  ).toContainText('12345');
  await expect(page.getByTestId('invoice-line[0].label')).toContainText(
    'Item 1',
  );
  await expect(page.getByTestId('invoice-line[0].unitPrice')).toContainText(
    '100',
  );
  await expect(page.getByTestId('invoice-line[0].quantity')).toContainText('2');
  await expect(page.getByTestId('invoice-line[1].label')).toContainText(
    'Item 2',
  );
  await expect(page.getByTestId('invoice-line[1].unitPrice')).toContainText(
    '50',
  );
  await expect(page.getByTestId('invoice-line[1].quantity')).toContainText('1');
  await expect(page.getByTestId('invoice-total')).toContainText('250');
});

test('consult unknown invoice shows error', async ({ page }) => {
  await page.goto('/invoices/74a9493e-5ca5-4f7d-91d6-8041760511b5');
  await expect(page.getByTestId('invoice-error')).toBeVisible();
});
