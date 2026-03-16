import { expect, test } from '@playwright/test';

test('register client', async ({ page }) => {
  await page.goto('/clients/register');

  await page.getByTestId('register-client.first-name').fill('john');

  await expect(page.getByTestId('register-client.first-name')).toHaveValue('John');
});
