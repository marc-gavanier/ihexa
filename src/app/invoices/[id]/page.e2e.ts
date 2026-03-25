import { expect, test } from '@playwright/test';

test.describe('Consult invoice page', () => {
  test('should display invoice', async ({ page }) => {
    await page.goto('/invoices/550e8400-e29b-41d4-a716-446655440000', { waitUntil: 'commit' });

    const skeleton = page.locator('.skeleton').first();
    await expect(skeleton).toBeVisible();
    await expect(skeleton).not.toBeVisible();

    // Recipient
    await expect(page.getByTestId('recipient-name')).toHaveText('Jean Dupont');
    await expect(page.getByTestId('recipient-address')).toContainText('123 Rue de la Paix, 75001 Paris');

    // Invoice lines
    const lines = page.getByTestId('line-label');
    await expect(lines.nth(0)).toHaveText('Prestation de conseil');
    await expect(lines.nth(1)).toHaveText('Développement logiciel');

    const quantities = page.getByTestId('line-quantity');
    await expect(quantities.nth(0)).toHaveText('2');
    await expect(quantities.nth(1)).toHaveText('1');

    const amounts = page.getByTestId('line-amount');
    await expect(amounts.nth(0)).toHaveText('150 €');
    await expect(amounts.nth(1)).toHaveText('500 €');

    // Total
    await expect(page.getByTestId('invoice-total')).toContainText('800 €');
  });

  test('should display 404 page when invoice id is unknown', async ({ page }) => {
    await page.goto('/invoices/unknown-id');

    await expect(page.getByText('This page could not be found.')).toBeVisible();
  });
});
