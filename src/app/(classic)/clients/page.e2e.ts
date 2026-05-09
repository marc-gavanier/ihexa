import { expect, type Page, test } from '@playwright/test';

const createClient = async (page: Page, firstname: string, lastname: string, city: string, zipcode: string) => {
  await page.goto('/clients/create', { waitUntil: 'networkidle' });
  await page.getByLabel(/first name/i).fill(firstname);
  await page.getByLabel(/last name/i).fill(lastname);
  await page.getByLabel(/street/i).fill('123 Rue Test');
  await page.getByLabel(/city/i).fill(city);
  await page.getByLabel(/zip code/i).fill(zipcode);
  await page.getByRole('button', { name: /create client/i }).click();
  await expect(page.locator('.alert-success')).toBeVisible();
};

const searchClients = async (page: Page, searchTerm: string) => {
  await page.getByPlaceholder(/search/i).fill(searchTerm);
  await page.getByRole('button', { name: /^search$/i }).click();
  await page.waitForURL(/search=/);
};

test.describe('List clients page', () => {
  test('should display the page title "Clients"', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: /^clients$/i })).toBeVisible();
  });

  test('should display the search input', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    await expect(page.getByPlaceholder(/search/i)).toBeVisible();
  });

  test('should display the search button', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    await expect(page.getByRole('button', { name: /^search$/i })).toBeVisible();
  });

  test('should display the "Add client" button (disabled)', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    const addButton = page.getByRole('button', { name: /add client/i });
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeDisabled();
  });

  test('should show empty state when search yields no results', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, 'zzzznonexistent999');

    await expect(page.getByText(/no clients yet/i)).toBeVisible();
  });

  test('should display clients in a table with Name, City, Zipcode columns', async ({ page }) => {
    await createClient(page, 'alphonse', 'lamartine', 'Bordeaux', '33000');
    await createClient(page, 'colette', 'beauvoir', 'Toulouse', '31000');

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await expect(page.getByRole('columnheader', { name: /name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /city/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /zip code/i })).toBeVisible();

    await expect(page.getByRole('cell', { name: 'Alphonse LAMARTINE' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Bordeaux' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: '33000' }).first()).toBeVisible();

    await expect(page.getByRole('cell', { name: 'Colette BEAUVOIR' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Toulouse' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: '31000' }).first()).toBeVisible();
  });

  test('should filter clients by search', async ({ page }) => {
    await createClient(page, 'fabrice', 'moliere', 'Strasbourg', '67000');
    await createClient(page, 'gaelle', 'ronsard', 'Nantes', '44000');

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await expect(page.getByRole('cell', { name: 'Fabrice MOLIERE' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Gaelle RONSARD' }).first()).toBeVisible();

    await searchClients(page, 'moliere');

    await expect(page.getByRole('cell', { name: 'Fabrice MOLIERE' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Gaelle RONSARD' })).not.toBeVisible();
  });

  test('should display pagination controls when there are multiple pages', async ({ page, browserName }) => {
    const tag = browserName.slice(0, 3);
    const names = Array.from({ length: 11 }, (_, i) => ({
      firstname: `xpag${tag}${String(i + 1).padStart(2, '0')}`,
      lastname: `xpaguniq${tag}${String(i + 1).padStart(2, '0')}`,
      city: `PagCity${i + 1}`,
      zipcode: `${30001 + i}`
    }));

    for (const { firstname, lastname, city, zipcode } of names) {
      await createClient(page, firstname, lastname, city, zipcode);
    }

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, `xpaguniq${tag}`);

    await expect(page.getByText(/page 1/i)).toBeVisible();

    const paginationButtons = page.locator('.join-item.btn');
    await expect(paginationButtons.first()).toBeVisible();
  });
});
