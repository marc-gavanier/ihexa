import { expect, type Page, test } from '@playwright/test';

const openCreateModal = async (page: Page) => {
  await page.getByRole('button', { name: /add client/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
};

const fillB2CForm = async (page: Page, firstname: string, lastname: string, city: string, zipcode: string) => {
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel(/first name/i).fill(firstname);
  await dialog.getByLabel(/last name/i).fill(lastname);
  await dialog.getByLabel(/street/i).fill('123 Rue Test');
  await dialog.getByLabel(/city/i).fill(city);
  await dialog.getByLabel(/zip code/i).fill(zipcode);
};

const createB2CClient = async (page: Page, firstname: string, lastname: string, city: string, zipcode: string) => {
  await page.goto('/clients', { waitUntil: 'networkidle' });
  await openCreateModal(page);
  await fillB2CForm(page, firstname, lastname, city, zipcode);
  await page.getByRole('button', { name: /^create client$/i }).click();
  await expect(page.locator('.alert-success')).toBeVisible();
  await expect(page.getByRole('dialog')).toBeHidden();
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

  test('should open the create client modal when clicking Add client', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    const addButton = page.getByRole('button', { name: /add client/i });
    await expect(addButton).toBeVisible();
    await addButton.click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('heading', { name: /^create client$/i })).toBeVisible();
  });

  test('should default to B2C tab in the create modal', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });
    await openCreateModal(page);

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByLabel(/first name/i)).toBeVisible();
    await expect(dialog.getByLabel(/last name/i)).toBeVisible();
  });

  test('should reset to B2C when reopening the modal after closing in B2B mode', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });
    await openCreateModal(page);

    await page
      .getByRole('dialog')
      .getByText(/^company \(b2b\)$/i)
      .click();
    await expect(page.getByRole('dialog').getByLabel(/search company/i)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();

    await openCreateModal(page);
    await expect(page.getByRole('dialog').getByLabel(/first name/i)).toBeVisible();
  });

  test('should create a B2C client through the modal', async ({ page }) => {
    const tag = uniqueName();
    await page.goto('/clients', { waitUntil: 'networkidle' });
    await openCreateModal(page);
    await fillB2CForm(page, `mod${tag}`, `b2c${tag}`, 'Marseille', '13001');
    await page.getByRole('button', { name: /^create client$/i }).click();

    await expect(page.locator('.alert-success')).toBeVisible();
    await expect(page.getByRole('dialog')).toBeHidden();

    await searchClients(page, `b2c${tag}`);
    await expect(page.getByRole('cell', { name: new RegExp(`Mod${tag}`, 'i') })).toBeVisible();
  });

  test('should create a B2B client through the modal', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });
    await openCreateModal(page);

    const dialog = page.getByRole('dialog');
    await dialog.getByText(/^company \(b2b\)$/i).click();

    const companyInput = dialog.getByLabel(/search company/i);
    await companyInput.fill('GOOGLE');
    const option = dialog.getByRole('option', { name: /GOOGLE FRANCE/i }).first();
    await option.waitFor();
    await option.click();

    await expect(dialog.getByText('GOOGLE FRANCE')).toBeVisible();
    await expect(dialog.getByText('44306184100047')).toBeVisible();

    await dialog.getByLabel(/email/i).fill('contact@google.fr');
    await dialog.getByLabel(/phone/i).fill('+33145678901');
    await page.getByRole('button', { name: /^create client$/i }).click();

    await expect(page.locator('.alert-success')).toBeVisible();
    await expect(page.locator('.alert-success')).toContainText(/GOOGLE FRANCE/i);
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('should show an error when creating a B2B client with an existing SIRET', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });
    await openCreateModal(page);

    let dialog = page.getByRole('dialog');
    await dialog.getByText(/^company \(b2b\)$/i).click();

    let companyInput = dialog.getByLabel(/search company/i);
    await companyInput.fill('ACME');
    const firstOption = dialog.getByRole('option', { name: /ACME SARL/i }).first();
    await firstOption.waitFor();
    await firstOption.click();
    await page.getByRole('button', { name: /^create client$/i }).click();
    await expect(page.locator('.alert-success').first()).toBeVisible();
    await expect(page.getByRole('dialog')).toBeHidden();

    await page.getByRole('button', { name: /add client/i }).click();
    dialog = page.getByRole('dialog');
    await dialog.getByText(/^company \(b2b\)$/i).click();
    companyInput = dialog.getByLabel(/search company/i);
    await companyInput.fill('ACME');
    const secondOption = dialog.getByRole('option', { name: /ACME SARL/i }).first();
    await secondOption.waitFor();
    await secondOption.click();
    await page.getByRole('button', { name: /^create client$/i }).click();

    await expect(page.locator('.alert-error')).toBeVisible();
    await expect(page.locator('.alert-error')).toContainText(/SIRET/i);
  });

  test('should show no results state when search yields no results', async ({ page }) => {
    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, 'zzzznonexistent999');

    await expect(page.getByText(/no clients found matching/i)).toBeVisible();
  });

  test('should display clients in a table with Name, City, Zipcode columns', async ({ page }) => {
    const tag = uniqueName();
    await createB2CClient(page, `col${tag}`, `tbl${tag}`, 'Bordeaux', '33000');

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
    await createB2CClient(page, `fab${tag}`, `mol${tag}`, 'Strasbourg', '67000');
    await createB2CClient(page, `gae${tag}`, `ron${tag}`, 'Nantes', '44000');

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
      await createB2CClient(page, firstname, lastname, city, zipcode);
    }

    await page.goto('/clients', { waitUntil: 'networkidle' });

    await searchClients(page, `paguniq${tag}`);

    await expect(page.getByText(/page 1/i)).toBeVisible();

    const paginationButtons = page.locator('.join-item.btn');
    await expect(paginationButtons.first()).toBeVisible();
  });
});
