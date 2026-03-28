import { expect, test } from '@playwright/test';

test.describe('Create client page', () => {
  test('should display the create client form', async ({ page }) => {
    await page.goto('/clients/create', { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: /create client/i })).toBeVisible();
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/street/i)).toBeVisible();
    await expect(page.getByLabel(/city/i)).toBeVisible();
    await expect(page.getByLabel(/zip code/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /create client/i })).toBeVisible();
  });

  test('should create a client and reset form', async ({ page }) => {
    await page.goto('/clients/create', { waitUntil: 'networkidle' });

    await page.getByLabel(/first name/i).fill('jean-pierre');
    await page.getByLabel(/last name/i).fill('dupont');
    await page.getByLabel(/street/i).fill('123 Rue de la Paix');
    await page.getByLabel(/city/i).fill('Paris');
    await page.getByLabel(/zip code/i).fill('75001');

    await page.getByRole('button', { name: /create client/i }).click();

    await expect(page).toHaveURL('/clients/create');
    await expect(page.getByLabel(/first name/i)).toHaveValue('');
    await expect(page.getByLabel(/last name/i)).toHaveValue('');
    await expect(page.getByLabel(/street/i)).toHaveValue('');
    await expect(page.getByLabel(/city/i)).toHaveValue('');
    await expect(page.getByLabel(/zip code/i)).toHaveValue('');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/clients/create', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: /create client/i }).click();

    await expect(page.locator('.text-error')).toHaveCount(5);
  });

  test('should show validation error for invalid zipcode', async ({ page }) => {
    await page.goto('/clients/create', { waitUntil: 'networkidle' });

    await page.getByLabel(/first name/i).fill('Jean');
    await page.getByLabel(/last name/i).fill('Dupont');
    await page.getByLabel(/street/i).fill('123 Rue');
    await page.getByLabel(/city/i).fill('Paris');
    await page.getByLabel(/zip code/i).fill('invalid');

    await page.getByRole('button', { name: /create client/i }).click();

    await expect(page.getByText(/zip code must contain 5 digits/i)).toBeVisible();
  });
});
