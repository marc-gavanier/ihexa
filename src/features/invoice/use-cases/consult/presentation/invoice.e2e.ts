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
});
