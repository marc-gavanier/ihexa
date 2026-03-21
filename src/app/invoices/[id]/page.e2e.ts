import { expect, test } from '@playwright/test';

test.describe('Consult invoice page', () => {
  test('should display a loader while loading the invoice', async ({ page }) => {
    await page.goto('/invoices/123', { waitUntil: 'commit' });

    const loader = page.locator('output');
    await expect(loader).toBeVisible();
    await expect(loader).not.toBeVisible();
  });

  test('should display 404 page when invoice id is unknown', async ({ page }) => {
    await page.goto('/invoices/unknown-id');

    await expect(page.getByText('This page could not be found.')).toBeVisible();
  });
});
