import { expect, type Page, test } from '@playwright/test';

const fillForm = async (page: Page) => {
  await page.getByLabel(/first name/i).fill('jean-pierre');
  await page.getByLabel(/last name/i).fill('Dupont');
  await page.getByLabel(/street/i).fill('456 Avenue');
  await page.getByLabel(/city/i).fill('Lyon');
  await page.getByLabel(/zip code/i).fill('69001');
};

const submitForm = (page: Page) => page.getByRole('button', { name: /create client/i }).click();

const expectFormToBeEmpty = async (page: Page) => {
  await expect(page.getByLabel(/first name/i)).toHaveValue('');
  await expect(page.getByLabel(/last name/i)).toHaveValue('');
  await expect(page.getByLabel(/street/i)).toHaveValue('');
  await expect(page.getByLabel(/city/i)).toHaveValue('');
  await expect(page.getByLabel(/zip code/i)).toHaveValue('');
};

test.describe('Create client page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clients/create', { waitUntil: 'networkidle' });
  });

  test('should display the create client form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /create client/i })).toBeVisible();
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/street/i)).toBeVisible();
    await expect(page.getByLabel(/city/i)).toBeVisible();
    await expect(page.getByLabel(/zip code/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /create client/i })).toBeVisible();
  });

  test('should create a client and reset form', async ({ page }) => {
    await fillForm(page);
    await submitForm(page);

    await expect(page.locator('.alert-success')).toBeVisible();
    await expect(page.locator('.alert-success')).toContainText(/client Jean-Pierre DUPONT successfully created/i);
    await expect(page).toHaveURL('/clients/create');
    await expectFormToBeEmpty(page);
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await submitForm(page);

    await expect(page.locator('.text-error')).toHaveCount(5);
  });

  test('should show validation error for invalid zipcode', async ({ page }) => {
    await fillForm(page);
    await page.getByLabel(/zip code/i).fill('invalid');
    await submitForm(page);

    await expect(page.getByText(/zip code must contain 5 digits/i)).toBeVisible();
  });

  test('should show error toast when client already exists', async ({ page }) => {
    const fixedUUID = crypto.randomUUID();

    await page.addInitScript((uuid) => {
      crypto.randomUUID = () => uuid as `${string}-${string}-${string}-${string}-${string}`;
    }, fixedUUID);

    await page.goto('/clients/create', { waitUntil: 'networkidle' });

    await fillForm(page);
    await submitForm(page);
    await expect(page.locator('.alert-success')).toBeVisible();
    await expect(page.locator('.alert-success')).toContainText(/client Jean-Pierre DUPONT successfully created/i);

    await fillForm(page);
    await submitForm(page);
    await expect(page.locator('.alert-error')).toBeVisible();
    await expect(page.locator('.alert-error')).toContainText(/a client with this id already exists/i);
  });
});
