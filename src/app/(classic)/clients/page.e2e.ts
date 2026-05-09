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

const uniqueName = () => `e2e${Date.now()}${Math.random().toString(36).slice(2, 6)}`;

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

  test('should display the "Add client" link', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    const addLink = page.getByRole('link', { name: /add client/i });
    await expect(addLink).toBeVisible();
    await expect(addLink).toHaveAttribute('href', '/clients/create');
  });

  test('should show no results state when search yields no results', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, 'zzzznonexistent999');

    await expect(page.getByText(/no clients found matching/i)).toBeVisible();
  });

  test('should display clients in a table with Name, City, Zipcode columns', async ({ page }) => {
    const tag = uniqueName();
    await createClient(page, `col${tag}`, `tbl${tag}`, 'Bordeaux', '33000');

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await expect(page.getByRole('columnheader', { name: /name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /city/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /zip code/i })).toBeVisible();

    await searchClients(page, `tbl${tag}`);

    await expect(page.getByRole('cell', { name: new RegExp(`Col${tag}`, 'i') })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Bordeaux' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '33000' })).toBeVisible();
  });

  test('should filter clients by search', async ({ page }) => {
    const tag = uniqueName();
    await createClient(page, `fab${tag}`, `mol${tag}`, 'Strasbourg', '67000');
    await createClient(page, `gae${tag}`, `ron${tag}`, 'Nantes', '44000');

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, `mol${tag}`);

    await expect(page.getByRole('cell', { name: new RegExp(`Fab${tag}`, 'i') })).toBeVisible();
    await expect(page.getByRole('cell', { name: new RegExp(`Ron${tag}`, 'i') })).not.toBeVisible();
  });

  test('should display pagination controls when there are multiple pages', async ({ page }) => {
    const tag = uniqueName();
    const names = Array.from({ length: 11 }, (_, i) => ({
      firstname: `pag${tag}${String(i + 1).padStart(2, '0')}`,
      lastname: `paguniq${tag}`,
      city: `PagCity${i + 1}`,
      zipcode: `${30001 + i}`
    }));

    for (const { firstname, lastname, city, zipcode } of names) {
      await createClient(page, firstname, lastname, city, zipcode);
    }

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, `paguniq${tag}`);

    await expect(page.getByText(/page 1/i)).toBeVisible();

    const paginationButtons = page.locator('.join-item.btn');
    await expect(paginationButtons.first()).toBeVisible();
  });
});
